import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  ImageBackground,
} from "react-native";

const imgBackground = require("../assets/back_ground.png");

const Start = ({ navigation }) => {
  const [name, setName] = useState("");

  return (
    <View style={styles.container}>
      <ImageBackground source={imgBackground} style={styles.image}>
        {/* app title: */}
        <Text style={styles.title}>Chat App</Text>

        <View style={styles.inputBox}></View>

        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder="Type your username here"
        />
        <Button
          title="Go to Chat"
          onPress={() => navigation.navigate("Chat", { name: name })}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "white",
    alignSelf: "center",
    marginBottom: 250,
  },
  inputBox: {
    // flex: 1,
    height: "44%",
    width: "88%",
    backgroundColor: "white",
    alignItems: "center",
    marginBottom: 30,
    // textAlign: "center",
    justifyContent: "space-evenly",
  },
  textInput: {
    height: "15%",
    width: "88%",
    backgroundColor: "white",
    alignItems: "center",
    marginBottom: 30,
    // textAlign: "center",
    justifyContent: "space-evenly",
  },
});

export default Start;
