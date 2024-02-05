import { useState, useContext } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/buttcon.component';

import { UserContext } from '../../contexts/user.context';

import {
  createUserAuthWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import { FirebaseError } from '@firebase/util';

import './sign-up-form.styles.scss';

const defautlFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const { setCurrentUser } = useContext(UserContext);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await createUserAuthWithEmailAndPassword(
        email,
        password
      );
      if (!response) return;

      const { user } = response;
      await createUserDocumentFromAuth({ ...user, displayName }); // Pass the user object as an argument

      setCurrentUser({
        id: user.uid,
        name: user.displayName ?? '',
        email: user.email ?? '',
        token: user.refreshToken,
      });

      resetFormFields();
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error(error.code, error.message);
      }
    }
  };

  const resetFormFields = () => {
    setFormFields(defautlFormFields);
  };

  const [formFields, setFormFields] = useState(defautlFormFields);

  const { displayName, email, password, confirmPassword } = formFields;

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <p>Sign up with your email and password</p>
      <form onSubmit={handleFormSubmit}>
        <FormInput
          label='Display Name'
          name='displayName'
          type='text'
          value={displayName}
          required
          onChange={handleFormChange}
        />

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

        <FormInput
          label='Confirm Password'
          name='confirmPassword'
          type='password'
          value={confirmPassword}
          required
          onChange={handleFormChange}
        />

        <Button type='submit'>Sign UP</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
