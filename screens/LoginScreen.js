import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { authenticate } from '../util/auth';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';


function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const context = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    try {
      setIsAuthenticating(true)
      const token = await authenticate('signInWithPassword', email, password)
      context.authenticate(token);

    }
    catch (e) {
      Alert.alert("Authentication Failed",
      "An error occurred logging in. Please try again later");
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating)
    return <LoadingOverlay message="Logging in..." />

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
