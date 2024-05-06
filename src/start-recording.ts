import { launch } from "./cap";

export default async function Command() {
  await launch("start-recording", {
    feedbackMessage: "Recording Started",
  });
}
