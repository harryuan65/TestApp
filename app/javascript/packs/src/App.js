import React from 'react';
import classes from './App.module.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PostsPage from './pages/PostsPage';
import Layout from './components/Layout/Layout';
import PostShowPage from './pages/PostShowPage';
import Hoc from './components/hoc';

const App = () => {
  return (
    <BrowserRouter>
      <Hoc>
        <Layout>
          <Switch>
            <Route path="/" exact component={ PostsPage }/>
            <Route path="/tag/:currentTagName" exact component={ PostsPage }/>
            <Route path="/post/:postId" exact component={ PostShowPage }/>
          </Switch>
        </Layout>
      </Hoc>
    </BrowserRouter>
  );
}

export default App;