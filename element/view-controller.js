'use strict'
let currentDocument = document.currentScript.ownerDocument;

class OrganizationCardViewController extends HTMLElement{

  constructor(){
    super();
    const view = currentDocument.querySelector('#view').content.cloneNode(true);
    this.appendChild(view);
  }

	///STANDARD
	connectedCallback() {
		//console.log('connected');
	}

	disconnectedCallback() {
		//console.log('disconnected');
	}

	attributeChangedCallback(attrName, oldVal, newVal) {
		//console.log('attributeChanged');
	}

	adoptedCallback(){
		//console.log('adoptedCallback');
	}
}

window.customElements.define('ui-organization-card', OrganizationCardViewController);
