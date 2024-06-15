export function Sound(color: string) {
  // Colored: svg => path => stroke => greyAA
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 10.5H2C1.86739 10.5 1.74021 10.4473 1.64645 10.3536C1.55268 10.2598 1.5 10.1326 1.5 10V6C1.5 5.86739 1.55268 5.74021 1.64645 5.64645C1.74021 5.55268 1.86739 5.5 2 5.5H5L9.5 2V14L5 10.5Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 5.5V10.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9124 6.58582C12.0981 6.77153 12.2454 6.99201 12.3459 7.23466C12.4464 7.47731 12.4981 7.73739 12.4981 8.00003C12.4981 8.26267 12.4464 8.52274 12.3459 8.7654C12.2454 9.00805 12.0981 9.22853 11.9124 9.41424"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
