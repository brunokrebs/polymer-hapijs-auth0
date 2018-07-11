import {
  ADD_ITEM_START,
  ADD_ITEM_FINISH,
  ADD_ITEM_FAILED,
  DELETE_ITEM_START,
  DELETE_ITEM_FINISH,
  USER_LOGIN,
  USER_LOGOUT,
  INIT_LOADING_START,
  INIT_LOADING_END,
} from '../actions/app.js';

const initialState = {
  user: null,
  loadingdata: false,
  loadinginitial: false,
  items: [],
};

export const reducer = (state, action) => {
  if (!state) return initialState;
  let items;

  switch (action.type) {
    case INIT_LOADING_START:
      return Object.assign({}, state, {
        loadinginitial: true,
      });

    case INIT_LOADING_END:
      return Object.assign({}, state, {
        items: action.items.map((elem) => {
          return {name: elem, loading: false}
        }),
        loadinginitial: false,
      });

    case ADD_ITEM_START:
      items = state.items.slice(0);
      items.unshift({
        name: action.item,
        loading: true
      });

      return Object.assign({}, state, {
        items: items,
        loadingdata: true,
      });

    case ADD_ITEM_FINISH:
      items = state.items.slice(0);
      delete items[0].loading;
      return Object.assign({}, state, {items});

    case ADD_ITEM_FAILED:
      items = state.items.slice(0, -1).shift();
      return Object.assign({}, state, {items});

    case DELETE_ITEM_START:
      items = state.items.slice(0);
      items[action.index].deleting = true;
      return Object.assign({}, state, {items});

    case DELETE_ITEM_FINISH:
      items = state.items.slice(0);
      items.splice(action.index, 1);
      return Object.assign({}, state, {items});

    case USER_LOGIN:
      return Object.assign({}, state, {user: action.user});

    case USER_LOGOUT:
      return initialState;
  }
};
