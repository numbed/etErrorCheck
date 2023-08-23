//202308231442 - now works when opening order and documentations are uploaded
//v1-202308231442 - first commit
console.clear();
console.log('-------------------------------------------------------auctionsForm_v5');
let today = new Date();
let auctionDueDate = document.querySelector('#auctionDueDate');
let ooNumber = document.querySelector('#ooNumber');
let coNumber = document.querySelector('#coNumber');
let ooDate = document.querySelector('#ooDate');
let coDate = document.querySelector('#coDate');
let auctionDocuments = document.querySelector('#auctionDocuments');
let auctionOrder = document.querySelector('#auctionOrder');
let auctionSecOrder = document.querySelector('#auctionSecOrder');
console.log("🚀 ~ file: console.js:12 ~ docsTableExists(auctionDocuments):", docsTableExists(auctionDocuments));
console.log("🚀 ~ file: console.js:12 ~ docsTableExists(auctionOrder):", docsTableExists(auctionOrder));
console.log("🚀 ~ file: console.js:12 ~ docsTableExists(auctionSecOrder):", docsTableExists(auctionSecOrder));

//check if there is table with provided #, and returns number of uploaded docs
function docsTableExists(table) {
    if (table != null) {
        return table.querySelector('tbody').querySelectorAll('a').length;
    } else {
        return 0;
    }
}

// check if there are requests for the auction returns true/false
function requestsCheck() {
    let z = document.evaluate('//h4[text()="Заявки"]', document, null, XPathResult.ANY_TYPE, null).iterateNext();
    if (z != null) {
        return true;
    } else {
        return false;
    }
}
console.log("🚀 ~ file: console.js:27 ~ requestsCheck ~ requestsCheck():", requestsCheck())

function dateCheck() {
    console.log("--------------------------------------------dateCheck()");
    let date = auctionDueDate.value.split(".");
    let today = new Date();
    let nextWorkDay = new Date();
    let firstDate = new Date(date[2], date[1] - 1, date[0]);

    if (today.getDay() === 5) {
        nextWorkDay.setDate(today.getDate() + 3);
    } else {
        nextWorkDay.setDate(today.getDate() + 1);
    }

    if (firstDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
        console.log("today");
        return "today";
    } else if (firstDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
        console.log("pubOrder()");
        console.log("auctionSave()");
        return "past";
    } else if (firstDate.setHours(0, 0, 0, 0) > today.setHours(0, 0, 0, 0) && firstDate.setHours(0, 0, 0, 0) === nextWorkDay.setHours(0, 0, 0, 0)) {
        console.log("pubOrder()");
        return "commission";
    } else {
        console.log("cancelOrderCheck()");
        return "future";
    }
}

//removes the need to populate TITLE and DESCRIPTION input fields before saving new auction
function auctionSave() {
    console.log("-------------------------------------------------------auctionSave()");
    document.querySelector('button.btn.btn-success').click();
}

//to be used when entering info for new auctions
//removes the need to populate TITLE and DESCRIPTION input fields before saving new auction
function fillFields() {
    if (document.querySelector('#auctionTitle').value === "" || document.querySelector('#auctionDescription').value === "") {
        let tt = document.querySelectorAll(".form-group.has-feedback button");
        tt.forEach(el => {
            el.click();
        });
    } else {
        console.log("🚀 ~ file: auctionsForm_v5.js:87 ~ fillFields ~:", "auction title and description have data")
    }
}

//to be used when entering info for new auctions
//auto calculation of guarantee
function guaranteeCalc() {
    console.log("-------------------------------------------------------guaranteeCalc()");
    let moneyInput = document.querySelector("#auctionStartPrice").value;
    let guarantee = document.querySelector('#аuctionGuarantee');
    if (moneyInput != 0 && guarantee.value === "0.00") {
        var result2 = Math.min(Number(moneyInput) * 0.05, moneyInput);
        if (result2 > 999) {
            result2 = Math.floor(result2 / 100) * 100; // round to the nearest hundred
        } else if (result2 > 200 && result2 < 999) {
            result2 = Math.floor(result2 / 10) * 10; // round to the nearest ten
        } else {
            result2 = Math.floor(result2 / 1) * 1;
        }
        guarantee.value = result2.toFixed(2);
        console.log("🚀 ~ file: auctionsForm.js:124 ~ guaranteeCalc ~ result2:", result2)        
    }else{
    }
}

//get the name for the opening order and sets the ooDate as the date of the upload of the document
function pubOrder() {
    console.log("-------------------------------------------------------pubOrder");
    let order;
    let docs = auctionDocuments.querySelectorAll('a');
    if (docs.length === 1) {
        console.log("no docs uploaded");
        docs = auctionDocuments.querySelectorAll('td');
        ooDate.value = today.getDate().toString() + "." + (today.getMonth() + 1).toString() + "." + today.getFullYear().toString();
    } else {
        ooDate.value = docs[docs.length - 1].innerHTML.split("/")[1].trim().split(" ")[0];
    }
    for (i = 0; i < docs.length; i++) {
        if (docs[i].innerHTML.includes("Заповед")) {
            if (docs[i].innerHTML.includes("откриване")) {
                order = docs[i].title;
            } else {
                order = docs[i].innerHTML;
            }
            order = order.split('.')[0].split("Заповед")[1].trim();
            console.log(order);
            break;
        }
    }
    ooNumber.value = order;
}

if (dateCheck() === "commission") {
    console.log("commission")
    console.log("auctionsCommission()");
}
if (dateCheck() === "future") {
    console.log("future");
    console.log("guaranteeCalc()");
    console.log("fillFields()");
    console.log("pubOrder()");
    console.log("auctionSave()");
    pubOrder();
    auctionSave();


}