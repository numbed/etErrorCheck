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
    },
];

function main() {
    createInfoTable();
    createButton();

}
main();

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
    button.addEventListener('click', function () {
        alert('Button clicked!');
    });

    // Append the button to a container element
    div.appendChild(button);
}

//styling bellow
document.head.insertAdjacentHTML("beforeend", `<style>
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