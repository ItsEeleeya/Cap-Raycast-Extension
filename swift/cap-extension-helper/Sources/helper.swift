import RaycastSwiftMacros
import AVFoundation

@raycast func resolveAudioInputDevices() -> [String] {
    let audioDeviceType: AVCaptureDevice.DeviceType = if #available(macOS 14.0, *) {
        .microphone
    } else {
        .builtInMicrophone
    }
    
    let devices = AVCaptureDevice.DiscoverySession(
        deviceTypes: [
            audioDeviceType
        ],
        mediaType: .audio,
        position: .unspecified
    ).devices
    
    return devices.map { $0.localizedName }
}

@raycast func resolveVideoInputDevices() -> [String] {
    let externalVideoDeviceType: AVCaptureDevice.DeviceType = if #available(macOS 14.0, *) {
        .external
    } else {
        .externalUnknown
    }
    
    let devices = AVCaptureDevice.DiscoverySession(
        deviceTypes: [
            .builtInWideAngleCamera,
            externalVideoDeviceType
        ],
        mediaType: .video,
        position: .unspecified
    ).devices
    
    return devices.map { $0.localizedName }
}
