//line: 80 needs work
//line: 221 moreInfo() next to be created, shows info from auctions form page to auctions table
console.clear();
console.log("--------------------------------navbar_v1.1")

let colorFuture = "#E25E3E"
let colorCommission = "#040D12"
let colorToday = "#D1462F"
let colorPassed = "#81B622"
let colorNotPublished = "#FFBB5C"
let colorDanger = "#C70039"

let table = document.querySelector('tbody').querySelectorAll('tr');
let navbar = document.querySelector(".navbar.navbar-static-top.white-bg").querySelector("ul");
let today = new Date();

function main() {
    addClassToTable();
    createInfoTable();
    addHeaderTableInfo();
    coloring();
}
main();

function coloring() {
    navbar.querySelector("#futureInfo").style.backgroundColor = colorFuture;
    navbar.querySelector("#commInfo").style.backgroundColor = colorCommission;
    navbar.querySelector("#todayInfo").style.backgroundColor = colorToday;
    navbar.querySelector("#passedInfo").style.backgroundColor = colorPassed;
    navbar.querySelector("#notPublishedInfo").style.backgroundColor = colorNotPublished;
    navbar.querySelector("#dangerInfo").style.backgroundColor = colorDanger;
    navbar.querySelector("#totalInfo").style.color = colorCommission;
    navbar.querySelector("#errorsInfo").style.color = colorCommission;

    table.forEach(element => {
        let elementLength = element.querySelectorAll('td').length;
        if (element.className === "future") {
            element.cells[(elementLength - 1)].style.backgroundColor = colorFuture;
            element.cells[(elementLength - 1)].style.backgroundColor = colorFuture;
            element.cells[3].querySelector('b').style.color = colorFuture;
        }
        if (element.className === "commission") {
            element.cells[(elementLength - 1)].style.backgroundColor = colorCommission;
            element.style.color = colorCommission;
        }
        if (element.className === "today") {
            element.cells[(elementLength - 1)].style.backgroundColor = colorToday;
            element.style.color = colorToday;
        }
        if (element.className === "passed") {
            element.cells[(elementLength - 1)].style.backgroundColor = colorPassed;
            element.cells[3].querySelector('b').style.color = colorPassed;
        }
        if (element.className === "notPublished") {
            element.cells[(elementLength - 1)].style.backgroundColor = colorNotPublished;
            element.cells[3].querySelector('b').style.color = colorNotPublished;
        }
        if (element.className === "danger") {
            element.cells[(elementLength - 1)].style.backgroundColor = "";
        }
    });

}

function addHeaderTableInfo() {
    console.log("🚀 ~ file: navbar_v1.1.js:65 ~ addHeaderTableInfo ~ addHeaderTableInfo")
    let cntNotPub = arrayCounter().notPublished;
    let cntFuture = arrayCounter().future;
    let cntToday = arrayCounter().today;
    let cntPassed = arrayCounter().passed;
    let cntDanger = arrayCounter().danger;
    let cntCommission = arrayCounter().commission;

    function isCounterZero(counter) {
        if (counter === undefined) {
            return counter = 0;
        } else {
            return counter;
        }
    }

    let totalUpcomming = isCounterZero(cntNotPub); + isCounterZero(cntFuture);;
    document.querySelector("#totalInfo").innerHTML = table.length;

    document.querySelector("#notPublishedInfo").innerHTML = isCounterZero(cntNotPub);
    document.querySelector("#notPublishedInfo").addEventListener('click', function handleClick() {
        console.log("click:", this.innerText);
        table.forEach(el => {
            if (el.className === "notPublished") {
                console.log(el.cells[0].innerHTML)
                // window.open(el.querySelector('a').href, "_blank")
            }
        })
    });

    document.querySelector("#errorsInfo").innerHTML = "<span onclick=\"dangerOPEN()\">" + "N/A" + "</span>";
    document.querySelector("#errorsInfo").addEventListener('click', function handleClick() {
        console.log("click:", this.innerText);
        table.forEach(el => {
            if (el.className === "errors") { //need changes to open only auctions with errors in them
                console.log(el.cells[0].innerHTML)
                // window.open(el.querySelector('a').href, "_blank")
            }
        })
    });

    document.querySelector("#futureInfo").innerHTML = isCounterZero(cntFuture) + "/" + isCounterZero(totalUpcomming);
    document.querySelector("#futureInfo").addEventListener('click', function handleClick() {
        console.log("click:", this.innerText);
        table.forEach(el => {
            if (el.className === "future") { //need changes to open only auctions with errors in them
                console.log(el.cells[0].innerHTML)
                // window.open(el.querySelector('a').href, "_blank")
            }
        })
    });

    document.querySelector("#todayInfo").innerHTML = isCounterZero(cntToday);
    document.querySelector("#todayInfo").addEventListener('click', function handleClick() {
        console.log("click:", this.innerText);
        table.forEach(el => {
            if (el.className === "today") {
                console.log(el.cells[0].innerHTML)
                // window.open(el.querySelector('a').href, "_blank")
            }
        })
    });

    document.querySelector("#passedInfo").innerHTML = isCounterZero(cntPassed);

    document.querySelector("#dangerInfo").innerHTML = isCounterZero(cntDanger);
    document.querySelector("#dangerInfo").addEventListener('click', function handleClick() {
        console.log("click:", this.innerText);
        table.forEach(el => {
            if (el.className === "danger") {
                console.log(el.cells[0].innerHTML)
                // window.open(el.querySelector('a').href, "_blank")
            }
        })
    });

    document.querySelector("#commInfo").innerHTML = isCounterZero(cntCommission);
    document.querySelector("#commInfo").addEventListener('click', function handleClick() {
        console.log("click:", this.innerText);
        table.forEach(el => {
            if (el.className === "commission") {
                console.log(el.cells[0].innerHTML)
                // window.open(el.querySelector('a').href, "_blank")
            }
        })
    });
}

function isNotPublished(auction) {
    if (window.getComputedStyle(auction).color === "rgb(153, 153, 153)") {
        auction.className = 'notPublished';
        return true;
    }
}

function arrayCounter() {
    const count = {};
    table.forEach(el => {
        count[el.className] = (count[el.className] || 0) + 1;
    });

    return count;
}

function addClassToTable() {
    table.forEach(el => {
        if (el.className != "danger") {
            auctionDateCheck(el);
            isNotPublished(el);
            // if (!isNotPublished(el)) {
            //     auctionDateCheck();
            // }
        }
        console.log(el.cells[0].innerText, el.className);
    });
}

function createInfoTable() {
    const li = document.createElement('li');
    const rowHead = document.createElement('tr');
    const rowInfo = document.createElement('tr');
    li.id = "navbarHeaderInfo";
    rowHead.className = 'rowHead';
    rowInfo.className = 'rowInfo';


    createTD('total', "totalInfo");
    createTD('errors', "errorsInfo");
    createTD('danger', "dangerInfo");
    createTD('unpublished', "notPublishedInfo");
    createTD("future", 'futureInfo');
    createTD("today", 'todayInfo');
    createTD("past", 'passedInfo');
    createTD("comm", 'commInfo');
    createTD('seconds', "headerInfo");

    li.appendChild(rowHead);
    li.appendChild(rowInfo);

    function createTD(title, id) {
        const tdHead = document.createElement('td');
        const tdInfo = document.createElement('td');
        tdHead.innerText = title;
        tdHead.id = title + "Head";
        tdInfo.innerText = '{INFO}';
        tdInfo.id = id;
        rowHead.appendChild(tdHead);
        rowInfo.appendChild(tdInfo);
    }
    //
    const btn = document.createElement("button");
    btn.textContent = 'DONT PRESS ME';
    btn.id = 'test'
    btn.onclick = function () {
        console.log("BUTTON CLICKED:");
        moreInfo();
    }
    navbar.prepend(btn);

    //
    navbar.prepend(li);
}

function startCountdown(seconds) {
    let counter = seconds;
    const interval = setInterval(() => {
        document.querySelector("#headerInfo").style.color = colorCommission;
        document.querySelector("#headerInfo").innerText = counter;
        counter--;

        if (counter < 0) {
            clearInterval(interval);
            headerInfo.innerText = 'Ding!';
        }
    }, 1000);
}
startCountdown(5);

function auctionDateCheck(element) {
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

    if (deadlineDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
        element.className = "today"
    } else if (commDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
        element.className = "commission"
    } else if (firstDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0) || deadlineDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
        element.className = "passed"
    } else {
        element.className = "future"
    }
    if (element.cells[3].querySelector("b") != "null") {
        element.cells[3].innerHTML += "<br><b><i>" + output + "</i></b>"
    }
}

function stringToDate(string) {
    string = string.split(" ")[0].split(".");
    return new Date(string[2], string[1] - 1, string[0]);
}

//deprecated
function dangerOPEN() {
    console.log("dangerOPen:", this.getComputedStyle.id);
    table.forEach(el => {
        if (el.className === "danger") {
            console.log(el.cells[0].innerHTML)
            // window.open(el.querySelector('a').href, "_blank")
        }
    })
}

//styling bellow
document.head.insertAdjacentHTML("beforeend", `<style>
li#navbarHeaderInfo {
    vertical-align: middle;
    text-align: center;
    padding-right: 20px;
}
li#navbarHeaderInfo td {
        padding: 2px;
        width: 100px;
        border: 1px;
    }
    tr.rowHead {
        font-style: italic;
        font-size: small;
    }
    tr.rowInfo {
        font-weight: bold;
        font-size: medium;
        color: white;
    }
    td.hidden-xs {
        position: relative;
    }
    .tt {
        display: none;
        position: absolute;
        z-index: 100;
        border: 1px;
        background-color: white;
        border: 1px solid green;
        padding: 3px;
        color: green;
        top: 20px;
        left: 20px;
    }
    td.hidden-xs:hover .tt {
        display: block;
    }
    </style>`);