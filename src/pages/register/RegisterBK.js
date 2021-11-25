import { useState, useReducer } from 'react';
import { ValidPassword } from '../../components/utilities/validation';

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: ValidPassword.test(action.val),
    };
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isValid: ValidPassword.test(state.value),
    };
  }
  return { value: '', isValid: false };
};

const Register = () => {
  const [showPasswordValidation, setShowPasswordValidation] = useState(false);
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: false,
  });

  const { isValid: passwordIsValid } = passwordState;

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' });
  };
  return;
};

export default Register;
