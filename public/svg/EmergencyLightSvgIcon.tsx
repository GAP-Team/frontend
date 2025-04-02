export const EmergencyLightSvgIcon = ({ className }: { className?: string }): JSX.Element => {
    return (
      <svg className={`${className || "h-12 w-12 text-blue-500"}`} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <g>
          <rect x="16" y="20" width="32" height="24" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M32 12v-6M16 32h-6M54 32h-6M22 50l-4 4M42 50l4 4" stroke="currentColor" strokeWidth="2" />
        </g>
      </svg>
    );
  };