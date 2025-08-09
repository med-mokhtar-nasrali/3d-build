import { FaCheck } from "react-icons/fa";

export default function Projects() {
    return (
        <section
            id="projects"
            className="py-20 bg-white text-black transition-colors duration-500 hover:bg-black hover:text-white"
        >
            <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
                <h2 className="text-4xl font-extrabold tracking-wide uppercase mb-12 flex items-center justify-center gap-3">
                    Other Projects <FaCheck className="w-8 h-8 text-indigo-600" />
                </h2>
                <p className="max-w-3xl mx-auto mb-12 text-lg text-gray-700 transition-colors duration-500 group-hover:text-gray-300">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>

                <ul className="max-w-md mx-auto space-y-6 text-left text-gray-700 transition-colors duration-500 group-hover:text-gray-300">
                    {[
                        "Ut enim ad minim veniam",
                        "Ut enim ad minim veniam",
                        // Add more projects here as needed
                    ].map((project, idx) => (
                        <li
                            key={idx}
                            className="flex items-center gap-4 text-lg font-medium"
                        >
                            <FaCheck className="text-indigo-600 w-6 h-6 flex-shrink-0" />
                            {project}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
