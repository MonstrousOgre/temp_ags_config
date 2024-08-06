import Gtk from "types/@girs/gtk-3.0/gtk-3.0";
import { Monitor } from "types/service/hyprland";
const hyprland = await Service.import("hyprland");

export const getOptions = (
  path = `${App.configDir}/config.json`,
): ConfigOptions => {
  return JSON.parse(Utils.readFile(path));
};

export const forMonitor = (
  widget: (monitor: Monitor) => Gtk.Window,
  monitors: Monitor[] = [],
) => {
  return monitors.map((m) => widget(m));
};
