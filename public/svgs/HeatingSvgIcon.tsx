export const HeatingSvgIcon = ({ className }: { className?: string }): JSX.Element => {
    return (
      <svg
        className={className || "w-14 h-14 text-blue-500"}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="currentColor">
          <rect
            x="12"
            y="12"
            width="40"
            height="40"
            rx="4"
            ry="4"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <line x1="22" y1="18" x2="22" y2="46" stroke="currentColor" strokeWidth="2" />
          <line x1="32" y1="18" x2="32" y2="46" stroke="currentColor" strokeWidth="2" />
          <line x1="42" y1="18" x2="42" y2="46" stroke="currentColor" strokeWidth="2" />
        </g>
      </svg>
    );
  };