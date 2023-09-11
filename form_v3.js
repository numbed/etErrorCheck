console.clear();
console.log('-------------------------------------------------------auctionsForm_v2');
let today = new Date();
let openOrderField = document.querySelector('#ooNumber');
let openOrderDate = document.querySelector('#ooDate');
let docs = document.querySelector('#auctionDocuments');

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}


const info = {
    firstDate: document.querySelector('#auctionDueDate').value,
    status: statusCheck(document.querySelector('#auctionDueDate').value),
    secondDate: document.querySelector('#auctionSecondDueDate').value,
    deadline: calculateDeadline(document.querySelector('#auctionDueDate').value),
    price: document.querySelector('#auctionStartPrice').value,
    guarantee: document.querySelector('#аuctionGuarantee').value,
    openOrderNumber: openOrderField.value,
    openOrderDate: openOrderDate.value,
    commissionOrderNumber: document.querySelector('#coNumber').value,
    commissionOrderDate: document.querySelector('#coDate').value,
    woodsInfo: {
        L: document.querySelector('input[name="data[woodInfo][big][0]"]').value,
        M: document.querySelector('input[name="data[woodInfo][mid][0]"]').value,
        S: document.querySelector('input[name="data[woodInfo][small][0]"]').value,
        ozm: document.querySelector('input[name="data[woodInfo][ozm][0]"]').value,
        firewood: document.querySelector('input[name="data[woodInfo][firewood][0]"]').value,
        total: document.querySelector('input[name="data[woodInfo][total][0]"]').value
    },
    docs: docs,
    firstOrderDocs: uploadedDocks('#auctionOrder'),
    secondOrderDocs: uploadedDocks('#auctionSecOrder'),
    danger: dangerCheck(document.querySelectorAll('.danger')),
    requests: requestsCheck(),
}
console.log("🚀 ~ file: form_v3.js:38 ~ info:", info)

if (info.status === "commission") {
    console.log("🚀 ~ file: form_v3.js:15 ~ info.status:", info.status)
    if (document.querySelector('#commisionTable').querySelectorAll('select').length > 0) {
        auctionsCommission();
    }
    console.log(info.requests)
}

if (info.status === 'future') {
    console.log("🚀 ~ file: form_v3.js:15 ~ info.status:", info.status, info.deadline)
}

if (info.status === 'past') {
    console.log("🚀 ~ file: form_v3.js:15 ~ info.status:", info.status)

}

if (info.status === 'today') {
    console.log("🚀 ~ file: form_v3.js:15 ~ info.status:", info.status)

}

function deadlineCheck() {

}

//info.deadline
function calculateDeadline(date) {
    let d = date.split(' ')[0].trim().split('.');
    let firstDate = new Date(d[2], d[1] - 1, d[0]);
    let deadlineDate = new Date(d[2], d[1] - 1, d[0]);
    let deadline = new Date();

    if (firstDate.getDay() == 1 || firstDate.getDay() == 4) {
        deadline = firstDate.getDate() - 20;
    } else if (firstDate.getDay() == 2 || firstDate.getDay() == 5) {
        deadline = firstDate.getDate() - 18;
    } else if (firstDate.getDay() == 3) {
        deadline = firstDate.getDate() - 19;
    }
    deadlineDate.setDate(deadline);
    if (deadlineDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
        return true;
    } else {
        return false;
    }
}

//info.docs .firstOrderDocs .secondOrderDocs
function uploadedDocks(id) {
    let output = '';
    if (document.querySelector(id) != null) {
        output = document.querySelector(id).querySelectorAll('tr');
    } else {
        output = "none";
    }
    return output;
}

//info.status
function statusCheck(input) {
    let firstDate = new Date(input.split(' ')[0].trim().split('.')[2], input.split(' ')[0].trim().split('.')[1] - 1, input.split(' ')[0].trim().split('.')[0]);
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    let yesterday = new Date();

    if (today.getDay() === 1) {
        yesterday.setDate(yesterday.getDate() - 3);
    } else {
        yesterday.setDate(yesterday.getDate() - 1);
    }

    if (firstDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
        return 'today';
    } else if (firstDate.setHours(0, 0, 0, 0) === tomorrow.setHours(0, 0, 0, 0)) {
        return 'commission';
    } else if (firstDate.setHours(0, 0, 0, 0) < yesterday.setHours(0, 0, 0, 0)) {
        return 'past';
    } else if (firstDate.setHours(0, 0, 0, 0) > tomorrow.setHours(0, 0, 0, 0)) {
        return 'future';
    }
}

//info.danger
function dangerCheck(input) {
    if (input.length > 0) {
        return true
    } else {
        return false
    }
}

//info.requests
function requestsCheck() {
    console.log("🚀 ~ file: form_v3.js:132 ~ requestsCheck ~ requestsCheck:")
    let h4Tags = document.querySelectorAll('h4');
    for (i = 0; i < h4Tags.length; i++) {
        if (h4Tags[i].innerText === 'Заявки') {
            return document.evaluate('//h4[text()="Заявки"]', document, null, XPathResult.ANY_TYPE, null).iterateNext().nextSibling.nextSibling.querySelectorAll('tr');
        }
    }
}

//assing members to auction commission and enter commission order number in the prompt
function auctionsCommission() {
    console.log("-------------------------------------------------------auctionsCommission");

    let chairman = document.querySelector("select[name='data[commision][][chairman]']");
    let consult = document.querySelector("select[name='data[commision][][jurisconsult]']");
    let member = document.querySelectorAll("select[name='data[commision][][member]']");
    let input;
    let tp = document.querySelector("input[name='data[title]']");
    let coNumber = document.querySelector("#coNumber");
    let coDate = document.querySelector("#coDate");

    if (tp.value.includes("Алабак")) {
        input = "541,548,95";
        input = prompt(promptTitlefuntion(input), input);
        coNumber.value = "З-03-" + prompt("Номер на заповед за комисия:");
    } else if (tp.value.includes("Хайтов")) {
        input = "398,144,149";
        input = prompt(promptTitlefuntion(input), input);
        coNumber.value = "З-02-" + prompt("Номер на заповед за комисия:");
    } else if (tp.value.includes("Ардино")) {
        input = "463,22,528";
        input = prompt(promptTitlefuntion(input), input);
        coNumber.value = "З-04-" + prompt("Номер на заповед за комисия:");
    } else if (tp.value.includes("Асеновград")) {
        input = "162,164,168";
        input = prompt(promptTitlefuntion(input), input);
        coNumber.value = "З-05-" + prompt("Номер на заповед за комисия:");
    } else if (tp.value.includes("Батак")) {
        input = "122,124,130";
        input = prompt(promptTitlefuntion(input), input);
        coNumber.value = "З-06-" + prompt("Номер на заповед за комисия:");
    } else if (tp.value.includes("Борино")) {
        input = "111,114,120";
        input = prompt(promptTitlefuntion(input), input);
        coNumber.value = "З-07-" + prompt("Номер на заповед за комисия:");
    } else if (tp.value.includes("Доспат")) {
        input = "225,223,222";
        input = prompt(promptTitlefuntion(input), input);
        coNumber.value = "З-08-" + prompt("Номер на заповед за комисия:");
    } else if (tp.value.includes("Златоград")) {
        input = "321,323,322";
        input = prompt(promptTitlefuntion(input), input);
        coNumber.value = "З-09-" + prompt("Номер на заповед за комисия:");
    } else if (tp.value.includes("Карлово")) {
        input = "334,410,332";
        input = prompt(promptTitlefuntion(input), input);
        coNumber.value = "З-10-" + prompt("Номер на заповед за комисия:");
    } else if (tp.value.includes("Кирково")) {
        input = "41,44,50";
        input = prompt(promptTitlefuntion(input), input);
        coNumber.value = "З-11-" + prompt("Номер на заповед за комисия:");
    } else if (tp.value.includes("Клисура")) {
        input = "275,419,469";
        input = prompt(promptTitlefuntion(input), input);
        coNumber.value = "З-12-" + prompt("Номер на заповед за комисия:");
    } else if (tp.value.includes("Крумовград")) {
        input = "181,462,495";
        input = prompt(promptTitlefuntion(input), input);
        coNumber.value = "З-13-" + prompt("Номер на заповед за комисия:");
    } else if (tp.value.includes("Михалково")) {
        input = "482,417,355";
        input = prompt(promptTitlefuntion(input), input);
        coNumber.value = "З-14-" + prompt("Номер на заповед за комисия:");
    } else if (tp.value.includes("Момчилград")) {
        input = "52,458,53";
        input = prompt(promptTitlefuntion(input), input);
        coNumber.value = "З-15-" + prompt("Номер на заповед за комисия:");
    } else if (tp.value.includes("Пазарджик")) {
        input = "71,370,72";
        input = prompt(promptTitlefuntion(input), input);
        coNumber.value = "З-16-" + prompt("Номер на заповед за комисия:");
    } else if (tp.value.includes("Панагюрище")) {
        input = "252,369,256";
        input = prompt(promptTitlefuntion(input), input);
        coNumber.value = "З-17-" + prompt("Номер на заповед за комисия:");
    } else if (tp.value.includes("Пещера")) {
        input = "242,449,403";
        input = prompt(promptTitlefuntion(input), input);
        coNumber.value = "З-18-" + prompt("Номер на заповед за комисия:");
    } else if (tp.value.includes("Пловдив")) {
        input = "282,409,523";
        input = prompt(promptTitlefuntion(input), input);
        coNumber.value = "З-19-" + prompt("Номер на заповед за комисия:");
    } else if (tp.value.includes("Първомай")) {
        input = "173,502,457";
        input = prompt(promptTitlefuntion(input), input);
        coNumber.value = "З-20-" + prompt("Номер на заповед за комисия:");
    } else if (tp.value.includes("Ракитово")) {
        input = "359,553,365";
        input = prompt(promptTitlefuntion(input), input);
        coNumber.value = "З-21-" + prompt("Номер на заповед за комисия:");
    } else if (tp.value.includes("Родопи")) {
        input = "231,235,238";
        input = prompt(promptTitlefuntion(input), input);
        coNumber.value = "З-22-" + prompt("Номер на заповед за комисия:");
    } else if (tp.value.includes("Селище")) {
        input = "347,396,472";
        input = prompt(promptTitlefuntion(input), input);
        coNumber.value = "З-23-" + prompt("Номер на заповед за комисия:");
    } else if (tp.value.includes("Славейно")) {
        input = "201,518,202";
        input = prompt(promptTitlefuntion(input), input);
        coNumber.value = "З-24-" + prompt("Номер на заповед за комисия:");
    } else if (tp.value.includes("Смилян")) {
        input = "411,501,401";
        input = prompt(promptTitlefuntion(input), input);
        coNumber.value = "З-25-" + prompt("Номер на заповед за комисия:");
    } else if (tp.value.includes("Смолян")) {
        input = "36,37,33";
        input = prompt(promptTitlefuntion(input), input);
        coNumber.value = "З-26-" + prompt("Номер на заповед за комисия:");
    } else if (tp.value.includes("Триград")) {
        input = "87,554,82";
        input = prompt(promptTitlefuntion(input), input);
        coNumber.value = "З-27-" + prompt("Номер на заповед за комисия:");
    } else if (tp.value.includes("Хисар")) {
        input = "61,391,63";
        input = prompt(promptTitlefuntion(input), input);
        coNumber.value = "З-28-" + prompt("Номер на заповед за комисия:");
    } else if (tp.value.includes("лъка")) {
        input = "452,155,152";
        input = prompt(promptTitlefuntion(input), input);
        coNumber.value = "З-29-" + prompt("Номер на заповед за комисия:");
    } else if (tp.value.includes("Борово")) {
        input = "106,105,103";
        input = prompt(promptTitlefuntion(input), input);
        coNumber.value = "З-30-" + prompt("Номер на заповед за комисия:");
    } else if (tp.value.includes("Женда")) {
        input = "301,378,309";
        input = prompt(promptTitlefuntion(input), input);
        coNumber.value = "З-31-" + prompt("Номер на заповед за комисия:");
    } else if (tp.value.includes("Извора")) {
        input = "131,140,139";
        input = prompt(promptTitlefuntion(input), input);
        coNumber.value = "З-32-" + prompt("Номер на заповед за комисия:");
    } else if (tp.value.includes("Кормисош")) {
        input = "510,547,265";
        input = prompt(promptTitlefuntion(input), input);
        coNumber.value = "З-33-" + prompt("Номер на заповед за комисия:");
    } else if (tp.value.includes("Тракия")) {
        input = "291,404,544";
        input = prompt(promptTitlefuntion(input), input);
        coNumber.value = "З-34-" + prompt("Номер на заповед за комисия:");
    } else if (tp.value.includes("Чепино")) {
        input = "192,549,195";
        input = prompt(promptTitlefuntion(input), input);
        coNumber.value = "З-35-" + prompt("Номер на заповед за комисия:");
    } else if (tp.value.includes("поляна")) {
        input = "219,213,393";
        input = prompt(promptTitlefuntion(input), input);
        coNumber.value = "З-36-" + prompt("Номер на заповед за комисия:");
    } else {
        coNumber.value = "З-01-" + prompt("Номер на заповед за комисия:");
        input = prompt("Въведете членове на комисията:");
    }

    function promptTitlefuntion(ids) {
        let commUsers = ids.split(",");
        title = "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t" + tp.value.split("/")[0] + " " + document.querySelector("input[name='data[woodInfo][number][0]']").value + "\nНазначете комисия в състав: \n" + "ПРЕДСЕДАТЕЛ:" + name(commUsers[0]) + "\nЮРИСТ:" + name(commUsers[1]) + "\nЧЛЕНОВЕ:" + "\n" + name(commUsers[2]);

        function name(n) {
            for (i = 1; i < chairman.length; i++) {
                const el = chairman[i];
                if (el.value == n) {
                    return el.text.split("-")[1];
                }
            }
        }
        return (title);
    }

    let commissionUsers = input.split(",");

    chairman.value = commissionUsers[0].trim();
    consult.value = commissionUsers[1].trim();
    member[0].value = commissionUsers[2].trim();
    coDate.value = today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear();
    console.log("------------------------END----------------------------auctionsCommission");
}



//WORK IN PROGRESS BELLOW
function docNaming() {
    console.log("-------------------------------------------------------docNaming()");
    let links = docs.querySelectorAll('a');
    let selects = docs.querySelectorAll('select');
    links.forEach((el, index) => {
        if (index != 0) {
            console.log(el.innerText);
        }
    })
    for (i = 0; i < selects.length; i++) {
        let parentTr = selects[i].closest('tr');
        let parentTd = selects[i].closest('td');
        let firstByuerDocs = document.querySelectorAll("tbody")[5].querySelectorAll('a');
        //showing IDs before filename for easyer renaming
        let trID = parentTr.className.split('-')[2];
        const inputElement = document.createElement("input");
        inputElement.type = "hidden";
        inputElement.name = "fileType[" + trID + "]";
        if (links[i].title.includes("Документация")) {
            selects[i].value = "document";
            inputElement.value = "document";
        }
        if (links[i].title.includes("Протокол")) {
            selects[i].value = "protocol";
            inputElement.value = "protocol";
        }
        if (links[i].title.includes("Договор")) {
            selects[i].value = "contract";
            inputElement.value = "contract";
        }
        if (links[i].title.includes("ДС")) {
            selects[i].value = "agreement";
            inputElement.value = "agreement";
        }

        if (links[i].title.includes("Уведомление")) {
            selects[i].value = "contractStop";
            inputElement.value = "contractStop";
        }
        if (links.length <= 2) { //NOT WORKING FOR SOME REASON NEEDS MORE TESTING
            if (links[i].title.includes("Заповед")) {
                selects[i].value = "openOrder";
                inputElement.value = "openOrder";
            }
        } else {
            if (!!document.querySelectorAll('table')[7]) {
                console.log("Заявки - OK");
                if (links[i].title.includes("Заповед")) {
                    if (info.firstOrderDocs.length === 1) {
                        selects[i].value = "buyerOrder";
                        inputElement.value = "buyerOrder";
                    } else if (info.firstOrderDocs.length === 2) {
                        if (i === 0) {
                            selects[i].value = "order";
                            inputElement.value = "order";
                        }
                        if (i === 1) {
                            selects[i].value = "buyerOrder";
                            inputElement.value = "buyerOrder";
                        }
                    }
                }
            } else {
                console.log("Заявки - NONE");
                if (links[i].title.includes("Заповед")) {
                    if (links.length === 4) {
                        selects[i].value = "closeOrder";
                        inputElement.value = "closeOrder";
                    } else if (links.length === 5) {
                        if (i === 0) {
                            selects[i].value = "order";
                            inputElement.value = "order";
                        }
                        if (i === 1) {
                            selects[i].value = "closeOrder";
                            inputElement.value = "closeOrder";
                        }
                    }
                }
            }
        }



        console.log(selects[i].title, inputElement)
    }
}
docNaming();


function pubOrder2() {
    console.log("-------------------------------------------------------pubOrder2()");
    let order = ''
    if (info.openOrderNumber.length <= 5 || info.openOrderNumber === 'undefined' || info.openOrderNumber.includes('откриване')) {
        let documents = docs.querySelectorAll('a');
        if (documents.length === 1) {
            documents = docs.querySelectorAll('tr')
            openOrderDate.value = today.getDate().toString() + "." + (today.getMonth() + 1).toString() + "." + today.getFullYear().toString();
        } else {
            openOrderDate.value = documents[documents.length - 1].innerHTML.split("/")[1].trim().split(" ")[0];
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
        openOrderField.value = order;
    }
}
pubOrder2();

console.log("🚀 ~ file: form_v3.js:356 ~ docNaming ~ info.firstByuerDocs:", info.firstOrderDocs)