import { useState, useContext } from 'react';
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import { FirebaseError } from '@firebase/util';

import { signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

import { UserContext } from '../../contexts/user.context';

import FormInput from '../form-input/form-input.component';
import Button from '../button/buttcon.component';

import './sign-in-form.styles.scss';

const defautlFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const { setCurrentUser } = useContext(UserContext);

  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithGooglePopup();

      await createUserDocumentFromAuth({
        uid: user?.uid,
        email: user?.email,
        displayName: user?.displayName,
      });

      setCurrentUser({
        id: user?.uid,
        name: user?.displayName ?? '',
        email: user?.email ?? '',
        token: user?.refreshToken,
      });
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error(error.code, error.message);
      }
    }
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      if (!response) return;
      const { user } = response;

      setCurrentUser({
        id: user.uid,
        name: user.displayName ?? '',
        email: user.email ?? '',
        token: user.refreshToken,
      });

      resetFormFields();
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/wrong-password':
          case 'auth/user-not-found':
          case 'auth/invalid-credential':
            alert('incorrect email or password');
            break;
          default:
            console.log(error.code, error.message);
        }
      }
    }
  };

  const resetFormFields = () => {
    setFormFields(defautlFormFields);
  };

  const [formFields, setFormFields] = useState(defautlFormFields);

  const { email, password } = formFields;

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className='sign-in-container'>
      <h2>Don't have an account?</h2>
      <p>Sign up with your email and password</p>
      <form onSubmit={handleFormSubmit}>
        <FormInput
          label='Email'
          name='email'
          type='email'
          value={email}
          required
          onChange={handleFormChange}
        />

        <FormInput
          label='Password'
          name='password'
          type='password'
          value={password}
          required
          onChange={handleFormChange}
        />

        <div className='buttons-container'>
          <Button type='submit'>Sign in</Button>

          <Button type='button' onClick={signInWithGoogle} buttonType='google'>
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
