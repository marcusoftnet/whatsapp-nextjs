import Head from 'next/head';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import ChatScreen from '../../components/ChatScreen';
import Sidebar from '../../components/Sidebar';
import { auth, db } from '../../firebase';
import getRecipientEmail from '../../utils/getRecipientEmail';

const ChatPage = ({ chat, messages }) => {
  const [user] = useAuthState(auth);

  const recipientEmail = getRecipientEmail(chat.users, user);
  return (
    <Container>
      <Head>
        <title>Chat with {recipientEmail}</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen messages={messages} chat={chat} />
      </ChatContainer>
    </Container>
  );
};

export default ChatPage;

export async function getServerSideProps(context) {
  const chatRef = db.collection('chats').doc(context.query.id);
  const messagesRef = await chatRef
    .collection('messages')
    .orderBy('timestamp', 'asc')
    .get();

  const messages = messagesRef.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((message) => ({
      ...message,
      timestamp: message.timestamp.toDate().getTime(),
    }));

  const chatRes = await chatRef.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}

const Container = styled.div`
  display: flex;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }

  --ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /*Firefox */
`;
