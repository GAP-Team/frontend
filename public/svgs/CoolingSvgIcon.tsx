export const CoolingSvgIcon = ({ className }: { className?: string }): JSX.Element => {
  return (
    <svg
      className={className || "w-14 h-14 text-blue-600"}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeWidth="2" fill="none">
        {/* Tank body */}
        <rect x="16" y="16" width="32" height="28" rx="6" />
        
        {/* Top valve */}
        <line x1="32" y1="10" x2="32" y2="16" />
        <circle cx="32" cy="10" r="2" fill="currentColor" stroke="none" />
        
        {/* Tank feet */}
        <line x1="20" y1="44" x2="20" y2="50" />
        <line x1="44" y1="44" x2="44" y2="50" />
        
        {/* Horizontal line = water/gas level */}
        <line x1="18" y1="30" x2="46" y2="30" />
      </g>
    </svg>
  );
};
