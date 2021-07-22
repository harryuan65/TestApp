import React, { useState } from 'react'
import { useHistory } from 'react-router';
import Error from '../../components/UI/Error/Error';
import APIManager from '../../utils/APIManager'
import classes from './SignInPage.module.scss';

const SignInPage = ({setAuthor}) => {
  const history = useHistory();
  const [credentials, setCredentials] = useState({});
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [ResponseError, setResponseError] = useState(null);
  const signIn = (event) => {
    event.preventDefault();

    APIManager.Instance()
      .post('/authors/sign_in', {...credentials})
      .then((response) => {
        const author = response.data;
        console.log(author);
        setAuthor(author);
        history.push('/')
      })
      .catch((err) => {
        setResponseError(err);
        console.log(err);
      })
  }
  const handleEmailChange = (email) => {
    setCredentials({...credentials, email});
  }
  const handlePasswordChange = (password) => {
    setCredentials({...credentials, password});
  }

  return (
    <div className={classes.WrapForm}>
      <form className={classes.SignInForm}>
      <h1 className={classes.Title}>Sign In</h1>
        <div className={classes.WrapInputPairs}>
        <div className={classes.InputPair}>
          <label htmlFor="email" className={emailFocused ? classes.Focused : ''}>EMAIL</label>
          <input type="email" onFocus={ ()=> setEmailFocused(true) } onBlur={ () => setEmailFocused(false) } onChange={(event) => handleEmailChange(event.target.value)}/>
        </div>
        <div className={classes.InputPair}>
          <label htmlFor="password" className={passwordFocused ? classes.Focused : ''}>PASSWORD</label>
          <input type="password"  onFocus={ ()=> setPasswordFocused(true) } onBlur={ () => setPasswordFocused(false) } onChange={(event) => handlePasswordChange(event.target.value)}/>
          </div>
        </div>
        <p style={{margin: '0', height: '30px', color: '#ff414d'}}>{ResponseError && ResponseError.response ? `錯誤：${ResponseError.response.statusText}` : null}</p>
        <button type="submit" onClick={signIn}>登入</button>
      </form>
    </div>
  )
}

export default SignInPage
