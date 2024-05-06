import { launch } from "./cap";

export default async function Command() {
  await launch("stop-recording", {
    feedbackMessage: "Recording Stopped",
    feedbackType: "hud",
  });
}
