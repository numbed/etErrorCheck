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

    // setAuctionsClasses() must be before showDeadline() or it will not work properly !!! TO BE FIXED !!!
    setAuctionsClasses();
    showDeadline();

}
main();

// show deadline for publishing documents in forth column
// called in main()
function showDeadline() {
    auctionsTable.forEach(el => {
        let dateToShow = deadlineCheck(el.cells[2].innerText).getDate() + "." + (deadlineCheck(el.cells[2].innerText).getMonth() + 1) + "." + deadlineCheck(el.cells[2].innerText).getFullYear();
        console.log("🚀 ~ file: auctions_v4.js:65 ~ showDeadline ~ deadlineCheck(el.cells[2].innerText).getMonth(): LOADED", deadlineCheck(el.cells[2].innerText).getMonth())
        if (!el.cells[3].innerHTML.includes('br')) {
            el.cells[3].innerHTML += '<br>' + dateToShow.italics().bold();
        }
    });
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

// called in showDeadline() | auctionDateCheck()
function deadlineCheck(date) {
    let firstDate = stringToDate(date);
    console.log("🚀 ~ file: auctions_v4.js:135 ~ deadlineCheck ~ firstDate: LOADED", firstDate)
    let deadlineDate = new Date();
    let deadline = new Date();

    if (firstDate.getDay() == 1 || firstDate.getDay() == 4) {
        deadline = firstDate.getDate() - 20;
    } else if (firstDate.getDay() == 2 || firstDate.getDay() == 5) {
        deadline = firstDate.getDate() - 18;
    } else if (firstDate.getDay() == 3) {
        deadline = firstDate.getDate() - 19;
    }
    deadlineDate.setDate(deadline);
    return deadlineDate;
}

// called in auctionDateCheck()
function commissionCheck(date) {
    let firstDate = stringToDate(date);
    let commissionDate = new Date();
    let commission = new Date();

    if (firstDate.getDay() == 1) {
        commission = firstDate.getDate() - 3;
    } else {
        commission = firstDate.getDate() - 1;
    }
    commissionDate.setDate(commission);
    return commissionDate;
}

// called in main()
function setAuctionsClasses() {
    auctionsTable.forEach(el => {
        if (window.getComputedStyle(el).color === "rgb(153, 153, 153)") {
            el.cells[(el.querySelectorAll('td').length - 1)].className = 'notPublished';
        } else {
            el.cells[(el.querySelectorAll('td').length - 1)].className = auctionDateCheck(el);
        }
    })
}

// called in setAuctionsClasses()
function auctionDateCheck(el) {
    let string = el.cells[2].innerText
    let deadline = deadlineCheck(string);
    let commission = commissionCheck(string);
    

    if (deadline.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)) {
        return "today";
    } else if (deadline.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0) && commission.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)) {
        return "commission";
    } else if (deadline.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
        return "passed";
    } else {
        return "future";
    }
}

// called in stringToDate()
function stringToDate(string) {
    string = string.split(" ")[0].split(".");
    return new Date(string[2], (string[1] -1 ), string[0]);
}

//styling bellow
document.head.insertAdjacentHTML("beforeend", `<style>

    .passed {
        background-color: #81B622;
    }

    .future {
        background-color: #FFBB5C;
    }

    .today {
        background-color: #D1462F;
    }

    .commission {
        background-color: #040D12;
    }

    .notPublished {
        background-color: rgb(153, 153, 153);
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