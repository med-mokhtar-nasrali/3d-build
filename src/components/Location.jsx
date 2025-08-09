import { MapPin, Activity, Car, Leaf, Flag } from "lucide-react";

export default function Location() {
    return (
        <section
            id="location"
            className="py-20 bg-white text-black transition-colors duration-500 hover:bg-black hover:text-white"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <h2 className="text-4xl font-extrabold tracking-wide uppercase text-center mb-16">
                    Location <MapPin className="inline-block w-8 h-8 ml-2 align-middle" />
                </h2>

                <div className="flex flex-col md:flex-row gap-16 items-start">
                    {/* Left: Location Details */}
                    <div className="flex-1 space-y-12 max-w-xl">
                        {[
                            {
                                title: "Wintering Road",
                                icon: <Activity className="w-6 h-6" />,
                                points: ["3 km", "0.5 km", "0.4 km"],
                            },
                            {
                                title: "Purpose of Drive",
                                icon: <Car className="w-6 h-6" />,
                                points: ["1.5 km", "0.5 km", "0.4 km"],
                            },
                            {
                                title: "Sport Drive & Park",
                                icon: <Leaf className="w-6 h-6" />,
                                points: ["0.5 km", "0.4 km"],
                            },
                            {
                                title: "Driveway Drive",
                                icon: <Flag className="w-6 h-6" />,
                                points: ["0.5 km", "0.4 km"],
                            },
                        ].map(({ title, icon, points }, idx) => (
                            <div key={idx}>
                                <h3 className="text-2xl font-semibold flex items-center gap-3 mb-3">
                                    <span className="text-indigo-600">{icon}</span> {title}
                                </h3>
                                <ul className="list-disc list-inside text-lg text-gray-600 transition-colors duration-500 group-hover:text-gray-300">
                                    {points.map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Right: Map */}
                    <div className="flex-1 w-full h-[400px] rounded-xl overflow-hidden shadow-lg border border-gray-300 transition-colors duration-500 group-hover:border-gray-600">
                        <iframe
                            title="Google Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3125.3135746332883!2d10.165960115252535!3d36.81897007994914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1302c90479a04b2d%3A0xa1a61b4e041d7594!2sTunis%2C%20Tunisia!5e0!3m2!1sen!2stn!4v1610919603546!5m2!1sen!2stn"
                            width="100%"
                            height="100%"
                            allowFullScreen=""
                            loading="lazy"
                            className="w-full h-full border-0"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
