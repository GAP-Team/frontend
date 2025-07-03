export const WandhydrantenanlageSvgIcon = ({ className }: { className?: string }): JSX.Element => {
  return (
    <svg
      className={className || "w-14 h-14 text-blue-600"}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeWidth="2" fill="none">
        {/* Wall box */}
        <rect x="14" y="14" width="36" height="36" rx="4" />
        
        {/* Hose reel circle */}
        <circle cx="32" cy="32" r="8" />
        
        {/* Hose line (spiral tail) */}
        <path d="M32 40 q4 2 6 6" strokeLinecap="round" />
        
        {/* Nozzle */}
        <line x1="38" y1="46" x2="40" y2="48" />
      </g>
    </svg>
  );
};
