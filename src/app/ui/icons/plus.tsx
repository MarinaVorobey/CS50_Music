export function Plus(color: string) {
  // Colored: svg => circle => fill => greyC4
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="25" cy="25" r="25" fill={color} />
    </svg>
  );
}
