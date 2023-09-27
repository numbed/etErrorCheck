console.clear();
console.log('auctions_v4');
let auctionsTable = document.querySelector('tbody').querySelectorAll('tr');
let leftSideNavigation = document.querySelector('.navbar-default.navbar-static-side');
let today = new Date();
let auctions = [];

//toast shits
const toastContainer = document.createElement('div');
toastContainer.className = 'toast-container';
document.querySelector('.navbar-header').appendChild(toastContainer);
//toast shits


let textToBeReplaced = ['търг', 'конкурс', 'ценово', 'добив', 'корен', 'действително добити', 'прогнозни'];
let auctionsErrors = ['конкурс', 'ценово'];

// let auctionDocumetsTable = [{
//         id: 'docs',
//         title: 'Документи'
//     }, {
//         id: 'docsFirstByuer',
//         title: '1ви купувач'
//     },
//     {
//         id: 'docsSecondByuer',
//         title: '2ри купувач'
//     }
// ]
let auctionDocumetsTable = [{
    id: 'docs',
    title: 'Документи'
}]
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
}, {
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
    auctionPublish();

    auctionsTable.forEach(item => {
        // changes cell color if auction is in the array
        auctionsErrors.forEach(el => {
            if (item.cells[4].innerText.includes(el)) {
                item.cells[4].style.color = 'white'
                item.cells[4].style.backgroundColor = 'red'
            }
        })

        item.cells[4].innerHTML += '<span id="docsLengthInfo"></span>';
        // replaces text in the array with uppercase
        textToBeReplaced.forEach(el => {
            item.cells[4].innerHTML = item.cells[4].innerHTML.replace(el, el.toUpperCase().bold())
        })
    })

    createInfoTable();
    createButton();

    showDeadline();
    setAuctionsClasses();

    addToInfoTable();
    addMouseFunctionsToInfoTable();


    toastCheck();


    createIFrames();
    // check if loaded frames are equal to number of auctions on page, after specific time
    setTimeout(() => {
        console.log("timeout")
        if (counter === auctionsTable.length) {
            populateTables()
            document.querySelector('#infoButtonContainer').style.display = '';
            uploadedFilesCheck();
            addToInfoTable(); // update #infoTable after auctions file check
        }
    }, 9500);

    prepareCells();

    errorCheck();
}
main();

//TOAST FUNCTIONS
function toastCheck() {
    //creating toast notifications if needed
    let timeoutMS = 50;
    if (isCounterZero(arrayCounter().future) != 0) {
        setTimeout(() => {
            createToast('бъдещи: ', 'toast-future', isCounterZero(arrayCounter().future) + isCounterZero(arrayCounter().notPublished))
        }, timeoutMS);
        timeoutMS += 300;
    }
    if (isCounterZero(arrayCounter().notPublished) != 0) {
        setTimeout(() => {
            createToast('непубликувани: ', 'toast-notPublished', isCounterZero(arrayCounter().notPublished))
        }, timeoutMS);
        timeoutMS += 300;
    }
    if (isCounterZero(arrayCounter().today) != 0) {
        setTimeout(() => {
            createToast('краен срок [днес]: ', 'toast-today', isCounterZero(arrayCounter().today))
        }, timeoutMS);
        timeoutMS += 300;
    }
    if (isCounterZero(arrayCounter().commission) != 0) {
        setTimeout(() => {
            createToast('комисии: ', 'toast-commission', isCounterZero(arrayCounter().commission))
        }, timeoutMS);
        timeoutMS += 300;
    }
    if (isCounterZero(arrayCounter().danger) != 0) {
        setTimeout(() => {
            createToast('прекратени:', 'toast-danger', isCounterZero(arrayCounter().danger))
        }, timeoutMS);
        timeoutMS += 300;
    }
    if (isCounterZero(arrayCounter().passed) != 0) {
        setTimeout(() => {
            createToast('минали: ', 'toast-passed', isCounterZero(arrayCounter().passed))
        }, timeoutMS);
        timeoutMS += 300;
    }
}

function showToast() {
    var toast = document.getElementById("toast");
    toast.style.display = "block";
}

function closeToast() {
    var toast = document.getElementById("toast");
    console.log('click', this.parentElement.className.split('-')[1]);
    this.parentElement.parentElement.style.display = 'none';
    this.parentElement.parentElement.classList.remove('show');

}

function tabOpen() {
    parentClass = this.className.split('-')[1];
    auctionsTable.forEach(el => {
        if (el.className === parentClass) {
            let link = el.querySelectorAll('td')[7].querySelector('a').href;
            window.open(link, "_blank");
        }
    })
}

function createToast(head, classN, number) {

    const toast = document.createElement('div');
    toast.className = 'toast'
    toast.style.display = "block";
    toast.classList.add('show');
    toast.classList.add(classN);
    
    const toastHead = document.createElement('div');
    toastHead.textContent = head;
    toastHead.onclick = tabOpen;
    
    const toastInfo = document.createElement('div');
    toastInfo.innerHTML = number;
    toastInfo.classList.add(classN);
    toastInfo.onclick = tabOpen;

    const closeButton = document.createElement('div');
    closeButton.onclick = closeToast;
    closeButton.innerText = 'x';
    closeButton.className = 'close-button'

    toast.appendChild(toastHead);
    toast.appendChild(toastInfo);
    toast.appendChild(closeButton);

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('show');
    }, 7000);
}
//TOAST FUNCTIONS


// called in main()
//clicks all auction publish buttons if present
function auctionPublish() {
    console.log("-------------------------------------------------------auctionPublish()");
    let btns = document.querySelector('tbody').querySelectorAll('button');
    if (btns.length != 0) {
        btns.forEach(el => {
            el.click();
        })
    }
}

// called in main()
// error check for duplicates and wrong type of auction
function errorCheck() {
    console.log("-------------------------------------------------------errorCheck()");
    for (let i = 0; i < auctionsTable.length; i++) {
        for (let j = 0; j < auctionsTable.length; j++) {
            if (i !== j) {
                if (auctionsTable[i].cells[1].innerText === auctionsTable[j].cells[1].innerText && auctionsTable[i].cells[2].innerText === auctionsTable[j].cells[2].innerText) {
                    auctionsTable[i].className = 'error';
                    auctionsTable[j].className = 'error';
                }
            }
        }
    }
}

// called in main() in setTimeout
function populateTables() { //called in newButtonFunction()
    auctionsTable.forEach((element, index) => {
        auctions.forEach(el => {
            if (element.cells[0].innerText === el.id) {

                function documentsDisplay() {
                    el.documents.forEach(doc => {
                        let docSpan = document.createElement('a')
                        docSpan.innerText = doc.name + " " + doc.date;
                        docSpan.href = doc.link;
                        docSpan.title = doc.name;
                        docSpan.download = doc.name;
                        docSpan.target = '_blank'
                        let newline = document.createElement('br')
                        element.querySelector('#docs').appendChild(docSpan)
                        element.querySelector('#docs').appendChild(newline)
                    })
                }
                documentsDisplay();

                element.querySelector('#docsLengthInfo').innerText = isCounterZero(el.documents.length) + "/" + isCounterZero(el.firstByuer.length) + "/" + isCounterZero(el.secondByuer.length);

                element.querySelector('#big').innerText = el.woodsInfo.big;
                element.querySelector('#mid').innerText = el.woodsInfo.mid;
                element.querySelector('#small').innerText = el.woodsInfo.small;
                element.querySelector('#ozm').innerText = el.woodsInfo.ozm;
                element.querySelector('#firewood').innerText = el.woodsInfo.firewood;
                element.querySelector('#total').innerText = el.woodsInfo.total;

                element.querySelector('#bidStep').innerText = el.money.bidStep;
                element.querySelector('#guarantee').innerText = el.money.guarantee;
                element.querySelector('#percentage').innerText = calcPercent();
                // element.querySelector('#percentage').innerText = ((el.money.guarantee / el.money.price) * 100).toFixed(2);

                function calcPercent() {
                    let percent = ((el.money.guarantee / el.money.price) * 100).toFixed(2);
                    if (percent > 5) {
                        percent.style.color = 'red';
                    }
                    return percent;
                }
            }
        })
    })
}

// called in main()
function prepareCells() {
    auctionsTable.forEach(el => {
        subjectCell = el.cells[4];
        woodsCell = el.cells[5];
        priceCell = el.cells[6];
        woodsCell = createContainer(woodsCell, 'woods', woodsTable)
        priceCell = createContainer(priceCell, 'price', priceTable)
        subjectCell = createContainer(subjectCell, 'docs', auctionDocumetsTable)
    })
}

// called in prepareCells()
function createContainer(cell, containerID, array) {
    // create container element
    const container = document.createElement('div');
    container.id = containerID;
    container.className = 'customContainer';
    container.style.display = 'none';


    array.forEach(el => {
        const contCell = document.createElement('div');
        contCell.className = 'containerCell';

        const title = document.createElement('div');
        title.innerHTML = (el.title + ": ").bold().italics();

        const info = document.createElement('div');
        info.id = el.id

        contCell.appendChild(title);
        contCell.appendChild(info);
        container.append(contCell)
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
            assingedCommissionCheck(loadedFrame, el.className, el.cells[8]);
        }
    })
}

// called in createIFrames
function assingedCommissionCheck(loadedFrame, classN, lastCell) {
    // needs changes for more precise work
    console.log("-------------------------------------------------------assingedCommissionCheck()");
    if (classN === 'commission') {
        const commission = loadedFrame.querySelector('select.form-control.commision');
        if (!commission) {
            let requests = loadedFrame.querySelectorAll('tbody') // needs changing
            if (requests.length < 8) {
                lastCell.style.backgroundColor = "#fa2a07";
            }
        } else if (commission.value != '') {
            lastCell.style.backgroundColor = "#9eb3c6";
        }
    }

}

// called in main() 
function uploadedFilesCheck() {
    auctionsTable.forEach(element => {
        if (element.className != 'danger' && element.className != 'commission') {
            auctions.forEach(item => {
                if (item.id === element.cells[0].innerText) {
                    if (item.documents.length != 0) {
                        element.className = 'passed'
                    }
                }
            })
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
                    date: el.innerHTML.split('/')[1].trim().split(" ")[0],
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
            console.log("click:", this.innerText, this.id);
            auctionsTable.forEach(element => {
                if (element.className === el.id) {
                    window.open(element.querySelectorAll('td')[7].querySelector('a').href, "_blank")
                }
            })
        });
    })
}

// called in main()
function addToInfoTable() {
    document.querySelector("#errors").innerHTML = isCounterZero(arrayCounter().error);;
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
            el.cells[3].innerHTML += '<br>' + '<b><i>' + dateToShow + '</b></i>';
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
    div.style.display = 'none';
    leftSideNavigation.appendChild(div);

    // Create a button element
    const button = document.createElement('button');
    button.id = 'infoButton';

    // Set the button's text
    button.textContent = 'SHOW';

    // Add an event listener to the button
    button.addEventListener('click', buttonClick);

    // Append the button to a container element
    div.appendChild(button);
}

// called in createButton()
function buttonClick() {
    console.log('clicked: button')
    let button = document.querySelector('#infoButton')
    if (button.innerText === "SHOW") {
        button.innerText = "HIDE";
        document.querySelectorAll(".customContainer").forEach(el => {
            el.style.display = "inline"
        })

    } else if (button.innerText === "HIDE") {
        button.innerText = "SHOW";
        document.querySelectorAll(".customContainer").forEach(el => {
            el.style.display = "none"
        })
    }
}

// called in main()
function setAuctionsClasses() {
    auctionsTable.forEach(el => {
        if (el.className != 'danger') {
            if (window.getComputedStyle(el).color === "rgb(153, 153, 153)") {
                el.className = 'notPublished';
                el.querySelector('b').className = auctionDateCheck(el);
            } else {
                el.className = auctionDateCheck(el);
                el.querySelector('b').className = auctionDateCheck(el);
            }
        }
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
    display: inline;
    width: 100%;
}
.customContainer>div {
    flex:1;
    padding: 2px;
}

.containerCell{
    display: flex;
}

.containerCell>div:first-of-type{
    text-align: right;
    width: 30%;
}
.containerCell>div:last-of-type{
    text-align: left;
    width: 70%;
    padding-left: 4%;
}

.error>td:nth-child(1),
.error>td:nth-child(3),
.error>td:nth-child(6),
.error>td:last-of-type{
    background-color: black;
    color: white;
}

.passed>td:last-of-type {
    background-color: #81B622;
}
b.passed{
    color: #81B622;
}

.future>td:last-of-type {
    background-color: #FFBB5C;
}
.future>td:nth-child(4)>b,
.future>td:nth-child(5)>b {
    color: #FFBB5C;
}
b.future {
    color: #FFBB5C;
}

.today>td:last-of-type {
    background-color: #D1462F;
}
.today>td:nth-child(4)>b,
.today>td:nth-child(5)>b {
    color: #D1462F;
}
b.today {
    color: #D1462F;
}

.commission>td:last-of-type {
    background-color: #040D12;
}
.commission>td:nth-child(4)>b,
.commission>td:nth-child(5)>b {
    color: #040D12;
}
b.commission {
    color: #040D12;
}

.notPublished>td:last-of-type {
    background-color: rgb(153, 153, 153);
}

#docs>a{
    font-style: italic;
}
#docsLengthInfo {
    padding: 5px;
    font-weight: 600;
    font-size: larger;
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

/* Toast Container */
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
}
.toast {
    background-color: white;
    color: black;
    width: 550px;
    height: 50px;
    line-height: 44px;
    border-left: 1em solid;
    padding: 2px 10px 0px 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    margin-bottom: 20px;
    opacity: 0;
    transform: translateX(100%);
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  }
.toast>div{
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 3px 0px 0px 5px;
    font-size: larger;
}
.toast>div:first-of-type {
    width: 135px;
    text-align: right;
}
.toast>div:nth-child(2) {
    width: 345px;
    opacity: 0.5;
}
.toast-danger{
    border-left-color: pink;
}
.toast-passed{
    border-left-color: #81B622;
}
.toast-commission{
    border-left-color: #040D12;
}
.toast-today{
    border-left-color: #D1462F;
}
.toast-future{
    border-left-color: #FFBB5C;
}
.toast-notPublished{
    border-left-color: #999999;
}
/* Show Animation */
.toast.show {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  }
/* CSS for the close button */
.close-button {
    text-align: center;
    float:right;
    display: block;
    width:40px;
    margin-left:auto;
    top: 0.5px;
    right: 8px;
    color: black;
    cursor: pointer;
}
        </style>`);