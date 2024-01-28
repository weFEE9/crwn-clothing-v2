import { useState } from 'react';

const defautlFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const onSingUpFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {};

  const [formFields, setFormFields] = useState(defautlFormFields);

  const { displayName, email, password, confirmPassword } = formFields;

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={onSingUpFormSubmit}>
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
