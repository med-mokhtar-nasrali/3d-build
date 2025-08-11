import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { Mail, Globe, Phone, MapPin } from "lucide-react";

export default function Contact() {
    const formRef = useRef();
    const [isSending, setIsSending] = useState(false);
    const [message, setMessage] = useState("");

    const sendEmail = (e) => {
        e.preventDefault();
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
                    setMessage("✅ Message sent successfully!");
                    setIsSending(false);
                    formRef.current.reset();
                },
                () => {
                    setMessage("❌ Failed to send. Try again later.");
                    setIsSending(false);
                }
            );
    };

    return (
        <section
            id="contact"
            className="py-20 bg-white text-black transition-colors duration-500 hover:bg-black hover:text-white"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <h2 className="text-4xl font-extrabold tracking-wide uppercase text-center mb-16 flex items-center justify-center gap-3">
                    Contact <Mail className="w-8 h-8" />
                </h2>

                <div className="flex flex-col md:flex-row gap-16 items-start">
                    {/* Left: Contact Form */}
                    <div className="flex-1 max-w-xl space-y-8">
                        <form ref={formRef} onSubmit={sendEmail} className="space-y-8">
                            {[
                                { label: "Name", type: "text", name: "name", placeholder: "John Doe" },
                                { label: "Email", type: "email", name: "email", placeholder: "you@example.com" },
                            ].map(({ label, type, name, placeholder }) => (
                                <div key={name} className="group relative">
                                    <label className="block text-xl font-semibold mb-3 flex items-center gap-2">
                                        {label}
                                    </label>
                                    <input
                                        type={type}
                                        name={name}
                                        required
                                        placeholder={placeholder}
                                        className="peer block w-full border-b border-gray-600 bg-transparent placeholder-gray-600 focus:outline-none focus:border-indigo-600 transition-colors duration-300 text-lg px-1 py-2"
                                    />
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 peer-focus:w-full"></span>
                                </div>
                            ))}

                            <div className="group relative">
                                <label className="block text-xl font-semibold mb-3 flex items-center gap-2">
                                    Message
                                </label>
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
                                className="rounded-full bg-indigo-700 px-10 py-3 font-semibold text-white hover:bg-indigo-800 active:scale-95 transition-transform duration-200"
                            >
                                {isSending ? "Sending..." : "Send Message"}
                            </button>

                            {message && (
                                <p
                                    className={`mt-4 text-sm ${message.startsWith("✅") ? "text-green-600" : "text-red-600"
                                        }`}
                                >
                                    {message}
                                </p>
                            )}
                        </form>
                    </div>

                    {/* Right: Contact Details */}
                    <div className="flex-1 max-w-md rounded-xl border border-gray-300 shadow-lg p-8 transition-colors duration-500 group-hover:border-gray-600">
                        <h3 className="text-3xl font-semibold mb-8">Get in Touch</h3>
                        <p className="text-lg mb-12 text-gray-700 transition-colors duration-500 group-hover:text-gray-300">
                            Whether you have a question, a project idea, or just want to say hi, our inbox is always open. We typically reply within 24 hours.
                        </p>
                        <div className="space-y-8 text-gray-700 transition-colors duration-500 group-hover:text-gray-300">
                            {[
                                {
                                    icon: <Mail className="w-6 h-6 text-indigo-600" />,
                                    content: <a href="mailto:example@example.com" className="hover:underline">Eaglevision@gmail.com</a>,
                                },
                                {
                                    icon: <Phone className="w-6 h-6 text-indigo-600" />,
                                    content: <span>+216 12 345 678</span>,
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
                            ].map(({ icon, content }, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    {icon}
                                    <div className="text-lg font-medium">{content}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
