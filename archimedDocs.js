function archimedDocs() {
	console.log("test");
	console.log("Archimed Docs");
	let t = document.querySelectorAll("tbody");
	let table = t[1];
	const docs = [];
	const todayArray = [];
	const yesterdayArray = [];
	const olderArray = [];
	const notDone = [];
	let today = new Date();
	let yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);

	//collecting data from active tab table (docs)
	for (let i = 0, row; row = table.rows[i]; i++) {
		docs[i] = {
			number: docNumber(row.cells[0].innerText),
			date: docDate(row.cells[0].innerText),
			fullcell: row.cells[0].innerText,
			status: row.cells[4].innerText,
			link: row.cells[0].querySelector("a").href
		};
	}

	function docNumber(n) {
		let output = n.split("|");
		output = output[0].trim();
		return output;
	}

	function docDate(d) {
		let output = d.split("|");
		output = output[1].trim().split("\n").shift();
		return output;
	}

	//checking if date is TODAY
	for (i = 0; i < Object.keys(docs).length; i++) {
		let ddlStr = docs[i].date.split(".");
		let ddlDate = new Date(ddlStr[2], ddlStr[1] - 1, ddlStr[0]);
		let infoObj = {};
		infoObj = {
			number: docs[i].number,
			date: docs[i].date,
			fullcell: docs[i].fullcell,

		};

		if (ddlDate.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0) && (docs[i].status.includes("Приключен") || docs[i].status.includes("Отговорен"))) {
			todayArray.push(infoObj);
		}

		if (ddlDate.setHours(0, 0, 0, 0) == yesterday.setHours(0, 0, 0, 0) && (docs[i].status.includes("Приключен") || docs[i].status.includes("Отговорен"))) {
			yesterdayArray.push(infoObj);
		}

		if (ddlDate.setHours(0, 0, 0, 0) < yesterday.setHours(0, 0, 0, 0) && (docs[i].status.includes("Приключен") || docs[i].status.includes("Отговорен"))) {
			console.log("older docs");
			olderArray.push(infoObj);
		}
	}

	//coloring rows
	function colorfullRowsOutput(array, color, color2) {
		array.forEach(element => {
			for (let i = 0, row; row = table.rows[i]; i++) {
				if (row.cells[0].innerText == element.fullcell) {
					row.style.backgroundColor = color;
					// row.style.color = color2;
				}
			}
		});
	}

	colorfullRowsOutput(todayArray, "#a5e566", "white"); //green
	colorfullRowsOutput(yesterdayArray, "#FFC300", "white"); //yellow
	colorfullRowsOutput(olderArray, "#F3CFC6", "white"); //Millennial pink

	console.table(olderArray);


	for (let i = 0, row; row = table.rows[i]; i++) {
		if (docs[i].status.includes("Публикуван")) {
			notDone.push(docs[i]);
		}
	}
	console.log("notDone")
	console.table(notDone);
	console.log(notDone);
	let notDoneAlertArray = [];

	setTimeout(() => {
		notDone.forEach(el => {
			console.log(el.number);
			notDoneAlertArray.push(el.number);
		})
	}, 1000);
	
	setTimeout(() => {
		alert("Нови преписки: " + notDoneAlertArray.length + "\r\n" + [...new Set(notDoneAlertArray)].join('  |  '));
	}, 1000);
}
archimedDocs();