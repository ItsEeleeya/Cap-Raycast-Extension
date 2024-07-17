import { Action, ActionPanel, Cache, Form, Icon } from "@raycast/api";
import { useEffect, useState } from "react";
import { resolveAudioInputDevices, resolveVideoInputDevices } from "swift:../swift/cap-extension-helper";
import { launchCap } from "./utils";

const AV_LABEL_NONE = "none";
const AV_LABELS_CACHE_KEY = "av_device_labels";

type AVDeviceList = {
  audio: string[];
  video: string[];
};

export default function Command() {
  const cache = new Cache();
  const cachedDevices = cache.get(AV_LABELS_CACHE_KEY);

  const [devices, setDevices] = useState<AVDeviceList>(
    cachedDevices
      ? JSON.parse(cachedDevices)
      : {
          audio: [],
          video: [],
        },
  );
  const [isFetchingDevices, setIsFetchingDevices] = useState(true);
  const [selectedAudioDeviceLabel, setSelectedAudioDeviceLabel] = useState(AV_LABEL_NONE);
  const [selectedVideoDeviceLabel, setSelectedVideoDeviceLabel] = useState(AV_LABEL_NONE);

  useEffect(() => {
    Promise.all([resolveAudioInputDevices(), resolveVideoInputDevices()]).then(([audioDevices, videoDevices]) => {
      setIsFetchingDevices(false);
      setDevices({ audio: audioDevices, video: videoDevices });
      cache.set(
        AV_LABELS_CACHE_KEY,
        JSON.stringify({
          audio: [...audioDevices],
          video: [...videoDevices],
        }),
      );
    });
  }, []);

  return (
    <Form
      navigationTitle="Select Devices to Start Recording"
      isLoading={isFetchingDevices}
      actions={
        <ActionPanel>
          <Action.SubmitForm
            title="Start Recording"
            icon={Icon.Camera}
            onSubmit={(_) => {
              launchCap("start-recording", {
                params: {
                  mic_in_label: selectedAudioDeviceLabel,
                  vid_in_label: selectedVideoDeviceLabel,
                },
                feedbackMessage: "Launching Cap…",
              });
            }}
          />
        </ActionPanel>
      }
    >
      <Form.Dropdown
        id="selected-audio"
        title="Audio Device"
        storeValue={true}
        onChange={(device) => setSelectedAudioDeviceLabel(device)}
      >
        <Form.Dropdown.Item value={AV_LABEL_NONE} title="No Audio" key={AV_LABEL_NONE} icon={Icon.MicrophoneDisabled} />

        {devices.audio.map((device) => (
          <Form.Dropdown.Item value={device} title={device} key={device} />
        ))}
      </Form.Dropdown>

      <Form.Dropdown
        id="selected-video"
        title="Video Device"
        storeValue={true}
        onChange={(device) => setSelectedVideoDeviceLabel(device)}
      >
        <Form.Dropdown.Item value={AV_LABEL_NONE} title="No Camera" key={AV_LABEL_NONE} icon={Icon.EyeDisabled} />

        {devices.video.map((device) => (
          <Form.Dropdown.Item value={device} title={device} key={device} />
        ))}
      </Form.Dropdown>
    </Form>
  );
}
