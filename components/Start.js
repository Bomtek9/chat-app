// Importing necessary components and libraries from React and React Native
import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

// Importing the background image for the Start screen
const imgBackground = require("../assets/back_ground.png");

// Functional component for the Start screen
const Start = ({ navigation }) => {
  // State to manage user's name and selected background color
  const [name, setName] = useState("");
  const [background, setBackground] = useState("");

  // Function to navigate to the Chat screen with user's name and background color
  const signInUser = () => {
    navigation.navigate("Chat", { name, background });
  };

  // Render the main component
  return (
    <ImageBackground source={imgBackground} style={styles.image}>
      {/* Title for the app */}
      <Text style={styles.title}>Chat App</Text>

      <View style={styles.container}>
        {/* White container for user input */}
        <View style={styles.whiteContainer}>
          {/* Username input */}
          <View style={styles.inputBox}>
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder="Your Name"
            />
          </View>

          {/* Choose Background Color text */}
          <View>
            <Text style={styles.chooseBgText}>Choose Background Color</Text>

            {/* Container for color buttons */}
            <View style={styles.colorButtonBox}>
              {/* Color 1 */}
              <TouchableOpacity
                style={[
                  styles.colorButton,
                  styles.colorInput1,
                  background === "#090C08" && styles.selectedColor,
                ]}
                onPress={() => {
                  setBackground("#090C08");
                }}
              >
                {background === "#090C08" && <View style={styles.ring}></View>}
              </TouchableOpacity>

              {/* Color 2 */}
              <TouchableOpacity
                style={[
                  styles.colorButton,
                  styles.colorInput2,
                  background === "#474056" && styles.selectedColor,
                ]}
                onPress={() => {
                  setBackground("#474056");
                }}
              >
                {background === "#474056" && <View style={styles.ring}></View>}
              </TouchableOpacity>

              {/* Color 3 */}
              <TouchableOpacity
                style={[
                  styles.colorButton,
                  styles.colorInput3,
                  background === "#8A95A5" && styles.selectedColor,
                ]}
                onPress={() => {
                  setBackground("#8A95A5");
                }}
              >
                {background === "#8A95A5" && <View style={styles.ring}></View>}
              </TouchableOpacity>

              {/* Color 4 */}
              <TouchableOpacity
                style={[
                  styles.colorButton,
                  styles.colorInput4,
                  background === "#B9C6AE" && styles.selectedColor,
                ]}
                onPress={() => {
                  setBackground("#B9C6AE");
                }}
              >
                {background === "#B9C6AE" && <View style={styles.ring}></View>}
              </TouchableOpacity>
            </View>

            {/* Button to start chatting */}
            <TouchableOpacity style={styles.button} onPress={signInUser}>
              <Text style={styles.buttonText}>Start Chatting</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Adjust keyboard behavior for iOS */}
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null}
    </ImageBackground>
  );
};

// Styles for the Start component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: "space-between",
    padding: "6%",
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    alignSelf: "center",
  },
  whiteContainer: {
    backgroundColor: "#FFFFFF",
    padding: "6%",
    paddingBottom: 20,
    marginBottom: 0,
  },
  inputBox: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderWidth: 1,
    borderColor: "#757083", // Added border color
    borderRadius: 10,
    marginBottom: 20,
  },
  textInput: {
    width: "100%", // Adjusted width
    padding: 15,
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 0.5,
  },
  chooseBgText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    margin: 10,
    textAlign: "left",
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  colorButtonBox: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  colorInput1: {
    backgroundColor: "#090C08",
  },
  colorInput2: {
    backgroundColor: "#474056",
  },
  colorInput3: {
    backgroundColor: "#8A95A5",
  },
  colorInput4: {
    backgroundColor: "#B9C6AE",
  },
  ring: {
    position: "absolute",
    width: 48, // Adjust the size of the ring as needed
    height: 48, // Adjust the size of the ring as needed
    borderRadius: 24, // Make it a circle
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  button: {
    backgroundColor: "#757083",
    width: "100%",
    alignItems: "center",
    padding: 20,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

// Exporting the Start component as the default export
export default Start;
