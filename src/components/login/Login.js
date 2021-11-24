import { useEffect, useState, useReducer, useContext, useRef } from 'react';
import styles from './Login.module.css';
import { Button, Input, ButtonGroup } from '@mui/material';
import Card from '../UI/Card';
import AuthContext from '../store/auth-context';
import { ValidPassword } from '../utilities/validation';

const usernameReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 5 };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 5 };
  }
  return { value: '', isValid: false };
};

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

const Login = (props) => {
  //const definitions
  //=========================================================

  const [formIsValid, setFormIsValid] = useState(false);
  const [showUserValidation, setShowUserValidation] = useState(false);
  const [showPasswordValidation, setShowPasswordValidation] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const rememberMeRef = useRef();
  const authCtx = useContext(AuthContext);

  const [usernameState, dispatchUsername] = useReducer(usernameReducer, {
    value: '',
    isValid: false,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: false,
  });

  const { isValid: usernameIsValid } = usernameState;
  const { isValid: passwordIsValid } = passwordState;

  //=====================================================

  //functions definitions
  //=====================================================

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(usernameIsValid && passwordIsValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [usernameIsValid, passwordIsValid]);

  const usernameChangeHandler = (event) => {
    dispatchUsername({ type: 'USER_INPUT', val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value });
  };

  const validateUsernameHandler = () => {
    dispatchUsername({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' });
  };

  const validationDisplayHandler = (elem) => {
    if (elem.target.id === 'username') {
      setShowUserValidation(true);
    }
    if (elem.target.id === 'password') {
      setShowPasswordValidation(true);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      authCtx.onLogin(
        usernameState.value,
        passwordState.value,
        rememberMeRef.current.checked
      );
    } else if (!usernameIsValid) {
      setShowUserValidation(true);
      setErrorMessage('All fields are mandatory!');
      usernameInputRef.current.focus();
    } else {
      setShowPasswordValidation(true);
    }
  };
  //=====================================================

  //return section=======================================
  //=====================================================

  return (
    <Card className={styles.card}>
      <form onSubmit={submitHandler} className={styles.form}>
        <ButtonGroup orientation='vertical' className={styles.btnGroup}>
          <h2>Hello! let's get started</h2>
          <h4>Sign in to continue.</h4>
          <div className={styles.errorDiv}>
            {errorMessage && (
              <label className={styles.error}>{errorMessage}</label>
            )}
          </div>

          <Input
            placeholder='Username'
            className={styles.input}
            onChange={usernameChangeHandler}
            onBlur={validateUsernameHandler}
            inputRef={usernameInputRef}
            error={showUserValidation && !usernameIsValid}
            onFocus={validationDisplayHandler.bind(this)}
            id='username'
          />
          <Input
            placeholder='Password'
            type='password'
            className={styles.input}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
            inputRef={passwordInputRef}
            error={showPasswordValidation && !passwordIsValid}
            onFocus={validationDisplayHandler.bind(this)}
            id='password'
          />
          <div className={styles.keepSigned}>
            <label>
              <input type='checkbox' ref={rememberMeRef} /> Remember me
            </label>
            <a href={props.forgotPassLink}>Forgot password?</a>
          </div>
          <Button type='submit' className={styles.menuBtn} variant='contained'>
            Login
          </Button>
          <div>
            {' '}
            Don't have an account? <a href={props.registerLink}>Create</a>
          </div>
        </ButtonGroup>
      </form>
    </Card>
  );
};

export default Login;
