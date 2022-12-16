function auctionsCommission() {
    console.log("auctionsCommission");
    let date = document.querySelector("input[name='data[dueDate]']");
    let today = new Date();

    //needs work to ensure that only works for auctions that are set for tommorow and additional check if auction is on monday
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
        let promptTitle;
        let input;
        let tp = document.querySelector("input[name='data[title]']");

        if (tp.value.includes("Алабак")) {
            input = "91,94,93,95,542";
            input = prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Хайтов")) {
            input = "471,144,398,424,545";
            input = prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Ардино")) {
            input = "21,22,23,29,463";
            input = prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Асеновград")) {
            input = "161,164,166,498,499";
            input = prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Батак")) {
            input = "451,124,125,127,130";
            input = prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Борино")) {
            input = "111,114,117,119,120";
            input = prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Доспат")) {
            input = "221,223,225,226,229";
            input = prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Златоград")) {
            input = "321,323,322,324,372";
            input = prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Карлово")) {
            input = "331,410,332,333,335";
            input = prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Кирково")) {
            input = "41,44,42,43,45";
            input = prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Клисура")) {
            input = "504,419,275,279,469";
            input = prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Крумовград")) {
            input = "181,462,186,491,495";
            input = prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Михалково")) {
            input = "482,417,352,355,543";
            input = prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Момчилград")) {
            input = "51,458,52,53,522";
            input = prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Пазарджик")) {
            input = "71,370,72,76,80";
            input = prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Панагюрище")) {
            input = "252,369,253,255,520";
            input = prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Пещера")) {
            input = "241,449,242,245,403";
            input = prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Пловдив")) {
            input = "282,409,285,512,524";
            input = prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Първомай")) {
            input = "173,502,175,176,457";
            input = prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Ракитово")) {
            input = "359,412,361,363,366";
            input = prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Родопи")) {
            input = "231,235,236,234,237";
            input = prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Селище")) {
            input = "347,481,472,473,517";
            input = prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Славейно")) {
            input = "201,518,202,207,531";
            input = prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Смилян")) {
            input = "311,501,320,401,411";
            input = prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Смолян")) {
            input = "32,37,33,36,38";
            input = prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Триград")) {
            input = "87,83,82,441,489";
            input = prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Хисар")) {
            input = "61,391,63,65,68";
            input = prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("лъка")) {
            input = "452,155,152,373,390";
            input = prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Борово")) {
            input = "106,105,103,107,464";
            input = prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Женда")) {
            input = "301,378,305,309,540";
            input = prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Извора")) {
            input = "477,140,135,139,478";
            input = prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Кормисош")) {
            input = "510,420,265,269,465";
            input = prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Тракия")) {
            input = "291,404,292,296,299";
            input = prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Чепино")) {
            input = "192,194,196,197,200";
            input = prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("поляна")) {
            input = "219,213,212,214,393";
            input = prompt(promptTitlefuntion(input), input);
        } else {
            input = prompt("Въведете членове на комисията:");
        }

        function promptTitlefuntion(ids) {
            let commUsers = ids.split(",");
            title = "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t" + tp.value.split("/")[0] + "\nНазначете комисия в състав: \n" + "ПРЕДСЕДАТЕЛ:" + name(commUsers[0]) + "\nЮРИСТ:" + name(commUsers[1]) + "\nЧЛЕНОВЕ:" + "\n" + name(commUsers[2]) + "\n" + name(commUsers[3]) + "\n" + name(commUsers[4]);

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
        member[1].value = commissionUsers[3].trim();
        member[2].value = commissionUsers[4].trim();
    }

}
auctionsCommission();