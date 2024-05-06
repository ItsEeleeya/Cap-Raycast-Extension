import { getApplications, Keyboard, open, showToast, Toast } from "@raycast/api";

const CAP_BUNDLE_ID = "so.cap.desktop";

export async function capIsNotInstalled(showErrorToast = true) {
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
