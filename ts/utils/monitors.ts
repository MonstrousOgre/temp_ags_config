import { options } from "ts/globals";
const hyprland = await Service.import("hyprland");

export const getMonitorsForBar = () => {
  return hyprland.monitors.filter((m) => options.bars[m.name]);
};
