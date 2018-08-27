
export default function StickyStack(options) {

	/**
	 * If the container has no children, 
	 * then check every 500 ms until 
	 * they mounted to the DOM
	 */

	if (!options.container.children.length) {
		setTimeout(() => {
			StickyStack(options);
		}, 500);
		return;
	}

	const children = Array.from(options.container.children);

	/**
	 * Take the children of the container
	 *  by the given class
	 */

	const sections = children.filter(
		child => child.classList.contains(options.childClass)
	);

	/**
	 * Insert the styles for the selected items
	 */


	if (!document.querySelector('#sticky-stack-styles')) {
		const styles = `
		.${options.childClass} {
			width: 100%;
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
			position: relative;
			z-index: 100;
		}

		.${options.childClass}.stuck {
			position: fixed;
			top: 4rem;
			z-index: 0;
		}

		.${options.childClass}.stuck + ${options.childClass}:not(.stuck) {
			-webkit-box-shadow: 0 -3px 20px rgba(0, 0, 0, 0.25);
			box-shadow: 0 -3px 20px rgba(0, 0, 0, 0.25);
		}

		.${options.childClass}.align-bottom.stuck {
			top: auto !important;
			bottom: 0 !important;
		}
	`;

		const style = document.createElement('style');
		style.type = 'text/css';
		style.id = 'sticky-stack-styles';
		style.innerHTML = styles;

		document.head.append(style);
	}
	
	const fontSize = +window.getComputedStyle(document.body).fontSize.replace(/\D/g, '');
	let sectionsInfo = [];
	buildSectionsInfo()

	/**
	 * Helper function which builds the array sectionsInfo[] 
	 * which keeps track of all the section elements
	 */

	window.addEventListener('resize', () => {
		buildSectionsInfo()
	});


	function buildSectionsInfo() {
		let runningHeightCounter = 0;
		const viewportHeight = window.innerHeight;

		/**
		 * Build an array of the sections
		 *	 sectionsInfo[i][0] = Position from top of document
		 *	 sectionsInfo[i][1] = Height of section
		 *	 sectionsInfo[i][2] = Scroll offset (if taller than viewport)
		 */

		for (let i = 0; i < sections.length; i += 1) {
			sectionsInfo[i] = [];

			// record the height of the section
			sectionsInfo[i][1] = sections[i].offsetHeight;
			
			// test this section height against viewport
			if (sectionsInfo[i][1] > viewportHeight) {
				sectionsInfo[i][2] = sectionsInfo[i][1] - viewportHeight;
				sections[i].classList.add('align-bottom');
			} else {
				sectionsInfo[i][2] = 0;
				sections[i].classList.remove('align-bottom');
			}

			// write the data-scrollto
			sections[i].setAttribute('data-scrollto', sections[i].offsetTop);

			// if the section is stuck, calculate its .offset() based on preceeding section heights
			if (sections[i].classList.contains('stuck')) {
				sectionsInfo[i][0] = runningHeightCounter;
				runningHeightCounter += sectionsInfo[i][1];
			} else {
				sectionsInfo[i][0] = sections[i].offsetTop;
			}

			// Attach data attributes
			sections[i].setAttribute('data-scrollto', sectionsInfo[i][0]);
			sections[i].setAttribute('data-height', sectionsInfo[i][1]);
			sections[i].setAttribute('data-offset', sectionsInfo[i][2]);
		}
	}

	// Call calculation on window scroll
	window.addEventListener('scroll', () => {
		calculateLayout()
	});
	
	// Let's wtire calculate positions for set stickies...
	 function calculateLayout() {
		const windowScrollPos = window.pageYOffset;
		let counter = 0;

		for (let i = 0; i < sections.length; i += 1) {
			if (sections[i].getAttribute('data-offset') !== '0') {
				if (windowScrollPos >= sectionsInfo[i][2] + sectionsInfo[i][0]) {
					counter += 1;
				}
			} else {
				if (windowScrollPos >= sectionsInfo[i][0] - fontSize * 4) {
					counter += 1;
				}
			}
		
			setStickies(counter);
		}
	}

	function setStickies(howMany) {
		// Step 1:  Calculate how much padding the parent container should get
		let paddingTop = 0;
		// Total the amount of padding of stuck sections
		for (let i = 0; i < howMany; i += 1) {
			paddingTop += +sections[i].getAttribute('data-height');
		}

		// Append that height to the parent wrapper
		options.container.style.paddingTop = `${paddingTop}px`;

		// Step 2:  Stick the sections to be stuck (heh)
		for (let i = 0; i < sections.length; i += 1) {
			if (howMany > 0) {
				sections[i].classList.add('stuck');
				howMany -= 1;
			} else {
				sections[i].classList.remove('stuck');
			}
		}
	}
}