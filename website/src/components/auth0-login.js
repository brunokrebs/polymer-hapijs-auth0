import {LitElement, html} from '@polymer/lit-element';

let auth0 = require('../../node_modules/auth0-js/build/auth0.js');

class Auth0Login extends LitElement {
  static get properties() {
    return {
      _auth: Object,
      _user: Object,
      audience: String,
      clientid: String,
      audience: String,
      responsetype: String,
      scope: String,
      domain: String,
    };
  }

  _render(properties) {
    return html`
      <button hidden?="${properties._user != null}" on-click="${() => this.login()}">Login</button>
      <button hidden?="${properties._user == null}" on-click="${() => this.logout()}">Logout</button>
    `;
  }

  login() {
    this._auth.authorize();
  }

  _getProfile() {
    this._auth.client.userInfo(this._user.accessToken, (err, profile) => {
      this.dispatchEvent(new CustomEvent('user-login', {detail: profile}));
    });
  }

  _handleAuthentication() {
    this._auth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this._setSession(authResult);
        this._user = authResult;
        this._getProfile();
      } else {
        if (this.isAuthenticated()) {
          this._user = {
            accessToken: localStorage.getItem('access_token'),
            idToken: localStorage.getItem('id_token'),
            expiresAt: localStorage.getItem('expires_at'),
          };
          this._getProfile();
        }
      }
    });
  }

  _firstRendered() {
    super._firstRendered();
    this._auth = new auth0.WebAuth({
      domain: this.domain,
      clientID: this.clientid,
      responseType: this.responsetype,
      audience: this.audience,
      scope: this.scope,
      redirectUri: window.location.href
    });
    this._handleAuthentication();
  }

  _setSession(authResult) {
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this._user = null;
    this.dispatchEvent(new CustomEvent('user-logout'));
  }

  isAuthenticated() {
    var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}

window.customElements.define('auth0-login', Auth0Login);
