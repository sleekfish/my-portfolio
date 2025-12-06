// src/components/Resume.jsx

import WindowWrapper from "#hoc/WindowWrapper.jsx";
import useWindowStore from "#store/Window.js";
import { WindowsControls } from "#components";
import { useState, useEffect } from "react"; // <-- Import useState and useEffect

const Resume = () => {
    const { windows } = useWindowStore();
    const fileData = windows.resume.data;
    const href = fileData?.file?.href;
    const fileName = fileData?.file?.name || "Resume";

    // 1. State to hold the Base64 data (the actual content to display)
    const [pdfDataUrl, setPdfDataUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (href) {
            // Function to fetch the PDF and convert it to a data URL
            const fetchAndEncodePdf = async () => {
                try {
                    // Fetch the file as a raw response
                    const response = await fetch(href);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch PDF: ${response.statusText}`);
                    }

                    // Convert the response blob to a data URL (Base64)
                    const blob = await response.blob();
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setPdfDataUrl(reader.result);
                        setIsLoading(false);
                    };
                    reader.readAsDataURL(blob);

                } catch (err) {
                    console.error("PDF loading error:", err);
                    setError(err.message);
                    setIsLoading(false);
                }
            };

            fetchAndEncodePdf();
        }
    }, [href]); // Re-run only if the href changes

    // --- RENDER LOGIC ---

    if (isLoading) {
        return (
            <div id="window-header">
                <WindowsControls target="resume" title={`Loading ${fileName}...`} />
                <div className="p-5 flex items-center justify-center flex-1 h-full">
                    <p>Loading PDF...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div id="window-header">
                <WindowsControls target="resume" title={`Error loading ${fileName}`} />
                <div className="p-5 flex items-center justify-center flex-1 h-full text-red-500">
                    <p>Error: Could not load the PDF file. ({error})</p>
                </div>
            </div>
        );
    }


    return (
        <>
            <div id="window-header">
                <WindowsControls target="resume" title={fileName} />
            </div>

            <div className="bg-gray-100 flex flex-col h-full">
                {pdfDataUrl ? (
                    // ⭐ Use the Base64 data as the source (data:application/pdf;base64,...) ⭐
                    <embed
                        src={pdfDataUrl} // <-- Now using the encoded data!
                        type="application/pdf"
                        title={fileName}
                        className="flex-1 w-full min-h-0"
                        style={{ height: '100%' }}
                    />
                ) : (
                    <div className="p-5 text-center flex-1 flex items-center justify-center">
                        <p>Error: PDF data not found.</p>
                    </div>
                )}
            </div>
        </>
    );
};

// Wrap the component and export it
const ResumeWindow = WindowWrapper(Resume, "resume");

export default ResumeWindow;