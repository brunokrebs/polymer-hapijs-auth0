export const ADD_ITEM_START = 'ADD_ITEM_START';
export const ADD_ITEM_FINISH = 'ADD_ITEM_FINISH';
export const ADD_ITEM_FAILED = 'ADD_ITEM_FAILED';
export const DELETE_ITEM_START = 'DELETE_ITEM_START';
export const DELETE_ITEM_FINISH = 'DELETE_ITEM_FINISH';
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const INIT_LOADING_START = 'INIT_LOADING_START';
export const INIT_LOADING_END = 'INIT_LOADING_END';

export const addItem = (item) => (dispatch) => {
  const jwt = localStorage.getItem('access_token');
  if (!jwt) return;

  dispatch({
    type: ADD_ITEM_START,
    item,
  });

  fetch(API_URL + '/todo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
    body: JSON.stringify({
      item,
    })
  }).then((response) => {
    if (response.status === 201) {
      dispatch({
        type: ADD_ITEM_FINISH,
        item,
      });
    } else {
      dispatch({
        type: ADD_ITEM_FAILED,
        item,
      });
    }
  }).catch(e => {
    dispatch({
      type: ADD_ITEM_FAILED,
      item,
    });
  });
};

export const deleteItem = (index) => (dispatch) => {
  const jwt = localStorage.getItem('access_token');
  if (!jwt) return;

  dispatch({
    type: DELETE_ITEM_START,
    index,
  });

  fetch(API_URL + '/todo', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
    body: JSON.stringify({
      index,
    })
  }).then((response) => {
    dispatch({
      type: DELETE_ITEM_FINISH,
      index
    });
  });
};

export const userLogin = (user) => (dispatch) => {
  dispatch({
    type: USER_LOGIN,
    user: user
  });
};

export const userLogout = () => (dispatch) => {
  dispatch({
    type: USER_LOGOUT
  });
};

export const getInitialData = () => (dispatch) => {
  const jwt = localStorage.getItem('access_token');
  if (!jwt) return;

  dispatch({
    type: INIT_LOADING_START
  });

  fetch(API_URL + '/todo', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${jwt}`
    },
  }).then(function (response) {
    return response.json();
  }).then((response) => {
    dispatch({
      type: INIT_LOADING_END,
      items: response.value || []
    });
  });
};
