import * as icons from "./icons";

export type TIconNames =
  | "bin"
  | "calendar"
  | "clock"
  | "door"
  | "heart"
  | "heart2"
  | "loading"
  | "note"
  | "pause"
  | "play-next"
  | "play-prev"
  | "play"
  | "play2"
  | "plus"
  | "repeat"
  | "search"
  | "shuffle"
  | "sound"
  | "three-dots"
  | "user";

type TIcons = {
  [N in TIconNames]: (color: string) => React.ReactNode;
};

const iconNamesToIcons: TIcons = {
  bin: icons.Bin,
  calendar: icons.Calendar,
  clock: icons.Clock,
  door: icons.Door,
  heart: icons.Heart,
  heart2: icons.Heart2,
  loading: icons.Loader,
  note: icons.Note,
  pause: icons.Pause,
  "play-next": icons.PlayNext,
  "play-prev": icons.PlayPrev,
  play: icons.Play,
  play2: icons.Play2,
  plus: icons.Plus,
  repeat: icons.Repeat,
  search: icons.Search,
  shuffle: icons.Shuffle,
  sound: icons.Sound,
  "three-dots": icons.ThreeDots,
  user: icons.User,
};

export default function Icon({
  type,
  className,
  defaultColor,
}: {
  type: TIconNames;
  className?: string;
  defaultColor: string;
}) {
  return (
    <div className={`icon-container${className ? " " + className : ""}`}>
      {iconNamesToIcons[type](defaultColor)}
    </div>
  );
}
