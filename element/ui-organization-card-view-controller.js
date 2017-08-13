'use strict'

const uiOrganizationCardDoc = document._currentScript || document.currentScript;
const uiOrganizationCardTemplate = uiOrganizationCardDoc.ownerDocument.querySelector('#ui-organization-card-view');

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
    //console.log('adoptedCallback');
	}

	disconnectedCallback() {
    //console.log('disconnected');
	}

	attributeChangedCallback(attrName, oldVal, newVal) {
		console.log('NEW VAL', typeof newVal, newVal)
    this.model = new Organization(JSON.parse(newVal));
    this._updateRendering();
  }

  get shadowRoot(){return this._shadowRoot;}
  set shadowRoot(value){ this._shadowRoot = value}

  _updateRendering() {
		console.log('OBJ UI ORG CARD', this.model)
    if(this.$image && this.model.image){ this.$image.src = this.model.image; }
    if(this.$name && this.model.name){ this.$name.textContent = this.model.name; }
    if(this.$disambiguatingDescription && this.model.disambiguatingDescription){ this.$disambiguatingDescription.textContent = this.model.disambiguatingDescription; }
    if(this.$addressLocality && this.model.address.addressLocality){ this.$addressLocality.textContent = this.model.address.addressLocality; }
    if(this.$addressRegion && this.model.address.addressRegion){ this.$addressRegion.textContent = this.model.address.addressRegion; }
    if(this.$description && this.model.description){ this.$description.textContent = this.model.description; }
  }

}

window.customElements.define('ui-organization-card', OrganizationCardViewController);
