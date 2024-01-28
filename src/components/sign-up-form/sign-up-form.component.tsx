import { useState } from 'react';

import FormInput from '../form-input/form-input.component';

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

    // TODO: implement createAuthUserWithEmailAndPassword method with google firebase
    const createAuthUserWithEmailAndPassword = async (
      email: String,
      passwrod: String
    ) => {};

    // TODO: implement createUserDocumentFromAuth method with google firebase
    const createUserDocumentFromAuth = async (
      authUser: any,
      additionalData: any
    ) => {};

    try {
      const user = await createAuthUserWithEmailAndPassword(email, password);
      console.log(user);

      await createUserDocumentFromAuth(user, { displayName });

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
    <div>
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

        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
