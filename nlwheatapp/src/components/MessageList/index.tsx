import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { api } from "../../Services/api";
import { io } from "socket.io-client";

import { MESSAGES_EXAMPLE } from '../../utils/messages';

import { Message, MessageProps } from "../Message";

import { styles } from "./styles";

let messagesQueue: MessageProps[] = MESSAGES_EXAMPLE;

const socket = io(String(api.defaults.baseURL));
socket.on('new_message', (newMessage) => {
  messagesQueue.push(newMessage);
  // console.log(newMessage);
});

export function MessageList() {
  const [ currentMessages, setCurrentMessages] = useState<MessageProps[]>([]);

  useEffect(() => {
     async function fetchMessage() {
       const messagesResponse = await api.get<MessageProps[]>('/messages/last3');
       setCurrentMessages(messagesResponse.data);
     }
     fetchMessage();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if(messagesQueue.length > 0) {
        setCurrentMessages(prevState => [
          messagesQueue[0],
          prevState[0],
          prevState[1]
        ]);
        messagesQueue.shift();
      }
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      {currentMessages.map((message) => (
        <Message key={message.id || Math.random()} data={message} />
      ))}      
    </ScrollView>
  );
}