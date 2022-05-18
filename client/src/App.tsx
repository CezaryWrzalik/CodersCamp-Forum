import React, { FC } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import AddPostForm from './components/addPostForm/AddPostForm';
import Layout from './components/Layout';
import PostDetails from './pages/PostDetails';
import Posts from './pages/Posts';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/mainTheme';

const App: FC = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          <Layout>
            <Switch>
              <Route
                component={Posts}
                exact
                path={['/posts/:page', '/posts/ranking/:hashtag/:page']}
              />
              <Route component={PostDetails} exact path="/posts/:page/:id" />
              <Route component={AddPostForm} exact path="/add/post"/>
            </Switch>
          </Layout>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
