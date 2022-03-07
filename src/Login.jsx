import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

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
    <>
      <input
        type="text"
        value={ email }
        onChange={ (e) => setEmail(e.target.value) }
        data-testid="email-input"
      />
      <input
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
    </>
  );
}

Login.propTypes = {
  history: propTypes.func.isRequired,
};

export default Login;
