export const SprinklerSvgIcon = ({ className }: { className?: string }): JSX.Element => {
    return (
      <svg className={`${className || "h-12 w-12 text-blue-500"}`} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <g>
          <rect x="28" y="8" width="8" height="8" />
          <path d="M32 16v8M24 24h16M20 32h24M32 32v6M28 40v4M36 40v4" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="24" cy="50" r="2" />
          <circle cx="40" cy="50" r="2" />
        </g>
      </svg>
    );
  };