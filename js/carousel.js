// Create a class for the element
class Carousel extends HTMLElement {
	static get observedAttributes() { return ['time-delay', 'slide-speed']; }
	
	constructor() {
		super();
		this._timeDelayValue = 1000; // Default value for time delay
		this._slideSpeedValue = 1000; // Default value for time delay
		this.items = [];
		this.index = 0;
		this.max_index = 0;
	}
	
	// Validate and handle changes to the custom attribute
	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'time-delay') {
			const numericValue = this.validateAndConvertToNumber(newValue);
			if (numericValue !== null) {
				console.log(numericValue);
				this._timeDelayValue = numericValue; // Store the validated value
			} else {
				console.error(`Invalid value for time-delay: ${newValue} is not a number.`);
			}
		} else if (name === 'slide-speed') {
			const numericValue = this.validateAndConvertToNumber(newValue);
			if (numericValue !== null) {
				console.log(numericValue);
				this._slideSpeedValue = numericValue; // Store the validated value
			} else {
				console.error(`Invalid value for slide-speed: ${newValue} is not a number.`);
			}
		}
	}

	// Getter for the custom attribute value
	get timeDelay() {
		return this._timeDelayValue || 1000; // Default to 1000 if not set
	}

	// Setter for the custom attribute value
	set timeDelay(value) {
		const numericValue = this.validateAndConvertToNumber(value);
		if (numericValue !== null) {
			this.setAttribute('time-delay', numericValue); // Update the DOM attribute
		} else {
			console.error(`Invalid value for timeDelay: ${value} is not a number.`);
		}
	}
	
	// Getter for the custom attribute value
	get slideSpeed() {
		return this._slideSpeedValue || 1000; // Default to 1000 if not set
	}

	// Setter for the custom attribute value
	set slideSpeed(value) {
		const numericValue = this.validateAndConvertToNumber(value);
		if (numericValue !== null) {
			this.setAttribute('slide-speed', numericValue); // Update the DOM attribute
		} else {
			console.error(`Invalid value for slide-speed: ${value} is not a number.`);
		}
	}

	// Utility to validate and convert to a number
	validateAndConvertToNumber(value) {
		const number = parseFloat(value);
		return !isNaN(number) ? number : null; // Return null if invalid
	}
	
	connectedCallback() {
		console.log('Inner HTML:', this.innerHTML);
		
		document.addEventListener('DOMContentLoaded', () => {
			console.log('Inner HTML:', this.innerHTML);
			this.items = Array.from(this.querySelectorAll("carousel-item"));
			this.max_index = this.items.length;
			this.index = 0;
			this.move(); // Start the loop
		});

		
	}

	// Move the carousel to the next item
	move = () => {
		if (!this.items || this.items.length === 0) return;

		if ((this.index) % this.max_index == 0) {
			console.log("You reached this.");
			for (let i = 0; i < this.max_index; i++) {
				this.items[i].style.transitionDuration = "0s";
				const offset = ((((this.max_index - (this.index + 1)) - i) * this.offsetWidth) - (i * this.offsetWidth));
				this.items[i].style.left = `${offset}px`; // Update each item's position
			}

			this.index = (this.index + 1) % this.max_index; // Increment index and keep it within bounds
		}

		

		for (let i = 0; i < this.max_index; i++) {
			const offset = ((((this.max_index - (this.index + 1)) - i) * this.offsetWidth) - (i * this.offsetWidth));
			this.items[i].style.transitionDuration = `${this._slideSpeedValue / 1000}s`;
			this.items[i].style.left = `${offset}px`; // Update each item's position
		}

		this.index = (this.index + 1) % this.max_index; // Increment index and keep it within bounds

		// Use an arrow function to preserve context
		setTimeout(this.move, this._timeDelayValue);
	};
}

class CarouselItem extends HTMLElement {
	constructor() {
		super();
	}
}

customElements.define("carousel-container", Carousel);
customElements.define("carousel-item", CarouselItem);
