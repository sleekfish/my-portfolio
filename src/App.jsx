import React from 'react'
import { Navbar, Welcome, Dock } from "#components";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import TerminalWindow from "#windows/Terminal.jsx";
import SafariWindow from "#windows/Safari.jsx";
import FinderWindow from "#windows/Finder.jsx";
import TextWindow from "#windows/Text.jsx";
import ImageWindow from "#windows/Image.jsx";
import ContactWindow from "#windows/Contact.jsx";
import ResumeWindow from "#windows/Resume.jsx";
import Home from "#components/Home.jsx";



gsap.registerPlugin(Draggable);

const App = () => {
    // ...
    return (
        <main>
            <Navbar />
            <Welcome />
            <Dock />

            <TerminalWindow/>
            <SafariWindow/>
            <FinderWindow/>
            <TextWindow/>
            <ImageWindow/>
            <ContactWindow/>
            <ResumeWindow/>
            <Home/>

        </main>
    );
};

export default App;