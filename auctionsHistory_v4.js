document.querySelector('.navbar-minimalize.minimalize-styl-2.btn.btn-primary').click()
console.clear();
console.log('history_v4');
let auctionsTable = document.querySelector('tbody').querySelectorAll('tr');
let today = new Date();
let auctions = [];

//toast shits
const toastContainer = document.createElement('div');
toastContainer.className = 'toast-container';
document.querySelector('.navbar-header').appendChild(toastContainer);
//toast shits end


//infobar shits
const infoContainer = document.createElement('div')
infoContainer.className = 'info-container';
let nav = document.querySelector(".navbar.navbar-static-top.white-bg")
nav.insertBefore(infoContainer, nav.children[1]);
//infobar shits end

let infoTable = [{
        id: 'frames',
        title: 'заредени',
        color: 'blue'
    },
    {
        id: 'future',
        title: 'бъдещи',
        color: '#E25E3E'
    },
    {
        id: 'today',
        title: 'днешни',
        color: '#D1462F'
    },
    {
        id: 'passed',
        title: 'минали',
        color: '#81B622'
    },
    {
        id: 'danger',
        title: 'прекратени',
        color: '#C70039'
    },
    {
        id: 'seconds',
        title: 'секунди',
        color: 'black'
    }
];

function main() {
    linksInFirstCells();
    // infoBar add cells
    let timeoutMS = 0;
    infoTable.forEach((el, index) => {
        index++
        setTimeout(() => {
            createInfoBar(el)

        }, timeoutMS);
        timeoutMS += 200;
    })

    setAuctionsClasses();
    delay(1000).then(() => addToInfoBar());
    checkForFiles();
    orderFrames();
    delay(6000).then(() => addToInfoBar());

}
main();

//called in main()
//replaces first cell innerHTML with links to auctions forms
function linksInFirstCells() {
    auctionsTable.forEach(el => {
        let today = new Date();
        let date = today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear();
        let aucNumber = el.cells[0].innerText;
        let aucLink = "https://auction.ucdp-smolian.com/au-admin/auctions/form/" + aucNumber.slice(2);
        let aucProtocol = 'https://auction.ucdp-smolian.com/au-admin/history/erasedProtocol/' + el.cells[8].querySelector('a').href.split('/').pop() + "/" + date;
        let aucOrderB = 'https://auction.ucdp-smolian.com/au-admin/history/erasedOrder/' + el.cells[8].querySelector('a').href.split('/').pop() + "/" + date + "?t=b";
        let aucOrderC = 'https://auction.ucdp-smolian.com/au-admin/history/erasedOrder/' + el.cells[8].querySelector('a').href.split('/').pop() + "/" + date + "?t=c";

        el.cells[0].innerHTML = '<a href="' + aucLink + '" target="_blank">' + aucNumber;
        el.cells[1].innerHTML += '</a><br><span id="docPillContainer">' + '<a id="docPill" href="' + aucProtocol + '" target="_blank">П</а><a id="docPill" name="orderB" href="' + aucOrderB + '" target="_blank">ЗК</а><a id="docPill" name="orderC" href="' + aucOrderC + '" target="_blank">ЗП</а></span>';
        // console.log(el.cells[0].innerText, el.className, aucLink);
    })
}

// called in main()
function setAuctionsClasses() {
    auctionsTable.forEach(el => {
        if (el.className != 'danger') {
            el.className = auctionDateCheck(el.cells[4].innerText.split(" ")[0]);
        }
    })
}

// called in main()
// creates 2 iframes for byuers order and cancel order
function orderFrames() {
    auctionsTable.forEach(el => {
        if (el.className != 'danger') {
            let byuerOrder = '?t=b';
            let cancelOrder = '?t=c';

            let orderByuerLink = 'https://auction.ucdp-smolian.com/au-admin/history/order/' + el.cells[8].querySelector('a').href.split('/').pop() + byuerOrder;
            let orderCancelLink = 'https://auction.ucdp-smolian.com/au-admin/history/order/' + el.cells[8].querySelector('a').href.split('/').pop() + cancelOrder;

            const iFrameByuer = document.createElement('iframe');
            const iFrameCancel = document.createElement('iframe');
            iFrameByuer.id = 'iFrameByuer';
            iFrameCancel.id = 'iFrameCancel';
            iFrameByuer.style.display = 'none';
            iFrameCancel.style.display = 'none';

            //appends iFrame element if missing, else reloads frame in first cell on the row
            if (el.cells[2].querySelector("iFrame") === null) {
                el.cells[2].appendChild(iFrameByuer);
                el.cells[2].appendChild(iFrameCancel);
                iFrameByuer.src = orderByuerLink;
                iFrameCancel.src = orderCancelLink;
            } else {
                el.cells[2].querySelectorAll("iframe").contentWindow.location.reload();
            }

            // iFrame.onload = function () {

            //     setTimeout(() => {
            //         console.log('🚀 ~ orderFrames ~ iFrame.contentWindow.document.querySelectorAll("h4"): LOADED\n', iFrame.contentDocument.querySelectorAll("h4").innerText);
            //     }, 2000);
            // }
        }
    })

}

// called in setAuctionsClasses()
function auctionDateCheck(input) {
    let date = new Date(input.split('.')[2], input.split('.')[1] - 1, input.split('.')[0]);
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    let yesterday = new Date();

    if (today.getDay() === 1) {
        yesterday.setDate(yesterday.getDate() - 3);
    } else {
        yesterday.setDate(yesterday.getDate() - 1);
    }

    if (date.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)) {
        console.log('T')
        return 'today';
    } else if (date.setHours(0, 0, 0, 0) <= yesterday.setHours(0, 0, 0, 0)) {
        console.log('P')
        return 'passed';
    } else if (date.setHours(0, 0, 0, 0) >= tomorrow.setHours(0, 0, 0, 0)) {
        console.log('F')
        return 'future';
    }
}

// check for uploaded documents
function checkForFiles() {
    let frameCounter = 0;
    const counts = {};
    auctionsTable.forEach((el, index, array) => {
        //select rows that are not in 'danger' (danger means that auction is canceled)
        if (el.className != 'danger') {

            counts[el] = (counts[el] || 0) + 1; //counts acutions not in danger
            let auctionLink = el.cells[8].querySelector('a').href;

            const iFrame = document.createElement('iFrame');
            iFrame.id = el.cells[0].innerText;
            iFrame.style.display = 'none';

            //appends iFrame element if missing, else reloads frame in first cell on the row
            if (el.cells[0].querySelector("iFrame") === null) {
                el.cells[0].appendChild(iFrame);
                iFrame.src = auctionLink;
            } else {
                el.cells[0].querySelector("iFrame").contentWindow.location.reload();
            }

            iFrame.onload = function () {
                if (iFrame.contentWindow.document.querySelectorAll("label")[10].closest('div').querySelectorAll('tr').length > 0) {
                    // el.className = 'passed'; // has files
                    el.classList.add('hasFiles'); // has files
                }
                // else { // does not have files
                //     el.className = 'smth else'
                // }
                frameCounter++;
                nav.querySelector('#frames').innerText = frameCounter;

                //check if all iFrames are loaded before executing more functions
                if (index === array.length - 1) {

                    // delay(2500).then(() => tabOpen());
                }
            }
        }
    });
}

//INFOBAR FUNCTIONS
function addToInfoBar() {
    console.log('🚀 ~ addToInfoBar ~ addToInfoBar: LOADED');
    let cont = document.querySelector(".info-container");

    if (isItZero(arrayCounter().danger) === 0) {
        cont.querySelector('#danger').classList.remove('show-info-cell')
        cont.querySelector('#danger').classList.textContent = '';
    } else {
        cont.querySelector('#danger').classList.add('show-info-cell')
        cont.querySelector('#danger').innerHTML = isItZero(arrayCounter().danger)
    }

    if ((isItZero(arrayCounter().future) + isItZero(arrayCounter().notPublished)) === 0) {
        cont.querySelector('#future').classList.remove('show-info-cell')
        cont.querySelector('#future').textContent = '';
    } else {
        cont.querySelector('#future').classList.add('show-info-cell')
        cont.querySelector('#future').innerHTML = isItZero(arrayCounter().future) + isItZero(arrayCounter().notPublished)
    }

    if (isItZero(arrayCounter().today) === 0) {
        cont.querySelector('#today').classList.remove('show-info-cell')
        cont.querySelector('#today').classList.textContent = '';
    } else {
        cont.querySelector('#today').classList.add('show-info-cell')
        cont.querySelector('#today').innerHTML = isItZero(arrayCounter().today)
    }

    if (isItZero(arrayCounter().passed) === 0) {
        cont.querySelector('#passed').classList.remove('show-info-cell')
        cont.querySelector('#passed').classList.textContent = '';
    } else {
        cont.querySelector('#passed').classList.add('show-info-cell')
        cont.querySelector('#passed').innerHTML = isItZero(arrayCounter().passed)
    }
}

function createInfoBar(el) {

    const cell = document.createElement('div');
    cell.className = 'info-cell';

    const cellTextHolder = document.createElement('div');
    cellTextHolder.style.backgroundColor = el.color;
    cellTextHolder.className = 'info-cell-text'
    cellTextHolder.classList.add('show-info-cell');
    cellTextHolder.id = el.id;
    cellTextHolder.onclick = infoBarClick;
    cellTextHolder.onmouseover = barmouseover;

    const cellTitle = document.createElement('div');
    cellTitle.className = 'info-cell-title';
    cellTitle.textContent = el.title;

    cell.appendChild(cellTextHolder)
    cell.appendChild(cellTitle)
    infoContainer.appendChild(cell);
}

function infoBarClick() {
    console.log("clicked", this.id, this.innerText);
    let order = "https://auction.ucdp-smolian.com/au-admin/history/erasedOrder/";
    let protocol = "https://auction.ucdp-smolian.com/au-admin/history/erasedProtocol/";
    let form = "https://auction.ucdp-smolian.com/au-admin/auctions/form/";
    let date = '';
    auctionsTable.forEach(element => {
        if (element.className === this.id) {
            console.log(element.cells[0].innerText, element.className)
            if (this.id === 'future') {
                date = getProtocolDate(element.querySelector('#iFrameByuer'),element.querySelector('#iFrameCancel'), element);
                window.open(protocol + element.cells[8].querySelector('a').href.split('/').pop() + "/" + date, '_blank');
                window.open(order + element.cells[8].querySelector('a').href.split('/').pop() + "/" + date + "/?t=c", '_blank');
                window.open(form + element.cells[0].innerText.slice(-4), '_blank');
            } else {
                date = getProtocolDate(element.querySelector('#iFrameByuer'),element.querySelector('#iFrameCancel'), element);
                window.open(protocol + element.cells[8].querySelector('a').href.split('/').pop() + "/" + date, '_blank');
                window.open(order + element.cells[8].querySelector('a').href.split('/').pop() + "/" + date + "/?t=b", '_blank');
                window.open(form + element.cells[0].innerText.slice(-4), '_blank');
            }
        }
    })
}

// called in infoBarClick()
// gets date for generated protocol based on order frame
function getProtocolDate(byuerOrderFrame, cancelOrderFrame, auction) {
    let orderDate = ''
    if (byuerOrderFrame.contentDocument.querySelector('h4').innerText.includes("Преглед")) {
        let orderText = byuerOrderFrame.contentDocument.querySelector('tbody').innerText;
        let orderDatePosition = orderText.indexOf("утвърден на");
        orderDate = orderText.slice(orderDatePosition + 12, orderDatePosition + 22).trim();
        auction.querySelector("a[name='orderB']").style.backgroundColor = "green";
        // auction.cells[3].style.backgroundColor = "lime";
    } else if (cancelOrderFrame.contentDocument.querySelector('h4').innerText.includes("Преглед")) {
        let orderText = cancelOrderFrame.contentDocument.querySelector('tbody').innerText;
        let orderDatePosition = orderText.indexOf("утвърден на");
        orderDate = orderText.slice(orderDatePosition + 12, orderDatePosition + 22).trim();
        auction.querySelector("a[name='orderC']").style.backgroundColor = "green";
    } else {
        auction.querySelector("a[name='orderB']").style.backgroundColor = "red";
        auction.querySelector("a[name='orderC']").style.backgroundColor = "red";
    }
    return orderDate;
}

function barmouseover() {
    console.log("mouseover", this.id);
    auctionsTable.forEach(el => {
        if (el.className === this.id) {
            // console.log(el.cells[0].innerText);
            getProtocolDate(el.querySelector('#iFrameByuer'),el.querySelector('#iFrameCancel'), el)
            // highlight the mouseover target
            this.classList.add('mouseHover')
            auctionsTable.forEach(element => {
                if (element.className === this.id) {
                    element.style.backgroundColor = window.getComputedStyle(this, null).getPropertyValue('background-color');
                    element.style.color = '#fafafa'
                }
            })

            // reset the color after a short delay
            setTimeout(() => {
                this.classList.remove('mouseHover')
                auctionsTable.forEach(element => {
                    if (element.className === this.id) {
                        element.style.backgroundColor = ""
                        element.style.color = ''
                    }
                })
            }, 750);
        }
    })

}
//INFOBAR FUNCTIONS END

// called in addToInfoBar()
function arrayCounter() {
    const count = {};
    auctionsTable.forEach(el => {
        count[el.className] = (count[el.className] || 0) + 1;
    });
    return count;
}

// called in addToInfoBar()
function isItZero(counter) {
    if (counter === undefined) {
        return counter = 0;
    } else {
        return counter;
    }
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

//styling bellow
document.head.insertAdjacentHTML("beforeend", `<style>
        .customContainer {
            display: inline;
            width: 100%;
        }
        .customContainer>div {
            flex:1;
            padding: 2px;
        }

        .containerCell{
            display: flex;
        }

        .containerCell>div:first-of-type{
            text-align: right;
            width: 30%;
        }
        .containerCell>div:last-of-type{
            text-align: left;
            width: 70%;
            padding-left: 4%;
        }

        .error>td:nth-child(1),
        .error>td:nth-child(3),
        .error>td:nth-child(6),
        .error>td:last-of-type{
            background-color: black;
            color: white;
        }

        .passed>td:last-of-type {
            background-color: #81B622;
        }
        b.passed{
            color: #81B622;
        }
        .future>td:last-of-type {
            background-color: #FFBB5C;
        }
        .future>td:nth-child(4)>b,
        .future>td:nth-child(5)>b {
            color: #FFBB5C;
        }
        b.future {
            color: #FFBB5C;
        }

        .today>td:last-of-type {
            background-color: #D1462F;
        }
        .today>td:nth-child(4)>b,
        .today>td:nth-child(5)>b {
            color: #D1462F;
        }
        b.today {
            color: #D1462F;
        }

        .commission>td:last-of-type {
            background-color: #040D12;
        }
        .commission>td:nth-child(4)>b,
        .commission>td:nth-child(5)>b {
            color: #040D12;
        }
        b.commission {
            color: #040D12;
        }

        .notPublished>td:last-of-type {
            background-color: rgb(153, 153, 153);
        }

        #docs>a{
            font-style: italic;
        }

        #docPillContainer{
            display: flex;
            width: auto;
        }
        #docPill{
            flex: 1;
            padding-left: 2px;
            padding-right: 2px;
            margin-right: 5px;
            width: 30%;
            border-radius: 6px;
            background-color: grey;
            /*opacity: 0.3;*/
            text-align: center;
            font-size: small;
            font-weight: 550;
            color: white;
        }
        #docsLengthInfo {
            padding: 5px;
            font-weight: 600;
            font-size: larger;
        }

        #infoTable {
            padding: 14px 20px 14px 25px;
            color: #a7b1c2;
            font-weight: 600;
        }
        #infoTable td {
            padding: 10px;
            border-bottom: 1px solid;
        }
        #infoTable tr:hover {
            background-color: #293846;
            color: white;
        }
        #infoTable tr > td:last-of-type {
            text-align: center;
            font-size: large;
        }

        #infoButtonContainer {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 1px;
        }
        #infoButton {
            width: 70px;
        }

        /* Toast Container */
        .toast-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        }
        .toast {
            background-color: white;
            color: black;
            width: 550px;
            height: 50px;
            line-height: 44px;
            border-left: 1em solid;
            padding: 2px 10px 0px 5px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
            margin-bottom: 20px;
            opacity: 0;
            transform: translateX(100%);
            transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        }
        .toast>div{
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            padding: 3px 0px 0px 5px;
            font-size: larger;
        }
        .toast>div:first-of-type {
            width: 135px;
            text-align: right;
        }
        .toast>div:nth-child(2) {
            width: 345px;
            opacity: 0.5;
        }
        .toast-danger{
            border-left-color: pink;
        }
        .toast-passed{
            border-left-color: #81B622;
        }
        .toast-commission{
            border-left-color: #040D12;
        }
        .toast-today{
            border-left-color: #D1462F;
        }
        .toast-future{
            border-left-color: #FFBB5C;
        }
        .toast-notPublished{
            border-left-color: #999999;
        }
        /* Show Animation */
        .toast.show {
            opacity: 1;
            transform: translateX(0);
            transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        }
        /* CSS for the close button */
        .close-button {
            text-align: center;
            float:right;
            display: block;
            width:40px;
            margin-left:auto;
            top: 0.5px;
            right: 8px;
            color: black;
            cursor: pointer;
        }

        /* infoBar container */
        .info-container {
            position: fixed;
            align: center;
            font-family: Helvetica, Arial, sans-serif;
            display: flex;
            margin-right: 15px;
            width: 700px;
            left: 35%;
            right: 35%;
            margin-top: 0px;
        }

        .info-cell {
            position: sticky;
            top: 0;
            flex: 1;
            margin-right: 5px;

        }
        .info-cell-text {
            height: 8px;
            color: transparent; 
            trainsition: height 2s ease-in-out;

        }

        .show-info-cell {
            color: white;
            font-size: x-large;
            text-align: center;
            height: 35px;
            transform: translateY(110);
            transition: opacity 0.3s ease-in-out, transform 0.5s ease-in-out;
        }

        .info-cell-title {
            color: black;
            opacity: 0.7;
            font-size: x-small;
            text-align: center;
            font-style: italic;
            font-weight: bold;
            border: 0px;
            margin: 0px;
            padding: 0px;
        }

        /* woodsinfo number of documents styling*/
        #docsLengthInfo {
            display: flex;
            width: 200px;
        }
        #woods-pills,
        #price-pills {
            display: flex;
            width: auto;
        }

        #docsLengthInfo>span,
        #woods-pills>span,
        #price-pills>span {
            flex: 1;
            padding-left: 2px;
            padding-right: 2px;
            margin-right: 5px;
            width: 30%;
            border-radius: 6px;
            background-color: grey;
            /*opacity: 0.3;*/
            text-align: center;
            font-size: small;
            font-weight: 550;
            color: white;
        }

        .hasFiles {
            background-color: #A7D397;
        }
        </style>`);