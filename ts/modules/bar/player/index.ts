const mpris = await Service.import("mpris");
import icons from "ts/utils/icons";

const { prev, play, pause, next } = icons.player;

const Player = (playerName = "playerctld") =>
  Widget.Box({
    children: [
      Widget.Button({
        className: "media nohover",
        onScrollUp: () => mpris.getPlayer(playerName)?.next(),
        onScrollDown: () => mpris.getPlayer(playerName)?.previous(),
        child: Widget.Label({
          className: "track",
          label: "-",
          truncate: "end",
          xalign: 0,
          maxWidthChars: 50,
          wrap: true,
          useMarkup: true,
        }).hook(
          mpris,
          (self) => {
            if (mpris.getPlayer(playerName)?.track_title !== "Unknown title") {
              const { track_artists, track_title } =
                mpris.getPlayer(playerName)!;
              const text =
                track_artists &&
                track_artists[0] &&
                track_artists[0] !== "Unknown artist"
                  ? `${track_artists.join(", ")} - ${track_title}`
                  : track_title;
              self.label = self.tooltip_text = text;
            } else {
              self.label = "Nothing is playing";
            }
          },
          "changed",
        ),
      }).hook(
        mpris,
        (self) => {
          if (mpris.getPlayer(playerName)?.track_title !== "Unknown title") {
            self.toggleClassName("disabled", false);
          } else {
            self.toggleClassName("disabled", true);
          }
        },
        "changed",
      ),
      Widget.Button({
        className: "media icon",
        onPrimaryClick: () => mpris.getPlayer(playerName)?.previous(),
        child: Widget.Icon(prev),
      }).hook(
        mpris,
        (self) => {
          if (mpris.getPlayer(playerName)?.can_go_prev) {
            self.toggleClassName("disabled", false);
          } else {
            self.toggleClassName("disabled", true);
          }
        },
        "changed",
      ),
      Widget.Button({
        className: "media icon",
        onPrimaryClick: () => mpris.getPlayer(playerName)?.playPause(),
        child: Widget.Icon("").hook(mpris, (self) => {
          if (mpris.getPlayer(playerName)?.play_back_status !== "Playing") {
            self.icon = play;
          } else {
            self.icon = pause;
          }
        }),
      }).hook(
        mpris,
        (self) => {
          if (mpris.getPlayer(playerName)?.can_play) {
            self.toggleClassName("disabled", false);
          } else {
            self.toggleClassName("disabled", true);
          }
        },
        "changed",
      ),
      Widget.Button({
        className: "media icon",
        onPrimaryClick: () => mpris.getPlayer(playerName)?.next(),
        //child: Widget.Icon("media-seek-forward-symbolic"),
        child: Widget.Icon(next),
      }).hook(
        mpris,
        (self) => {
          if (mpris.getPlayer(playerName)?.can_go_next) {
            self.toggleClassName("disabled", false);
          } else {
            self.toggleClassName("disabled", true);
          }
        },
        "changed",
      ),
    ],
  });

export default Player;
