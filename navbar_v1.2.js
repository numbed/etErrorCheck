//line: 
//line: 221 moreInfo() next to be created, shows info from auctions form page to auctions table
console.clear();
console.log("--------------------------------navbar_v1.1")
let infoTableParams = [{
        id: 'frames',
        color: 'blue'
    }, {
        id: 'errors',
        color: 'black'
    },
    {
        id: 'danger',
        color: '#C70039'
    },
    {
        id: 'notPublished',
        color: '#FFBB5C'
    },
    {
        id: 'future',
        color: '#E25E3E'
    },
    {
        id: 'today',
        color: '#D1462F'
    },
    {
        id: 'passed',
        color: '#81B622'
    },
    {
        id: 'commission',
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

let table = document.querySelector('tbody').querySelectorAll('tr');
let navbar = document.querySelector(".navbar.navbar-static-top.white-bg").querySelector("ul");
let today = new Date();
let auctions = []

function main() {
    //start iframe data gathering cooldown
    setAuctionsClasses();
    createHeaderTable();
    addWoodsTableToAuctions();
    startCountdown(10);
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

    table.forEach(el => {
        const iFrame = document.createElement('iframe');
        iFrame.id = el.cells[0].innerText;
        iFrame.style.display = "none";
        iFrame.src = el.cells[(el.querySelectorAll('td').length - 2)].querySelector('a').href;
        el.cells[0].appendChild(iFrame);
        iFrame.onload = function () {
            let framesInfo = document.querySelector("#navbarHeaderInfo").querySelector("#frames");
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
    table.forEach(el => {
        if (el.className != "danger") {
            let input = auctionDateCheck(el);
            switch (input) {
                case "commission":
                    el.className = "commission";
                case "future":
                    el.className = "future";
                case "today":
                    el.className = "today";
                case "passed":
                    el.className = "passed";
            }

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

function createHeaderTable() {
    //creates container element to add to header that contains auctions rows infos
    const container = document.createElement('li');
    container.id = "navbarHeaderInfo";

    //creates element that holds cell titles
    const rowHead = document.createElement('tr');
    rowHead.className = 'rowHead';
    container.appendChild(rowHead);

    //creates element that holds cell infos
    const rowInfo = document.createElement('tr');
    rowInfo.className = 'rowInfo';
    container.appendChild(rowInfo);

    //creates cell blocks for each array element
    infoTableParams.forEach(el => {
        createTD(el);
    });

    function createTD(el) {
        const tdHead = document.createElement('td');
        tdHead.innerText = el.id;
        tdHead.id = el.id + "Head";

        const tdInfo = document.createElement('td');
        tdInfo.innerText = '{INFO}';
        tdInfo.id = el.id;
        tdInfo.style.backgroundColor = el.color;

        rowHead.appendChild(tdHead);
        rowInfo.appendChild(tdInfo);
    }

    //creates button to add to header and redirects to new function when clicked
    const btn = document.createElement("button");
    btn.textContent = 'DONT PRESS ME';
    btn.id = 'testBTN'
    btn.onclick = function () {
        console.log("BUTTON CLICKED:");
        moreInfo(3000);
    }

    //creates total auctions info container
    const totalContainer = document.createElement("td");
    totalContainer.id = 'total';
    totalContainer.rowSpan = "3";
    totalContainer.innerText = table.length;
    //add secContainer to rowHead
    rowHead.prepend(totalContainer);

    //creates seconds container
    const secContainer = document.createElement("td");
    secContainer.id = 'seconds';
    secContainer.rowSpan = "3";
    //add secContainer to rowHead
    rowHead.append(secContainer);

    //add button to header
    navbar.prepend(btn);
    //add container to header
    navbar.prepend(container);
}

function createWoodsTable() {
    console.log("🚀 ~ file: navbar_v1.2.js:245 ~ createWoodsTable ~ createWoodsTable:", loaded)
    // Create the tWoods element
    var tWoods = document.createElement('tWoods');
    tWoods.id = 'woodsTable';
    // tWoods.style.visibility = "hidden";

    // Create the tWoods head (thead) element
    var thead = document.createElement('thead');
    var trHead = document.createElement('tr');

    // Append the tWoods header row to the tWoods head
    thead.appendChild(trHead);

    // Create the tWoods body (tbody) element
    var tbody = document.createElement('tbody');
    var trBody = document.createElement('tr');

    // Create the table header (th) elements for the table head
    // Create the table data (td) elements for the table body
    woodsTable.forEach(el => {
        let th = document.createElement('th')
        th.innerText = el.title
        trHead.appendChild(th)

        let td = document.createElement('div')
        td.id = el.id
        trBody.appendChild(td)
    })

    // Append the tWoods data row to the tWoods body
    tbody.appendChild(trBody);

    // Append the tWoods head and body to the tWoods
    tWoods.appendChild(thead);
    tWoods.appendChild(tbody);

    return tWoods;
}

// Add the tWoods to the document body (or any other desired location)
function addWoodsTableToAuctions() {
    console.log("🚀 ~ file: navbar_v1.2.js:290 ~ addWoodsTableToAuctions ~ addWoodsTableToAuctions:", loaded)
    table.forEach(el => {
        let text = el.cells[5].innerText;
        el.cells[5].innerHTML = text + "<br>"
        el.cells[5].appendChild(createWoodsTable())
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
    infoTableParams.forEach(el => {
        document.getElementById(el.id).addEventListener("mouseover", (event) => {
                // highlight the mouseover target
                event.target.style.color = "black";
                table.forEach(element => {
                    if (element.className === el.id) {
                        element.style.backgroundColor = el.color;
                        element.style.color = 'white';
                    }
                })

                // reset the color after a short delay
                setTimeout(() => {
                    event.target.style.color = "";
                    table.forEach(element => {
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
            table.forEach(element => {
                if (element.className === el.id) {
                    console.log(element.cells[0].innerHTML)
                    // window.open(el.querySelector('a').href, "_blank")
                }
            })
        });
    })
}

function colorAuctionsTable() {
    table.forEach(el => {
        let elLength = el.querySelectorAll('td').length;
        infoTableParams.forEach(element => {
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

    if (deadlineDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
        return "today";
    } else if (commDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
        return "commission";
    } else if (firstDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0) || deadlineDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
        return "passed";
    } else {
        return "future";
    }
}

function moreInfo(params) {
    console.log("🚀 ~ file: navbar_v1.1.js:30 ~ moreInfo ~ params:", params)
    startCountdown(params / 1000);
    auctions.forEach(el => {
        console.log("🚀 ~ file: navbar_v1.2.js:327 ~ moreInfo ~ el.id:", el.id, el)

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
        let button = document.querySelector('#testBTN')
        if (button.innerText === "SHOW") {
            button.innerText = "HIDE";
            document.querySelectorAll("#woodsTable").forEach(el => {
                el.style.visibility = ""
            })
        } else if (button.innerText === "HIDE") {
            button.innerText = "SHOW";
            document.querySelectorAll("#woodsTable").forEach(el => {
                el.style.visibility = "hidden"
            })
        }
    }
}

function stringToDate(string) {
    string = string.split(" ")[0].split(".");
    return new Date(string[2], string[1] - 1, string[0]);
}

function arrayCounter() {
    const count = {};
    table.forEach(el => {
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
        let secondsInfo = document.querySelector("#navbarHeaderInfo").querySelector("#seconds");
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

td#total,
td#seconds {
    font-style: normal;
    font-weight: bold;
    font-size: xx-large;
}

#woodsTable {    
    vertical-align: middle;
    text-align: center;
}

#woodsTable th{
    padding: 2px;
    width: 30px;
    font-style: italic;
    font-size: normal;
}

#woodsTable td {
    padding: 2px;
    width: 30px;
    font-style: italic;
    font-size: normal;
}

#testBTN {
    margin: 10px 28px 10px 8px;
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