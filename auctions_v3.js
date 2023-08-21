console.clear();
console.log("auctions v3");
let today = new Date();
let table = document.querySelector('tbody').querySelectorAll('tr');
let tableHeader = document.querySelector('thead');
let auctions = [];
let framesLoadedCounter = 0;

arrayPopulate();
console.log("🚀 ~ file: auctions_v3.js:10 ~ auctions:", auctions)

//populating auctions[]
function arrayPopulate() {
    table.forEach(el => {
        let object = {
            number: el.cells[0].innerText,
            status: el.className,
            date: dateSplit(el.cells[3].innerHTML), //table.date
            TP: el.cells[1].innerText,
            obekt: el.cells[5].innerText.split("/")[1].trim().split(' ').pop(),
            auctionFormLink: "https://auction.ucdp-smolian.com/au-admin/auctions/form/" + el.cells[0].innerText.slice(-4),
            auctionHistoryLink: "https://auction.ucdp-smolian.com/au-admin/history/review/" + el.cells[0].innerText.slice(-4),
        }
        //table.date
        function dateSplit(input) {
            let dateInput = input.split(' ')[0].trim().split('.');
            let firstDate = new Date(dateInput[2], dateInput[1] - 1, dateInput[0]);
            return firstDate.getDate() + "." + (firstDate.getMonth() + 1) + "." + firstDate.getFullYear();
        }
        auctions.push(object);
    });

    //adding bidStatus to auctions[]
    function auctionBidStatusAdd() {
        auctions.forEach(el => {
            el.bidStatus = bidStatusCheck(el.date);
        });

        function bidStatusCheck(input) {
            let firstDate = new Date(input.split(' ')[0].trim().split('.')[2], input.split(' ')[0].trim().split('.')[1] - 1, input.split(' ')[0].trim().split('.')[0]);
            let tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);
            let yesterday = new Date();

            if (today.getDay() === 1) {
                yesterday.setDate(yesterday.getDate() - 3);
            } else {
                yesterday.setDate(yesterday.getDate() - 1);
            }

            if (firstDate.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)) {
                return 'today';
            } else if (firstDate.setHours(0, 0, 0, 0) <= yesterday.setHours(0, 0, 0, 0)) {
                return 'past';
            } else if (firstDate.setHours(0, 0, 0, 0) >= tomorrow.setHours(0, 0, 0, 0)) {
                return 'future';
            }
        }
    }
    auctionBidStatusAdd();
}
