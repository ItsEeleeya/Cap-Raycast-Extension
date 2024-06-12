import { open } from "@raycast/api";
import { capNotInstalled, launchCap } from "./utils";

export default async function Command() {
  if (await capNotInstalled(false)) {
    open("https://cap.so/dashboard/");
    return;
  }

  await launchCap("open-dashboard");
}
