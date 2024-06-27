export function Loader(color: string) {
  // Colored: svg => path => stroke => orange
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 20C2 29.941 10.059 38 20 38C29.941 38 38 29.941 38 20C38 10.059 29.941 2 20 2C17.6755 2 15.454 2.4405 13.414 3.243"
        stroke={color}
        strokeWidth="4"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  );
}
