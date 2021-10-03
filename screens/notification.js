import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function registerForPushNotificationsAsync() {
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    const bearer = await AsyncStorage.getItem("id_token").then((res) => {
      return res;
    });
    const expoPushToken = await Notifications.getExpoPushTokenAsync();
    return fetch("http://192.168.1.124:3000/api/user/send-notifications", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        expoPushToken,
      }),
    });
  } else {
    alert("Must use physical device for Push Notifications");
  }
  //   if (Platform.OS === "ios") {
  Notifications.setNotificationChannelAsync({
    name: "default",
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: "#FF231F7C",
    sound: "notification_sound.wav",
  });

  //   }
}
export default registerForPushNotificationsAsync;
