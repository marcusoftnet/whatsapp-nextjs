import { Avatar, Button, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import * as EmailValidator from 'email-validator';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import { auth, db } from '../firebase';
import SidebarChatItem from './SidebarChatItem';

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection('chats')
    .where('users', 'array-contains', user.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt(
      'Please enter an email for the user you which to chat with'
    );

    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      input !== user.email &&
      !chatAlreadyExists(input)
    ) {
      db.collection('chats').add({
        users: [user.email, input],
      });
    }
  };

  const chatAlreadyExists = (recpientEmail) => {
    const result = chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recpientEmail)?.length > 0
    );

    return !!result;
  };

  return (
    <SidebarContainer>
      <Header>
        <UserAvatar
          src={user.photoURL}
          onClick={() => {
            auth.signOut();
          }}
        />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>
      <SearchContainer>
        <SearchIcon />
        <SearchInput placeholder='Search in chats...' />
      </SearchContainer>
      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

      {chatsSnapshot?.docs.map((chat) => (
        <SidebarChatItem key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  flex: 0.45;
  border-right: 1px solid whitesmoke;
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  --ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /*Firefox */
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  justify-content: space-between;
  align-items: center;
  top: 0;
  background-color: white;
  z-index: 1;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div``;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;

const SidebarButton = styled(Button)`
  width: 100%;

  &&& {
    // increaes the priority of these rules
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;
