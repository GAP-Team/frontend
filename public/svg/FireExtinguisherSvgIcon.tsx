export const FireExtinguisherSvgIcon = ({ className }: { className?: string }): JSX.Element => {
  return (
    <svg
      className={className || "w-14 h-14 text-blue-500"}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeWidth="2" fill="none">
        {/* Body of extinguisher */}
        <rect x="22" y="18" width="20" height="32" rx="4" />
        
        {/* Handle */}
        <line x1="32" y1="14" x2="32" y2="18" />
        <line x1="26" y1="14" x2="38" y2="14" />
        
        {/* Hose/nozzle */}
        <path d="M42 22 Q48 20, 50 26" />
        <line x1="42" y1="22" x2="42" y2="26" />
      </g>
      <path
        fill="currentColor"
        d="M46 30c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z"
      />
    </svg>
  );
};
