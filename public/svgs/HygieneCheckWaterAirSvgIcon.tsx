export const HygieneCheckWaterAirSvgIcon = ({ className }: { className?: string }): JSX.Element => {
  return (
    <svg
       className={`${className || "w-14 h-14 text-blue-600"}`}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeWidth="2" fill="none">
        <rect x="10" y="10" width="44" height="44" rx="6" />

        {/* Water drop */}
        <path
          d="M24 30c0-4 4-8 4-8s4 4 4 8-2 6-4 6-4-2-4-6z"
          fill="currentColor"
          stroke="none"
        />

        {/* Ventilation swirl */}
        <path
          d="M40 28c-2-2-5-2-6 0s1 4 3 4 3 2 2 3-3 1-4-1"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};
