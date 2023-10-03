console.clear();
console.log('auctionForm_v_newest');
let branch = document.querySelector('#auctionBranch');
let subject = document.querySelector('#auctionSubject');

let number = document.querySelector('input[name="data[woodInfo][number][0]"]');
let big = document.querySelector('input[name="data[woodInfo][big][0]"]');
let mid = document.querySelector('input[name="data[woodInfo][mid][0]"]');
let small = document.querySelector('input[name="data[woodInfo][small][0]"]');
let ozm = document.querySelector('input[name="data[woodInfo][ozm][0]"]');
let firewood = document.querySelector('input[name="data[woodInfo][firewood][0]"]');
let total = document.querySelector('input[name="data[woodInfo][total][0]"]');

let startingPrice = document.querySelector('#auctionStartPrice');
let bidStep = document.querySelector('#аuctionBidStep');
let guarantee = document.querySelector('#аuctionGuarantee');

let dueDate = document.querySelector('#auctionDueDate');
let dueTime = document.querySelector('#auctionDueTime');

function main() {
    if (branch.value === "") {
        newAuction();
    } else {} //sth else


}
main();

function newAuction() {
    branchPrompt();

    subjectPrompt();
    woodsPrompt();
    pricePrompt()
    datePrompt();
    fillDescription();

    function branchPrompt() {
        switch (prompt('ТП')) {
            case 'hay':
                branch.value = "37";
                break;
            case 'ala':
                branch.value = "1";
                break;
            case 'ard':
                branch.value = "2";
                break;
            case 'asn':
                branch.value = "3";
                break;
            case 'bat':
                branch.value = "4";
                break;
            case 'brn':
                branch.value = "5";
                break;
            case 'dos':
                branch.value = "6";
                break;
            case 'zla':
                branch.value = "7";
                break;
            case 'kar':
                branch.value = "8";
                break;
            case 'kir':
                branch.value = "9";
                break;
            case 'kli':
                branch.value = "10";
                break;
            case 'kru':
                branch.value = "11";
                break;
            case 'mih':
                branch.value = "12";
                break;
            case 'mom':
                branch.value = "13";
                break;
            case 'paz':
                branch.value = "14";
                break;
            case 'pan':
                branch.value = "15";
                break;
            case 'pes':
                branch.value = "16";
                break;
            case 'pld':
                branch.value = "17";
                break;
            case 'par':
                branch.value = "18";
                break;
            case 'rak':
                branch.value = "19";
                break;
            case 'rod':
                branch.value = "20";
                break;
            case 'sel':
                branch.value = "21";
                break;
            case 'sla':
                branch.value = "22";
                break;
            case 'smi':
                branch.value = "23";
                break;
            case 'sml':
                branch.value = "24";
                break;
            case 'tri':
                branch.value = "25";
                break;
            case 'his':
                branch.value = "27";
                break;
            case 'lak':
                branch.value = "28";
                break;
            case 'brv':
                branch.value = "29";
                break;
            case 'jen':
                branch.value = "30";
                break;
            case 'izv':
                branch.value = "31";
                break;
            case 'kor':
                branch.value = "32";
                break;
            case 'tra':
                branch.value = "33";
                break;
            case 'che':
                branch.value = "34";
                break;
            case 'pol':
                branch.value = "35";
                break;

            default:
                alert('wrong, try again')
                branchPrompt();
                break;
        }
    }

    function subjectPrompt() {
        switch (prompt('предмет')) {
            case 'k', 'r':
                subject.value = "etRoots";
                break;
            case 'pk', 'f':
                subject.value = "etForecast";
                break;
            case 'dd', 'h':
                subject.value = "etHarvested";
                break;

            default:
                alert('wrong, try again')
                subjectPrompt();
                break;
        }
    }

    function woodsPrompt() {
        number.value = prompt('#');
        big.value = prompt('едра', 0);
        mid.value = prompt('средна', 0);
        small.value = prompt('дребна', 0);
        ozm.value = prompt('озм', 0);
        firewood.value = prompt('огрев', 0);
        total.value = Number(big.value) + Number(mid.value) + Number(small.value) + Number(ozm.value) + Number(firewood.value);
    }

    function pricePrompt() {
        startingPrice.value = prompt('Начална цена', 12343.66)
        bidStep.value = Math.min(Number(startingPrice.value) * 0.01, startingPrice.value).toFixed(2);

        let result = Math.min(Number(startingPrice.value) * 0.05, startingPrice.value);
        if (result > 999) {
            result = Math.floor(result / 100) * 100; // round to the nearest hundred
        } else if (result > 200 && result < 999) {
            result = Math.floor(result / 10) * 10; // round to the nearest ten
        } else {
            result = Math.floor(result / 1) * 1;
        }
        guarantee.value = result.toFixed(2);
    }

    function datePrompt() {
        let date = prompt("Дата [xx.xx]")
        dueDate.value = date + '.2023'
        dueTime.value = prompt("Час")
    }

    function fillDescription() {
        let fillButtons = document.querySelectorAll(".form-group.has-feedback button");
        fillButtons.forEach(button => {
            button.click();
        });
    }
}