'use strict'
const uiOrganizationCardDoc = document._currentScript || document.currentScript;
let template = uiOrganizationCardDoc.ownerDocument.querySelector('#ui-organization-card-view');

class OrganizationCardViewController extends HTMLElement {

  static get observedAttributes(){
    return ['model'];
  }

  constructor(){
    super();
    this.model = new Organization();
    const view = document.importNode(template.content, true);
    this.shadowRoot = this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(view);
  }

	///STANDARD
	connectedCallback() {
    console.log('connected', this);
    this.$container = this.shadowRoot.querySelector('.container');
    this.$image = this.shadowRoot.querySelector('#image');
    this.$name = this.shadowRoot.querySelector('#name');
    this.$disamiguatingDescription = this.shadowRoot.querySelector('#disamiguatingDescription');
    this.$location = this.shadowRoot.querySelector('#location');
    this.$description = this.shadowRoot.querySelector('#description');
    this._updateRendering();
	}

	adoptedCallback(){
    console.log('adoptedCallback');
	}

	disconnectedCallback() {
    console.log('disconnected');
	}

	attributeChangedCallback(attrName, oldVal, newVal) {
    let model = JSON.parse(newVal);
    this.model = new Organization(model);
    console.log(this.model)
    this._updateRendering();
  }

  get shadowRoot(){return this._shadowRoot;}
  set shadowRoot(value){ this._shadowRoot = value}

  _updateRendering() {
    if(this.$image){ this.$image.src = this.model.image; }
    if(this.$name){ this.$name.textContent = this.model.name; }
    if(this.$disambiguatingDescription){ this.$disambiguatingDescription.textContent = this.model.disambiguatingDescription; }
    if(this.$location){ this.$location.textContent = this.model.location; }
    if(this.$description){ this.$description.textContent = this.model.description; }
  }

}

window.customElements.define('ui-organization-card', OrganizationCardViewController);
