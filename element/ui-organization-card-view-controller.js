'use strict'

const uiOrganizationCardDoc = document._currentScript || document.currentScript;
const uiOrganizationCardTemplate = uiOrganizationCardDoc.ownerDocument.querySelector('#ui-organization-card-view');

class OrganizationCardViewController extends HTMLElement {

  static get observedAttributes(){
    return ['value'];
  }

  constructor(){
    super();
    this.model = new Organization();
    const view = document.importNode(uiOrganizationCardTemplate.content, true);
    this.shadowRoot = this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(view);
		this.connected = false;

		this.defaultEventName = 'update';
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

		this.connected = true;
    this._updateRendering();
	}

	adoptedCallback(){
    //console.log('adoptedCallback');
	}

	disconnectedCallback() {
		this.connected = false;
		console.log('disconnected');
	}

	attributeChangedCallback(attrName, oldVal, newVal) {
		switch(attrName){
			case 'value':
				this.value = JSON.parse(newVal);
				break;
			default:
				console.warn(`Attribute ${attrName} is not handled, you should probably do that`);
		}
  }

  get shadowRoot(){return this._shadowRoot;}
  set shadowRoot(value){ this._shadowRoot = value}

  get value(){return Organization.assignedProperties(this.model);}
	set value(value){
		this.model = new Organization(value);
		this._updateRendering();
		this.dispatchEvent(new CustomEvent(this.defaultEventName, {detail: Organization.assignedProperties(this.model)}))
	}

  _updateRendering() {
		if(this.connected && this.model){
			if(this.$image && this.model.image){ this.$image.src = this.model.image; }
			if(this.$name && this.model.name){ this.$name.textContent = this.model.name; }
			if(this.$disambiguatingDescription && this.model.disambiguatingDescription){ this.$disambiguatingDescription.textContent = this.model.disambiguatingDescription; }
			if(this.$addressLocality && this.model.address.addressLocality){ this.$addressLocality.textContent = this.model.address.addressLocality; }
			if(this.$addressRegion && this.model.address.addressRegion){ this.$addressRegion.textContent = this.model.address.addressRegion; }
			if(this.$description && this.model.description){ this.$description.textContent = this.model.description; }
		}
  }
}

window.customElements.define('ui-organization-card', OrganizationCardViewController);
