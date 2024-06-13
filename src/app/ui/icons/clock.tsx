export function Clock() {
  // Colored: path => stroke => greyA4
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
        stroke="none"
        strokeMiterlimit="10"
      />
      <path
        d="M8 4.5V8H11.5"
        stroke="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
