console.clear();
console.log('auctions_v4');
let auctionsTable = document.querySelector('tbody').querySelectorAll('tr');
let leftSideNavigation = document.querySelector('.navbar-default.navbar-static-side');
let today = new Date();
let auctions = [];

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

function main() {
    createInfoTable();
    createButton();

    showDeadline();
    setAuctionsClasses();

    addToInfoTable();


}
main();

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
        if (el.className != 'danger'){
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

//styling bellow
document.head.insertAdjacentHTML("beforeend", `<style>

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

    #infoButtonContainer {
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 30px;
    }
        </style>`);