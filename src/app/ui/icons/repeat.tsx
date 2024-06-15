export function Repeat(color: string) {
  // Colored: svg => path => fill => greyAA
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 8.50001C2.13261 8.5 2.25978 8.44732 2.35355 8.35356C2.44731 8.25979 2.49999 8.13262 2.5 8.00001C2.50105 7.07207 2.87013 6.18244 3.52628 5.52629C4.18243 4.87014 5.07206 4.50106 6 4.50001H12.7929L12.1464 5.14646C12.0527 5.24024 12 5.36742 12 5.50003C12 5.63264 12.0527 5.75982 12.1465 5.85359C12.2402 5.94735 12.3674 6.00003 12.5 6.00002C12.6326 6.00002 12.7598 5.94733 12.8536 5.85356L14.3536 4.35356C14.3553 4.35188 14.3567 4.34999 14.3583 4.34828C14.3681 4.33824 14.3777 4.32792 14.3866 4.31706C14.3918 4.31065 14.3964 4.3039 14.4013 4.29731C14.4061 4.29084 14.4112 4.28453 14.4157 4.27781C14.4208 4.27015 14.4252 4.26222 14.4299 4.25438C14.4336 4.24821 14.4374 4.24223 14.4408 4.23591C14.4451 4.22797 14.4487 4.21983 14.4525 4.21174C14.4556 4.20503 14.459 4.19844 14.4618 4.19154C14.4651 4.1837 14.4677 4.1757 14.4706 4.16774C14.4732 4.16029 14.4761 4.15297 14.4784 4.14537C14.4808 4.13734 14.4826 4.12916 14.4846 4.12104C14.4865 4.11336 14.4887 4.10572 14.4903 4.09788C14.4922 4.08845 14.4933 4.0789 14.4946 4.06935C14.4956 4.06272 14.4968 4.05622 14.4975 4.04951C14.5008 4.01659 14.5008 3.98343 14.4975 3.95051C14.4968 3.9438 14.4956 3.9373 14.4946 3.93067C14.4933 3.92112 14.4922 3.91157 14.4903 3.90214C14.4887 3.8943 14.4865 3.88667 14.4846 3.87898C14.4826 3.87086 14.4808 3.86268 14.4784 3.85466C14.4761 3.84706 14.4732 3.83973 14.4706 3.83229C14.4677 3.82432 14.4651 3.81633 14.4618 3.80848C14.459 3.80159 14.4556 3.79499 14.4525 3.78828C14.4487 3.78019 14.4451 3.77204 14.4408 3.76411C14.4374 3.75779 14.4336 3.75181 14.4299 3.74565C14.4252 3.7378 14.4208 3.72987 14.4157 3.72221C14.4112 3.71549 14.4061 3.70918 14.4013 3.70271C14.3964 3.69612 14.3918 3.68937 14.3866 3.68296C14.3775 3.67189 14.3678 3.66139 14.3578 3.65113C14.3563 3.64964 14.3551 3.64796 14.3536 3.64647L12.8536 2.14647C12.7598 2.05269 12.6326 2.00001 12.5 2C12.3674 1.99999 12.2402 2.05267 12.1465 2.14643C12.0527 2.2402 12 2.36738 12 2.49999C12 2.6326 12.0527 2.75978 12.1464 2.85356L12.7929 3.50001H6C4.80694 3.50135 3.66313 3.97589 2.8195 4.81951C1.97588 5.66314 1.50134 6.80695 1.5 8.00001C1.50001 8.13262 1.55269 8.25979 1.64645 8.35356C1.74022 8.44732 1.86739 8.5 2 8.50001Z"
        fill={color}
      />
      <path
        d="M13.9999 7.5C13.8673 7.50001 13.7402 7.55269 13.6464 7.64645C13.5526 7.74022 13.5 7.86739 13.4999 8C13.4989 8.92794 13.1298 9.81757 12.4737 10.4737C11.8175 11.1299 10.9279 11.499 9.99995 11.5H3.20705L3.85352 10.8535C3.94729 10.7598 3.99996 10.6326 3.99996 10.5C3.99995 10.3674 3.94727 10.2402 3.85349 10.1464C3.75972 10.0527 3.63254 9.99998 3.49993 9.99999C3.36731 9.99999 3.24014 10.0527 3.14637 10.1465L1.64637 11.6465C1.64487 11.6479 1.64362 11.6496 1.64214 11.6511C1.63216 11.6614 1.62246 11.6719 1.61338 11.683C1.60812 11.6894 1.60352 11.6961 1.59863 11.7027C1.5938 11.7092 1.58878 11.7155 1.58428 11.7222C1.57916 11.7299 1.5747 11.7378 1.57005 11.7456C1.56638 11.7518 1.56252 11.7578 1.55914 11.7641C1.55488 11.772 1.55128 11.7802 1.54748 11.7883C1.54433 11.795 1.54096 11.8016 1.53811 11.8085C1.53486 11.8163 1.53223 11.8243 1.5294 11.8323C1.52674 11.8397 1.52387 11.847 1.52157 11.8546C1.51914 11.8627 1.51734 11.8708 1.51533 11.879C1.5134 11.8867 1.51122 11.8943 1.50967 11.9021C1.50779 11.9116 1.50663 11.9211 1.50532 11.9307C1.50439 11.9373 1.50311 11.9438 1.50245 11.9505C1.49918 11.9834 1.49918 12.0166 1.50245 12.0495C1.50311 12.0562 1.50439 12.0627 1.50532 12.0693C1.50663 12.0789 1.50779 12.0884 1.50967 12.0979C1.51122 12.1057 1.5134 12.1133 1.51533 12.121C1.51734 12.1292 1.51914 12.1373 1.52157 12.1454C1.52387 12.153 1.52674 12.1603 1.5294 12.1677C1.53223 12.1757 1.53486 12.1837 1.53811 12.1915C1.54096 12.1984 1.54433 12.205 1.54748 12.2117C1.55128 12.2198 1.55488 12.228 1.55914 12.2359C1.56252 12.2422 1.56639 12.2482 1.57005 12.2544C1.5747 12.2622 1.57915 12.2701 1.58428 12.2778C1.58878 12.2845 1.5938 12.2908 1.59863 12.2973C1.60352 12.3039 1.60812 12.3106 1.61338 12.317C1.62229 12.3279 1.63183 12.3382 1.64161 12.3483C1.64327 12.35 1.64468 12.3519 1.64637 12.3535L3.14637 13.8535C3.1928 13.9 3.24792 13.9368 3.30858 13.9619C3.36924 13.9871 3.43426 14 3.49993 14C3.56559 14 3.63061 13.9871 3.69127 13.962C3.75194 13.9368 3.80706 13.9 3.85349 13.8536C3.89993 13.8071 3.93676 13.752 3.96189 13.6914C3.98702 13.6307 3.99996 13.5657 3.99996 13.5C3.99996 13.4344 3.98703 13.3693 3.96191 13.3087C3.93678 13.248 3.89995 13.1929 3.85352 13.1465L3.20705 12.5H9.99995C11.193 12.4987 12.3368 12.0241 13.1804 11.1805C14.0241 10.3369 14.4986 9.19306 14.4999 8C14.4999 7.86739 14.4473 7.74022 14.3535 7.64645C14.2597 7.55269 14.1326 7.50001 13.9999 7.5Z"
        fill={color}
      />
    </svg>
  );
}
