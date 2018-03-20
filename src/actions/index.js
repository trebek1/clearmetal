export const GET_CONTAINERS = 'GET_CONTAINERS';
export const SET_CONTAINERS = 'SET_CONTAINERS';
export const GET_VESSELS = 'GET_VESSELS';
export const SET_VESSELS = 'SET_VESSELS';
export const GET_PLANS = 'GET_PLANS';
export const SET_PLANS = 'SET_PLANS';
export const ERROR = 'ERROR';

function fetchData(data) {
  return fetch(`http://127.0.0.1:8000/${data}`);
}

function setData(data) {
  const url = 'http://127.0.0.1:8000/vessel_plans';
  const payload = data;
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  });
}

export function getContainers(containers) {
  return {
    type: GET_CONTAINERS,
    containers,
  };
}

export function getVessels(vessels) {
  return {
    type: GET_VESSELS,
    vessels,
  };
}

export function getPlans(plans) {
  return {
    type: GET_PLANS,
    plans,
  };
}

export function error() {
  return {
    type: ERROR,
  };
}

export function getData(data, that) {
  return function (dispatch) {
    return fetchData(data).then(response => response.json())
      .catch(error => console.error('Error:', error))
      .then((json) => {
        if (data === 'vessels') {
          that.setState({
            fetchedVessels: true,
          });
        } else if (data === 'containers') {
          that.setState({
            fetchedContainers: true,
          });
        } else if (data === 'vessel_plans') {
          that.setState({
            loaded: true,
          });
        }

        if (data === 'containers') {
          return dispatch(getContainers(json));
        } else if (data === 'vessels') {
          return dispatch(getVessels(json));
        } else if (data === 'vessel_plans') {
          return dispatch(getPlans(json));
        }
        return dispatch(error());
      });
  };
}


export function setPlan(data, that) {
  return function () {
    return setData(data)
      .then(res => res.json())
      .catch((error) => {
        that.setState({
          fail: true,
          success: false,
        });
        console.error('Error:', error); 
      })
      .then((response) => {
        that.setState({
          success: true,
          fail: false,
        });
        console.log('Success:', response);
      });
  };
}

