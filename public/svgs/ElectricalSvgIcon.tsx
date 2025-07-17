export const ElectricalSvgIcon = ({ className }: { className?: string }): JSX.Element => {
    return (
      <svg className={`${className || "h-12 w-12 text-blue-500"}`} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <g>
          <polygon points="32 4 20 36 30 36 24 60 44 28 34 28 40 4" fill="currentColor" />
        </g>
      </svg>
    );
  };