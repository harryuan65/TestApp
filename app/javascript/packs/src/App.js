import React, { Component, useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import PostsPage from './pages/PostsPage';
import PostPage from './pages/PostPage/PostPage';
import SignInPage from './pages/SignInPage/SignInPage';
import classes from './App.module.scss';
import Header from './components/UI/Header/Header';
import Main from './components/UI/Main/Main';
import Footer from './components/UI/Footer/Footer';
import APIManager from './utils/APIManager';
const App = () => {
  const [author, setAuthor] = useState({});
  const PrivateRoute = ({component: Component, ...routeProps}) => {
    console.log(author.loggedIn)
    return <Route {...routeProps} render={ (props) => author.loggedIn ? <Component {...props} author={author}/> : <Redirect to="/sign_in" />} />
  }
  useEffect(() => {
    APIManager.Instance()
    .get('authors/check_login_state')
    .then(response => {
      const author = response.data;
      setAuthor(author);
    })
    .catch();
    return () => {}
  }, []);
  return (
    <BrowserRouter>
      <div className={classes.Layout}>
         <Header author={author} setAuthor={setAuthor} />
         <Main>
          <Switch>
            <Route path="/" exact component={ PostsPage }/>
            <Route path="/tag/:currentTagName" exact component={ PostsPage }/>
            <Route path="/sign_in" exact render={ (props) => <SignInPage {...props} author={author} setAuthor={setAuthor}/> }/>
            <PrivateRoute path="/post/new" exact component={ PostPage }/>
            <Route path="/post/:postId" exact render={(props) => <PostPage {...props} author={author}/>}/>
          </Switch>
          </Main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;