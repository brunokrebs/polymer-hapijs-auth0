import {LitElement, html} from '@polymer/lit-element';
import {connect} from 'pwa-helpers/connect-mixin.js';
import {store} from '../store.js';
import './my-list.js';
import './auth0-login.js';

import {
  addItem,
  deleteItem,
  userLogin,
  userLogout,
  getInitialData,
} from '../actions/app.js';

class MyApp extends connect(store)(LitElement) {
  static get properties() {
    return {
      _count: Number,
      _signedIn: Boolean,
      _items: Array,
    };
  }

  _render(properties) {
    return html`
      Todo list (${properties._count})

      <auth0-login
        domain="alien-go-home.auth0.com"
        clientid="NQipGcpZsGn0CEpJPbVFoKZDY0I7WuVP"
        audience="https://micro-blog-app"
        scope="openid profile"
        responsetype="token id_token"
        on-user-login="${(e) => this._userLogin(e)}"
        on-user-logout="${() => this._userLogout()}"
      ></auth0-login>

      <div hidden="${!properties._signedIn}">
        <my-list items="${properties._items}"
          on-delete-entry="${(e) => this._deleteEntry(e)}"
          on-add-entry="${(e) => this._addEntry(e)}"
        ></my-list>
      </div>

      <script type="text/javascript" src="../../node_modules/auth0-js/build/auth0.js"></script>
    `;
  }

  _deleteEntry(e) {
    store.dispatch(deleteItem(e.detail));
  }

  _addEntry(e) {
    store.dispatch(addItem(e.detail));
  }

  _userLogin(e) {
    store.dispatch(userLogin(e.detail));
    store.dispatch(getInitialData(e.detail));
  }

  _userLogout() {
    store.dispatch(userLogout());
  }

  _stateChanged(state) {
    this._count = state.items.length;
    this._signedIn = state.user != null;
    this._items = state.items;
  }

  _firstRendered() {
    super._firstRendered();
    store.dispatch(getInitialData());
  }
}

window.customElements.define('my-app', MyApp);
