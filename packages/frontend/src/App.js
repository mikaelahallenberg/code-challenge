import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import RepoList from './containers/RepoList/index';
import ErrorBoundary from './components/ErrorBoundary';
import reducers from './reducers';

const store = createStore(reducers, applyMiddleware(thunk));

const CLIENT_ID = '9aa413cf2f390777bf6c';
const REDIRECT_URI = 'http://localhost:3000/';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
    };
  }

  componentDidMount() {
    const code =
      window.location.href.match(/code=(.*)/) &&
      window.location.href.match(/code=(.*)/)[1];
    if (code) {
      fetch(`http://localhost:9999/authenticate/${code}`)
        .then(res => res.json())

        .then(result => {
          this.setState({ token: result['token'] });
        })
        .catch(err => {
          this.setState({ token: null });
        });
    }
  }

  render() {
    return (
      <div>
        {this.state.token === null ? (
          <div>
            <a
              href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`}
            >
              Login
            </a>
          </div>
        ) : (
          <Provider store={store}>
            <ErrorBoundary>
              <RepoList
                token={this.state.token}
                username="mikaelahallenberg"
                loading
              />
            </ErrorBoundary>
          </Provider>
        )}
      </div>
    );
  }
}

export default App;
