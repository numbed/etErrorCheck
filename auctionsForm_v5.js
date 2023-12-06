    //v5-202308241450 - docRename() not working properly when there is only one order for the first buyer (same error with second byuers order)
    //v5-202308241428 - line: 537 added delay calling docRename()
    //v5-202308241418 - added docRename() and check if all published documents are named line: 534
    //v5-202308241411 - added docTableExist() check in docNames()
    //v5-202308241345 - docNamingInCommission commented temporary
    //v5-202308241345 - added confirm and delay in cancelOrderCheck() before clicking CANCEL BUTTON
    //v5-202308241100 - added cancelOrderCheck()
    //v5-202308241058 - added delay() and temporary confirm for auctionSave()
    //v5-202308240937 - tested when entering new auctions info
    //v5-202308231442 - now works when opening order and documentations are uploaded
    //v5-202308231442 - first commit
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

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    //check if there is table with provided #, and returns number of uploaded docs
    function docsTableExists(table) {
        if (table != null) {
            return true;
            // return table.querySelector('tbody').querySelectorAll('a').length;
        } else {
            return false;
            // return 0;
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
            return "today";
        } else if (firstDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
            return "past";
        } else if (firstDate.setHours(0, 0, 0, 0) > today.setHours(0, 0, 0, 0) && firstDate.setHours(0, 0, 0, 0) === nextWorkDay.setHours(0, 0, 0, 0)) {
            return "commission";
        } else {
            return "future";
        }
    }

    //removes the need to populate TITLE and DESCRIPTION input fields before saving new auction
    function auctionSave() {
        console.log("-------------------------------------------------------auctionSave()");
        if (confirm("SAVE?")) {
            // alert("SAVED");
            document.querySelector('button.btn.btn-success').click();
        }
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
        document.querySelector('button.btn.btn-success').click(); //testing faster firsttime document publishing
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
        } else {}
    }

    //get the name for the opening order and sets the ooDate as the date of the upload of the document
    function pubOrder() {
        console.log("-------------------------------------------------------pubOrder");
        let pubOrderField = ooNumber.value;
        if (pubOrderField.length <= 5 || pubOrderField === "undefined" || pubOrderField.includes("откриване")) {
            let order;
            let docs = auctionDocuments.querySelectorAll('a');
            if (docs.length === 1) {
                console.log("no docs uploaded");
                docs = auctionDocuments.querySelectorAll('td');
                if (docs.length != 0) {
                    ooDate.value = today.getDate().toString() + "." + (today.getMonth() + 1).toString() + "." + today.getFullYear().toString();
                }
            } else {
                ooDate.value = docs[docs.length - 1].innerHTML.split("/")[1].trim().split(" ")[0];
            }
            if (docs.length != 0) {
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
        }
    }

    //assing commission members, get commission order number, set commission date as today(), checks if publication number is set accordingly
    function auctionsCommission() {
        console.log("-------------------------------------------------------auctionsCommission");
        let today = new Date();
        // docNamingInAuctionsCommission(); //ADDED document naming function because sth is not working in docNames()
        commission();
        // docNames();

        function docNamingInAuctionsCommission() {
            let docTable = auctionDocuments.querySelector("tbody");
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
                input = "111,114,534";
                input = prompt(promptTitlefuntion(input), input);
                coNumber.value = "З-07-" + prompt("Номер на заповед за комисия:");
            } else if (tp.value.includes("Доспат")) {
                input = "221,223,222";
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
                input = "482,417,543";
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
                input = "347,396,349";
                input = prompt(promptTitlefuntion(input), input);
                coNumber.value = "З-23-" + prompt("Номер на заповед за комисия:");
            } else if (tp.value.includes("Славейно")) {
                input = "201,37,202";
                input = prompt(promptTitlefuntion(input), input);
                coNumber.value = "З-24-" + prompt("Номер на заповед за комисия:");
            } else if (tp.value.includes("Смилян")) {
                input = "411,314,401";
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
                // title = "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t" + tp.value.split("/")[0] + " " + document.querySelector("input[name='data[woodInfo][number][0]']").value + "\nНазначете комисия в състав: \n" + "ПРЕДСЕДАТЕЛ:" + name(commUsers[0]) + "\nЮРИСТ:" + name(commUsers[1]) + "\nЧЛЕН:" +  name(commUsers[2]) + '\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n';

                title =  "ПРЕДСЕДАТЕЛ:" + name(commUsers[0]) + "\nЮРИСТ:" + name(commUsers[1]) + "\nЧЛЕН:" + name(commUsers[2]) + '\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n';

                function name(n) {
                    for (i = 1; i < chairman.length; i++) {
                        const el = chairman[i];
                        if (el.value == n) {
                            return el.text.split("-")[1];
                        }
                    }
                }

                let s = document.querySelector('#commisionTable').querySelectorAll('select')[0];
                for (i = 1; i < s.options.length; i++) {
                    if (!s[i].innerText.includes('управление')) {
                        title = title + s[i].innerText.split(" - ")[1] + "\n"
                    }
                }

                return (title);
            }

            let commissionUsers = input.split(",");

            chairman.value = commissionUsers[0].trim();
            consult.value = commissionUsers[1].trim();
            member[0].value = commissionUsers[2].trim();
            coDate.value = today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear();
        }
        // commission();
        console.log("------------------------END----------------------------auctionsCommission");
    }

    //check if there is canceling order in #auctionDocuments and if there is 
    function cancelOrderCheck() {
        console.log("-------------------------------------------------------cancelOrderCheck()");
        let docField = auctionDocuments.querySelectorAll('a');
        for (let i = 0; i < docField.length; i++) {
            if (docField[i].innerHTML.includes("Заповед за прекратяване")) {
                let order, date, tp, textToCopy;
                order = docField[i].title.split(".")[0].split(" ").pop();
                date = docField[i].innerText.split('/')[1].trim().split(" ")[0];
                tp = document.querySelector("#auctionTitle").value.split('/')[0].trim();
                textToCopy = "Заповед №" + order + "/" + date + "г. на Директора на " + tp + ".";
                navigator.clipboard.writeText(textToCopy);
                if (confirm(textToCopy + "\n\n!!!\nтекстът е поставен в clipboard-а на ОС!\nПРОВЕРЕТЕ КОРЕКТНОСТТА НА ДАТАТА И ПРОМЕНЕТЕ ПРИ НЕОБХОДИМОСТ.\nПРЕКРАТИ ПРОЦЕДУРАТА??\n!!!")) {
                    // alert("CANCELED");
                    delay(1000).then(() => document.querySelector('#auctionCancel').click());
                }
            }
        }
        console.log("------------------------END----------------------------cancelOrderCheck()");
    }

    // naming uploaded documents when commission is assigned
    // WORK IN PROGRESS
    // NEEDS TESTING AND MODIFICATIONS FOR OTHER TYPE OF DOCUMENTS & DIFFERENTIATING BETWEEN ORDERS
    function docNames() {
        console.log("-------------------------------------------------------docNames()");
        if (docsTableExists(auctionOrder)) {
            firstByuerDocs = auctionOrder.querySelectorAll('a').length;
        } else {
            firstByuerDocs = 0;
        }
        console.log("🚀 ~ file: auctionsForm_v5.js:384 ~ docNames ~ firstByuerDocs:", firstByuerDocs)
        let docLinks = auctionDocuments.querySelector('tbody').querySelectorAll("a");
        let docInput = auctionDocuments.querySelector('tbody').querySelectorAll("select");
        for (i = 0; i < docInput.length; i++) {
            let parentTr = docLinks[i].closest('tr');
            let parentTd = docLinks[i].closest('td');

            let trID = parentTr.className.split('-')[2];
            console.log("🚀 ~ file: auctionsForm_v5.js:391 ~ docNames ~ trID:", trID)
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
                        if (firstByuerDocs === 1) {
                            docInput[i].value = "buyerOrder";
                            inputElement.value = "buyerOrder";
                        } else if (firstByuerDocs === 2) {
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
        console.log("------------------------END----------------------------docNames()");
    }

    //add option to rename documents if there are no select fields in #auctionDocuments
    function docsRename() {
        console.log("-------------------------------------------------------docRename()");
        let docs = document.querySelector("#auctionDocuments").querySelectorAll('a');
        let promptValue = "";
        docs.forEach((el, index) => {
            if (index != 0) {
                if (el.innerHTML.includes('изпълнител')) {
                    console.log("🚀 ~ file: auctionsForm.js:45 ~ docs.forEach ~ el.innerHTML.includes:", index, el.innerHTML);
                    promptValue = index;
                }
                el.innerHTML = "[" + index + "] " + el.innerHTML;
            }
        })

        delay(1000).then(() => rename());

        function rename() {
            if (confirm("RENAME documents?")) {
                let docIDS = prompt("enter document ids:", promptValue);
                if (docIDS.includes(',') || docIDS.includes('.')) {
                    docIDS = docIDS.split(/[,.]/);
                }

                for (i = 0; i < docIDS.length; i++) {
                    docs.forEach((el, index) => {
                        if (index == docIDS[i]) {
                            console.log("🚀 ~ file: auctionsForm.js:58 ~ docs.forEach ~ docIDS[i]:", i)
                            let parentTr = docs[docIDS[i]].closest('tr');
                            let parentTd = docs[docIDS[i]].closest('td');
                            let trID = parentTr.className.split('-')[2];
                            const inputElement = document.createElement("input");
                            inputElement.type = "hidden";
                            inputElement.name = "fileType[" + trID + "]";
                            parentTd.appendChild(inputElement);
                            el.innerHTML = "---RENAMING--- " + " " + el.innerHTML + " " + trID;
                        }
                    })
                }
                if (docIDS != "") {
                    if (isNaN(docIDS)) {
                        if (!isNaN(docIDS[0])) {
                            console.log("🚀 ~ file: Untitled-1:2 ~ docsIDS:", docIDS);
                            document.querySelector('button.btn.btn-success').click();
                        } else {
                            console.log("🚀 ~ file: Untitled-1:2 ~ docsIDS:", "NaN");
                        }
                    } else {
                        console.log("🚀 ~ file: Untitled-1:2 ~ docsIDS:", docIDS);
                        document.querySelector('button.btn.btn-success').click();
                    }
                }
            }
        }
        console.log("------------------------END----------------------------docRename()");
    }

    /////
    cancelOrderCheck();

    //checking if there are select field in #auctionDocuments and runs docsRename() if there are none
    let docsSelect = auctionDocuments.querySelectorAll('select');
    if (docsSelect.length === 0) {
        delay(2000).then(() => docsRename());
    } else {
        console.log("🚀 ~ file: auctionsForm.js:32 ~ number of select fields: ", docsSelect.length);
    }

    if (dateCheck() === "commission") {
        console.log("commission")
        console.log("auctionsCommission()");
        docNames();
        auctionsCommission();
        if (requestsCheck()) {
            console.log("Заявки OK")
            delay(1000).then(() => auctionSave());
        } else {
            console.log("Заявки none")
        }
    }
    if (dateCheck() === "future") {
        console.log("future");
        console.log("guaranteeCalc()");
        console.log("fillFields()");
        console.log("pubOrder()");
        console.log("auctionSave()");
        guaranteeCalc();
        pubOrder();
        fillFields();
        docNames();
        delay(1000).then(() => auctionSave());
    }
    if (dateCheck() === "past" || dateCheck() === "today") {
        console.log("past || today");
        docNames();
        delay(1000).then(() => auctionSave());
    }