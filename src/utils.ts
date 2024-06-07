import { closeMainWindow, getApplications, Keyboard, open, showHUD, showToast, Toast } from "@raycast/api";

const CAP_BUNDLE_ID = "so.cap.desktop";
const CAP_LINK_PROTOCOL = "caprecorder://";

export async function launchCap(
  command: string,
  options?: {
    params?: Record<string, string>;
    feedbackMessage?: string;
    feedbackType?: "toast" | "hud";
  },
) {
  if (await capNotInstalled()) {
    return false;
  }

  let uri = CAP_LINK_PROTOCOL + command;
  if (options?.params) {
    uri += `?${new URLSearchParams(options.params).toString()}`;
  }
  await closeMainWindow({ clearRootSearch: true });
  open(uri);

  if (options?.feedbackMessage) {
    if (!options.feedbackType || options.feedbackType === "toast") {
      showToast({ style: Toast.Style.Success, title: options.feedbackMessage });
    } else {
      showHUD(options.feedbackMessage);
    }
  }
  return true;
}

async function capNotInstalled(showErrorToast = true) {
  const installled = (await getApplications()).filter((app) => app.bundleId === CAP_BUNDLE_ID).length >= 1;

  if (!installled && showErrorToast) {
    showToast({
      style: Toast.Style.Failure,
      title: "Cap is not installed!",
      primaryAction: {
        title: "Install Cap",
        shortcut: Keyboard.Shortcut.Common.Open,
        onAction: () => {
          open("https://cap.so/");
        },
      },
    });
  }

  return !installled;
}
