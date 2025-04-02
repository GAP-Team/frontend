export const VentilationSvgIcon = ({ className }: { className?: string }): JSX.Element => {
    return (
      <svg
        className={`${className || "h-16 w-16 text-blue-500"}`}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="currentColor" strokeWidth="2" fill="none">
          <rect x="18" y="18" width="28" height="28" rx="2" />
          <circle cx="32" cy="32" r="6" fill="currentColor" />
          <path d="M32 26v-4M32 42v-4M26 32h-4M42 32h-4" />
          <path d="M28 28l-2-2M36 36l2 2M36 28l2-2M28 36l-2 2" />
        </g>
      </svg>
    );
  };