import { capIsNotInstalled } from "./utils";
import { open } from "@raycast/api";

export default async function Command() {
  if (await capIsNotInstalled()) {
    return;
  }
  open("caprecorder://start-recording");
}
