let table = document.querySelector('tbody').querySelectorAll('tr');
let navbar = document.querySelector(".navbar.navbar-static-top.white-bg").querySelector("ul");

function createInfoTable() {
    const li = document.createElement('li');
    const rowHead = document.createElement('tr');
    const rowInfo = document.createElement('tr');
    li.id = "navbarHeaderInfo";
    rowHead.className = 'rowHead';
    rowInfo.className = 'rowInfo';

    createTD('danger', "dangerHeaderInfo");
    createTD("future", '{ID}');
    createTD("today", '{ID}');
    createTD("past", '{ID}');
    createTD("comm", '{ID}');
    createTD('seconds', "headerInfo");

    li.appendChild(rowHead);
    li.appendChild(rowInfo);

    function createTD(title, id) {
        const tdHead = document.createElement('td');
        const tdInfo = document.createElement('td');
        tdHead.innerText = title;
        tdInfo.innerText = '{INFO}';
        tdInfo.id = id;
        rowHead.appendChild(tdHead);
        rowInfo.appendChild(tdInfo);
    }
    //

    const btn = document.createElement("button");
    btn.textContent = 'DONT PRESS ME';
    
    
    navbar.prepend(btn);



    //
    navbar.prepend(li);
}
createInfoTable();


function dangerOPEN() {
    table.forEach(el =>{
        if (el.className === 'danger') {
            window.open(el.querySelector('a').href, "_blank")
        }
    })
}

let headerInfo = document.querySelector("#headerInfo");
document.querySelector("#dangerHeaderInfo").innerHTML = "<span onclick='dangerOPEN()'>"+ arrayCounter().danger+"</span>";
startCountdown(5);

function startCountdown(seconds) {
    let counter = seconds;

    const interval = setInterval(() => {
        headerInfo.innerText = counter;
        counter--;

        if (counter < 0) {
            clearInterval(interval);
            headerInfo.innerText = 'Ding!';
        }
    }, 1000);
}

//counter for auctions that are not in "danger"
//check for uploaded files to be added - will not count auctions that have already uploaded results (solution with iframes check)
function arrayCounter() {
    const count = {};
    table.forEach(el => {
        count[el.className] = (count[el.className] || 0) + 1;
    });
    return count;
}
console.log("🚀 ~ file: navbar_v1.1.js:35 ~ auctionsNotInDanger ~ auctionsNotInDanger():", arrayCounter())

document.head.insertAdjacentHTML("beforeend", `<style>
li#navbarHeaderInfo {
    vertical-align: middle;
    text-align: center;
    padding-right: 20px;
}
li#navbarHeaderInfo td {
        border-left: solid;
        padding: 2px;
        width: 60px;
    }
    tr.rowHead {
        font-style: italic;
        font-size: small;
    }
    tr.rowInfo {
        font-weight: bold;
        font-size: medium;
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