import { colors } from "./ui/colors";
import Icon from "./ui/icon";

export default function Loading() {
  return (
    <div className="loading__block">
      <Icon
        className="loading__icon"
        type="loading"
        defaultColor={colors.orange}
      />
      <p className="loading__text">Loading...</p>
    </div>
  );
}
