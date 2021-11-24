import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  useLastNotificationResponse,
  usePermissions,
  getExpoPushTokenAsync,
} from "expo-notifications";
export default function App() {
  const notificationStatus = usePermissions({ request: true, get: true });
  const lastnotification = useLastNotificationResponse();
  useEffect(() => {
    (async () => {
      if (notificationStatus[0]?.granted) {
        const token = await getExpoPushTokenAsync({
          experienceId: "@raydeck/notitest",
        });
        console.log("I got a token", token);
      } else {
        console.log("I don't have permission");
      }
    })();
  }, [notificationStatus]);
  useEffect(() => {
    console.log("I got a notification", JSON.stringify(lastnotification));
  }, [lastnotification]);
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      {lastnotification && (
        <Text>{JSON.stringify(lastnotification, null, 2)}</Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
