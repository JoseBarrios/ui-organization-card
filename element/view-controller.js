'use strict'
const uiOrganizationCardDoc = document._currentScript || document.currentScript;
let uiOrganizationCardTemplate = uiOrganizationCardDoc.ownerDocument.querySelector('#ui-organization-card-view');

class OrganizationCardViewController extends HTMLElement {

  static get observedAttributes(){
    return ['model'];
  }

  constructor(){
    super();
    this.model = new Organization();
    const view = document.importNode(uiOrganizationCardTemplate.content, true);
    this.shadowRoot = this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(view);
  }

	///STANDARD
	connectedCallback() {
    this.$container = this.shadowRoot.querySelector('.container');
    this.$image = this.shadowRoot.querySelector('#image');
    this.$name = this.shadowRoot.querySelector('#name');
    this.$disambiguatingDescription = this.shadowRoot.querySelector('#disambiguatingDescription');
    this.$addressLocality = this.shadowRoot.querySelector('#addressLocality');
    this.$addressRegion = this.shadowRoot.querySelector('#addressRegion');
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
    console.log('NEW VAL', newVal)
    let model = JSON.parse(newVal);
    this.model = new Organization(model);
    this._updateRendering();
  }

  get shadowRoot(){return this._shadowRoot;}
  set shadowRoot(value){ this._shadowRoot = value}

  _updateRendering() {
    if(this.$image){ this.$image.src = this.model.image; }
    if(this.$name){ this.$name.textContent = this.model.name; }
    if(this.$disambiguatingDescription){ this.$disambiguatingDescription.textContent = this.model.disambiguatingDescription; }
    if(this.$addressLocality){ this.$addressLocality.textContent = this.model.address.addressLocality; }
    if(this.$addressRegion){ this.$addressRegion.textContent = this.model.address.addressRegion; }
    if(this.$description){ this.$description.textContent = this.model.description; }
  }

}

window.customElements.define('ui-organization-card', OrganizationCardViewController);
