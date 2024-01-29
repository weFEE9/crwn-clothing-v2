import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const Authentication = () => {
  const logGoogleUser = async () => {
    console.log('log in with google');

    // TODO: implement signInWithGoogle method
    const signInWithGoogle = async () => {};
    const response = await signInWithGoogle();
    console.log(response);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign In with Google</button>

      <SignUpForm />
    </div>
  );
};

export default Authentication;
