export const BmaSvgIcon = ({ className }: { className?: string }): JSX.Element => {
    return (
      <svg className={`${className || "h-12 w-12 text-blue-500"}`} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path d="M8 10h48v8H8zM12 20h40v34H12zM26 28h12v2H26zM26 34h12v2H26z" />
          <circle cx="32" cy="48" r="4" />
        </g>
      </svg>
    );
  };