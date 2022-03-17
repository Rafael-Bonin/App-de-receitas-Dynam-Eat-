import React, { useEffect, useState } from 'react';
import './App.css';
import './Login.css';
import propTypes from 'prop-types';
// import imagem from './images/login_bg.jpg';

function Login(props) {
  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { history } = props;

  useEffect(() => {
    const SIX = 6;
    if (email.includes('@') && email.includes('.com') && password.length > SIX) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);
  return (
    <main className="login">
      <h1>
        Foods
      </h1>
      <h2>Login</h2>
      <input
        className="login_user"
        type="text"
        value={ email }
        onChange={ (e) => setEmail(e.target.value) }
        data-testid="email-input"
      />
      <h2>Password</h2>
      <input
        className="login_password"
        type="password"
        onChange={ (e) => setPassword(e.target.value) }
        value={ password }
        data-testid="password-input"
      />
      <button
        disabled={ disabled }
        onClick={ () => {
          localStorage.setItem('mealsToken', 1);
          localStorage.setItem('cocktailsToken', 1);
          const user = {
            email,
          };
          localStorage.setItem('user', JSON.stringify(user));
          history.push('/foods');
        } }
        type="button"
        data-testid="login-submit-btn"
      >
        Enter
      </button>
    </main>
  );
}

Login.propTypes = {
  history: propTypes.func.isRequired,
};

export default Login;
