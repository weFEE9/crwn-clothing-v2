import './form-input.styles.scss';

type FormInputProps = {
  label: string;
  name: string;
  type: string;
  value: string;
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FormInput = ({ label, ...otherProps }: FormInputProps) => {
  return (
    <div className='group'>
      <input className='form-input' {...otherProps} />
      {label && (
        <label
          className={`${
            otherProps.value.length ? 'shrink' : ''
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
