import { useEffect, useState, useReducer, useContext, useRef } from 'react';
import styles from './Login.module.css';
import { Button, Input, ButtonGroup } from '@mui/material';
import Card from '../../components/UI/Card';
import AuthContext from '../../components/store/auth-context';
import { ValidEmail } from '../../components/utilities/validation';
import { Navigate } from 'react-router-dom';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: ValidEmail.test(action.val.trim()) };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: ValidEmail.test(state.value.trim()) };
  }
  return { value: '', isValid: false };
};

const Login = (props) => {
  //const definitions
  //=========================================================

  const [formIsValid, setFormIsValid] = useState(false);
  const [showEmailValidation, setShowEmailValidation] = useState(false);
  const [showPasswordValidation, setShowPasswordValidation] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const rememberMeRef = useRef();
  const authCtx = useContext(AuthContext);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: false,
  });

  const { isValid: emailIsValid } = emailState;

  //=====================================================

  //functions definitions
  //=====================================================

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    if (event.target.value.length > 5) {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
    }
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    if (passwordInputRef.current.value.length > 5) {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
    }
  };

  const validationDisplayHandler = (elem) => {
    if (elem.target.id === 'email') {
      setShowEmailValidation(true);
    }
    if (elem.target.id === 'password') {
      setShowPasswordValidation(true);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      authCtx.onLogin(
        emailState.value,
        passwordInputRef,
        rememberMeRef.current.checked
      );
    } else if (!emailIsValid) {
      setShowEmailValidation(true);
      setErrorMessage('All fields are mandatory!');
      emailInputRef.current.focus();
    } else {
      setShowPasswordValidation(true);
      setErrorMessage('All fields are mandatory!');
      passwordInputRef.current.focus();
    }
  };

  if (authCtx.isLoggedIn) {
    return <Navigate to='/AppWrapper' />;
  }

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
            placeholder='Email'
            className={styles.input}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
            inputRef={emailInputRef}
            error={showEmailValidation && !emailIsValid}
            onFocus={validationDisplayHandler.bind(this)}
            id='email'
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
          <Button type='submit' variant='contained'>
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
