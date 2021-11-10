import { useEffect, useState } from "react";
import io from "socket.io-client";
import { api } from "../../services/api";
import styles from "./styles.module.scss";

import logoImage from "../../assets/logo.svg";

interface Message {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  };
}
// Criando Fila de Menssagens
const messagesQueue: Message[] = [];

const socket = io("http://localhost:3333");

socket.on("new_message", (newMessage: Message) => {
  messagesQueue.push(newMessage);
});
/////////////////////////////////////

export function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);

  // Continuando Fila de Messagens
  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        // Colocando a primera messagem na fila a messagem mais antiga
        setMessages((prevState) =>
          [messagesQueue[0], prevState[0], prevState[1]].filter(Boolean)
        );
        // Esse Filtro remove valores que são falses(undefinde, null)

        messagesQueue.shift();
      }
    }, 3000);
  }, []);

  useEffect(() => {
    api.get<Message[]>("messages/last3").then((response) => {
      setMessages(response.data);
    });
  }, []);

  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImage} alt="DoWhile 2021" />

      <ul className={styles.messageList}>
        {messages.map((message) => (
          <li key={message.id} className={styles.message}>
            <p className={styles.messageContent}>{message.text}</p>
            <div className={styles.messageUser}>
              <div className={styles.userImage}>
                <img src={message.user.avatar_url} alt={message.user.name} />
              </div>
              <span>{message.user.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
