import React from 'react'
import {Navbar , Welcome , Dock} from "#components";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import TerminalWindow from "./windows/Terminal.jsx";

gsap.registerPlugin(Draggable);

const App = () => {
    return (
        <main>
            <Navbar />
            <Welcome />
            <Dock />

            <TerminalWindow/>
        </main>
    );
};
export default App
