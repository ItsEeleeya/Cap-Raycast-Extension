import { notInstalled, launch } from "./cap";

export default async function Command() {
  await launch("open-dashboard");
}
