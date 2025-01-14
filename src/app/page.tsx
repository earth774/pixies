"use client";

import { Button } from "@/components/ui/button";
import domtoimage from "dom-to-image";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useWidthStore } from "@/store/useCounterStore";

const CodeEditor = dynamic(() => import("@/components/CodeEditor"), { ssr: false });
const FormEditor = dynamic(() => import("@/components/FormEditor"), { ssr: false });

export default function Home() {
  const { width } = useWidthStore();
  const [containerWidth, setContainerWidth] = useState<number | string>();
  const handleDownload = () => {
    const codeBlock = document.querySelector(".editor-container");
    if (codeBlock) {
      const scale = 2; // Increase the scale for better quality
      const style = {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: codeBlock.scrollWidth + "px",
        height: codeBlock.scrollHeight + "px"
      };

      const width = codeBlock.scrollWidth * scale;
      const height = codeBlock.scrollHeight * scale;
      domtoimage
        .toPng(codeBlock, { width, height, style })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "code-image.png";
          link.click();
        })
        .catch((error) => {
          console.error("Error generating image:", error);
        });
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setContainerWidth(window.innerWidth <= 640 ? '100%' : `${width}%`);
    }
  }, [width]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-[#000000] text-6xl">Code Pixie</h1>
      <p className="text-center text-gray-500 text-sm pb-4">Create and share beautiful code images. Start typing to begin.</p>
      <div className="flex flex-col items-center">
        <div className="border border-black rounded-lg p-1 sm:p-4" style={{ width: containerWidth }}>
          <section className="flex flex-col items-center p-2 sm:p-4">
            <div className="flex flex-row items-center w-full">
              <FormEditor />
            </div>
            <CodeEditor />
            <Button className="mt-4 bg-[#f8e81d] text-black hover:bg-[#f8e81d]/80" onClick={handleDownload}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download as Image
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
}
