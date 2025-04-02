export const RwaSvgIcon = ({ className }: { className?: string }): JSX.Element => {
    return (
      <svg className={`${className || "h-12 w-12 text-blue-500"}`} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path d="M10 20h44v8H10zM20 28v20h4V28zM40 28v20h4V28zM24 48h16v4H24z" />
          <path d="M20 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4zM40 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4z" />
        </g>
      </svg>
    );
  };