import React, { useRef, useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { Mail, Globe, Phone, MapPin, Copy } from "lucide-react";
import { toast, Toaster } from "sonner";

export default function Contact() {
    const formRef = useRef();
    const [isSending, setIsSending] = useState(false);

    // Validate email
    const validateEmail = (email) =>
        /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email);

    // Preload notification sounds
    const successAudio = useRef(new Audio("https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg")); // short clean ding
    const errorAudio = useRef(new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg"));
    const copyAudio = useRef(new Audio("https://actions.google.com/sounds/v1/cartoon/pop.ogg"));


    useEffect(() => {
        successAudio.current.volume = 0.4;
        errorAudio.current.volume = 0.4;
        copyAudio.current.volume = 0.4;
    }, []);

    const playSound = (type) => {
        if (type === "success") successAudio.current.play();
        if (type === "error") errorAudio.current.play();
        if (type === "copy") copyAudio.current.play();
    };

    const sendEmail = (e) => {
        e.preventDefault();
        const form = formRef.current;
        const email = form.email.value;

        if (!validateEmail(email)) {
            playSound("error");
            toast.error("Please enter a valid email!", { icon: "⚠️" });
            return;
        }

        setIsSending(true);

        emailjs
            .sendForm(
                "service_x4j2wo9",
                "template_12id7e9",
                formRef.current,
                "zK1VYa0njiHvCc8MG"
            )
            .then(
                () => {
                    playSound("success");
                    toast.success("Message sent successfully!", { icon: "✉️" });
                    setIsSending(false);
                    formRef.current.reset();
                },
                () => {
                    playSound("error");
                    toast.error("Error sending message. Try again!", { icon: "❌" });
                    setIsSending(false);
                }
            );
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        playSound("copy");
        toast(`${text} copied!`, { icon: "📋" });
    };

    return (
        <section
            id="contact"
            className="py-20 bg-white text-black transition-colors duration-500 hover:bg-black hover:text-white"
        >
            <Toaster
                richColors
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: "#111",
                        color: "#f0f0f0",
                        border: "1px solid #8b5cf6",
                        borderRadius: "16px",
                        padding: "16px 24px",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
                        fontWeight: 500,
                    },
                }}
            />

            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <h2 className="text-4xl font-extrabold tracking-wide uppercase text-center mb-16 flex items-center justify-center gap-3">
                    Contact <Mail className="w-8 h-8" />
                </h2>

                <div className="flex flex-col md:flex-row gap-16 items-start">
                    {/* Contact Form */}
                    <div className="flex-1 max-w-xl space-y-8">
                        <form ref={formRef} onSubmit={sendEmail} className="space-y-8">
                            {[
                                { label: "Name", type: "text", name: "name", placeholder: "John Doe" },
                                { label: "Email", type: "text", name: "email", placeholder: "you@example.com" },
                            ].map(({ label, type, name, placeholder }) => (
                                <div key={name} className="group relative">
                                    <label className="block text-xl font-semibold mb-3">{label}</label>
                                    <input
                                        type={type}
                                        name={name}
                                        required
                                        placeholder={placeholder}
                                        autoComplete={name}
                                        className="peer block w-full border-b border-gray-600 bg-transparent placeholder-gray-600 focus:outline-none focus:border-indigo-600 transition-colors duration-300 text-lg px-1 py-2"
                                    />
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 peer-focus:w-full"></span>
                                </div>
                            ))}

                            <div className="group relative">
                                <label className="block text-xl font-semibold mb-3">Message</label>
                                <textarea
                                    name="message"
                                    rows="5"
                                    required
                                    placeholder="Write your message..."
                                    className="peer block w-full border-b border-gray-600 bg-transparent placeholder-gray-600 resize-none focus:outline-none focus:border-indigo-600 transition-colors duration-300 text-lg px-1 py-2"
                                />
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 peer-focus:w-full"></span>
                            </div>

                            <button
                                type="submit"
                                disabled={isSending}
                                className="flex items-center justify-center gap-2 rounded-full bg-indigo-700 px-10 py-3 font-semibold text-white hover:bg-indigo-800 active:scale-95 transition-transform duration-200"
                            >
                                {isSending && (
                                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                )}
                                {isSending ? "Sending..." : "Send Message"}
                            </button>
                        </form>
                    </div>

                    {/* Contact Details */}
                    <div className="flex-1 max-w-md rounded-xl border border-gray-300 shadow-lg p-8 transition-colors duration-500 group-hover:border-gray-600">
                        <h3 className="text-3xl font-semibold mb-8">Get in Touch</h3>
                        <p className="text-lg mb-12 text-gray-700 transition-colors duration-500 group-hover:text-gray-300">
                            Whether you have a question, a project idea, or just want to say hi, our inbox is always open. We typically reply within 24 hours.
                        </p>
                        <div className="space-y-8 text-gray-700 transition-colors duration-500 group-hover:text-gray-300">
                            {[
                                {
                                    icon: <Mail className="w-6 h-6 text-indigo-600" />,
                                    content: "Eaglevision@gmail.com",
                                    action: () => copyToClipboard("Eaglevision@gmail.com"),
                                },
                                {
                                    icon: <Phone className="w-6 h-6 text-indigo-600" />,
                                    content: "+216 12 345 678",
                                    action: () => copyToClipboard("+21612345678"),
                                },
                                {
                                    icon: <Globe className="w-6 h-6 text-indigo-600" />,
                                    content: (
                                        <a
                                            href="https://www.Eaglevision.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline"
                                        >
                                            www.example.com
                                        </a>
                                    ),
                                },
                                {
                                    icon: <MapPin className="w-6 h-6 text-indigo-600" />,
                                    content: <span>Tunis, Tunisia</span>,
                                },
                            ].map(({ icon, content, action }, i) => (
                                <div key={i} className="flex items-center gap-4 cursor-pointer">
                                    {icon}
                                    <div
                                        className="text-lg font-medium flex items-center gap-2"
                                        onClick={action}
                                    >
                                        {content}
                                        {action && <Copy className="w-4 h-4 text-gray-500 hover:text-indigo-600" />}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
