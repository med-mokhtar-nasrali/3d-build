import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import { fileURLToPath, pathToFileURL } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
    logging: false,
  }
);

const db = {};

// Import all model files dynamically
const files = fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('.js'));

for (const file of files) {
  const modelPath = pathToFileURL(path.join(__dirname, file)).href;
  const modelModule = await import(modelPath);
  const model = modelModule.default(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

// Set up associations if any
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
