document.addEventListener('DOMContentLoaded', function() {
	const noteForm = document.getElementById('noteForm');
	const noteTable = document.getElementById('noteTable').getElementsByTagName('tbody')[0];

	noteForm.addEventListener('submit', function(e) {
		e.preventDefault();

		const titleInput = document.getElementById('title');
		const contentInput = document.getElementById('content');

		const note = {
			title: titleInput.value,
			content: contentInput.value
		};

		let notes = [];
		if (localStorage.getItem('notes')) {
			notes = JSON.parse(localStorage.getItem('notes'));
		}
		
		const data = await response.json();
		console.log(data);
		sendDataToFunction(data);
		
		notes.push(note);
		localStorage.setItem('notes', JSON.stringify(notes));

		displayNotes();
		titleInput.value = '';
		contentInput.value = '';
	});
	
	function sendDataToFunction(data) {
		fetch("https://functions.yandexcloud.net/d4e75s2f1crbe3ck15iv", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
			  "Content-Type": "application/json"
			}
		})
		.then((response) => response.json())
		.then((result) => {
			  console.log(result);
			  // Обработка ответа от функции, если необходимо
		})
		.catch((error) => {
		  console.error(error);
		  // Обработка ошибок, если необходимо
		});
	}

	function displayNotes() {
		noteTable.innerHTML = '';

		let notes = [];
		if (localStorage.getItem('notes')) {
			notes = JSON.parse(localStorage.getItem('notes'));
		}

		notes.forEach(function(note) {
			const row = document.createElement('tr');
			const titleCell = document.createElement('td');
			const contentCell = document.createElement('td');

			titleCell.textContent = note.title;
			contentCell.textContent = note.content;

			row.appendChild(titleCell);
			row.appendChild(contentCell);
			noteTable.appendChild(row);
		});
	}

	displayNotes();
});