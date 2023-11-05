import React from "react";

interface TooltipProps {
  text: string;
  children: any;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className="relative group inline-block">
      <div className="opacity-0 pointer-events-none group-hover:opacity-100 group-hover:scale-100 scale-95 transform transition-all duration-100 absolute bottom-10 left-1/2 -translate-x-1/2 bg-black text-white p-2 rounded-md text-center">
        {text}
        {/* <div className="absolute w-4 h-4 bg-black -top-2 left-1/2 -translate-x-1/2 rotate-45"></div> */}
      </div>
      {children}
    </div>
  );
};

export default Tooltip;
