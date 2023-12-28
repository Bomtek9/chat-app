import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import Start from "./components/Start.js";
import Chat from "./components/Chat.js";
import { LogBox } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Create the navigator
const Stack = createNativeStackNavigator();

// Ignore error message in Welcome Screen
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

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

// Initialize Firebase Auth with AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat auth={auth} db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
