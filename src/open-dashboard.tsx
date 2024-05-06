import { open } from "@raycast/api";
import { capIsNotInstalled } from "./utils";

export default async function Command() {
  if (await capIsNotInstalled()) {
    return;
  }
  open("caprecorder://open-dashboard");
}
