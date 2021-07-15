import React from 'react';
import './App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PostsPage from './pages/PostsPage';
import Layout from './components/Layout/Layout';
import PostEditPage from './pages/PostEditPage/PostEditPage';
import Hoc from './components/hoc';
import PostPage from './pages/PostPage/PostPage';

const App = () => {
  return (
    <BrowserRouter>
      <Hoc>
        <Layout>
          <Switch>
            <Route path="/" exact component={ PostsPage }/>
            <Route path="/tag/:currentTagName" exact component={ PostsPage }/>
            <Route path="/post/:postId" exact component={ PostPage }/>
            <Route path="/post/:postId/edit" exact component={ PostEditPage }/>
          </Switch>
        </Layout>
      </Hoc>
    </BrowserRouter>
  );
}

export default App;