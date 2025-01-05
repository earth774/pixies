"use client";

import React, { useEffect, useRef, useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";
import useWidthStore from "@/store/useCounterStore";

export default function CodeEditor() {
  const { width } = useWidthStore();
  const [appName, setAppName] = useState(`@amiearth`);
  const [code, setCode] = useState(`function helloWorld() {
    console.log("Hello, world!");
}`);

  const parentRef = useRef<HTMLDivElement>(null);
  const [parentWidth, setParentWidth] = useState(0);

  // Measure the parent element's width
  useEffect(() => {
    const updateWidth = () => {
      if (parentRef.current) {
        setParentWidth(parentRef.current.offsetWidth - 30);
      }
    };

    // Initial measurement
    updateWidth();

    // Update width on window resize
    window.addEventListener("resize", updateWidth);

    // Cleanup
    return () => window.removeEventListener("resize", updateWidth);
  }, [width]);

  // Calculate the number of lines
  // const lineCount = code.split("\n").length;

  return (
    <>
      <div className="flex flex-col items-center bg-blue-500  w-full p-8">
        <section className={`editor-container flex flex-col bg-gray-900 border border-gray-800 rounded-lg w-full`}>
          <header>
            <div className="flex items-center pt-4 ps-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="54" height="14" viewBox="0 0 54 14">
                <g fill="none" fillRule="evenodd" transform="translate(1 1)">
                  <circle cx="6" cy="6" r="6" fill="#FF5F56" stroke="#E0443E" strokeWidth=".5"></circle>
                  <circle cx="26" cy="6" r="6" fill="#FFBD2E" stroke="#DEA123" strokeWidth=".5"></circle>
                  <circle cx="46" cy="6" r="6" fill="#27C93F" stroke="#1AAB29" strokeWidth=".5"></circle>
                </g>
              </svg>

              <div className="w-full flex items-center justify-center">
                <input type="text" placeholder="Enter your name" value={appName} onChange={(e) => setAppName(e.target.value)} className="w-full text-sm bg-transparent text-white text-center focus:outline-none" />
              </div>
            </div>

          </header>

          <div className="bg-gray-900 rounded-lg p-4 font-mono flex" ref={parentRef}>
            {/* Line numbers */}
            {/* <div className="line-numbers text-gray-500 pr-4 text-right select-none pt-[10px]">
              {Array.from({ length: lineCount }, (_, i) => (
                <div key={i + 1} className="text-[14px]">
                  {i + 1}
                </div>
              ))}
            </div> */}

            {/* Code editor */}
            <div className="flex-1">
              <Editor
                value={code}
                onValueChange={(code: string) => setCode(code)}
                highlight={(code: string) => highlight(code, languages.js, "javascript")}
                padding={10}
                style={{
                  backgroundColor: "#1e1e1e",
                  color: "#d4d4d4",
                  fontSize: "14px",
                  fontFamily: '"Fira Code", "Menlo", "Monaco", "Consolas", monospace',
                  lineHeight: "1.5",
                  overflowX: "auto", // Enable horizontal scrolling
                  whiteSpace: "pre", // Prevent text wrapping
                  width: `${parentWidth}px`
                }}
                textareaClassName="code-textarea"
                preClassName="code-pre"
                tabSize={2}
                insertSpaces
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}