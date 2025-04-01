export const AufzugSvgIcon = ({ className }: { className?: string }): JSX.Element => {
    return (
      <svg
        className={`${className || "h-12 w-12 text-blue-500"}`}
        viewBox="0 0 510 510"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path d="m405 60v-60h-300v60h-75v450h450v-450zm-270-30h240v30h-240zm150 60v390h-60v-390zm-225 0h45 90v390h-135zm390 390h-135v-390h90 45z"></path>
          <path d="m151.248 251.233-24.496-17.32-36.123 51.087 36.123 51.087 24.496-17.32-23.877-33.767z"></path>
          <path d="m358.753 251.233 23.876 33.767-23.876 33.767 24.494 17.32 36.124-51.087-36.124-51.087z"></path>
        </g>
      </svg>
    );
  };