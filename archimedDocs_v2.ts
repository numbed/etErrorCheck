function archimedDocs() {
	console.log("test");
	console.log("Archimed Docs");
	let t = document.querySelectorAll("tbody");
	let table = t[1];
	const docs = [];


	//collecting data from active tab table (docs)
	for (let i = 0, row; row = table.rows[i]; i++) {
		docs[i] = {
			number: docNumber(row.cells[0].innerText),
			date: docDate(row.cells[0].innerText),
			fullcell: row.cells[0].innerText,
			status: row.cells[4].innerText,
			link: row.cells[0].getElementsByTagName('a')[0].href
		};
	}

	function docNumber(n) {
		let output = n.split("|");
		output = output[0].trim().split(" ").pop();
		return output;
	}

	function docDate(d) {
		let output = d.split("|");
		output = output[1].trim().split("\n").shift();
		return output;
	}

	//creating iframes for every auction on page
	function iframeCreation() {
		for (let i = 0, row; row = table.rows[i]; i++) {
			if (!document.getElementById(table.rows[0].cells[0].getElementsByTagName('a')[0].href)) {
				for (let i = 0, row; row = table.rows[i]; i++) {
					const frame = document.createElement("iframe");
					frame.id = row.cells[0].getElementsByTagName('a')[0].href;
					frame.src = row.cells[0].getElementsByTagName('a')[0].href;
					// frame.style.display = "none";
					row.cells[0].appendChild(frame);
				}
			}
		}
	}
	iframeCreation();

}
archimedDocs();