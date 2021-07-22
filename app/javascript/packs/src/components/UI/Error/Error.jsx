import React from 'react'
import classes from './Error.module.scss';
import MySadComputer from '../../../assets/images/BrokenSad.png';
import Cactus404 from '../../../assets/images/404_cactus.png';
import { useHistory } from 'react-router';

const Error = ({error}) => {
  const { response }  = error;
  const history = useHistory();
  const { status, statusText } = response;
  const is404 = status === 404;

  let errorTitle = '';
  let errorMessage = error.message;
  let image = null;
  let extraImageStyle = {};
  switch(true)  {
    case is404:
      image = Cactus404;
      extraImageStyle =  { height: '30vh' };
      errorTitle = statusText;
      break;
      case status >= 400 && status < 500:
      case status >= 500:
        image = MySadComputer;
        errorTitle = "Oops! 好像有東西壞掉了，一定是哈利在玩耍導致的。";
    default:
  }
  return (
    <div className={classes.WrapError}>
      <img src={image} style={ extraImageStyle }/>
      <h1 className={classes.ErrorTitle}>{errorTitle}</h1>
      <p>{errorMessage}</p>
      <button className={[classes.btn, classes.primary].join(' ')} style={{marginBottom: '20px'}} onClick={() => history.push('/') }>回首頁</button>
    </div>
  )
}

export default Error
;