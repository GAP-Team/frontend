export const DoorSvgIcon = ({ className }: { className?: string }): JSX.Element => {
    return (
      <svg className={`${className || "h-12 w-12 text-blue-500"}`} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <g>
          <rect x="20" y="8" width="24" height="48" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="36" cy="32" r="2" fill="currentColor" />
        </g>
      </svg>
    );
  };