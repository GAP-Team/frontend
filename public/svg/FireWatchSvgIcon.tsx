export const FireWatchSvgIcon = ({ className }: { className?: string }): JSX.Element => {
  return (
    <svg
      className={className || "w-14 h-14 text-blue-600"}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <rect
          x="8"
          y="8"
          width="48"
          height="48"
          rx="4"
          ry="4"
          stroke="currentColor"
        />
        <path
          fill="currentColor"
          stroke="none"
          d="M32 46c6-4 6-10 2-16-3-4-2-8 1-12-7 3-12 9-12 16 0 4 2 8 5 10z"
        />
      </g>
    </svg>
  );
};
