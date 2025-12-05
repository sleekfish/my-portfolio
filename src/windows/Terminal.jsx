import React from "react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import {techStack} from "#constants";
import { Check, Flag } from "lucide-react";
import WindowsControls from "#components/WindowsControls.jsx";


const Terminal = () => {
    return (
        <>
            <div id="window-header">
                <WindowsControls target="Terminal" />

                <h2>Tech Stack</h2>
            </div>

            <div className="techstack">
                {/* Intro */}
                <p>
                    <span className="font-bold">@kunal % </span> show tech stack
                </p>

                {/* Category / Technologies Label */}
                <div className="label">
                    <p className="w-32">Category</p>
                    <p>Technologies</p>
                </div>

                {/* Tech Stack List */}
                <ul className="content">
                    {techStack.map(({category, items}) => (
                        <li key={category} className="flex items-center">
                            <Check className="check" size={20}/>
                            <h3>{category}</h3>

                            <ul>
                                {items.map((item, i) => (
                                    <li key={i}>
                                        {item}
                                        {i < items.length - 1 ? ", " : ""}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>

                {/* Footnote */}
                <div className="footnote">
                    <p>
                        <Check size={20}/> 5 of 5 stacks loaded successfully <br/>
                        (100%)
                    </p>

                    <p className="text-black">
                        <Flag size={15} fill="black"/> <br/>
                        Render time: 6ms
                    </p>
                </div>
            </div>
        </>
    );
};
const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;
