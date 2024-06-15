import Link from "next/link";
import Image from "next/image";
import { lobster } from "../../fonts";

export default function Logo() {
  return (
    <Link href="#" className={`header__logo ${lobster.className}`}>
      <Image
        src="/logo.png"
        alt="Solar_Music logo as a link to main page"
        width={50}
        height={50}
        className="logo__img"
      />
      <span className="logo__text">Solar_Music</span>
    </Link>
  );
}
