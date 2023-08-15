import { NativeModules, Platform, NativeEventEmitter } from "react-native";

import { useState, useEffect } from "react";

const { RNAndroidPip } = NativeModules;

const warningmsg = "PIP not available on ios";

export const enterPictureInPictureMode = () => {
  if (Platform.OS === "android") {
    RNAndroidPip.enterPictureInPictureMode();
  }
};

interface aspectRaio {
  width: number;
  height: number;
}

export const configurePIPAspectRatio = ({
  width,
  height,
}: aspectRaio): void => {
  if (Platform.OS === "android") {
    RNAndroidPip.configureAspectRatio(width, height);
  } else {
    console.warn(warningmsg);
  }
};

export const enableAutoPipSwitch = (): void => {
  if (Platform.OS === "android") {
    RNAndroidPip.enableAutoPipSwitch();
  } else {
    console.warn(warningmsg);
  }
};

export const disableAutoPipSwitch = (): void => {
  if (Platform.OS === "android") {
    RNAndroidPip.disableAutoPipSwitch();
  }
};

export const useRNPIP = () => {
  const [isPIPenabled, setPIPenabled] = useState(false);
  useEffect(() => {
    if (Platform.OS === "android") {
      RNAndroidPip.startModeChangeListener();
      const eventEmitter = new NativeEventEmitter(RNAndroidPip);
      const listener = eventEmitter.addListener(
        "onPictureInPictureModeChanged",
        (event) => {
          setPIPenabled(event.isInPiPMode);
        }
      );
      return () => {
        listener.remove();
      };
    } else {
      console.warn(warningmsg);
    }
    return;
  }, []);
  return isPIPenabled;
};
