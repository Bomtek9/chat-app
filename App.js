import { useEffect } from "react";
import { Alert, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";
import { useNetInfo } from "@react-native-community/netinfo";
import { getStorage } from "firebase/storage";

//import the screens
import Start from "./components/Start";
import Chat from "./components/Chat";

//create the navigator
const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(["@firebase/auth: Auth"]);

const App = () => {
  const connectionStatus = useNetInfo();

  const firebaseConfig = {
    apiKey: "AIzaSyCZmWrPIFDNB1LdnAq198HzMGoli9zWuy8",
    authDomain: "chat-app-5ff52.firebaseapp.com",
    projectId: "chat-app-5ff52",
    storageBucket: "chat-app-5ff52.appspot.com",
    messagingSenderId: "15301083737",
    appId: "1:15301083737:web:d7464de29030b1a993a748",
    measurementId: "G-CQ6NKVFDCJ",
  };

  //Intialize Firebase
  const app = initializeApp(firebaseConfig);

  //Initialize Cloud Firestore and Cloud Storage and get a reference to the services
  const db = getFirestore(app);
  const storage = getStorage(app);

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome" //this name should match one of the name's listed below in the <Stack.Screen /> component
      >
        <Stack.Screen name="Welcome" component={Start} />
        <Stack.Screen
          name="Chat"
          // component={Chat}
        >
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              storage={storage}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
