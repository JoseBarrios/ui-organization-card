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
		this.model.address = new PostalAddress(value.address);
		this._updateRendering();
		this._updateEvent()
	}

	get image(){ return this.model.image; }
	set image(value){
		this.model.image = value;
		this._updateRendering();
		this._updateEvent();
	}


	get name(){ return this.model.name; }
	set name(value){
		this.model.name = value;
		this._updateRendering();
		this._updateEvent()
	}

	get address(){ return PostalAddress.assignedProperties(this.model.address); }
	set address(value){
		this.model.address = new PostalAddress(value);
		this._updateRendering();
		this._updateEvent();
	}

	get disambiguatingDescription(){ return this.model.disambiguatingDescription; }
	set disambiguatingDescription(value){
		this.model.disambiguatingDescription = value;
		this._updateRendering();
		this._updateEvent();
	}

	get description(){ return this.model.description; }
	set description(value){
		this.model.description = value;
		this._updateRendering();
		this._updateEvent();
	}



	_updateEvent(){
		let value = Organization.assignedProperties(this.model);
		value.address = PostalAddress.assignedProperties(this.model.address);
		this.dispatchEvent(new CustomEvent(this.defaultEventName, {detail: value}));
	}

  _updateRendering() {
		if(this.connected && this.model){
			if(this.$image && this.model.image){ this.$image.src = this.model.image; }
			if(this.$name && this.model.name){ this.$name.textContent = this.model.name; }
			if(this.$disambiguatingDescription && this.model.disambiguatingDescription){ this.$disambiguatingDescription.textContent = this.model.disambiguatingDescription; }
			if(this.$addressLocality && this.model.address && this.model.address.addressLocality){ this.$addressLocality.textContent = this.model.address.addressLocality; }
			if(this.$addressRegion && this.model.address && this.model.address.addressRegion){ this.$addressRegion.textContent = this.model.address.addressRegion; }
			if(this.$description && this.model.description){ this.$description.textContent = this.model.description; }
		}
  }
}

window.customElements.define('ui-organization-card', OrganizationCardViewController);
