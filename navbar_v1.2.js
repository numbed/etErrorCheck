//line: 
//line: 221 moreInfo() next to be created, shows info from auctions form page to auctions table
console.clear();
console.log("--------------------------------navbar_v1.1")
let navbarInfoTable = [{
        id: 'frames',
        title: 'frames',
        color: 'blue'
    }, {
        id: 'errors',
        title: 'errors',
        color: 'black'
    },
    {
        id: 'danger',
        title: 'danger',
        color: '#C70039'
    },
    {
        id: 'notPublished',
        title: 'notPublished',
        color: '#FFBB5C'
    },
    {
        id: 'future',
        title: 'future',
        color: '#E25E3E'
    },
    {
        id: 'today',
        title: 'today',
        color: '#D1462F'
    },
    {
        id: 'passed',
        title: 'passed',
        color: '#81B622'
    },
    {
        id: 'commission',
        title: 'commission',
        color: '#040D12'
    },
];

let woodsTable = [{
        id: 'big',
        title: 'Е'
    }, {
        id: 'medium',
        title: 'С'
    },
    {
        id: 'small',
        title: 'Д'
    },
    {
        id: 'ozm',
        title: 'ОЗМ'
    },
    {
        id: 'fire',
        title: 'огрев'
    },
    {
        id: 'total',
        title: 'общо'
    },
]

let priceTable = [{
    id: "price",
    title: "цена"
}, {
    id: "bidStep",
    title: "стъпка"
}, {
    id: "guarantee",
    title: "гаранция"
}]

let loaded = "LOADED"

let auctionsTable = document.querySelector('tbody').querySelectorAll('tr');
let navbar = document.querySelector(".navbar.navbar-static-top.white-bg").querySelector("ul");
let today = new Date();
let auctions = []

function main() {
    //start iframe data gathering cooldown
    setAuctionsClasses();
    // createHeaderTable();

    // create li element to hold navbarInfoTable in header
    const li = document.createElement("li");
    li.id = "navbarContainer";
    li.appendChild(createTable("navbarHeaderInfo", navbarInfoTable));
    navbar.prepend(li);
    // addWoodsTableToAuctions();

    addTableToAuctions("woodsTable", woodsTable, 5);
    addTableToAuctions("priceTable", priceTable, 6);
    startCountdown(10);


    // create element to show total number of auctions on page
    const totalTD = document.createElement("div")
    const totalLI = document.createElement("li")
    totalTD.id = "totals";
    totalTD.rowSpan = "3";
    totalTD.innerText = table.length;
    totalLI.prepend(totalTD)
    navbar.prepend(totalLI);

    // create element to show remaining seconds
    const secondsTD = document.createElement("div")
    const secondsLI = document.createElement("li")
    secondsTD.id = "seconds";
    secondsTD.rowSpan = "3";
    secondsTD.innerText = table.length;
    secondsLI.appendChild(secondsTD);
    navbar.appendChild(secondsLI);
    li.after(secondsLI)


    // create button to add to navbar and redirects to new function when clicked
    const btn = document.createElement("button");
    const btnLI = document.createElement("li")
    btn.textContent = 'DONT PRESS ME';
    btn.id = 'testBTN'
    btn.onclick = function () {
        console.log("BUTTON CLICKED:");
        moreInfo(3000);
    }
    btnLI.appendChild(btn);
    navbar.appendChild(btnLI);
    secondsLI.after(btnLI)

    addHeaderTableInfo();
    addMouseFunctionsToHeaderTable();
    colorAuctionsTable();
    //btn click
    createIFrames();

    console.log(auctions)

}
main();

function createIFrames() {
    console.log("🚀 ~ file: navbar_v1.2.js:56 ~ createIFrames ~ createIFrames: LOADED")
    let counter = 0;

    auctionsTable.forEach(el => {
        const iFrame = document.createElement('iframe');
        iFrame.id = el.cells[0].innerText;
        iFrame.style.display = "none";
        iFrame.src = el.cells[(el.querySelectorAll('td').length - 2)].querySelector('a').href;
        el.cells[0].appendChild(iFrame);
        iFrame.onload = function () {
            let framesInfo = document.querySelector("#frames");
            let loadedFrame = iFrame.contentWindow.document;
            let obj = []; //maybe it shoud be inside iFrame.onload
            let woodsObj = {}
            let woodsTableInputs = loadedFrame.querySelector('tbody').querySelectorAll('input');
            woodsTableInputs.forEach((el, index) => {
                if (index != 0) {
                    woodsObj[el.name.split('][')[1]] = el.value;
                }
            })

            let money = {
                price: loadedFrame.querySelector("#auctionStartPrice").value,
                bidStep: loadedFrame.querySelector("#аuctionBidStep").value,
                guarantee: loadedFrame.querySelector("#аuctionGuarantee").value
            }

            function getDocumentlist(id) {
                //check if id frame existst
                var elementExists = loadedFrame.getElementById(id);
                if (elementExists != null) {
                    let docs = loadedFrame.getElementById(id).querySelector('tbody').querySelectorAll('a');
                    let docsParameters = []
                    docs.forEach(el => {
                        let item = {
                            name: el.innerHTML.split('/')[0],
                            date: el.innerHTML.split('/')[0].split(" ")[0],
                            link: el.href
                        }
                        docsParameters.push(item)
                    })
                    return docsParameters;
                } else {
                    return 0;
                }
            }

            delay(1000).then(() => saveToObj());

            function saveToObj() {
                obj.id = el.cells[0].innerText;
                obj.secondDate = loadedFrame.querySelector("#auctionSecondDueDate").value;
                obj.appDueDate = loadedFrame.querySelector("#auctionApplicationsDueDate").value.split(' ')[0];
                obj.woodsInfo = woodsObj;
                obj.documents = getDocumentlist("auctionDocuments");
                obj.firstByuer = getDocumentlist("auctionOrder");
                obj.secondByuer = getDocumentlist("auctionSecOrder");
                obj.money = money;

                auctions.push(obj);
                counter++;
                framesInfo.innerText = counter;
            }

        }
        return
    });
}

function setAuctionsClasses() {
    auctionsTable.forEach(el => {
        if (el.className != "danger") {
            el.className = auctionDateCheck(el)

            //set auction class to notPublished based on font color
            if (window.getComputedStyle(el).color === "rgb(153, 153, 153)") {
                el.className = 'notPublished';
            };
        } else {
            auctionDateCheck(el);
        }
        console.log(el.className);
    });
}

function createTable(tableID, array) {
    //create table element
    const table = document.createElement('div');
    table.id = tableID;
    // table.className = 'customContainer'
    // table.visibility = 'hidden';

    //create thead,tbody elements
    const thead = document.createElement('div');
    table.className = 'customContainer'
    thead.id = 'rowHead'
    const tbody = document.createElement('div');
    tbody.id = 'rowInfo'
    table.className = 'customContainer'

    // crate table header & body elements
    array.forEach(el => {
        let th = document.createElement('div');
        th.innerText = el.title;
        thead.appendChild(th);

        let td = document.createElement('div');
        td.id = el.id;
        // td.style.backgroundColor = el.color;
        tbody.appendChild(td);
    });

    table.appendChild(thead);
    table.appendChild(tbody);

    return table;
}

// Add the tWoods to the document body (or any other desired location)
function addWoodsTableToAuctions() {
    console.log("🚀 ~ file: navbar_v1.2.js:290 ~ addWoodsTableToAuctions ~ addWoodsTableToAuctions:", loaded)
    auctionsTable.forEach(el => {
        let text = el.cells[5].innerText;
        el.cells[5].innerHTML = text + '<br><span id="navbarContainer">'
        el.cells[5].querySelector("span").appendChild(createTable("woodsTable", woodsTable))
    })
}

function addTableToAuctions(tableID, array, cellID) {
    auctionsTable.forEach(el => {
        let text = el.cells[cellID].innerText;
        el.cells[cellID].innerHTML = text + '<br><span id="navbarContainer">'
        el.cells[cellID].querySelector('span').appendChild(createTable(tableID, array))
    })

}

function addHeaderTableInfo() {
    //add #rowInfo data
    document.querySelector("#navbarHeaderInfo").querySelector("#errors").innerHTML = "N?A";
    document.querySelector("#navbarHeaderInfo").querySelector("#danger").innerHTML = isCounterZero(arrayCounter().danger);
    document.querySelector("#navbarHeaderInfo").querySelector("#notPublished").innerHTML = isCounterZero(arrayCounter().notPublished);
    document.querySelector("#navbarHeaderInfo").querySelector("#future").innerHTML = isCounterZero(arrayCounter().future) + "/" + (isCounterZero(arrayCounter().future) + isCounterZero(arrayCounter().notPublished));
    document.querySelector("#navbarHeaderInfo").querySelector("#today").innerHTML = isCounterZero(arrayCounter().today);
    document.querySelector("#navbarHeaderInfo").querySelector("#passed").innerHTML = isCounterZero(arrayCounter().passed);
    document.querySelector("#navbarHeaderInfo").querySelector("#commission").innerHTML = isCounterZero(arrayCounter().commission);
}

function addMouseFunctionsToHeaderTable() {
    navbarInfoTable.forEach(el => {
        document.getElementById(el.id).addEventListener("mouseover", (event) => {
                // highlight the mouseover target
                event.target.style.color = "white";
                event.target.style.backgroundColor = el.color;
                auctionsTable.forEach(element => {
                    if (element.className === el.id) {
                        element.style.backgroundColor = el.color;
                        element.style.color = 'white';
                    }
                })

                // reset the color after a short delay
                setTimeout(() => {
                    event.target.style.color = "";
                    event.target.style.backgroundColor = "";
                    auctionsTable.forEach(element => {
                        if (element.className === el.id) {
                            element.style.backgroundColor = "";
                            element.style.color = "";
                        }
                    })
                }, 750);
            },
            false, );

        document.getElementById(el.id).addEventListener('click', function handleClick() {
            console.log("click:", this.innerText);
            auctionsTable.forEach(element => {
                if (element.className === el.id) {
                    console.log(element.cells[0].innerHTML)
                    // window.open(el.querySelector('a').href, "_blank")
                }
            })
        });
    })
}

function colorAuctionsTable() {
    auctionsTable.forEach(el => {
        let elLength = el.querySelectorAll('td').length;
        navbarInfoTable.forEach(element => {
            if (el.className === element.id) {
                el.cells[(elLength - 1)].style.backgroundColor = element.color;
                el.cells[(elLength - 1)].style.backgroundColor = element.color;
                el.cells[3].querySelector('b').style.color = element.color;
            }
        })
    })
}

function auctionDateCheck(el) {
    let firstDate = stringToDate(el.cells[2].innerText);
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

    //shows deadline date in table 4th column
    if (el.cells[3].querySelector("b") != "null") {
        el.cells[3].innerHTML += "<br><b><i>" + output + "</i></b>"
    }

    //commission check
    if (firstDate.getDay() == 1) {
        comm = firstDate.getDate() - 3;
    } else {
        comm = firstDate.getDate() - 1;
    }
    commDate.setDate(comm);

    if (deadlineDate.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)) {
        return "today";
    } else if (deadlineDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0) && commDate.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)) {
        return "commission";
    } else if (deadlineDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
        return "passed";
    } else {
        return "future";
    }
}

function moreInfo(params) {
    startCountdown(params / 1000);
    auctions.forEach(el => {
        // console.log("🚀 ~ file: navbar_v1.2.js:327 ~ moreInfo ~ el.id:", el.id, el)

    })
    delay(params).then(() => btnChanger());

    function btnChanger() {
        console.log('more info running');
        document.querySelector('#testBTN').textContent = 'SHOW';
        document.querySelector('#testBTN').onclick = function () {
            newButtonFunction();
        }
    }

    function newButtonFunction() {
        populateTables();
        let button = document.querySelector('#testBTN')
        if (button.innerText === "SHOW") {
            button.innerText = "HIDE";
            document.querySelectorAll("#woodsTable").forEach(el => {
                el.style.visibility = ""
            })
            document.querySelectorAll("#priceTable").forEach(el => {
                el.style.visibility = ""
            })
        } else if (button.innerText === "HIDE") {
            button.innerText = "SHOW";
            document.querySelectorAll("#woodsTable").forEach(el => {
                el.style.visibility = "hidden"
            })
            document.querySelectorAll("#priceTable").forEach(el => {
                el.style.visibility = "hidden"
            })
        }
    }
}

function populateTables() { //called in newButtonFunction()
    console.log("🚀 ~ file: navbar_v1.2.js:434 ~ populateTables ~ populateTables: LOADED")
    auctionsTable.forEach((element, index) => {
        auctions.forEach(el => {
            if (element.cells[0].innerText === el.id) {
                console.count("ok", element.cells[0].innerText, el.id);
            }
        })
    })

}

function stringToDate(string) {
    string = string.split(" ")[0].split(".");
    return new Date(string[2], string[1] - 1, string[0]);
}

function arrayCounter() {
    const count = {};
    auctionsTable.forEach(el => {
        count[el.className] = (count[el.className] || 0) + 1;
    });
    return count;
}

function isCounterZero(counter) {
    if (counter === undefined) {
        return counter = 0;
    } else {
        return counter;
    }
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function startCountdown(seconds) {
    let counter = seconds;
    const interval = setInterval(() => {
        let secondsInfo = document.querySelector("#seconds");
        secondsInfo.innerText = counter;
        counter--;

        if (counter < 0) {
            clearInterval(interval);
            secondsInfo.innerText = 'Ding!';
        }
    }, 1000);
}

//styling bellow
document.head.insertAdjacentHTML("beforeend", `<style>
#navbarContainer {
    vertical-align: middle;
    text-align: center;
    padding-right: 20px;
}

.customContainer {
    display: table;
    width: 100%;
}

#rowHead>div,
#rowInfo>div {
    white-space: nowrap;
    /* Set the width to your desired value (e.g., 100px) */
    display: inline-block;
    margin-right: 0px;
    /* Adjust the spacing between divs as needed */

    border-left: 2px solid #0004ff;
    position: relative;
    top: 50%;
    bottom: 0;
}

#rowHead {
    border-bottom: 5px solid;
    font-style: italic;
    font-size: small;
}

#rowInfo {
    color: black;
    font-style: italic;
    font-size: small;
}

#rowHead > div:first-child, #rowInfo > div:first-child {
    border-left-style: hidden;
}

#navbarHeaderInfo #rowHead>div,
#rowInfo>div {
    width: 100px;
}

#navbarHeaderInfo #rowInfo {
    font-weight: bold;
    font-style: normal;
    font-size: medium;
}

#woodsTable #rowHead>div,
#woodsTable #rowInfo>div {
    width: 55px;
}

#priceTable #rowHead>div,
#priceTable #rowInfo>div {
    width: 100px;
}

div#totals,
div#seconds {
    font-style: normal;
    font-weight: bold;
    font-size: xx-large;
    padding: 5px;
    margin: 15px;
    vertical-align: middle;
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