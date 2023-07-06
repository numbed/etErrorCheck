if (confirm("Назначаване на комисия?") == true) {
    auctionsCommission();
} else if (confirm("Вземи номер на заповед за откриване?") == true) {
    pubOrder();
} else if (confirm("Текст за основание за прекратяване на процедура?")) {
    cancelOrder();
}

function auctionsCommission() {
    console.log("---auctionsCommission");
    let date = document.querySelector("input[name='data[dueDate]']");
    let today = new Date();

    //needss work to ensure that only works for auctions that are set for tommorow and additional check if auction is on monday
    function dateCheck(d) {
        let dateString = d.value.split(".");
        let deadline = new Date(dateString[2], dateString[1] - 1, dateString[0]);
        let output;

        if (deadline.setHours(0, 0, 0, 0) > today.setHours(0, 0, 0, 0)) {
            output = "today";
            commission();
        } else {
            output = "not today";
        }

        return output;
    }
    dateCheck(date);

    function commission() {

        let chairman = document.querySelector("select[name='data[commision][][chairman]']");
        let consult = document.querySelector("select[name='data[commision][][jurisconsult]']");
        let member = document.querySelectorAll("select[name='data[commision][][member]']");
        let input;
        let tp = document.querySelector("input[name='data[title]']");
        let coNumber = document.querySelector("#coNumber");
        let coDate = document.querySelector("#coDate");

        if (tp.value.includes("Алабак")) {
            input = "91,548,95";
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
            coNumber.value = "З-20-" + prompt("Номер на заповед за комисия:");с
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
            input = "87,83,82";
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
    }
}


//needs changes for the new auctions!!!!
function pubOrder() {
    console.log("---pubOrder");
    let order;
    let today = new Date();
    ooNumber = document.querySelector("#ooNumber");
    ooDate = document.querySelector("#ooDate");
    // ooNumber.value = ooNumber.value + prompt("Номер на заповед за откриване");
    let links = document.links;
    for (i = 0; i < links.length; i++) {
        if (links[i].title.includes("Заповед")) {
            order = links[i].title;
            order = order.split(".")[0].split("Заповед")[1].trim();
            orderDate = links[i].innerHTML;
            orderDate = orderDate.split("/")[1].split(" ")[1];
        }
    }
    ooNumber.value = order;
    ooDate.value = orderDate;
}

//naming uploaded documents when commission is assigned
//WORK IN PROGRESS
function docNames() {
    let docTable = document.querySelectorAll("tbody")[4];
    let docLinks = docTable.querySelectorAll("a");
    let docInput = docTable.querySelectorAll("select");
    for (i = 0; i < docLinks.length; i++) {
        if (docLinks[i].title.includes("Заповед")) {
            docInput[i].value = "openOrder";
            docInput[i].selected = "selected";
        } else if (docLinks[i].title.includes("Документация")) {
            docInput[i].value = "document";
        }
    }

}

//gets the needed text for canceling order in OS clipboard.
function cancelOrder() {
    console.log("---cancelOrder");
    let docTable = document.querySelectorAll("tbody")[4].querySelectorAll("a");
    for (i = 0; i< docTable.length; i++) {
        if (docTable[i].innerHTML.includes("прекратяване")) {
            let order, date, tp, textToCopy;
            order = docTable[i].title.split(".")[0].split(" ").pop();
            date = docTable[i].innerText.split('/')[1].trim().split(" ")[0];
            tp = document.getElementById("auctionTitle").value.split('/')[0].trim();
            textToCopy = "Заповед №" + order + "/" + date + "г. на Директора на " + tp +".";
            navigator.clipboard.writeText(textToCopy);
            alert(textToCopy + "\n\n!!!\nтекстът е поставен в clipboard-а на ОС!\nПРОВЕРЕТЕ КОРЕКТНОСТТА НА ДАТАТА И ПРОМЕНЕТЕ ПРИ НЕОБХОДИМОСТ.\n!!!");
        }
    }
}