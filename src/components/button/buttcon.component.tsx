import './button.styles.scss';

type ButtonProps = {
  buttonType?: 'google' | 'inverted' | undefined;
  children: React.ReactNode;
  type: 'submit';
  onClick: (event: React.FormEvent<HTMLFormElement>) => void;
};

/*
default

inverted

google sign in
*/
const BUTTON_TYPE_CLASSES = {
  google: 'google-sign-in',
  inverted: 'inverted',
};

const Button = ({ children, type, buttonType }: ButtonProps) => {
  const buttonClass = buttonType && BUTTON_TYPE_CLASSES[buttonType];

  return (
    <button className={`button-container ${buttonClass}`} type={type}>
      {children}
    </button>
  );
};

export default Button;
