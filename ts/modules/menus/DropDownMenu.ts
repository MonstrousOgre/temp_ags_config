const initRender = Variable(true);

setTimeout(() => {
  initRender.value = false;
}, 2000);

export default ({
  name,
  child,
  layout = "center",
  transition,
  exclusivity = "ignore" as "normal" | "ignore" | "exclusive",
  fixed = false,
  ...props
}) =>
  Widget.Window({
    name,
    class_names: [name, "dropdown-menu"],
    setup: (w) => w.keybind("Escape", () => App.closeWindow(name)),
    visible: initRender.bind("value"),
    keymode: "on-demand",
    exclusivity,
    layer: "top",
    anchor: ["top", "left"],
    child: Widget.EventBox({
      class_name: "parent-event",
      on_primary_click: () => {
        console.log("clicked parent");
        App.closeWindow(name);
      },
      on_secondary_click: () => App.closeWindow(name),
      child: Widget.Box({
        class_name: "top-eb",
        vertical: true,
        children: [
          Widget.EventBox({
            class_name: "mid-eb event-top-padding",
            hexpand: true,
            vexpand: false,
            can_focus: false,
            child: Widget.Box(),
            setup: (w) => {
              w.on("button-press-event", () => App.toggleWindow(name));
              w.set_margin_top(1);
            },
          }),
          Widget.EventBox({
            class_name: "in-eb menu-event-box",
            on_primary_click: () => {
              console.log("clicked inner");

              return true;
            },
            on_secondary_click: () => {
              return true;
            },
            setup: (self) => {
              // moveBoxToCursor(self, fixed);
            },
            child: Widget.Box({
              class_name: "dropdown-menu-container",
              css: "padding: 1px; margin: -1px;",
              child: Widget.Revealer({
                revealChild: false,
                setup: (self) =>
                  self.hook(App, (_, wname, visible) => {
                    if (wname === name) self.reveal_child = visible;
                  }),
                transition: "crossfade",
                transitionDuration: 350,
                child: Widget.Box({
                  class_name: "dropdown-menu-container",
                  can_focus: true,
                  children: [child],
                }),
              }),
            }),
          }),
        ],
      }),
    }),
    ...props,
  });
