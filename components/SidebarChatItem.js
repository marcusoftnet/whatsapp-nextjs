import { Avatar } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import { auth, db } from '../firebase';
import getRecipientEmail from '../utils/getRecipientEmail';

const SidebarChatItem = ({ id, users }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const recipientEmail = getRecipientEmail(users, user);
  const [recipientSnapshot] = useCollection(
    db.collection('users').where('email', '==', recipientEmail)
  );

  const recipient = recipientSnapshot?.docs?.[0]?.data();

  const enterChat = () => router.push(`/chat/${id}`);

  return (
    <Container onClick={enterChat}>
      {recipient ? (
        <UserAvatar src={recipient.photoURL} />
      ) : (
        <UserAvatar>{recipientEmail[0].toUpperCase()}</UserAvatar>
      )}
      <p>{recipientEmail}</p>
    </Container>
  );
};

export default SidebarChatItem;

const Container = styled.div`
  display: flex;
  align-items: center;
  word-break: break-word;
  cursor: pointer;
  padding: 15px;

  :hover {
    background-color: #e9eaeb;
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
