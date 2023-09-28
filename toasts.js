let auctionsTable = document.querySelector('tbody').querySelectorAll('tr');
const infoContainer = document.createElement('div')
infoContainer.className = 'info-container';
let nav = document.querySelector(".navbar.navbar-static-top.white-bg")
nav.insertBefore(infoContainer, nav.children[1]);

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

function addToInfoBar() {
    document.querySelector('#frames').classList.remove('show-info-cell')

    if (isCounterZero(arrayCounter().error) === 0) {
        document.querySelector('#errors').classList.remove('show-info-cell')
    } else {
        document.querySelector('#errors').innerHTML = isCounterZero(arrayCounter().error)
    }

    if (isCounterZero(arrayCounter().danger) === 0) {
        document.querySelector('#danger').classList.remove('show-info-cell')
    } else {
        document.querySelector('#danger').innerHTML = isCounterZero(arrayCounter().danger)
    }

    if (isCounterZero(arrayCounter().notPublished) === 0) {
        document.querySelector('#notPublished').classList.remove('show-info-cell')
    } else {
        document.querySelector('#notPublished').innerHTML = isCounterZero(arrayCounter().notPublished)
    }

    if (isCounterZero(arrayCounter().future) === 0) {
        document.querySelector('#future').classList.remove('show-info-cell')
    } else {
        document.querySelector('#future').innerHTML = isCounterZero(arrayCounter().future) + isCounterZero(arrayCounter().notPublished)
    }

    if (isCounterZero(arrayCounter().today) === 0) {
        document.querySelector('#today').classList.remove('show-info-cell')
    } else {
        document.querySelector('#today').innerHTML = isCounterZero(arrayCounter().today)
    }

    if (isCounterZero(arrayCounter().passed) === 0) {
        document.querySelector('#passed').classList.remove('show-info-cell')
    } else {
        document.querySelector('#passed').innerHTML = isCounterZero(arrayCounter().passed)
    }

    if (isCounterZero(arrayCounter().commission) === 0) {
        document.querySelector('#commission').classList.remove('show-info-cell')
    } else {
        document.querySelector('#commission').innerHTML = isCounterZero(arrayCounter().commission)
    }



}
setTimeout(() => {
    addToInfoBar();
}, 2000);

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

// called in addToInfoBar()
function arrayCounter() {
    const count = {};
    auctionsTable.forEach(el => {
        count[el.className] = (count[el.className] || 0) + 1;
    });
    return count;
}

// called in addToInfoBar()
function isCounterZero(counter) {
    if (counter === undefined) {
        return counter = 0;
    } else {
        return counter;
    }
}

let timeoutMS = 0;
infoTable.forEach((el, index) => {
    index++
    setTimeout(() => {
        console.log(index);
        createInfoBar(el)

    }, timeoutMS);
    timeoutMS += 200;
    // if (index === infoTable.length) {
    //     console.log(index);
    // }
})

function createInfoBar(el) {

    const cell = document.createElement('div');
    cell.className = 'info-cell';

    const cellTextHolder = document.createElement('div');
    cellTextHolder.style.backgroundColor = el.color;
    cellTextHolder.className = 'info-cell-text'
    cellTextHolder.classList.add('show-info-cell');
    cellTextHolder.id = el.id;


    const cellTitle = document.createElement('div');
    cellTitle.className = 'info-cell-title';
    cellTitle.textContent = el.title;

    cell.appendChild(cellTextHolder)
    cell.appendChild(cellTitle)
    infoContainer.appendChild(cell);
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
//styling bellow
document.head.insertAdjacentHTML("beforeend", `<style>
.info-container {
    position: fixed;
    align: center;
    font-family: Helvetica, Arial, sans-serif;
    display: flex;
    margin-right: 15px;
    width: 700px;
    left: 35%;
    right: 35%;
    margin-top: 0px;
}

.info-cell {
    position: sticky;
    top: 0;
    flex: 1;
    margin-right: 5px;

}
.info-cell-text {
    height: 8px;
    trainsition: height 2s ease-in-out;

}

.show-info-cell {
    color: white;
    font-size: x-large;
    text-align: center;
    height: 35px;
    transform: translateY(110);
    transition: opacity 0.3s ease-in-out, transform 0.5s ease-in-out;
}

.info-cell-title {
    color: black;
    opacity: 0.7;
    font-size: x-small;
    text-align: center;
    font-style: italic;
    font-weight: bold;
    border: 0px;
    margin: 0px;
    padding: 0px;
}

</style>`);