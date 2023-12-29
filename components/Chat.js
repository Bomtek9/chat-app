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

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
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
