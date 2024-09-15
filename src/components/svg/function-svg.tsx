export const AuftrafSvg = ({ className }: { className?: string }): JSX.Element => {
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
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
        <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-.5" />
        <path d="M16 4h2a2 2 0 0 1 1.73 1" />
        <path d="M18.42 9.61a2.1 2.1 0 1 1 2.97 2.97L16.95 17 13 18l.99-3.95 4.43-4.44Z" />
        <path d="M8 18h1" />
      </svg>
    </div>
  );
};
export const AngebotSvg = ({ className }: { className?: string }): JSX.Element => {
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
        <path d="M3 2v6h6"></path>
        <path d="M21 12A9 9 0 0 0 6 5.3L3 8"></path>
        <path d="M21 22v-6h-6"></path>
        <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"></path>
        <circle cx="12" cy="12" r="1"></circle>
      </svg>
    </div>
  );
};
export const SolutionSvg = ({ className }: { className?: string }): JSX.Element => {
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
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    </div>
  );
};
