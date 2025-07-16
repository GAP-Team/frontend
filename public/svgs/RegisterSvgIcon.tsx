export const RegisterSvgIcon = ({
    className,
  }: {
    className?: string;
  }): JSX.Element => {
    return (
      <div className="bg-[#ffeecc] md:mr-auto rounded-full p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          color="#ffaa00"
          className={`${className || "stroke-2 h-12 w-12"}`}
        >
          {/* Kopf */}
          <circle cx="12" cy="8" r="4" />
          {/* Körper */}
          <path d="M6 20v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1" />
          {/* Plus-Symbol rechts oben */}
          <path d="M19 2v4M21 4h-4" />
        </svg>
      </div>
    );
  };
  