import Widget from "resource:///com/github/Aylur/ags/widget.js";
import Variable from "resource:///com/github/Aylur/ags/variable.js";
import {
  execAsync,
  subprocess,
} from "resource:///com/github/Aylur/ags/utils.js";
import icons from "ts/utils/icons";

const inhibiting = Variable(false);

let proc;

const IdleInhibitor = () =>
  Widget.Button({
    className: inhibiting.bind().as((v) => (v ? "inhibiting" : "")),
    child: Widget.Icon(icons.idleInhibit),
    onPrimaryClick: () => {
      if (inhibiting.value) {
        proc.force_exit();
        inhibiting.value = false;
      } else {
        proc = subprocess("wayland-idle-inhibitor.py");
        inhibiting.value = true;
      }
    },
  });

export default IdleInhibitor;
