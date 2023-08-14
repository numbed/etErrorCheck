// NEEDS REWORKING FOR OLRDER AUCTIONS AND MAKING SURE THAT NAMING ORDERS AND NAMING FILES WORKS CORRECTLY
// docNames(); PROBLEM WITH THE FUNCTION - DOES NOT WORK FOR AUCTION CANCELING -- MAYBE ERRORS COMES FROM IF ELSE @line 13
// docRename() code reworked to show uploaded docs ID before confirm dialog for renaming
// +++ ADDED delay()

console.log("auctionForm");
cancelOrderCheck();

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

if (commDateCheck() === true) {
    auctionsCommission();
    // docNames(); //TESTING
} else if (commDateCheck() === false) {
    pubOrderCheck();
}
docNames(); //PROBLEM WITH THE FUNCTION - DOES NOT WORK FOR AUCTION CANCELING -- MAYBE ERRORS COMES FROM IF ELSE @line 13
auctionSave();


// let documentsSelectFields = document.querySelectorAll("tbody")[4].querySelectorAll("select");
// // let firstByuerDocs = document.querySelectorAll("tbody")[5].querySelectorAll("a");
// if (documentsSelectFields.length != 0) {
//     docNames(); //TESTING
// }

//checking if there are select field in #auctionDocuments and runs docsRename() if there are none
let docsSelect = document.querySelector("#auctionDocuments").querySelectorAll('select');
if (docsSelect.length === 0) {
    docsRename();
} else {
    console.log("number of select fields: " + docsSelect.length);
}

//add option to rename documents if there are no select fields in #auctionDocuments
function docsRename() {
    console.log("-------------------------------------------------------docRename()");
    console.log('no select fields');
    let docs = document.querySelector("#auctionDocuments").querySelectorAll('a');
    docs.forEach((el, index) => {
        if (index != 0) {
            el.innerHTML = "[" + index + "] " + el.innerHTML;
        }
    })

    delay(1000).then(() => rename());
    function rename() {
        if (confirm("RENAME documents?")) {
            let docsIDS = prompt("enter document ids:");
            if (docsIDS.includes(',') || docsIDS.includes('.')) {
                docsIDS = docsIDS.split(/[,.]/);
            }

            for (i = 0; i < docsIDS.length; i++) {
                docs.forEach((el, index) => {
                    if (index == docsIDS[i]) {
                        let parentTr = docs[docsIDS[i]].closest('tr');
                        let parentTd = docs[docsIDS[i]].closest('td');
                        let trID = parentTr.className.split('-')[2];
                        const inputElement = document.createElement("input");
                        inputElement.type = "hidden";
                        inputElement.name = "fileType[" + trID + "]";
                        parentTd.appendChild(inputElement);
                        el.innerHTML = "---RENAMING--- " + " " + el.innerHTML + " " + trID;
                    }
                })
            }
        }
    }
}


//removes the need to populate TITLE and DESCRIPTION input fields before saving new auction
function auctionSave() {
    console.log("-------------------------------------------------------auctionSave()");
    if (document.querySelector('#auctionTitle').value === "" || document.querySelector('#auctionDescription').value === "") {
        let tt = document.querySelectorAll(".form-group.has-feedback button");
        tt.forEach(el => {
            el.click();
        });
        guaranteeCalc();
        document.querySelector('button.btn.btn-success').click();
    } else {
        console.log("save button not clicked");
    }

    //auto calculation of guarantee
    function guaranteeCalc() {
        let moneyInput = document.querySelector("#auctionStartPrice").value;
        let guarantee = document.querySelector('#аuctionGuarantee');
        var result2 = Math.min(Number(moneyInput) * 0.05, moneyInput);

        if (result2 > 999) {
            result2 = Math.floor(result2 / 100) * 100; // round to the nearest hundred
        } else if (result2 > 200 && result2 < 999) {
            result2 = Math.floor(result2 / 10) * 10; // round to the nearest ten
        } else {
            result2 = Math.floor(result2 / 1) * 1;
        }

        guarantee.value = result2.toFixed(2);
    }
}

function pubOrderCheck() {
    console.log("pubOrderCheck()");
    let pubOrderField = document.querySelector("#ooNumber").value;
    if (pubOrderField.length <= 5 || pubOrderField === "undefined" || pubOrderField.includes("откриване")) {
        pubOrder();
        return true;
    } else {
        return false;
    }
}

function commDateCheck() {
    console.log("commDateCheck()");
    let dateField = document.querySelector("#auctionDueDate").value;
    let today = new Date();
    let commDateSTR = commissionDate(dateField).split(".");
    let commDate = new Date(commDateSTR[2], commDateSTR[1] - 1, commDateSTR[0]);

    function commissionDate(aucDate) {
        let d = aucDate.split(".");
        let firstDate = new Date(d[2], d[1] - 1, d[0]);
        let cDate = new Date(d[2], d[1] - 1, d[0]);
        let date = new Date();

        if (firstDate.getDay() == 1) {
            date = firstDate.getDate() - 3;
        } else {
            date = firstDate.getDate() - 1;
        }

        cDate.setDate(date);
        let output = new Date();
        output = cDate.getDate() + "." + (cDate.getMonth() + 1) + "." + cDate.getFullYear();
        return output;
    }

    if (commDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
        return true;
    } else {
        return false;
    }

}

function auctionsCommission() {
    console.log("---auctionsCommission");
    pubOrderCheck();
    let today = new Date();
    commission();
    docNamingInAuctionsCommission(); //ADDED document naming function because sth is not working in docNames()

    function docNamingInAuctionsCommission() {
        let docTable = document.querySelectorAll("tbody")[4];
        let docLinks = docTable.querySelectorAll("a");
        let docInput = docTable.querySelectorAll("select");
        for (i = 0; i < docInput.length; i++) {
            let parentTr = docLinks[i].closest('tr');
            let parentTd = docLinks[i].closest('td');

            let trID = parentTr.className.split('-')[2];
            const inputElement = document.createElement("input");
            inputElement.type = "hidden";
            inputElement.name = "fileType[" + trID + "]";

            if (docLinks[i].title.includes("Заповед")) {
                docInput[i].value = "openOrder";
                inputElement.value = "openOrder";
            }
            if (docLinks[i].title.includes("Документация")) {
                docInput[i].value = "document";
                inputElement.value = "document";
            }
            parentTd.appendChild(inputElement);
            // docInput[i].disabled = "disabled"; //stays commented during testing DOES NOT affect workflow of the platform
        }
    }

    function commission() {
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
        // member[1].value = commissionUsers[3].trim();
        // member[2].value = commissionUsers[4].trim();
        coDate.value = today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear();
        console.log(coDate);
    }
    // commission();
}

function cancelOrderCheck() {
    console.log("cancelOrderCheck()");
    let docField = document.querySelector("#auctionDocuments").querySelectorAll('a');
    for (let i = 0; i < docField.length; i++) {
        if (docField[i].innerHTML.includes("прекратяване")) {
            let order, date, tp, textToCopy;
            order = docField[i].title.split(".")[0].split(" ").pop();
            date = docField[i].innerText.split('/')[1].trim().split(" ")[0];
            tp = document.querySelector("#auctionTitle").value.split('/')[0].trim();
            textToCopy = "Заповед №" + order + "/" + date + "г. на Директора на " + tp + ".";
            navigator.clipboard.writeText(textToCopy);
            alert(textToCopy + "\n\n!!!\nтекстът е поставен в clipboard-а на ОС!\nПРОВЕРЕТЕ КОРЕКТНОСТТА НА ДАТАТА И ПРОМЕНЕТЕ ПРИ НЕОБХОДИМОСТ.\n!!!");
        }
    }
}


//needs changes for the new auctions!!!!
function pubOrder() {
    console.log("---pubOrder");
    let today = new Date();
    let order;
    ooNumber = document.querySelector("#ooNumber");
    ooDate = document.querySelector("#ooDate");
    let docs = document.querySelector("#auctionDocuments").querySelectorAll('a');
    if (docs.length === 1) {
        console.log("no docs uploaded");
        docs = document.querySelector("#auctionDocuments").querySelectorAll('td');
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

    if (document.querySelector("#auctionDocuments").querySelectorAll('a').length === 1) {
        document.querySelector('button.btn.btn-success').click();
    }
}

// naming uploaded documents when commission is assigned
// WORK IN PROGRESS
// NEEDS TESTING AND MODIFICATIONS FOR OTHER TYPE OF DOCUMENTS & DIFFERENTIATING BETWEEN ORDERS
function docNames() {
    console.log("-------------------------------------------------------docNames()");
    let firstByuerDocs = document.querySelectorAll("tbody")[5].querySelectorAll('a');
    console.log(firstByuerDocs.length);
    let docTable = document.querySelectorAll("tbody")[4];
    let docLinks = docTable.querySelectorAll("a");
    console.log(docLinks.length);
    let docInput = docTable.querySelectorAll("select");
    for (i = 0; i < docInput.length; i++) {
        let parentTr = docLinks[i].closest('tr');
        let parentTd = docLinks[i].closest('td');

        let trID = parentTr.className.split('-')[2];
        const inputElement = document.createElement("input");
        inputElement.type = "hidden";
        inputElement.name = "fileType[" + trID + "]";

        if (docLinks.length <= 2) { //NOT WORKING FOR SOME REASON NEEDS MORE TESTING
            if (docLinks[i].title.includes("Заповед")) {
                docInput[i].value = "openOrder";
                inputElement.value = "openOrder";
            }
        } else {
            if (!!document.querySelectorAll('table')[7]) {
                console.log("Заявки - OK");
                if (docLinks[i].title.includes("Заповед")) {
                    if (firstByuerDocs.length === 1) {
                        docInput[i].value = "buyerOrder";
                        inputElement.value = "buyerOrder";
                    } else if (firstByuerDocs.length === 2) {
                        if (i === 0) {
                            docInput[i].value = "order";
                            inputElement.value = "order";
                        }
                        if (i === 1) {
                            docInput[i].value = "buyerOrder";
                            inputElement.value = "buyerOrder";
                        }
                    }
                }
            } else {
                console.log("Заявки - NONE");
                if (docLinks[i].title.includes("Заповед")) {
                    if (docLinks.length === 4) {
                        docInput[i].value = "closeOrder";
                        inputElement.value = "closeOrder";
                    } else if (docLinks.length === 5) {
                        if (i === 0) {
                            docInput[i].value = "order";
                            inputElement.value = "order";
                        }
                        if (i === 1) {
                            docInput[i].value = "closeOrder";
                            inputElement.value = "closeOrder";
                        }
                    }
                }
            }
        }

        if (docLinks[i].title.includes("Документация")) {
            docInput[i].value = "document";
            inputElement.value = "document";
        }
        if (docLinks[i].title.includes("Протокол")) {
            docInput[i].value = "protocol";
            inputElement.value = "protocol";
        }
        if (docLinks[i].title.includes("Договор")) {
            docInput[i].value = "contract";
            inputElement.value = "contract";
        }
        if (docLinks[i].title.includes("ДС")) {
            docInput[i].value = "agreement";
            inputElement.value = "agreement";
        }

        if (docLinks[i].title.includes("Уведомление")) {
            docInput[i].value = "contractStop";
            inputElement.value = "contractStop";
        }

        parentTd.appendChild(inputElement);
        // docInput[i].disabled = "disabled"; //stays commented during testing DOES NOT affect workflow of the platform
    }

}