import { launchCap } from "./utils";

export default async function Command() {
  await launchCap("stop-recording", {
    feedbackMessage: "Recording Stopped",
    feedbackType: "hud",
  });
}
