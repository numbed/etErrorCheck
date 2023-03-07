//needs fix (auction date is next day after commission !temp fix - currDate.day +1)
//needs fix if the date is the last day of the month
//needs fix if the day is between 01 and 09
function commDateCheck() {
    console.log("---commDateCheck");
    let today = new Date();
    let auctionDate = document.querySelector("#auctionDueDate").value;
    let m = (today.getMonth() + 1);
    if (m < 10) {
        m = "0" + m;
    }
    let currDate = (today.getDate() + 1) + "." + m + "." + today.getFullYear();
    console.log(auctionDate);
    console.log(currDate);
    console.log('month ' + m);
    if (auctionDate == currDate) {
        console.log("True");
        auctionsCommission();
        pubOrder(); // to be removed when obsolete
    } else {
        console.log("False");
        auctionsCommission();
        pubOrder();
    }

}
commDateCheck();

// if (confirm("Назначаване на комисия?") == true) {
//     auctionsCommission();
// } else if (confirm("Въведи заповед за откриване?") == true) {
//     pubOrder();
// }

function auctionsCommission() {
    if (confirm("Назначаване на комисия?") == true) {
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
                input = "471,144,398,424,545";
                input = prompt(promptTitlefuntion(input), input);
                coNumber.value = "З-02-" + prompt("Номер на заповед за комисия:");
            } else if (tp.value.includes("Ардино")) {
                input = "463,22,528";
                input = prompt(promptTitlefuntion(input), input);
                coNumber.value = "З-04-" + prompt("Номер на заповед за комисия:");
            } else if (tp.value.includes("Асеновград")) {
                input = "161,164,166,498,499";
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
                input = "51,458,52,53,522";
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
                input = "359,412,365";
                input = prompt(promptTitlefuntion(input), input);
                coNumber.value = "З-21-" + prompt("Номер на заповед за комисия:");
            } else if (tp.value.includes("Родопи")) {
                input = "231,235,238";
                input = prompt(promptTitlefuntion(input), input);
                coNumber.value = "З-22-" + prompt("Номер на заповед за комисия:");
            } else if (tp.value.includes("Селище")) {
                input = "347,481,472,473,517";
                input = prompt(promptTitlefuntion(input), input);
                coNumber.value = "З-23-" + prompt("Номер на заповед за комисия:");
            } else if (tp.value.includes("Славейно")) {
                input = "201,518,202,207,531";
                input = prompt(promptTitlefuntion(input), input);
                coNumber.value = "З-24-" + prompt("Номер на заповед за комисия:");
            } else if (tp.value.includes("Смилян")) {
                input = "411,501,401";
                input = prompt(promptTitlefuntion(input), input);
                coNumber.value = "З-25-" + prompt("Номер на заповед за комисия:");
            } else if (tp.value.includes("Смолян")) {
                input = "31,37,32,33,36";
                input = prompt(promptTitlefuntion(input), input);
                coNumber.value = "З-26-" + prompt("Номер на заповед за комисия:");
            } else if (tp.value.includes("Триград")) {
                input = "87,83,82,441,489";
                input = prompt(promptTitlefuntion(input), input);
                coNumber.value = "З-27-" + prompt("Номер на заповед за комисия:");
            } else if (tp.value.includes("Хисар")) {
                input = "61,391,63,65,68";
                input = prompt(promptTitlefuntion(input), input);
                coNumber.value = "З-28-" + prompt("Номер на заповед за комисия:");
            } else if (tp.value.includes("лъка")) {
                input = "452,155,152,373,390";
                input = prompt(promptTitlefuntion(input), input);
                coNumber.value = "З-29-" + prompt("Номер на заповед за комисия:");
            } else if (tp.value.includes("Борово")) {
                input = "106,105,103,107,464";
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
                input = "291,404,292,296,299";
                input = prompt(promptTitlefuntion(input), input);
                coNumber.value = "З-34-" + prompt("Номер на заповед за комисия:");
            } else if (tp.value.includes("Чепино")) {
                input = "192,549,195";
                input = prompt(promptTitlefuntion(input), input);
                coNumber.value = "З-35-" + prompt("Номер на заповед за комисия:");
            } else if (tp.value.includes("поляна")) {
                input = "219,213,212,214,393";
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
}

function newAuction() {
    let branch = document.querySelector("#auctionBranch").value;
    if (branch !== "") {

    }

    // let tp = document.querySelector("#auctionBranch");
    // let subject = document.querySelector("#auctionSubject");
    // let price = document.querySelector("#auctionStartPrice");
    // let guarantee = document.querySelector("#аuctionGuarantee");
    // let bid = document.querySelector("#аuctionBidStep");

    // let oNumber = document.querySelector("#ooNumber");
    // let oDate = document.querySelector("#ooDate");
    // let firstDate = document.querySelector("#auctionDueDate");
    // let time = document.querySelector("#auctionDueTime");

    // tp.value = prompt("ТП", "1"); //value codes to be added
    // subject.value = prompt("Предмет", "etRoots"); //value codes to be added
    // price.value = prompt("Цена", "40029.73"); //value codes to be added
    // guarantee.value = prompt("Гаранция", "123"); //value codes to be added
    // bid.value = (price.value/100).toFixed(2);

    // oNumber.value = prompt("Заповед за откриване", "11"); //value codes to be added
    // oDate.value = prompt("Дата на заповед за откриване", "12.02.2023"); //value codes to be added
    // firstDate.value = prompt("Първа дата", "14.03.2023");    
    // time.value = prompt("Час");   


    // document.querySelector("input[name='data[woodInfo][number][0]']").value = prompt("№ на обект:", "1");
    // document.querySelector("input[name='data[woodInfo][big][0]']").value = prompt("Едра", "2");
    // document.querySelector("input[name='data[woodInfo][mid][0]']").value = prompt("Средна", "3");
    // document.querySelector("input[name='data[woodInfo][small][0]']").value = prompt("Дребна", "4");
    // document.querySelector("input[name='data[woodInfo][ozm][0]']").value = prompt("ОЗМ", "5");
    // document.querySelector("input[name='data[woodInfo][firewood][0]']").value = prompt("Огрев", "6");

}


//needs changes for the new auctions!!!!
function pubOrder() {
    if (confirm("Вземи номер на заповед за откриване?") == true) {

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
        // ooNumber.value = ooNumber.value + prompt("Номер на заповед за откриване");
        ooDate.value = orderDate;
    }
}