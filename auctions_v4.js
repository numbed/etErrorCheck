console.clear();
console.log('auctions_v4');
let auctionsTable = document.querySelector('tbody').querySelectorAll('tr');
let leftSideNavigation = document.querySelector('.navbar-default.navbar-static-side');
let today = new Date();
let auctions = [];

let auctionDocumetsTable = [{
        id: 'docs',
        title: 'Документи'
    }, {
        id: 'docsFirstByuer',
        title: '1ви купувач'
    },
    {
        id: 'docsSecondByuer',
        title: '2ри купувач'
    }
]

let woodsTable = [{
        id: 'big',
        title: 'Е'
    }, {
        id: 'mid',
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
        id: 'firewood',
        title: 'огрев'
    },
    {
        id: 'total',
        title: 'общо'
    },
]

let priceTable = [{
    id: "bidStep",
    title: "стъпка"
}, {
    id: "guarantee",
    title: "гаранция"
},{
    id: "percentage",
    title: "процент"
}]

let infoTable = [{
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
    }
];

// counter for loaded iframes
let counter = 0;


function main() {
    createInfoTable();
    createButton();

    showDeadline();
    setAuctionsClasses();

    addToInfoTable();
    addMouseFunctionsToInfoTable();

    createIFrames();
    // check if loaded frames are equal to number of auctions on page, after specific time
    setTimeout(() => {
        console.log("timeout")
        if (counter === auctionsTable.length) {
            populateTables()
        }
    }, 9500);

    prepareCells();

}
main();

// called in main() in setTimeout
function populateTables() { //called in newButtonFunction()
    console.log("🚀 ~ file: navbar_v1.2.js:434 ~ populateTables ~ populateTables: LOADED")
    auctionsTable.forEach((element, index) => {
        auctions.forEach(el => {
            if (element.cells[0].innerText === el.id) {
                console.count("ok", element.cells[0].innerText, el.id);
                element.querySelector('#big').innerText = el.woodsInfo.big;
                element.querySelector('#mid').innerText = el.woodsInfo.mid;
                element.querySelector('#small').innerText = el.woodsInfo.small;
                element.querySelector('#ozm').innerText = el.woodsInfo.ozm;
                element.querySelector('#firewood').innerText = el.woodsInfo.firewood;
                element.querySelector('#total').innerText = el.woodsInfo.total;
                element.querySelector('#bidStep').innerText = el.money.bidStep;
                element.querySelector('#guarantee').innerText = el.money.guarantee;
                element.querySelector('#percentage').innerText = ((el.money.guarantee / el.money.price) * 100).toFixed(2);

                function calcPercent() {
                    let percent = ((el.money.guarantee / el.money.price) * 100).toFixed(2);
                    if (percent > 5) {
                        percent.style.color = 'red';
                    }
                    console.log("🚀 ~ file: navbar_v1.2.js:465 ~ calcPercent ~ percent: LOADED", percent)
                    return percent;
                }
            }
        })
    })

}

// called in main()
function prepareCells() {
    auctionsTable.forEach(el => {
        woodsCell = el.cells[5]
        priceCell = el.cells[6]
        woodsCell = createContainer(woodsCell, 'woods', woodsTable)
        priceCell = createContainer(priceCell, 'price', priceTable)
    })
}

// called in prepareCells()
function createContainer(cell, containerID, array) {
    // create container element
    const container = document.createElement('div');
    container.id = containerID;
    container.className = 'customContainer';
    // container.style.display = 'none';

    array.forEach(el => {
        const title = document.createElement('div');
        title.innerHTML = (el.title + ": ").bold().italics();

        const info = document.createElement('div');
        info.id = el.id


        container.appendChild(title);
        container.appendChild(info);
    })

    cell.appendChild(container);
}

// called in main()
// creating iframes for each row in auctionsTable, and loading corresponding auction in frame
function createIFrames() {

    auctionsTable.forEach(el => {

        // create iframe element
        const iFrame = document.createElement('iframe');
        let frameid = el.cells[0].innerHTML
        iFrame.id = frameid;
        iFrame.style.display = 'none';
        iFrame.src = el.cells[el.querySelectorAll('td').length - 2].querySelector('a').href;
        el.cells[0].appendChild(iFrame);

        iFrame.onload = function () {
            let loadedFrame = iFrame.contentWindow.document;
            // increase counter by 1 and show total number of loaded iframes in #infoTable
            counter++;
            document.querySelector('#frames').innerText = counter;
            getInfoFromFrame(loadedFrame);
        }
    })
}

// called in createIFrames()
function getInfoFromFrame(loadedFrame) {
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
        obj.id = loadedFrame.title.split(' ')[4];
        obj.secondDate = loadedFrame.querySelector("#auctionSecondDueDate").value;
        obj.appDueDate = loadedFrame.querySelector("#auctionApplicationsDueDate").value.split(' ')[0];
        obj.woodsInfo = woodsObj;
        obj.documents = getDocumentlist("auctionDocuments");
        obj.firstByuer = getDocumentlist("auctionOrder");
        obj.secondByuer = getDocumentlist("auctionSecOrder");
        obj.money = money;

        auctions.push(obj);
    }
}

// called in main()
// when hovering on #infoTable it colors according rows in auctionsTable
// when clicked on element in #infoTable opens new tabs according to clicked id if any
function addMouseFunctionsToInfoTable() {
    infoTable.forEach(el => {
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

// called in main()
function addToInfoTable() {
    document.querySelector("#errors").innerHTML = "N?A";
    document.querySelector("#danger").innerHTML = isCounterZero(arrayCounter().danger);
    document.querySelector("#notPublished").innerHTML = isCounterZero(arrayCounter().notPublished);
    document.querySelector("#future").innerHTML = isCounterZero(arrayCounter().future) + "/" + (isCounterZero(arrayCounter().future) + isCounterZero(arrayCounter().notPublished));
    document.querySelector("#today").innerHTML = isCounterZero(arrayCounter().today);
    document.querySelector("#passed").innerHTML = isCounterZero(arrayCounter().passed);
    document.querySelector("#commission").innerHTML = isCounterZero(arrayCounter().commission);

}

// show deadline for publishing documents in forth column
// called in main()
// error in deadlineCheck()-> removed | will be written anew
function showDeadline() {
    auctionsTable.forEach(el => {
        let firstDate = el.cells[2].innerText.split(' ')[0].split(".");
        let dateToShow = deadlineCheck(firstDate).getDate() + "." + (deadlineCheck(firstDate).getMonth() + 1) + "." + deadlineCheck(firstDate).getFullYear();
        if (!el.cells[3].innerHTML.includes('br')) {
            el.cells[3].innerHTML += '<br>' + dateToShow.italics().bold();
        }
    });
}

// called in auctionDateCheck(el) && showDeadline()
function deadlineCheck(date) {
    let firstDate = new Date(date[2], date[1] - 1, date[0]);
    let deadlineDate = new Date(firstDate);

    if (firstDate.getDay() == 1 || firstDate.getDay() == 4) {
        deadlineDate.setDate(firstDate.getDate() - 20);
    } else if (firstDate.getDay() == 2 || firstDate.getDay() == 5) {
        deadlineDate.setDate(firstDate.getDate() - 18);
    } else if (firstDate.getDay() == 3) {
        deadlineDate.setDate(firstDate.getDate() - 19);
    }

    return deadlineDate;
}

// called in auctionDateCheck(el)
function commissionDateCheck(date) {
    let firstDate = new Date(date[2], date[1] - 1, date[0]);
    let commissionDate = new Date(firstDate);

    if (firstDate.getDay() == 1) {
        commissionDate.setDate(firstDate.getDate() - 3);
    } else {
        commissionDate.setDate(firstDate.getDate() - 1);
    }

    return commissionDate;
}

// called in main()
function createInfoTable() {
    // separate left side navgiation menu from newly created info table with horizontal line
    let hr = document.createElement('hr');
    leftSideNavigation.appendChild(hr);

    const table = document.createElement('div');
    table.className = '';
    table.id = 'infoTable';
    leftSideNavigation.appendChild(table);

    for (let i = 0; i < infoTable.length; i++) {
        const item = infoTable[i];
        const tableRow = document.createElement('tr');

        // Create a cell for the title with background color
        const titleCell = document.createElement('td');
        titleCell.textContent = item.title;

        // Create an empty cell for the ID
        const idCell = document.createElement('td');
        idCell.id = item.id;
        idCell.textContent = "gish"; //stays for now just for styling purposes
        idCell.style.borderColor = item.color;

        // Append cells to the row
        tableRow.appendChild(titleCell);
        tableRow.appendChild(idCell);

        // Append the row to the table
        document.querySelector('#infoTable').appendChild(tableRow);
    }
}

// called in main()
function createButton() {
    // Create container element
    const div = document.createElement('div');
    div.id = 'infoButtonContainer';
    leftSideNavigation.appendChild(div);

    // Create a button element
    const button = document.createElement('button');
    button.id = 'infoButton';

    // Set the button's text
    button.textContent = 'Click Me';

    // Add an event listener to the button
    button.addEventListener('click', buttonClick);

    // Append the button to a container element
    div.appendChild(button);
}

// called in createButton()
function buttonClick() {
    alert('Button clicked!');
}

// called in main()
function setAuctionsClasses() {
    auctionsTable.forEach(el => {
        if (el.className != 'danger') {
            if (window.getComputedStyle(el).color === "rgb(153, 153, 153)") {
                el.className = 'notPublished';
            } else {
                el.className = auctionDateCheck(el);
            }
        }
        // if (window.getComputedStyle(el).color === "rgb(153, 153, 153)") {
        //     el.cells[(el.querySelectorAll('td').length - 1)].className = 'notPublished';
        // } else {
        //     el.cells[(el.querySelectorAll('td').length - 1)].className = auctionDateCheck(el);
        // }
    })
}

// called in setAuctionsClasses()
function auctionDateCheck(el) {
    let firstDate = el.cells[2].innerText.split(' ')[0].split(".");
    let deadlineDate = deadlineCheck(firstDate);
    let commissionDate = commissionDateCheck(firstDate);

    if (deadlineDate.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)) {
        return "today";
    } else if (deadlineDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0) && commissionDate.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)) {
        return "commission";
    } else if (deadlineDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
        return "passed";
    } else {
        return "future";
    }
}

// called in addToInfoTable()
function arrayCounter() {
    const count = {};
    auctionsTable.forEach(el => {
        count[el.className] = (count[el.className] || 0) + 1;
    });
    return count;
}

// called in addToInfoTable()
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

//styling bellow
document.head.insertAdjacentHTML("beforeend", `<style>
    .customContainer {
        display: flex;
        width: 100%;
    }

    .customContainer>div {
    flex:1;
    padding: 5px;
    }

    .passed>td:last-of-type {
        background-color: #81B622;
    }

    .passed>td:nth-child(4)>b {
        color: #81B622;
    }

    .future>td:last-of-type {
        background-color: #FFBB5C;
    }

    .future>td:nth-child(4)>b {
        color: #FFBB5C;
    }

    .today>td:last-of-type {
        background-color: #D1462F;
    }

    .today>td:nth-child(4)>b {
        color: #D1462F;
    }

    .commission>td:last-of-type {
        background-color: #040D12;
    }

    .commission>td:nth-child(4)>b {
        color: #040D12;
    }

    .notPublished>td:last-of-type {
        background-color: rgb(153, 153, 153);
    }

    .notPublished>td:nth-child(4)>b {
        color: rgb(153, 153, 153);
    }

    #infoTable {
        padding: 14px 20px 14px 25px;
        color: #a7b1c2;
        font-weight: 600;
    }

    #infoTable td {
        padding: 10px;
        border-bottom: 1px solid;
    }

    #infoTable tr:hover {
        background-color: #293846;
        color: white;
    }

    #infoTable tr > td:last-of-type {
        text-align: center;
        font-size: large;
    }

    #infoButtonContainer {
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 30px;
    }
        </style>`);