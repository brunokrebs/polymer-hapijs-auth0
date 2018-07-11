import {LitElement, html} from '@polymer/lit-element';

class MyList extends LitElement {
  static get properties() {
    return {
      items: Array,
    };
  }

  _render(properties) {
    return html`
      <style>
        .spinner {
          position: relative;
          width: 20px;
          height: 20px;
          padding-left: 10px;
          padding-right: 20px;
          background-color: #ccc;
        }
      </style>
  
      <ul>
        ${properties.items.map((item, index) => html`
          <li>
            ${item.name} <span hidden?="${!(item.loading || item.deleting)}" class="spinner"></span>
            <span hidden?="${item.deleting || item.loading}" on-click="${() => this._deleteEntry(index)}">(Delete)</span>
          </li>
        `)}
      </ul>
  
      <input type="text" id="todo" />
      <button on-click="${() => this._addEntry()}">Add</button>
    `;
  }

  _addEntry() {
    this.dispatchEvent(new CustomEvent('add-entry', {detail: this.shadowRoot.querySelector('#todo').value}));
  }

  _deleteEntry(index) {
    this.dispatchEvent(new CustomEvent('delete-entry', {detail: index}));
  }

  _didRender(props, changedProps, prevProps) {
    super._didRender(props, changedProps, prevProps);
    this.shadowRoot.querySelector('#todo').focus();
  }
}

window.customElements.define('my-list', MyList);
