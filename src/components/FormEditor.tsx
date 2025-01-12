import { useColorStore, useWidthStore } from "@/store/useCounterStore";
import { Ruler } from "lucide-react";
import { useState } from "react";


export default function FormEditor() {
    const { width, setWidth } = useWidthStore();
    const { color, setColor } = useColorStore();
    const [inputWidth, setInputWidth] = useState(width);
    const [inputColor, setInputColor] = useState(color);
    return <div className="mb-4 flex flex-row gap-2 items-center">
        <div className="flex flex-row items-center hidden sm:flex">
            <Ruler className="w-[40px] h-[40px] text-black border border-black rounded-l-[5px] p-1" />
            <div className="flex flex-row items-center h-[40px] border border-black border-l-0 rounded-r-[5px] p-1">
                <input className="w-[50px] focus:outline-none" value={inputWidth} min="30" max="100" onChange={(e) => {
                    setInputWidth(parseInt(e.target.value));
                }} onBlur={(e) => {
                    let newWidth = parseInt(e.target.value);
                    if (newWidth < 30) {
                        newWidth = 30;
                    } else if (newWidth > 100) {
                        newWidth = 100;
                    }
                    setWidth(newWidth);
                    setInputWidth(newWidth);
                }} />
                <span className="text-black">%</span>
            </div>
        </div>
        <div className="flex flex-row items-center hidden sm:flex">
            <div className="flex flex-row items-center h-[40px] border border-black rounded-[5px] p-1">
                <input className="w-[50px] focus:outline-none" value={inputColor} type="color" min="30" max="100" onChange={(e) => {
                    setInputColor(e.target.value);
                    setColor(e.target.value);
                }} />
            </div>
        </div>
    </div>;
}
