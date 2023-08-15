import {
  NativeModules,
  Platform,
  useState,
  NativeEventEmitter,
  useEffect,
} from "react-native";

const { RNAndroidPip } = NativeModules;

const enterPictureInPictureMode = () => {
  if (Platform.OS === "android") {
    RNAndroidPip.enterPictureInPictureMode();
  }
};

interface aspectRaio {
  width: number;
  height: number;
}

const configurePIPAspectRatio = ({ width, height }: aspectRaio): void => {
  if (Platform.OS === "android") {
    RNAndroidPip.configureAspectRatio(width, height);
  } else {
    console.warn("Not implemented on ios");
  }
};

const enableAutoPipSwitch = (): void => {
  if (Platform.OS === "android") {
    RNAndroidPip.enableAutoPipSwitch();
  } else {
    console.warn("Not implemented on ios");
  }
};

const disableAutoPipSwitch = (): void => {
  if (Platform.OS === "android") {
    RNAndroidPip.disableAutoPipSwitch();
  }
};

const useRNPIP = () => {
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
      console.warn("Not implemented on ios");
    }
  }, []);
  return isPIPenabled;
};

export default {
  useRNPIP,
  enterPictureInPictureMode,
  configurePIPAspectRatio,
  enableAutoPipSwitch,
  disableAutoPipSwitch,
};
