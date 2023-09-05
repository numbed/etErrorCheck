console.clear();
console.log('auctions_v3.2');
let today = new Date();
let tableRows = document.querySelector('tbody').querySelectorAll('tr');

function main() {
    if (publishedCheck() > 0) {
        if (confirm("Отвори непубликувани търгове?")) {
            newTab('notPublished');
        }
    }
    if (dangerCheck() > 0) {
        if (confirm("Отвори непубликувани търгове?")) {
            newTab('danger');
        }
    }
}
main();

function publishedCheck() {
    let count = 0;
    tableRows.forEach(element => {
        if (window.getComputedStyle(element).color === "rgb(153, 153, 153)") {
            element.className = 'notPublished';
            count++;
        }
    });
    return count;
}

function dangerCheck() {
    let count = 0;
    tableRows.forEach(element => {
        if (element.className === 'danger') {
            count++;
        }
    });
    return count;
}

function newTab(status) {
    tableRows.forEach(el => {
        if (el.className === status) {
            window.open(el.cells[7].querySelector('a').href, '_blank');

        }
    });
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

// document.head - add mousover tooltip on cells 
document.head.insertAdjacentHTML("beforeend", `<style>
    td.hidden-xs {
        position: relative;
    }
    .tt{
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
        white-space: pre;
    }
    td.hidden-xs:hover .tt{
        display:block;
        white-space: pre;
    }
    </style>`);