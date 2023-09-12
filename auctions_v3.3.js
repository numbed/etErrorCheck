console.clear();
console.log('auctions_v3.3');
let today = new Date();
let tableRows = document.querySelector('tbody').querySelectorAll('tr');

function main() {
    // createIframes();

    tableRows.forEach(element => {
        // if (element.className != "danger") {
        auctionDateCheck(element);
        if (isNotPublished(element)) {} else {}
        // }
    })
}
main();

function auctionDateCheck(element) {
    let lastCell = element.cells[8];
    let dateCell = element.cells[3];

    let firstDate = stringToDate(element.cells[2].innerText);
    let deadlineDate = new Date(firstDate);
    let deadline = new Date();
    let commDate = new Date(firstDate);
    let comm = new Date();

    //deadline check
    if (firstDate.getDay() == 1 || firstDate.getDay() == 4) {
        deadline = firstDate.getDate() - 20;
    } else if (firstDate.getDay() == 2 || firstDate.getDay() == 5) {
        deadline = firstDate.getDate() - 18;
    } else if (firstDate.getDay() == 3) {
        deadline = firstDate.getDate() - 19;
    }
    deadlineDate.setDate(deadline);
    let output = deadlineDate.getDate() + "." + (deadlineDate.getMonth() + 1) + "." + deadlineDate.getFullYear();

    //commission check
    if (firstDate.getDay() == 1) {
        comm = firstDate.getDate() - 3;
    } else {
        comm = firstDate.getDate() - 1;
    }
    commDate.setDate(comm);

    if (deadlineDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) { // output = "today";
        coloring("#D1462F"); //red
    } else if (commDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) { // output = "commission";
        coloring("#2f4050"); //dark blue
    } else if (firstDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0) || deadlineDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) { // output = "passed";
        coloring("#81B622"); //green
    } else { // output = "upcomming";
        coloring("#e88031"); //orange
    }

    function coloring(color) {
        // red || dark blue
        if (color === "#D1462F" || color === "#2f4050") {
            element.style.color = color;
            element.style.fontWeight = "bold";
        }
        dateCell.style.color = color;
        dateCell.style.fontWeight = "bold";
        dateCell.style.fontStyle = "italic";
        lastCell.style.backgroundColor = color;
        dateCell.innerHTML = dateCell.innerHTML + "<br>" + output.fontcolor(color).italics().bold();
    }
}

function stringToDate(string) {
    string = string.split(" ")[0].split(".");
    return new Date(string[2], string[1] - 1, string[0]);
}

function isNotPublished(auction) {
    if (window.getComputedStyle(auction).color === "rgb(153, 153, 153)") {
        auction.className = 'notPublished';
        return true;
    }
}

function createIframes() {
    tableRows.forEach(el => {
        let auctionLink = el.cells[7].querySelector('a').href;
        const iFrame = document.createElement('iFrame');
        iFrame.id = el.cells[0].innerText;
        // iFrame.style.display = 'none';

        //appends iFrame element if missing, else reloads frame in first cell on the row
        if (el.cells[0].querySelector("iFrame") === null) {
            el.cells[0].appendChild(iFrame);
            iFrame.src = auctionLink;
        } else {
            el.cells[0].querySelector("iFrame").contentWindow.location.reload();
            el.cells[8].style.backgroundColor = "gray";
        }

        iFrame.onload = function () {
            console.log(el.cells[0].innerText, 'frame loaded')
        }
    })

}