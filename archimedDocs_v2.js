function archimedDocsV2() {
	console.log("test");
	console.log("Archimed Docs");
	let t = document.querySelectorAll("tbody");
	let table = t[1];
	const docs = [];


	//collecting data from active tab table (docs)
	function dataCollect() {
		for (let i = 0, row; row = table.rows[i]; i++) {
			docs[i] = {
				number: docNumber(row.cells[0].innerText),
				date: docDate(row.cells[0].innerText),
				fullcell: row.cells[0].innerText,
				status: row.cells[4].innerText,
				link: row.cells[0].getElementsByTagName('a')[0].href
			};
		}
	}
	dataCollect();

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
			if (!document.getElementById(docNumber(table.rows[i].cells[0].innerText))) {
				for (let i = 0, row; row = table.rows[i]; i++) {
					const frame = document.createElement("iframe");
					frame.id = docNumber(table.rows[i].cells[0].innerText);
					frame.src = row.cells[0].getElementsByTagName('a')[0].href;
					frame.style.display = "none";
					row.cells[0].appendChild(frame);

					frame.onload = function () {
						frame.contentWindow.document.getElementById('TabArchive').click();
						delay(5000).then(() => fff());
						function fff() {
							frame.contentWindow.document.getElementById('TabArchive').click();
							let historyTable = frame.contentWindow.document.querySelector('div[id*=UpDocumentHistory]').querySelector('tbody');
							let hisRows = [];
							for (let i = 0, row; row = historyTable.rows[i]; i++) {
								hisRows[i] = {
									date: row.cells[0].innerText,
									user: row.cells[1].innerText,
									action: row.cells[2].innerText,
								}
							}
							let lastSeen = "Видян от: " + hisRows[hisRows.length -1].user;
							let dateSeen = ".     на: " + hisRows[hisRows.length -1].date;
							row.cells[3].innerHTML = row.cells[3].innerHTML + "<br>" + lastSeen.fontcolor("red").italics() + "<br> " +  dateSeen.fontcolor("red").italics();
							;
						}
					}
				}
			}
		}
	}
	iframeCreation();

	function delay(time) {
		return new Promise(resolve => setTimeout(resolve, time));
	}
}
archimedDocsV2();