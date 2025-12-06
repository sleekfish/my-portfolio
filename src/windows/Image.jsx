// src/components/ImgFile.jsx (or wherever you keep your window components)

import useWindowStore from "#store/Window.js";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowsControls } from "#components";

const ImgFile = () => {
    // 1. Access the window data from the store
    const { windows } = useWindowStore();
    const fileData = windows.imgfile.data;

    // Fallback if the window is opened without file data
    if (!fileData?.file) {
        return (
            <div className="p-4 bg-black flex justify-center items-center h-full text-white">
                <p>Error: No image source found.</p>
            </div>
        );
    }

    const { name, imageUrl } = fileData.file;

    return (
        <>
            <div id="window-header">
                {/* Displaying the file name in the header */}
                <WindowsControls target="imgfile" title={name} />
            </div>

            {/* Main content area (usually dark for image viewers) */}
            <div className="bg-black flex-1 flex items-center justify-center p-4">
                <img
                    src={imageUrl}
                    alt={name}
                    // This ensures the image scales down to fit the window without distortion
                    className="max-w-full max-h-full object-contain"
                />
            </div>
        </>
    );
};

// Wrap the component to turn it into a movable, closable window
const ImgFileWindow = WindowWrapper(ImgFile, "imgfile");

export default ImgFileWindow;