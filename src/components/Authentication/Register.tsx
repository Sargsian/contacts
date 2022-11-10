import classes from './Register.module.scss';
import { useRef, useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { authorize } from '../../store/reducers/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [email, setEmail] = useState('');
  const [validEmail, setValidName] = useState(false);
  const [emailFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');

  const dispatch = useAppDispatch();
  const authorized = useAppSelector((state) => state.auth.email);

  const navigate = useNavigate();

  let filledInput = {
    email: false,
    pwd: false,
    matchPwd: false,
  };

  if (email) {
    filledInput.email = true;
  }
  if (pwd) {
    filledInput.pwd = true;
  }
  if (matchPwd) {
    filledInput.matchPwd = true;
  }

  useEffect(() => {
    if (authorized) {
      navigate('/contacts', { replace: false });
    }
    emailRef.current!.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidName(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd && pwd.length !== 0;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [email, pwd, matchPwd]);

  const getUsers = async () => {
    const { data } = await axios.get('http://localhost:3004/users');
    const user = data.findIndex(
      (user: { email: string }) => user.email === email
    );
    if (user > -1) {
      setErrMsg('Пользователь уже существует');
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg('Введите правильные данные');
      return;
    }
    try {
      const noUser = await getUsers();
      if (noUser) {
        const newUser = { email: email, password: pwd };
        const response = await axios.post(
          'http://localhost:3004/users',
          newUser
        );
        localStorage.setItem('email', email);
        dispatch(authorize(response.data.email));
        setEmail('');
        setPwd('');
        navigate('/contacts', { replace: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const emailHint = <p>Введите действующий адрес электронной почты</p>;

  const pwdHint = (
    <p>
      Введите от 8 до 24 символов, включая заглавные буквы, числа и знаки
      препинания (! @ # $ %)
    </p>
  );

  const matchHint = <p>Должно соответствовать первому полю ввода пароля</p>;

  return (
    <div className={classes.wrapper}>
      <section className={classes.section}>
        <p ref={errRef} className={errMsg ? classes.errmsg : classes.offscreen}>
          {errMsg}
        </p>
        <h1>Регистрация</h1>
        <form onSubmit={handleSubmit}>
          <input
            type='email'
            className={
              (!validEmail || !email || errMsg) && filledInput.email
                ? classes.invalid
                : null
            }
            ref={emailRef}
            placeholder='Электронная почта'
            autoComplete='off'
            onChange={(e) => setEmail(e.target.value)}
            required
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          <input
            type='password'
            className={
              (!validPwd || !pwd) && filledInput.pwd ? classes.invalid : null
            }
            placeholder='Пароль'
            onChange={(e) => setPwd(e.target.value)}
            required
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <input
            type='password'
            placeholder='Повторите пороль'
            onChange={(e) => setMatchPwd(e.target.value)}
            className={
              (!validMatch || !matchPwd) && filledInput.matchPwd
                ? classes.invalid
                : null
            }
            required
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />

          <div className={classes.inputHint}>
            {(matchFocus && !validMatch && matchPwd.length > 0 && matchHint) ||
              (emailFocus && !validEmail && email.length > 0 && emailHint) ||
              (pwdFocus && !validPwd && pwd.length > 0 && pwdHint)}
          </div>

          <button
            disabled={!validEmail || !validPwd || !validMatch ? true : false}
          >
            Регистрация
          </button>
        </form>
        <p>
          Уже зарегистрированы?
          <br />
          <span className={classes.line}>
            <Link to='/'>Войти</Link>
          </span>
        </p>
      </section>
    </div>
  );
};

export default Register;
