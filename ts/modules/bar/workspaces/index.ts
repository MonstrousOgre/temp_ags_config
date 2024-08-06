const hyprland = await Service.import("hyprland");

import { options } from "ts/globals";
import { Monitor } from "types/service/hyprland";

const urgentWorkspaces = new Set();

const Workspaces = (monitor: Monitor) => {
  const { formatIcons, persistentWorkspaces } = options.workspaces;
  return Widget.Box({
    className: "workspaces",
    children: hyprland.bind("workspaces").as((ws) => {
      const existing = ws.map((w) => w.id);
      const arr = Array.from(new Set(existing.concat(persistentWorkspaces)));
      arr.sort((a, b) => a - b);
      return arr.map((id) =>
        Widget.Button({
          onClicked: () => hyprland.sendMessage(`dispatch workspace ${id}`),
          //child: Widget.Label(`${id}`),
          child: Widget.Label(`${formatIcons[id] ?? formatIcons.default}`),
          // className: Hyprland.active.workspace
          //   .bind("id")
          //   .transform((i) => `${i === id ? "focused" : ""} ${!existing.includes(id) ? "persistent" : ""}`),
          setup: (self) => {
            self.hook(
              hyprland,
              (_, windowaddress) => {
                if (windowaddress) {
                  const client = hyprland.getClient(windowaddress);
                  urgentWorkspaces.add(client!.workspace.id);
                }
              },
              "urgent-window",
            );

            self.hook(hyprland, (_) => {
              if (hyprland.active.workspace.id === id) {
                self.toggleClassName("focused", true);
                urgentWorkspaces.delete(id);
                self.toggleClassName("urgent", false);
              } else {
                self.toggleClassName("focused", false);
              }
              if (!existing.includes(id)) {
                self.toggleClassName("persistent", true);
              }

              if (urgentWorkspaces.has(id)) {
                self.toggleClassName("urgent", true);
              }
            });
          },
        }),
      );
    }),
  });
};

export default Workspaces;
