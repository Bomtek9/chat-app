// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import Start from "./components/Start.js";
import Chat from "./components/Chat.js";
import { LogBox } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  // ignores error Message in Welcome Screen
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
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat db={db} {...props} />}
          {/* Using {...props} ensures that not only the db prop but also other relevant navigation-related props are passed to the Chat component. <Stack.Screen name="Chat" component={Chat} wouldnt pass the db props */}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
