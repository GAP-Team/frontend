import React from "react";

const GBadge = ({ title, color }: { title: string; color?: string }) : JSX.Element => {
  return (
    <span
      style={{ backgroundColor: color }}
      className="inline-block text-lg font-bold px-2.5 py-0.5 rounded"
    >
      {title}
    </span>
  );
};

export default GBadge;
