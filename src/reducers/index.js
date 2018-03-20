import { combineReducers } from 'redux';
import { GET_CONTAINERS, GET_VESSELS, GET_PLANS } from '../actions';

export function containers(state = [], action) {
  switch (action.type) {
    case GET_CONTAINERS:
      return action.containers;
    default:
      return state;
  }
}

export function vessels(state = [], action) {
  switch (action.type) {
    case GET_VESSELS:
      return action.vessels;
    default:
      return state;
  }
}

export function plans(state = [], action) {
  switch (action.type) {
    case GET_PLANS:
      return action.plans;
    default:
      return state;
  }
}

export default combineReducers({ containers, vessels, plans });
