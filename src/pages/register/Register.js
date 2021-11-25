import { useState, useReducer, useEffect } from 'react';
import styles from './Register.module.css';
import {
  ValidEmail,
  ValidPassword,
} from '../../components/utilities/validation';
import Card from '../../components/UI/Card';

const Register = () => {
  return <Card className={styles.card}></Card>;
};

export default Register;
