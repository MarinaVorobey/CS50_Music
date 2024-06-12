import * as icons from "./icons";

export type TIconNames =
  | "calendar"
  | "clock"
  | "door"
  | "heart"
  | "note"
  | "play-next"
  | "play-prev"
  | "play"
  | "play2"
  | "plus"
  | "repeat"
  | "search"
  | "shuffle"
  | "sound"
  | "three-dots";

type TIcons = {
  [N in TIconNames]: React.ReactNode;
};

const iconNamesToIcons: TIcons = {
  calendar: icons.Calendar(),
  clock: icons.Clock(),
  door: icons.Door(),
  heart: icons.Heart(),
  note: icons.Note(),
  "play-next": icons.PlayNext(),
  "play-prev": icons.PlayPrev(),
  play: icons.Play(),
  play2: icons.Play2(),
  plus: icons.Plus(),
  repeat: icons.Repeat(),
  search: icons.Search(),
  shuffle: icons.Shuffle(),
  sound: icons.Sound(),
  "three-dots": icons.ThreeDots(),
};

export default function Icon({
  type,
  className,
}: {
  type: TIconNames;
  className?: string;
}) {
  return (
    <div className={`icon-container${className ? " " + className : ""}`}>
      {iconNamesToIcons[type]}
    </div>
  );
}
