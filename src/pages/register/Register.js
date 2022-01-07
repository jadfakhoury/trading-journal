import { useState, useReducer, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Input, ButtonGroup, Select, MenuItem, Button } from '@mui/material';
import InputAdornment from '@material-ui/core/InputAdornment';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import styles from './Register.module.css';
import {
  ValidEmail,
  ValidPassword,
} from '../../components/utilities/validation';
import Card from '../../components/UI/Card';

const DUMMY_COUNTRIES = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
];

//=====================================================
//Reducers Section
//=====================================================
const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: ValidEmail.test(action.val.trim()) };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: ValidEmail.test(state.value.trim()) };
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

const confirmPasswordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: action.val.confPass === action.val.pass,
    };
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isValid: action.val.confPass === action.val.pass,
    };
  }
  return { value: '', isValid: false };
};

//=====================================================
//Main Component Section
//=====================================================

const Register = (props) => {
  //=====================================================
  //useState Init Section
  //=====================================================
  const [formIsValid, setFormIsValid] = useState(false);
  const [usernameIsValid, setUsernameIsValid] = useState(false);
  const [showPasswordValidation, setShowPasswordValidation] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showEmailValidation, setShowEmailValidation] = useState(false);
  const [showUsernameValidation, setShowUsernameValidation] = useState(false);
  const [showConfirmPasswordValidation, setShowConfirmPasswordValidation] =
    useState(false);

  //=====================================================
  //useReducer Init Section
  //=====================================================

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: false,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: false,
  });

  const [confirmPasswordState, dispatchConfirmPassword] = useReducer(
    confirmPasswordReducer,
    {
      value: '',
      isValid: false,
    }
  );

  //=====================================================
  //Is Valid Section
  //=====================================================
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  const { isValid: confirmPasswordIsValid } = confirmPasswordState;

  //=====================================================
  //Input Ref Section
  //=====================================================
  const emailInputRef = useRef();
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  //=====================================================
  //useEffect Section
  //=====================================================

  //TODO: create the db call to verify user
  const userIsAvailable = useCallback((user) => {}, []);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        emailIsValid &&
          passwordIsValid &&
          usernameIsValid &&
          confirmPasswordIsValid
      );
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid, usernameIsValid, confirmPasswordIsValid]);

  useEffect(() => {
    const identifier = setTimeout(() => {
      userIsAvailable(usernameInputRef.current.value);
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [usernameInputRef, userIsAvailable]);

  //=====================================================
  //Change Handler Section
  //=====================================================
  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value });
  };
  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
  };

  const confirmPasswordChangeHandler = (event) => {
    dispatchConfirmPassword({
      type: 'USER_INPUT',
      val: {
        pass: passwordInputRef.current.value,
        confPass: event.target.value,
      },
    });
  };

  //=====================================================
  //Validate Handler Section
  //=====================================================
  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' });
  };
  const validateEmailHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' });
  };

  //TODO: to be done
  const validateUsernameHandler = () => {
    setUsernameIsValid(true);
  };

  const validateConfirmPasswordHandler = () => {
    dispatchConfirmPassword({
      type: 'INPUT_BLUR',
      val: {
        pass: passwordInputRef.current.value,
        confPass: confirmPasswordInputRef.current.value,
      },
    });
  };

  const validationDisplayHandler = (elem) => {
    if (elem.target.id === 'username') {
      setShowUsernameValidation(true);
    }
    if (elem.target.id === 'email') {
      setShowEmailValidation(true);
    }
    if (elem.target.id === 'password') {
      setShowPasswordValidation(true);
    }
    if (elem.target.id === 'password') {
      setShowPasswordValidation(true);
    }
    if (elem.target.id === 'confirmPassword') {
      setShowConfirmPasswordValidation(true);
    }
  };

  //=====================================================
  //Submit Handler Section
  //=====================================================
  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
    }
  };

  return (
    <Card className={styles.card}>
      <form onSubmit={submitHandler} className={styles.form}>
        <ButtonGroup className={styles.btnGroup} orientation='vertical'>
          <h1>Trading Journal</h1>
          <h4 className={styles.h}>New Here?</h4>
          <h5>Signing up is easy. It only takes a few steps</h5>
          <div className={styles.errorDiv}>
            {errorMessage && (
              <label className={styles.error}>{errorMessage}</label>
            )}
          </div>
          <Input
            placeholder='Username'
            className={styles.input}
            onBlur={validateUsernameHandler}
            inputRef={usernameInputRef}
            error={showUsernameValidation && !usernameIsValid}
            onFocus={validationDisplayHandler.bind(this)}
            id='username'
            endAdornment={
              usernameIsValid && (
                <InputAdornment position='start'>
                  <CheckTwoToneIcon color='success' />
                </InputAdornment>
              )
            }
          />
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
          {/* TODO: Create the proper validation for the country droplist */}
          <Select
            variant='standard'
            displayEmpty
            className={styles.select}
            label='Age'
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem disabled>
              <em className={styles.em}>Country</em>
            </MenuItem>
            {DUMMY_COUNTRIES.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
          <Input
            type='password'
            placeholder='Password'
            className={styles.input}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
            inputRef={passwordInputRef}
            error={showPasswordValidation && !passwordIsValid}
            onFocus={validationDisplayHandler.bind(this)}
            id='password'
          />
          <Input
            type='password'
            placeholder='Confirm Password'
            className={styles.input}
            onChange={confirmPasswordChangeHandler}
            onBlur={validateConfirmPasswordHandler}
            inputRef={confirmPasswordInputRef}
            error={showConfirmPasswordValidation && !confirmPasswordIsValid}
            onFocus={validationDisplayHandler.bind(this)}
            id='confirmPassword'
          />
          <Button type='submit' className={styles.menuBtn} variant='contained'>
            Register
          </Button>

          <div className={styles.link}>
            {' '}
            Already have an account? <Link to='/login'>Login</Link>
          </div>
        </ButtonGroup>
      </form>
    </Card>
  );
};

export default Register;
