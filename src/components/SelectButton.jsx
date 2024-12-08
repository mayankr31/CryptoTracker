import React from "react";

export default function SelectButton({ children, selected, onClick }) {
  return (
    <span
      onClick={onClick}
      className={`border-[1px] border-gold rounded p-2.5 pl-5 pr-5 w-[22%] font-montseratt cursor-pointer ${
        selected ? "bg-gold text-black font-bold" : "font-medium"
      } hover:bg-gold hover:text-black`}
    >
      {children}
    </span>
  );
}
