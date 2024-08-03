import { TLicenseTypes } from "@/app/lib/definitions";
import styles from "./legal-info.module.css";
import generalStyles from "../modal.module.css";

interface ILegalInfoProps {
  onClose: () => void;
  artist: string;
  license: TLicenseTypes;
  created: string;
}

const licenseTypes = {
  "CC BY": "https://creativecommons.org/licenses/by/4.0/",
  CC0: "https://creativecommons.org/publicdomain/zero/1.0/",
  "CC BY-SA": "https://creativecommons.org/licenses/by-sa/4.0/",
  "CC BY-ND": "https://creativecommons.org/licenses/by-nd/4.0/",
};

export default function LegalInfo({
  onClose,
  artist,
  license,
  created,
}: ILegalInfoProps) {
  const year = created.split("-")[0];

  return (
    <>
      <h2 className={generalStyles.title}>Legal information</h2>
      <div className={styles.textBlock}>
        {license !== "CC0" ? (
          <span>&copy;{` ${year} ${artist} All Rights Reserved.`}</span>
        ) : (
          <span>{`${artist} has dedicated the work to the public domain.`}</span>
        )}
        <p className={styles.paragraph}>
          All materials are provided in accordance with &ldquo;Public
          license&rdquo;.
        </p>
        <p className={styles.paragraph}>
          License:{" "}
          <a className={generalStyles.switch__btn} href={licenseTypes[license]}>
            {license}
          </a>
        </p>
        <p className={styles.paragraph}>
          Disclaimer of warranty: you acknowledge that the licensed materials
          and any and all parts thereof are provided &ldquo;AS IS&rdquo;.
        </p>
        <p>Licensed materials were not modified in any way.</p>
      </div>
      <button
        aria-label="Close modal"
        onClick={onClose}
        className={generalStyles.submit__btn}
      >
        OK
      </button>
    </>
  );
}
