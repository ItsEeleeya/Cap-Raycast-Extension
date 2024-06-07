import { Action, ActionPanel, Form, Icon } from "@raycast/api";
import { useEffect, useState } from "react";
import { resolveAudioInputDevices, resolveVideoInputDevices } from "swift:../swift/cap-extension-helper";
import { launchCap } from "./utils";

export default function Command() {
  const [audioInputDevices, setAudioInputDevices] = useState<string[]>([]);
  const [videoInputDevices, setVideoInputDevices] = useState<string[]>([]);

  const [isFetchingDevices, setIsFetchingDevices] = useState(true);
  const [selectedAudioDevice, setSelectedAudioDevice] = useState<string>("none");
  const [selectedVideoDevice, setSelectedVideoDevice] = useState<string>("none");

  useEffect(() => {
    Promise.all([resolveAudioInputDevices(), resolveVideoInputDevices()]).then(([audioDevices, videoDevices]) => {
      setAudioInputDevices(audioDevices);
      setVideoInputDevices(videoDevices);
      setIsFetchingDevices(false);
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
            onSubmit={(_) =>
              launchCap("start-recording", {
                params: {
                  mic_in_label: selectedAudioDevice,
                  vid_in_label: selectedVideoDevice,
                },
                feedbackMessage: "Launching Cap…",
              })
            }
          />
        </ActionPanel>
      }
    >
      <Form.Dropdown id="selected-audio" title="Audio Device" onChange={(device) => setSelectedAudioDevice(device)}>
        <Form.Dropdown.Item value="none" title="No Audio" key={"none"} icon={Icon.MicrophoneDisabled} />

        {audioInputDevices.map((device) => (
          <Form.Dropdown.Item value={device} title={device} key={device} />
        ))}
      </Form.Dropdown>

      <Form.Dropdown id="selected-video" title="Video Device" onChange={(device) => setSelectedVideoDevice(device)}>
        <Form.Dropdown.Item value="none" title="No Camera" key={"none"} icon={Icon.CircleDisabled} />

        {videoInputDevices.map((device) => (
          <Form.Dropdown.Item value={device} title={device} key={device} />
        ))}
      </Form.Dropdown>
    </Form>
  );
}
