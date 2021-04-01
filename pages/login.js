import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { auth, provider } from '../firebase';

const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };

  return (
    <Container>
      <head>
        <title>Login</title>
      </head>
      <LoginContainer>
        <Logo src='http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c543.png' />
        <Button onClick={signIn}>Sign in with Google</Button>
      </LoginContainer>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;
const LoginContainer = styled.div`
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 24px 14px -3px rgba(0, 0, 0, 0.7);
`;
const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 50px;
`;
