// Chat.js
import React, { useEffect, useState } from "react";

import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from "./CustomActions";
import MapView from "react-native-maps";

const Chat = ({ navigation, route, db, isConnected }) => {
  const { user, background, userID } = route.params;
  const [messages, setMessages] = useState([]);

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

  useEffect(() => {
    navigation.setOptions({ title: user });

    const fetchData = async () => {
      if (isConnected) {
        const q = query(
          collection(db, "messages"),
          orderBy("createdAt", "desc")
        );
        const unsubMessages = onSnapshot(q, (docs) => {
          let newMessages = [];
          docs.forEach((doc) => {
            newMessages.push({
              id: doc.id,
              ...doc.data(),
              createdAt: new Date(doc.data().createdAt.toMillis()),
            });
          });
          setMessages(newMessages);
          ReactNativeAsyncStorage.setItem(
            "cachedMessages",
            JSON.stringify(newMessages)
          );
        });

        return () => {
          if (unsubMessages) unsubMessages();
        };
      } else {
        try {
          const cachedMessages = await ReactNativeAsyncStorage.getItem(
            "cachedMessages"
          );
          if (cachedMessages) {
            setMessages(JSON.parse(cachedMessages));
          }
        } catch (error) {
          console.error("Error loading cached messages:", error);
        }
      }
    };

    fetchData();
  }, [isConnected]);

  // function for all actions and menu options that are defined in the CustomActions component
  const renderCustomActions = (props) => {
    return <CustomActions userID={userID} {...props} />;
  };

  // create own custom view for rendering a map in a chat bubble
  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        // MapView component to render a map in the view.
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userID,
          username: user,
        }}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
