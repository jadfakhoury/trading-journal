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

const Login = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [showUserValid, setShowUserValid] = useState(false);
  const [showPasswordValid, setShowPasswordValid] = useState(false);

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

  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(usernameState.value, passwordState.value);
    } else if (!usernameIsValid) {
      usernameInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  const validationDisplayHandler = (elem) => {
    if (elem.target.id === 'username') {
      setShowUserValid(true);
    }
    if (elem.target.id === 'password') {
      setShowPasswordValid(true);
    }
  };

  return (
    <Card className={styles.card}>
      <form onSubmit={submitHandler} className={styles.form}>
        <ButtonGroup orientation='vertical' className={styles.btnGroup}>
          <h2>Hello! let's get started</h2>
          <h4>Sign in to continue.</h4>
          <Input
            placeholder='Username'
            className={styles.input}
            onChange={usernameChangeHandler}
            onBlur={validateUsernameHandler}
            ref={usernameInputRef}
            error={showUserValid && !usernameIsValid}
            onFocus={validationDisplayHandler.bind(this)}
            id='username'
          />
          <Input
            placeholder='Password'
            type='password'
            className={styles.input}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
            ref={passwordInputRef}
            error={showPasswordValid && !passwordIsValid}
            onFocus={validationDisplayHandler.bind(this)}
            id='password'
          />
          <div className={styles.keepSigned}>
            <label>
              <input type='checkbox' /> Keep me signed in
            </label>
            <a href='/'>Forgot password?</a>
          </div>
          <Button type='submit' className={styles.menuBtn} variant='contained'>
            Login
          </Button>
          <div>
            {' '}
            Don't have an account? <a href='/'>Create</a>
          </div>
        </ButtonGroup>
      </form>
    </Card>
  );
};

export default Login;
