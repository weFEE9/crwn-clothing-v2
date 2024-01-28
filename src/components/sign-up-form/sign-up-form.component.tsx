import { useState } from 'react';

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
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleFormSubmit}>
        <label>Display Name</label>
        <input
          type='text'
          required
          name='displayName'
          value={displayName}
          onChange={handleFormChange}
        />

        <label>Email</label>
        <input
          type='email'
          required
          name='email'
          value={email}
          onChange={handleFormChange}
        />

        <label>Password</label>
        <input
          type='password'
          required
          name='password'
          value={password}
          onChange={handleFormChange}
        />

        <label>Confirm Password</label>
        <input
          type='password'
          required
          name='confirmPassword'
          value={confirmPassword}
          onChange={handleFormChange}
        />

        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
