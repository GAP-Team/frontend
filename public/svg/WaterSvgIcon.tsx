export const WaterSvgIcon = ({ className }: { className?: string }): JSX.Element => {
    return (
      <svg className={`${className || "h-12 w-12 text-blue-500"}`} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path d="M32 4C20 20 12 28 12 40c0 11 9 20 20 20s20-9 20-20c0-12-8-20-20-36z" fill="currentColor" />
        </g>
      </svg>
    );
  };