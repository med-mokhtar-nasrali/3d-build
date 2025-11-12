import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Store conversation history per session
const conversationHistory = new Map();

// Load real estate data
const loadData = () => {
  try {
    const housesPath = path.join(__dirname, '../src/data/houses.json');
    const commentsPath = path.join(__dirname, '../src/data/comments.json');
    const propertyDetailsPath = path.join(__dirname, '../src/data/propertyDetails.json');
    
    const houses = JSON.parse(fs.readFileSync(housesPath, 'utf8'));
    const comments = JSON.parse(fs.readFileSync(commentsPath, 'utf8'));
    const propertyDetails = JSON.parse(fs.readFileSync(propertyDetailsPath, 'utf8'));
    
    return { houses, comments, propertyDetails };
  } catch (error) {
    console.error('Error loading data:', error);
    return { houses: [], comments: [], propertyDetails: {} };
  }
};

// Generate context-aware system prompt
const generateSystemPrompt = (data) => {
  const { houses, comments, propertyDetails } = data;
  const activeHouses = houses.filter(h => h.state === 'actif');
  const inactiveHouses = houses.filter(h => h.state === 'inactif');
  const typeAHouses = houses.filter(h => h.type === 'a');
  const typeBHouses = houses.filter(h => h.type === 'b');
  const activeTypeA = activeHouses.filter(h => h.type === 'a');
  const activeTypeB = activeHouses.filter(h => h.type === 'b');

  return `You are Aria, an ultra-friendly and knowledgeable AI real estate assistant for BNG Architecture. You're warm, enthusiastic, and genuinely excited to help people find their dream home!

🏡 CURRENT PROPERTY DATABASE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Properties: ${houses.length}
✅ Available Properties: ${activeHouses.length} total
   • Type A Available: ${activeTypeA.length} units (${activeTypeA.map(h => h.number).join(', ')})
   • Type B Available: ${activeTypeB.length} units (${activeTypeB.map(h => h.number).join(', ')})
❌ Sold/Reserved: ${inactiveHouses.length} properties

PROPERTY TYPE DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 TYPE A - ${propertyDetails.propertyTypes?.a?.name || 'Standard Residential'}
${propertyDetails.propertyTypes?.a?.description || ''}
Features:
${propertyDetails.propertyTypes?.a?.features?.map(f => `  • ${f}`).join('\n') || ''}
Ideal for: ${propertyDetails.propertyTypes?.a?.idealFor || ''}

📋 TYPE B - ${propertyDetails.propertyTypes?.b?.name || 'Premium Units'}
${propertyDetails.propertyTypes?.b?.description || ''}
Features:
${propertyDetails.propertyTypes?.b?.features?.map(f => `  • ${f}`).join('\n') || ''}
Ideal for: ${propertyDetails.propertyTypes?.b?.idealFor || ''}

🏢 BUILDING AMENITIES:
${propertyDetails.buildingAmenities?.map(a => `  • ${a}`).join('\n') || ''}

📍 LOCATION BENEFITS:
${propertyDetails.locationBenefits?.map(l => `  • ${l}`).join('\n') || ''}

💰 FINANCING OPTIONS:
${propertyDetails.financingOptions?.map(f => `  • ${f}`).join('\n') || ''}

📞 CONTACT INFORMATION:
• Phone: ${propertyDetails.contactInfo?.phone || 'Contact our team'}
• Email: ${propertyDetails.contactInfo?.email || 'info@bngarchitecture.com'}
• Viewing Hours: ${propertyDetails.contactInfo?.viewingSchedule || 'By appointment'}
• Response Time: ${propertyDetails.contactInfo?.responseTime || 'Within 24 hours'}

YOUR PERSONALITY:
• Warm, friendly, and conversational (like chatting with a friend!)
• Use emojis naturally to add personality 😊
• Be enthusiastic but professional
• Show genuine interest in helping users
• Keep responses concise but informative (3-5 sentences max usually)
• When users ask about availability, provide specific property numbers

YOUR CAPABILITIES:
1. 📋 Check real-time property availability
2. 🏠 Explain detailed differences between property types
3. 📊 Provide statistics about available units
4. 💬 Answer questions about amenities and features
5. 🎯 Help users find their perfect property match based on needs
6. 📞 Guide users on scheduling viewings and next steps
7. 💰 Discuss financing options and assistance programs
8. 📍 Share location benefits and nearby amenities

CONVERSATION STYLE:
• Start with a warm, personalized greeting
• Ask clarifying questions to understand needs better
• Provide specific property numbers when discussing availability
• Highlight relevant features based on user preferences
• Always end with a helpful next step or engaging question
• Be proactive in offering relevant information
• Use natural, conversational language
• Break up long information into digestible chunks

RESPONSE GUIDELINES:
• Keep most responses under 5 sentences unless providing detailed comparisons
• Use bullet points when listing multiple items
• Always mention specific property numbers when relevant
• If someone asks about a specific property, provide details about that property and suggest similar alternatives
• Encourage viewings for properties they show interest in
• Be honest when you don't have specific information

IMPORTANT RULES:
• Always provide accurate, database-backed information
• If you don't have specific details, be honest and offer to connect them with the team
• Encourage users to contact the team for viewings and detailed floor plans
• Never make up property details not in the database
• Focus on helping users make informed decisions
• Remember context from earlier in the conversation

Remember: You're here to make finding a home an exciting, smooth, and delightful experience! Your goal is to help users discover their perfect property match. 🌟✨`;
};

// Call Clarifai API
async function callClarifaiAPI(messages) {
  try {
    const response = await fetch('https://api.clarifai.com/v2/ext/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer d74bdc4663c547929f3f472d35d82768',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'https://clarifai.com/openai/chat-completion/models/gpt-oss-120b',
        messages: messages,
        temperature: 0.7,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling Clarifai API:', error);
    throw error;
  }
}

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message || !sessionId) {
      return res.status(400).json({ error: 'Message and sessionId are required' });
    }

    // Load current data
    const data = loadData();
    
    // Get or create conversation history for this session
    if (!conversationHistory.has(sessionId)) {
      conversationHistory.set(sessionId, [
        { role: 'system', content: generateSystemPrompt(data) }
      ]);
    }

    const history = conversationHistory.get(sessionId);
    
    // Add user message to history
    history.push({ role: 'user', content: message });

    // Keep only last 20 messages to avoid token limits
    const recentHistory = history.length > 21 
      ? [history[0], ...history.slice(-20)] 
      : history;

    // Call AI API
    const response = await callClarifaiAPI(recentHistory);

    // Add assistant response to history
    history.push({ role: 'assistant', content: response });

    // Only show property cards if the user specifically asked about properties or the response lists multiple properties
    const userAskedAboutProperties = message.toLowerCase().match(/show|list|available|properties|units|tell me about \d|property \d/i);
    const responseListsProperties = (response.match(/\d+R/g) || []).length >= 2;
    
    let suggestedHouses = [];
    if (userAskedAboutProperties && responseListsProperties) {
      suggestedHouses = data.houses.filter(house => 
        response.toLowerCase().includes(house.number.toLowerCase())
      ).slice(0, 4); // Max 4 cards
    }

    res.json({ 
      response,
      suggestedHouses,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Sorry, I encountered an error. Please try again!',
      details: error.message 
    });
  }
});

// Get property info endpoint
app.get('/api/properties', (req, res) => {
  const data = loadData();
  const { type, state } = req.query;
  
  let filtered = data.houses;
  
  if (type) {
    filtered = filtered.filter(h => h.type === type);
  }
  
  if (state) {
    filtered = filtered.filter(h => h.state === state);
  }
  
  res.json(filtered);
});

// Quick replies endpoint
app.get('/api/quick-replies', (req, res) => {
  const data = loadData();
  const activeCount = data.houses.filter(h => h.state === 'actif').length;
  
  res.json([
    { id: 'available', text: `Show available properties (${activeCount})`, icon: '🏠' },
    { id: 'types', text: 'Explain property types', icon: '📋' },
    { id: 'contact', text: 'How to schedule viewing', icon: '📅' },
    { id: 'help', text: 'What can you help me with?', icon: '❓' }
  ]);
});

// Reset conversation endpoint
app.post('/api/reset-conversation', (req, res) => {
  const { sessionId } = req.body;
  if (sessionId && conversationHistory.has(sessionId)) {
    conversationHistory.delete(sessionId);
  }
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`🤖 Chatbot server running on http://localhost:${PORT}`);
  console.log(`📊 Loaded ${loadData().houses.length} properties`);
});

