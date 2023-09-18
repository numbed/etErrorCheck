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

function prepareSideNavbar (){
    // separate left side navgiation menu from newly created info table with horizontal line
    let hr = document.createElement('hr');
    leftSideNavigation.appendChild(hr);

    const table = document.createElement('div');
    table.className = '';
    table.id =  'infoTable';

    const tableRow = document.createElement('div');
    tableRow.className = 'infoTableRow';
    
    const tableRowTitle = document.createElement('div')
    tableRowTitle.className = 'infoTableRowTitle';
    tableRowTitle.innerText = 'Търгове';

    const tableRowInfo = document.createElement('div')
    tableRowInfo.className = 'tableRowInfo';
    tableRowInfo.id = 'numberOfauctions';
    tableRowInfo.innerText = auctionsTable.length;

    leftSideNavigation.appendChild(table);
    table.appendChild(tableRow);
    tableRow.appendChild(tableRowTitle)
    tableRow.appendChild(tableRowInfo)
}
prepareSideNavbar();

//styling bellow
document.head.insertAdjacentHTML("beforeend", `<style>
.infoTableRow {
    overflow: hidden; /* add this to contain floated children */
}
.infoTableRowTitle {
    width: 70%;
    float:left; /* add this */
    border: 1px solid red;
}
.infoTableRowInfo {
    text-align: center;
    width: 30%;
    float:left; /* add this */
    border: 1px solid red;
}
    </style>`);