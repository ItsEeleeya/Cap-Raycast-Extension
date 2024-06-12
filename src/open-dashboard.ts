import { open } from "@raycast/api";
import { capNotInstalled, launchCap } from "./utils";

export default async function Command() {
  if (await capNotInstalled(false)) {
    await launchCap("open-dashboard");
    return;
  }

  open("https://cap.so/dashboard/");
}
