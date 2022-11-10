import classes from './Login.module.scss';
import { useRef, useState, useEffect, FormEvent } from 'react';
import axios, { AxiosError } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { authorize } from '../../store/reducers/authSlice';

const Register = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const authorized = useAppSelector((state) => state.auth.email);
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (authorized) {
      navigate('/contacts', { replace: false });
    }
    emailRef.current!.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, pwd]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.get('http://localhost:3004/users');
      const user = data.findIndex(
        (user: { email: string }) => user.email === email
      );
      if (user !== -1) {
        setEmail('');
        setPwd('');
        setSuccess(true);
        dispatch(authorize(email));
        localStorage.setItem('email', email);
        navigate('/contacts', { replace: false });
      } else {
        setErrMsg('Неверное имя пользователя или пароль');
      }
    } catch (error) {
      if (!(error as AxiosError).response) {
        setErrMsg('Ошибка сервера');
      } else {
        setErrMsg('Ошибка авторизации');
      }
      console.log(error);
    }
  };

  return (
    <div className={classes.wrapper}>
      {success ? (
        <section className={classes.section}>
          <h1>Success!</h1>
          <p>
            <Link to='contacts'>Контакты</Link>
          </p>
        </section>
      ) : (
        <section className={classes.section}>
          <p className={errMsg ? classes.errmsg : classes.offscreen}>
            {errMsg}
          </p>
          <h1>Вход</h1>
          <form onSubmit={handleSubmit}>
            <input
              className={errMsg ? classes.invalid : null}
              type='email'
              ref={emailRef}
              placeholder='Электронная почта'
              autoComplete='off'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <input
              className={errMsg ? classes.invalid : null}
              type='password'
              placeholder='Пароль'
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />

            <button>Войти</button>
          </form>
          <p>
            Нет аккаунта?
            <br />
            <span className={classes.line}>
              <Link to='signup'>Зарегистрироваться</Link>
            </span>
          </p>
        </section>
      )}
    </div>
  );
};

export default Register;
