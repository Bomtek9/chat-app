// App.js
import React, { useEffect, useState } from "react";
import { disableNetwork, enableNetwork } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { useNetInfo } from "@react-native-community/netinfo";
import Start from "./components/Start.js";
import Chat from "./components/Chat.js";
import { LogBox } from "react-native";
import { getStorage } from "firebase/storage";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Create the navigator
const Stack = createNativeStackNavigator();

// Ignore error message in Welcome Screen
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const App = () => {
  const connectionStatus = useNetInfo();
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCZmWrPIFDNB1LdnAq198HzMGoli9zWuy8",
    authDomain: "chat-app-5ff52.firebaseapp.com",
    projectId: "chat-app-5ff52",
    storageBucket: "chat-app-5ff52.appspot.com",
    messagingSenderId: "15301083737",
    appId: "1:15301083737:web:d7464de29030b1a993a748",
    measurementId: "G-CQ6NKVFDCJ",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  // Initialize Cloud Firestore Storage and get a reference to the service
  const storage = getStorage(app);

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              db={db}
              storage={storage}
              isConnected={connectionStatus.isConnected}
              {...props}
            />
          )}
          {/* Using {...props} ensures that not only the db prop but also other relevant navigation-related props are passed to the Chat component. <Stack.Screen name="Chat" component={Chat} wouldnt pass the db props */}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
