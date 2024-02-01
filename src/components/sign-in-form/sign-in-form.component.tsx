import { useState } from 'react';
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import { FirebaseError } from '@firebase/util';

import { UserAuth } from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button from '../button/buttcon.component';

import './sign-in-form.styles.scss';

const defautlFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithGooglePopup();

      const userAuth: UserAuth = {
        uid: user?.uid,
        email: user?.email,
        displayName: user?.displayName,
      };
      return createUserDocumentFromAuth(userAuth);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error(error.code, error.message);
      }
    }
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: implement signInWithGoogle method with google firebase
    const signInWithGoogle = async (email: String, passwrod: String) => {};

    // TODO: implement createUserDocumentFromAuth method with google firebase
    const createUserDocumentFromAuth = async (
      authUser: any,
      additionalData: any
    ) => {};

    try {
      const user = await signInWithGoogle(email, password);
      console.log(user);

      resetFormFields();
    } catch (error: unknown) {
      // TODO: implement error handling
      //
      // const { code } = error;
      // if (code === 'auth/email-already-in-use') {
      //   alert('Email already in use');
      // } else {
      //   console.log('user creation encountered an error', error);
      // }
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

          <Button onClick={signInWithGoogle} buttonType='google'>
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
