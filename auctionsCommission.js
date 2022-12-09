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
            prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Хайтов")) {
            input = "";
            prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Ардино")) {
            input = "";
            prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Асеновград")) {
            input = "";
            prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Батак")) {
            input = "";
            prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Борино")) {
            input = "";
            prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Доспат")) {
            input = "";
            prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Златоград")) {
            input = "";
            prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Карлово")) {
            input = "";
            prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Кирково")) {
            input = "";
            prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Клисура")) {
            input = "";
            prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Крумовград")) {
            input = "";
            prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Крумовград")) {
            input = "";
            prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Михалково")) {
            input = "";
            prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Момчилград")) {
            input = "";
            prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Пазарджик")) {
            input = "";
            prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Панагюрище")) {
            input = "";
            prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Пещера")) {
            input = "";
            prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Пловдив")) {
            input = "";
            prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Първомай")) {
            input = "";
            prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Ракитово")) {
            input = "359,412,361,363,366";
            prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Родопи")) {
            input = "";
            prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Селище")) {
            input = "";
            prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Славейно")) {
            input = "";
            prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Смилян")) {
            input = "";
            prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Смолян")) {
            input = "";
            prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Триград")) {
            input = "87,83,82,441,489";
            prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Хисар")) {
            input = "";
            prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("лъка")) {
            input = "";
            prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Борово")) {
            input = "";
            prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Женда")) {
            input = "";
            prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Извора")) {
            input = "";
            prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Кормисош")) {
            input = "";
            prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Тракия")) {
            input = "";
            prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("Чепино")) {
            input = "";
            prompt(promptTitlefuntion(input), input);
        } else if (tp.value.includes("поляна")) {
            input = "";
            prompt(promptTitlefuntion(input), input);
        } else {
            prompt("Въведете членове на комисията:", input);
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