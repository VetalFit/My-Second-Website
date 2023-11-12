
function closeModal() {
	const modal = document.querySelectorAll('[data-modal]')
	modal.forEach(item => {
		item.style.display = 'none';
		document.body.style.overflow = '';
		document.body.style.marginRight = `0px`;
	})
};

const modals = () => {
	let btnPressed;
	function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {

		const trigger = document.querySelectorAll(triggerSelector),
			modal = document.querySelector(modalSelector),
			close = document.querySelector(closeSelector),
			windows = document.querySelectorAll('[data-modal]'),
			scroll = calcScroll();


		trigger.forEach(item => {
			item.addEventListener('click', (e) => {
				if (e.target) {
					e.preventDefault()
				}

				btnPressed = true;

				if (destroy) {
					item.remove();
				}

				windows.forEach(item => {
					item.style.display = 'none'
					item.classList.add('animated', 'fadeIn');
				});

				modal.style.display = 'block';
				document.body.style.overflow = 'hidden';
				document.body.style.marginRight = `${scroll}px`;
			})
		});

		close.addEventListener('click', () => {
			windows.forEach(item => {
				item.style.display = 'none'
			});

			closeModal();
		});

		modal.addEventListener('click', (e) => {
			if (e.target === modal) {
				windows.forEach(item => {
					item.style.display = 'none'
				});

				closeModal();
			}
		});

		document.addEventListener('keydown', (e) => {
			if (e.code === "Escape" && modal.style.display === 'block') {
				closeModal();
			}
		})
	}

	function showModalBtTime(selector, time) {
		setTimeout(() => {
			let display;

			document.querySelectorAll('[data-modal]').forEach(item => {
				if (getComputedStyle(item).display !== 'none') {
					display = 'block';
				}
			});

			if (!display) {
				document.querySelector(selector).style.display = 'block';
				document.body.style.overflow = 'hidden';
				let scroll = calcScroll();
				document.body.style.marginRight = `${scroll}px`;
			}
		}, time);
	}

	function calcScroll() {
		let div = document.createElement('div');

		div.style.width = '50px';
		div.style.height = '50px';
		div.style.overflowY = 'scroll';
		div.style.visibility = 'hidden';

		document.body.appendChild(div);
		let scrollWidth = div.offsetWidth - div.clientWidth;
		div.remove();

		return scrollWidth;
	}

	function openByScroll(selector) {
		window.addEventListener('scroll', () => {
			let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)

			if (!btnPressed && window.scrollY + document.documentElement.clientHeight >= scrollHeight) {
				document.querySelector(selector).click();
			}
		})
	}

	bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
	bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
	bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
	openByScroll('.fixed-gift');

	//showModalBtTime('.popup-consultation', 60000);
};


export default modals;
export { closeModal };