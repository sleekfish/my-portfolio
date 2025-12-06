import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { socials } from "#constants";
import { WindowsControls } from "#components";

const Contact = () => {
    return (
        <>
            <div id="window-header">
                {/* Ensure your WindowsControls handles setting the title based on the target */}
                <WindowsControls target="contact" />
            </div>

            <div className="p-5 space-y-5 flex flex-col h-full overflow-y-auto">
                <img
                    src="/images/adrian.jpg"
                    alt="Adrian"
                    className="w-20 rounded-full"
                />

                <h3>Let's Connect</h3>
                <p>Got an idea? A bug to squash? Or just wanna talk tech? I'm in.</p>
                <p className="font-bold">contact@jsmastery.pro</p>

                <ul className="socials-list mt-5 space-y-3">
                    {socials.map(({ id, bg, link, icon, text }) => (
                        <li
                            key={id}
                            // Applying the background style to the list item
                            style={{ backgroundColor: bg }}
                            className="p-3 rounded-lg shadow-md transition duration-200 hover:opacity-90"
                        >
                            {/* The anchor tag is correctly nested inside the list item */}
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={text}
                                className="flex items-center space-x-3 text-white" // Added classes for better alignment
                            >
                                <img src={icon} alt={text} className="size-5" />
                                <p className="font-medium">{text}</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

const ContactWindow = WindowWrapper(Contact, "contact");

export default ContactWindow;