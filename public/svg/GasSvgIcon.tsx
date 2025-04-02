
export const GasSvgIcon = ({ className }: { className?: string }): JSX.Element => {
    return (
      <svg
        className={className || "h-12 w-12 text-blue-500"}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="currentColor" strokeWidth="2" fill="none">
          <path d="M12 24h8v16h24V24h8" />
          <circle cx="32" cy="32" r="4" fill="currentColor" />
        </g>
      </svg>
    );
  };
  