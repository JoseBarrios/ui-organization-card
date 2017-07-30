'use strict'
const uiOrganizationCardDoc = document._currentScript || document.currentScript;
let template = uiOrganizationCardDoc.ownerDocument.querySelector('#ui-organization-card-view');

class OrganizationCardViewController extends HTMLElement {

  constructor(){
    super();
  }

	///STANDARD
	connectedCallback() {
    console.log('connected');
    const view = document.importNode(template.content, true);
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(view);
	}

	disconnectedCallback() {
    console.log('disconnected');
	}

	attributeChangedCallback(attrName, oldVal, newVal) {
    console.log('attributeChanged');
	}

	adoptedCallback(){
    console.log('adoptedCallback');
	}
}

window.customElements.define('ui-organization-card', OrganizationCardViewController);
