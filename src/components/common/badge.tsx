import React from "react";

const Badge = ({ title, color }: { title: string; color?: string }) => {
  const bgColorClass = color ? `bg-[${color}]` : "bg-primary";
  return (
    <span
      style={{ backgroundColor: color }}
      className="inline-block text-lg font-bold px-2.5 py-0.5 rounded"
    >
      {title}
    </span>
  );
};

export default Badge;
