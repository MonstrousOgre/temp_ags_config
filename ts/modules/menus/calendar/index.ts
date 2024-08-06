import DropdownMenu from "../DropDownMenu";
import { CalendarWidget } from "./calendar";

export default () => {
  return DropdownMenu({
    name: "calendarmenu",
    child: Widget.Box({
      class_name: "calendar-menu-content",
      css: "padding: 1px; margin: -1px;",
      vexpand: false,
      children: [
        Widget.Box({
          class_name: "calendar-content-container",
          vertical: true,
          children: [
            Widget.Box({
              class_name: "calendar-content-items",
              vertical: true,
              children: [CalendarWidget()],
            }),
          ],
        }),
      ],
    }),
  });
};
