type BarModule =
  | "workspace"
  | "windowtitle"
  | "player"
  | "clock"
  | "idleinhibitor"
  | "systray";

type ConfigOptions = {
  bars: {
    [key: string]: {
      spacing: number;
      start?: BarModule[];
      center?: BarModule[];
      end?: BarModule[];
    };
  };
  workspaces: {
    formatIcons: {
      [key: string]: string;
    };
    persistentWorkspaces: number[];
  };
  windowtitle: {
    text: "app" | "window";
    showIcon: boolean;
    tooltipText: "app" | "window";
  };
  clock: {
    timeFormat: string;
  };
};
