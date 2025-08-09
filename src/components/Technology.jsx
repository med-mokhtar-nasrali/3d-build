import { Shield, Smartphone, Zap, Wifi } from "lucide-react";

export default function Technology() {
    const features = [
        { icon: <Shield className="w-8 h-8" />, title: "Smart Security", desc: "24/7 AI-powered surveillance with instant alerts and access control." },
        { icon: <Smartphone className="w-8 h-8" />, title: "Mobile Control", desc: "Manage lighting, temperature, and security from anywhere." },
        { icon: <Zap className="w-8 h-8" />, title: "Energy Efficiency", desc: "Advanced energy-saving systems to lower costs and reduce footprint." },
        { icon: <Wifi className="w-8 h-8" />, title: "High-Speed Connectivity", desc: "Ultra-fast internet and smart home integrations." },
    ];

    return (
        <section
            id="technology"
            className="bg-white text-black transition-colors duration-500 hover:bg-black hover:text-white py-20"
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold tracking-wide uppercase">
                        Smart Technology
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 hover:text-gray-300 transition-colors duration-500">
                        Experience cutting-edge features designed for modern luxury living.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {features.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-6 transform transition-transform duration-500 hover:-translate-y-2"
                        >
                            <div className="p-4 rounded-full border border-gray-300 hover:border-white transition-colors duration-500">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                <p className="text-gray-600 hover:text-gray-300 transition-colors duration-500">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
