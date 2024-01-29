import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/buttcon.component';

import './sign-up-form.styles.scss';

const defautlFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // TODO: implement signInAuthUserWithEmailAndPassword method with google firebase
    const signInAuthUserWithEmailAndPassword = async (
      email: String,
      password: String
    ) => {};

    try {
      const user = await signInAuthUserWithEmailAndPassword(email, password);
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

        <Button onClick={handleFormSubmit} type='submit'>
          Sign UP
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
