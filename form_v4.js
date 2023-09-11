console.clear();
console.log('-------------------------------------------------------auctionsForm_v4');
let today = new Date();
let openOrderField = document.querySelector('#ooNumber');
let openOrderDate = document.querySelector('#ooDate');
let docTable = document.querySelector('#auctionDocuments').querySelector('tbody');
let docLinks = docTable.querySelectorAll('a');
let firstByuerOrder;
if (document.querySelector('#auctionOrder') != null) {
    firstByuerOrder = document.querySelector("#auctionOrder").querySelector('tbody').querySelectorAll('a').length;
} else {
    firstByuerOrder = 0;
}
console.log("🚀 ~ file: form_v4.js:11 ~ firstByuerOrder:", firstByuerOrder)


function fileNaming(){
    let selectFields = docTable.querySelectorAll('select');
    for (i = 0; i< selectFields.length; i++){
        let parentTr = docLinks[i].closest('tr');
        let parentTd = docLinks[i].closest('td');
        let trID = parentTr.className.split('-')[2];
        const inputElement = document.createElement("input");
        inputElement.type = "hidden";
        inputElement.name = "fileType[" + trID + "]";



        parentTd.appendChild(inputElement);
    }
}
fileNaming();

function docNames() {
    console.log("-------------------------------------------------------docNames()");
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
        document.querySelector('button.btn.btn-success').click();
    }

    console.log("------------------------END----------------------------docNames()");
}