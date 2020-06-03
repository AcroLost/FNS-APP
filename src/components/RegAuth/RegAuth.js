import React, { useState } from 'react';
import { Button, Input, Form } from 'antd';
import './RegAuth.scss';
import fire from '../../firebase';
import { Route, NavLink } from 'react-router-dom';

const RegAuth = ({ history }) => {
  const [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [repeatPassword, setRepeatPassword] = useState('');

  const registrationUser = () => {
    if (password === repeatPassword) {
      fire.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          history.push('/home');
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      alert('Пароли не совпадают');
    }
  }

  const signIn = () => {
    fire.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push('/home');
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div className="registration">
      <p>
        <NavLink to="/sign/login">Войти</NavLink> | <NavLink to="/sign/registration">Регистрация</NavLink>
      </p>
      <Route path='/sign/registration' render={() => {
        return <div>
          <p className="registration__title">Регистрация</p>
          <Form className="registration__form">
            <Input onChange={event => setEmail(event.target.value)} placeholder="Введите email" />
            <Input onChange={event => setPassword(event.target.value)} className="registration__password" placeholder="Введите пароль" />
            <Input onChange={event => setRepeatPassword(event.target.value)} className="registration__password" placeholder="Повторите пароль" />
            <Button onClick={registrationUser} className="registration__button" type="primary">Зарегистрироваться</Button>
          </Form>
        </div>
      }} />
      <Route path='/sign/login' render={() => {
        return <div>
          <p className="registration__title">Авторизация</p>
          <Form className="registration__form">
            <Input onChange={event => setEmail(event.target.value)} placeholder="Введите email" />
            <Input onChange={event => setPassword(event.target.value)} className="registration__password" placeholder="Введите пароль" />
            <Button onClick={signIn} className="registration__button" type="primary">Войти</Button>
          </Form>
        </div>
      }} />
    </div>
  );
}

export default RegAuth;