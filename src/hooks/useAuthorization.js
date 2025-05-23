// useAuthorization.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

/**
 * @returns {{
 *   username: string,
 *   password: string,
 *   usernameError: boolean,
 *   passwordError: boolean,
 *   errorText: string,
 *   handleLogin: Function,
 *   handleUsernameChange: Function,
 *   handlePasswordChange: Function
 * }}
 */
const useAuthorization = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  // Handle login
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://gateway.scan-interfax.ru/api/v1/account/login ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          login: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('tokenExpire', data.expire);
        setIsLoggedIn(true);
        navigate('/');
      } else {
        // Устанавливаем ошибку из API или дефолтную
        const errorMessage =
          data.message ||
          data.detail || 
          'Ошибка входа. Проверьте логин и пароль.';
        
        setErrorText(errorMessage);
        setUsernameError(true);
        setPasswordError(true);
      }
    } catch (error) {
      console.error('Ошибка аутентификации:', error);
      setErrorText('Не удалось подключиться к серверу. Попробуйте позже.');
      setUsernameError(true);
      setPasswordError(true);
    }
  };

  // Reset username error and clear error text
  const validateUsername = () => {
    setUsernameError(false);
    if (usernameError || errorText) {
      setErrorText('');
    }
  };

  // Reset password error and clear error text
  const validatePassword = () => {
    setPasswordError(false);
    if (passwordError || errorText) {
      setErrorText('');
    }
  };

  const handleUsernameChange = (e) => {
    const input = e.target.value;
    setUsername(input);
    validateUsername();
  };

  const handlePasswordChange = (e) => {
    const input = e.target.value;
    setPassword(input);
    validatePassword();
  };

  return {
    username,
    password,
    usernameError,
    passwordError,
    errorText,
    handleLogin,
    handleUsernameChange,
    handlePasswordChange,
  };
};

export default useAuthorization;