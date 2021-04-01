import firebase from 'firebase';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../components/Loading';
import { auth, db } from '../firebase';
import '../styles/globals.css';
import Login from './login';

const MyApp = ({ Component, pageProps }) => {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      db.collection('users').doc(user.uid).set(
        {
          email: user.email,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          photoURL: user.photoURL,
          displayName: user.displayName,
        },
        {
          merge: true,
        }
      );
    }
  }, [user]);

  if (loading) return <Loading />;

  if (!user) return <Login />;

  return <Component {...pageProps} />;
};

export default MyApp;
