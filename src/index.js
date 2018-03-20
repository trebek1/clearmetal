import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Home from './components/Home';
import Containers from './components/Containers';
import Vessels from './components/Vessels';
import AssignContainers from './components/AssignContainers';
import Plans from './components/Plans';
import rootReducer from './reducers';
import './index.css';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <App>
          <Route exact path="/" component={Home} />
          <Route path="/containers" component={Containers} />
          <Route path="/vessels" component={Vessels} />
          <Route path="/assign_containers" component={AssignContainers} />
          <Route path="/plans" component={Plans} />
        </App>
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
