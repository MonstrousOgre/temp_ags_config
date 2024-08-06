import { options } from "ts/globals.js";

const Clock = () => {
  const timeFormat = options.clock.timeFormat;
  return Widget.Button({
    child: Widget.Label({
      className: "clock",
      setup: (self) =>
        self.poll(1000, (self) =>
          Utils.execAsync(["date", timeFormat]).then(
            (date) => (self.label = date),
          ),
        ),
    }),
    onPrimaryClick: () => App.toggleWindow("calendarmenu"),
  });
};

export default Clock;
