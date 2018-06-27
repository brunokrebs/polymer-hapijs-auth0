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
  user : null,
  loadingdata : false,
  loadinginitial : false,
  items : [
  ]
};


export const reducer = (state, action) => {
  if(!state) return initialState;

  switch (action.type) {

    case INIT_LOADING_START:
    {
      return Object.assign({}, state, {
        loadinginitial : true,
      });
    }
    break;

    case INIT_LOADING_END:
    {
      return Object.assign({}, state, {
        items : action.items.map((elem) => { return {name : elem, loading: false} }),
        loadinginitial : false,
      });
    }
    break;

    case ADD_ITEM_START:
    {
      let items = state.items.slice(0);
      items.unshift({
        name : action.item,
        loading: true
      })

      return Object.assign({}, state, {
        items : items,
        loadingdata : true,
      });
    }
    break;

    case ADD_ITEM_FINISH:
    {
      let items = state.items.slice(0);
      delete items[0].loading;
      return Object.assign({}, state, { items : items });
    }
    break;

    case ADD_ITEM_FAILED:
    {
      let items = state.items.slice(0,-1).shift();
      return Object.assign({}, state, { items : items });
    }
    break;

    case DELETE_ITEM_START:
    {
      let items = state.items.slice(0);
      items[action.index].deleting = true;
      return Object.assign({}, state, { items : items });
    }
    break;

    case DELETE_ITEM_FINISH:
    {
      let items = state.items.slice(0);
      items.splice(action.index,1);
      return Object.assign({}, state, { items : items });
    }
    break;

    case USER_LOGIN:
    {
      return Object.assign({}, state, { user : action.user });
    }
    break;

    case USER_LOGOUT:
    {
      return initialState;
    }
    break;

    default:

  }
}
