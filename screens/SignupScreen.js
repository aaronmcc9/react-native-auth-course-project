import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { authenticate } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const context = useContext(AuthContext);

  async function signUpHandler({ email, password }) {
    try {
      setIsAuthenticating(true)
      const token = await authenticate('signUp', email, password)
      context.authenticate(token);
    }
    catch (e) {
      Alert.alert("Authentication Failed",
        "An error occurred signing up. Please try again later")
      setIsAuthenticating(false);
    }
  }
  // message = { "An error occurred creating the user"}
  if (isAuthenticating)
    return <LoadingOverlay message="Creating user..." />

  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
