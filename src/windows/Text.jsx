
// src/components/TxtFile.jsx (or wherever you keep your window components)

import useWindowStore from "#store/Window.js";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowsControls } from "#components"; // Assuming you need controls here too

const TxtFile = () => {
    // 1. Access the window data from the store
    const { windows } = useWindowStore();
    const fileData = windows.txtfile.data;

    // Fallback if the window is opened without file data
    if (!fileData?.file) {
        return (
            <div className="p-4 bg-white h-full">
                <p>Error: No text file content found.</p>
            </div>
        );
    }

    const { name, description } = fileData.file;

    return (
        <>
            <div id="window-header">
                {/* Displaying the file name in the header */}
                <WindowsControls target="txtfile" title={name} />
            </div>

            <div className="bg-white flex-1 p-6 overflow-y-auto font-mono text-sm leading-relaxed">
                <h1 className="text-xl font-bold mb-4 border-b pb-2">{name}</h1>

                {/* Render each paragraph from the description array */}
                {description.map((paragraph, index) => (
                    <p key={index} className="mb-4">
                        {paragraph}
                    </p>
                ))}
            </div>
        </>
    );
};

// Wrap the component to turn it into a movable, closable window
const TxtFileWindow = WindowWrapper(TxtFile, "txtfile");

export default TxtFileWindow;