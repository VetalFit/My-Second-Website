import { postData } from "../services/requests";
import forms from "./forms";

const drop = () => {
	const fileInputs = document.querySelectorAll('[name="upload"]');

	['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
		fileInputs.forEach(input => {
			input.addEventListener(eventName, preventDefaults, false)
		});
	});

	function preventDefaults(e) {
		e.preventDefault();
		e.stopPropagation();
	}

	function highlight(item) {
		item.closest('.file_upload').style.border = "5px solid yellow";
		item.closest('.file_upload').style.backgroundColor = "rgba(0,0,0, .7)";
	}

	function unhighlight(item) {
		item.closest('.file_upload').style.border = "none";
		if (item.closest('.calc-form')) {
			item.closest('.file_upload').style.backgroundColor = "#fff";
		} else {
			item.closest('.file_upload').style.backgroundColor = "#ededed";
		}
	}

	['dragenter', 'dragover',].forEach(eventName => {
		fileInputs.forEach(input => {
			input.addEventListener(eventName, () => highlight(input), false)
		});
	});

	['dragleave', 'drop'].forEach(eventName => {
		fileInputs.forEach(input => {
			input.addEventListener(eventName, () => unhighlight(input), false)
		});
	});

	fileInputs.forEach(input => {
		input.addEventListener('drop', (e) => {
			input.files = e.dataTransfer.files;
			let dots;
			const arr = input.files[0].name.split('.');

			arr[0].length > 6 ? dots = '...' : '.';
			const name = arr[0].substring(0, 6) + dots + arr[1];
			input.previousElementSibling.textContent = name;

			if (input.closest('.main')) {

				const formData = new FormData();
				formData.append('file', input.files[0]);

				postData('assets/server.php', formData)
					.then(res => {
						console.log(res);
					})
					.catch(() => {
						console.log('Error');
					})
					.finally(() => {
						let formSend = document.querySelector('.file_upload > div');
						formSend.textContent = 'Отправлено';
						setTimeout(function () {
							formSend.textContent = 'Файл не выбран';
						}, 2000);
						document.querySelector('.file_upload').style.backgroundColor = '';
					});
			}
		});
	});

};

export default drop;