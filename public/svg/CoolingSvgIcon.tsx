export const CoolingSvgIcon = ({ className }: { className?: string }): JSX.Element => {
    return (
      <svg className={`${className || "h-12 w-12 text-blue-500"}`} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path d="M32 12v40M12 32h40M20 20l24 24M44 20L20 44" stroke="currentColor" strokeWidth="2" />
          <circle cx="32" cy="32" r="4" fill="currentColor" />
        </g>
      </svg>
    );
  };