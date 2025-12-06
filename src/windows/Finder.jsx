import { WindowsControls } from "#components";
import { Search } from "lucide-react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { locations } from "#constants/index.js";
import useLocationStore from "#store/Location.js";
import clsx from "clsx";
import useWindowStore from "#store/Window.js";

const Finder = () => {
    const {openWindow} = useWindowStore();
    const {activeLocation, setActiveLocation} = useLocationStore();

    // 🏆 UPDATED: The function now handles all file types and the PDF fix
    const openItem = (item) => {
        // 1. Handling the text file (.txt)
        if (item.fileType === "txt") {
            // Pass the file object as data to the 'txtfile' window
            return openWindow("txtfile", {file: item});
        }

        // 2. Handling the image file (fileType is "img")
        if (item.fileType === "img") {
            // Pass the file object as data to the 'imgfile' window
            return openWindow("imgfile", {file: item});
        }

        // 3. PDF LOGIC: Opens the internal "resume" window,
        // which then executes window.open() to bypass pop-up blockers.
        // In Finder.jsx's openItem function:
        if (item.fileType === "pdf") {
            // Pass the file object (which contains the href: "/files/resume.pdf")
            return openWindow("resume", { file: item });
        }
// ... (rest of the function)

        // 4. Existing logic for Folders
        if (item.kind === "folder") return setActiveLocation(item);

        // 5. Existing logic for external links (.fig and .url)
        if (["fig", "url"].includes(item.fileType) && item.href)
            return window.open(item.href, "_blank");
    };

    const renderList = (name, items) => (
        <div>
            <h3>{name}</h3>

            <ul>
                {items.map((item) => (
                    <li
                        key={item.id}
                        onClick={() => setActiveLocation(item)}
                        className={clsx(
                            item.id === activeLocation.id ? "active" : "not-active",
                        )}
                    >
                        <img src={item.icon} className="w-4" alt={item.name}/>
                        <p className="text-sm font-medium truncate">{item.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );


    return (
        <>
            <div id="window-header">
                <WindowsControls target="finder"/>
                <Search className="icon"/>
            </div>

            <div className="bg-white flex h-full">
                <div className="sidebar">
                    {renderList("Favorites", Object.values(locations))}
                    {renderList("Work", locations.work.children)}
                </div>
                <ul className="content">
                    {activeLocation?.children.map((item) => (
                        <li
                            key={item.id}
                            className={item.position}
                            onClick={() => openItem(item)}
                        >
                            <img src={item.icon} alt={item.name} />
                            <p>{item.name}</p>
                        </li>
                    ))}
                </ul>

            </div>
        </>
    );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;