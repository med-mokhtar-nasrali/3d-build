import React, { useRef, useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { Mail, Globe, Phone, MapPin, Copy } from "lucide-react";
import { Toaster, toast } from "sonner";

export default function Contact() {
    const formRef = useRef();
    const [isSending, setIsSending] = useState(false);

    // Simple email format check
    const validateEmail = (email) =>
        /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email?.trim());

    // Premium, subtle sounds (public CDNs)
    const successAudio = useRef(new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_3d1f2e7d2f.mp3?filename=success-1-6297.mp3"));
    const errorAudio = useRef(new Audio("https://cdn.pixabay.com/download/audio/2022/03/10/audio_3b1b3f87c7.mp3?filename=error-126627.mp3"));
    const copyAudio = useRef(new Audio("https://cdn.pixabay.com/download/audio/2021/08/04/audio_4f7b1b32f7.mp3?filename=button-click-131479.mp3"));

    useEffect(() => {
        // Ensure they can play on all browsers/CDNs
        [successAudio, errorAudio, copyAudio].forEach((ref) => {
            ref.current.volume = 0.35;
            ref.current.preload = "auto";
            ref.current.crossOrigin = "anonymous";
        });
    }, []);

    const playSound = (type) => {
        try {
            const map = { success: successAudio.current, error: errorAudio.current, copy: copyAudio.current };
            const snd = map[type];
            if (!snd) return;
            snd.currentTime = 0;
            // Tiny delay smooths the start and avoids occasional first-play hiccups
            setTimeout(() => snd.play().catch(() => { }), 60);
        } catch { }
    };

    const sendEmail = (e) => {
        e.preventDefault();
        const form = formRef.current;
        const { name, email, message } = form;

        if (!name.value.trim() || !message.value.trim()) {
            playSound("error");
            toast.error("Please fill in all fields.");
            return;
        }

        if (!validateEmail(email.value)) {
            playSound("error");
            toast.error("Please enter a valid email!");
            return;
        }

        setIsSending(true);

        emailjs
            .send(
                "service_x4j2wo9",
                "template_12id7e9",
                {
                    name: name.value.trim(),
                    email: email.value.trim(),
                    message: message.value.trim(),
                },
                "zK1VYa0njiHvCc8MG"
            )
            .then(
                () => {
                    playSound("success");
                    toast.success("Message sent successfully!");
                    setIsSending(false);
                    form.reset();
                },
                () => {
                    playSound("error");
                    toast.error("Error sending message. Try again!");
                    setIsSending(false);
                }
            );
    };

    const copyToClipboard = async (text) => {
        // Play sound immediately on user click (gesture) before async clipboard
        playSound("copy");
        try {
            await navigator.clipboard.writeText(text);
            toast("Copied: " + text);
        } catch {
            playSound("error");
            toast.error("Copy failed.");
        }
    };

    return (
        <section
            id="contact"
            className="py-20 bg-white text-black transition-colors duration-500 hover:bg-black hover:text-white"
        >
            <Toaster
                position="top-right"
                richColors
                toastOptions={{
                    duration: 3500,
                    style: {
                        background: "#111",
                        color: "#f0f0f0",
                        border: "1px solid #8b5cf6",
                        borderRadius: "16px",
                        padding: "14px 18px",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
                        fontWeight: 600,
                        letterSpacing: ".01em",
                    },
                }}
            />

            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <h2 className="text-4xl font-extrabold tracking-wide uppercase text-center mb-16 flex items-center justify-center gap-3">
                    Contact <Mail className="w-8 h-8" />
                </h2>

                <div className="flex flex-col md:flex-row gap-16 items-start">
                    {/* Left: Contact Form */}
                    <div className="flex-1 max-w-xl space-y-8">
                        <form ref={formRef} onSubmit={sendEmail} className="space-y-8" noValidate>
                            {/* Name */}
                            <div className="group relative">
                                <label className="block text-xl font-semibold mb-3">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="John Doe"
                                    autoComplete="name"
                                    className="peer block w-full border-b border-gray-600 bg-transparent placeholder-gray-600 focus:outline-none focus:border-indigo-600 transition-colors duration-300 text-lg px-1 py-2"
                                />
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 peer-focus:w-full" />
                            </div>

                            {/* Email */}
                            <div className="group relative">
                                <label className="block text-xl font-semibold mb-3">Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    required
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    className="peer block w-full border-b border-gray-600 bg-transparent placeholder-gray-600 focus:outline-none focus:border-indigo-600 transition-colors duration-300 text-lg px-1 py-2"
                                />
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 peer-focus:w-full" />
                            </div>

                            {/* Message */}
                            <div className="group relative">
                                <label className="block text-xl font-semibold mb-3">Message</label>
                                <textarea
                                    name="message"
                                    rows="5"
                                    required
                                    placeholder="Write your message..."
                                    className="peer block w-full border-b border-gray-600 bg-transparent placeholder-gray-600 resize-none focus:outline-none focus:border-indigo-600 transition-colors duration-300 text-lg px-1 py-2"
                                />
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 peer-focus:w-full" />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isSending}
                                className="flex items-center justify-center gap-2 rounded-full bg-indigo-700 px-10 py-3 font-semibold text-white hover:bg-indigo-800 active:scale-95 transition-transform duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {isSending && (
                                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                )}
                                {isSending ? "Sending..." : "Send Message"}
                            </button>
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
                                    text: "Eaglevision@gmail.com",
                                    copy: "Eaglevision@gmail.com",
                                },
                                {
                                    icon: <Phone className="w-6 h-6 text-indigo-600" />,
                                    text: "+216 12 345 678",
                                    copy: "+21612345678",
                                },
                                {
                                    icon: <Globe className="w-6 h-6 text-indigo-600" />,
                                    text: "www.example.com",
                                    href: "https://www.Eaglevision.com",
                                },
                                {
                                    icon: <MapPin className="w-6 h-6 text-indigo-600" />,
                                    text: "Tunis, Tunisia",
                                },
                            ].map(({ icon, text, copy, href }, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    {icon}
                                    {href ? (
                                        <a
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-lg font-medium hover:underline"
                                        >
                                            {text}
                                        </a>
                                    ) : (
                                        <div className="text-lg font-medium flex items-center gap-2">
                                            {text}
                                            {copy && (
                                                <button
                                                    type="button"
                                                    onClick={() => copyToClipboard(copy)}
                                                    className="inline-flex items-center"
                                                    title="Copy"
                                                >
                                                    <Copy className="w-4 h-4 text-gray-500 hover:text-indigo-600" />
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
