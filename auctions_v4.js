document.querySelector('.navbar-minimalize.minimalize-styl-2.btn.btn-primary').click()
console.clear();
console.log('auctions_v4');
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

let textToBeReplaced = ['търг', 'конкурс', 'ценово', 'добив', 'корен', 'действително добити', 'прогнозни'];
let auctionsErrors = ['конкурс', 'ценово'];

// let auctionDocumetsTable = [{
//         id: 'docs',
//         title: 'Документи'
//     }, {
//         id: 'docsFirstByuer',
//         title: '1ви купувач'
//     },
//     {
//         id: 'docsSecondByuer',
//         title: '2ри купувач'
//     }
// ]
let auctionDocumetsTable = [{
    id: 'docs',
    title: 'Документи'
}];
let woodsTable = [{
        id: 'big',
        title: 'едра'
    }, {
        id: 'mid',
        title: 'средна'
    },
    {
        id: 'small',
        title: 'дребна'
    },
    {
        id: 'ozm',
        title: 'ОЗМ'
    },
    {
        id: 'firewood',
        title: 'огрев'
    },
    {
        id: 'total',
        title: 'общо'
    },
]
let priceTable = [{
    id: "bidStep",
    title: "стъпка"
}, {
    id: "guarantee",
    title: "гаранция"
}, {
    id: "percentage",
    title: "процент"
}]
let infoTable = [{
        id: 'frames',
        title: 'заредени',
        color: 'blue'
    },
    {
        id: 'errors',
        title: 'грешки',
        color: 'black'
    },
    {
        id: 'notPublished',
        title: 'непубликувани',
        color: '#FFBB5C'
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
        id: 'commission',
        title: 'комисии',
        color: '#040D12'
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

// counter for loaded iframes
let counter = 0;

function main() {
    //checks if there are auction ready to be published and click on each publish button
    auctionPublish();

    // coloring table if there are errors
    auctionsTable.forEach(item => {
        // changes cell color if auction is in the array
        auctionsErrors.forEach(el => {
            if (item.cells[4].innerText.includes(el)) {
                item.cells[4].style.color = 'white'
                item.cells[4].style.backgroundColor = 'red'
            }
        })

        item.cells[4].innerHTML += '<br><span id="docsLengthInfo"></span>';
        // replaces text in the array with uppercase
        textToBeReplaced.forEach(el => {
            item.cells[4].innerHTML = item.cells[4].innerHTML.replace(el, el.toUpperCase().bold())
        })
    })

    // infoBar add cells
    let timeoutMS = 0;
    infoTable.forEach((el, index) => {
        index++
        setTimeout(() => {
            createInfoBar(el)

        }, timeoutMS);
        timeoutMS += 200;
    })

    setTimeout(() => {
        addToInfoBar();
    }, 5000);
    // infoBar end
    // createButton();

    showDeadline();
    setAuctionsClasses();

    toastCheck();

    createIFrames();

    // check if loaded frames are equal to number of auctions on page, after specific time
    startCountdown(10);
    setTimeout(() => {
        console.log("timeout")
        if (counter === auctionsTable.length) {
            uploadedFilesCheck();
            addToInfoBar(); // update #infoTable after auctions file check
            populateTables();
            createButton();
            document.querySelector('#infoButtonContainer').style.display = '';
        } else {
            startCountdown(75);
            setTimeout(() => {
                console.log("timeout2")
                if (counter === auctionsTable.length) {
                    uploadedFilesCheck();
                    addToInfoBar(); // update #infoTable after auctions file check
                    populateTables()
                    document.querySelector('#infoButtonContainer').style.display = '';
                }
            }, 75000);
        }
    }, 9500);

    prepareCells();

    errorCheck();

    tableOuput();
}
main();

function startCountdown(seconds) {
    console.log('🚀 ~ startCountdown ~ startCountdown: LOADED');

    let secCounter = seconds;
    const interval = setInterval(() => {
        let secondsInfo = document.querySelector(".info-container").querySelector("#seconds");
        secondsInfo.innerText = secCounter;
        secCounter--;

        if (secCounter < 0) {
            clearInterval(interval);
            secondsInfo.innerText = 'Ding!';
        }
    }, 1000);
}

//BUTTON FUNCTIONS
// called in main()
function createButton() {
    // Create container element
    const div = document.createElement('div');
    div.id = 'infoButtonContainer';
    // div.style.display = 'none';
    // let nav = document.querySelector(".navbar.navbar-static-top.white-bg")
    // nav.insertBefore(div, nav.children[1])
    document.querySelector('thead').querySelector('th').querySelector('div').appendChild(div);

    // Create a button element
    const button = document.createElement('a');
    button.id = 'infoButton';
    button.className = 'btn btn-success pull-left';

    // Set the button's text
    button.textContent = 'HIDE';

    // Add an event listener to the button
    button.addEventListener('click', buttonClick);

    // Append the button to a container element
    div.appendChild(button);
}

// called in createButton()
function buttonClick() {
    console.log('clicked: button')
    let button = document.querySelector('#infoButton')
    if (button.innerText === "SHOW") {
        button.innerText = "HIDE";
        document.querySelectorAll("#woods-pills").forEach(el => {
            el.style.display = "flex"
        })
        document.querySelectorAll("#price-pills").forEach(el => {
            el.style.display = "flex"
        })
        document.querySelectorAll("#docsLengthInfo").forEach(el => {
            el.style.display = "flex"
        })

    } else if (button.innerText === "HIDE") {
        button.innerText = "SHOW";
        document.querySelectorAll("#woods-pills").forEach(el => {
            el.style.display = "none"
        })
        document.querySelectorAll("#price-pills").forEach(el => {
            el.style.display = "none"
        })
        document.querySelectorAll("#docsLengthInfo").forEach(el => {
            el.style.display = "none"
        })
        document.querySelectorAll(".customContainer").forEach(el => {
            el.style.display = "none"
        })
    }
}
//BUTTON FUNCTIONS END

//TOAST FUNCTIONS
function toastCheck() {
    //creating toast notifications if needed
    let timeoutMS = 50;
    if ((isItZero(arrayCounter().future) + isItZero(arrayCounter().notPublished)) != 0) {
        setTimeout(() => {
            createToast('бъдещи: ', 'toast-future', isItZero(arrayCounter().future) + isItZero(arrayCounter().notPublished))
        }, timeoutMS);
        timeoutMS += 300;
    }
    if (isItZero(arrayCounter().notPublished) != 0) {
        setTimeout(() => {
            createToast('непубликувани: ', 'toast-notPublished', isItZero(arrayCounter().notPublished))
        }, timeoutMS);
        timeoutMS += 300;
    }
    if (isItZero(arrayCounter().today) != 0) {
        setTimeout(() => {
            createToast('срок [днес]: ', 'toast-today', isItZero(arrayCounter().today))
        }, timeoutMS);
        timeoutMS += 300;
    }
    if (isItZero(arrayCounter().commission) != 0) {
        setTimeout(() => {
            createToast('комисии: ', 'toast-commission', isItZero(arrayCounter().commission))
        }, timeoutMS);
        timeoutMS += 300;
    }
    if (isItZero(arrayCounter().danger) != 0) {
        setTimeout(() => {
            createToast('прекратени:', 'toast-danger', isItZero(arrayCounter().danger))
        }, timeoutMS);
        timeoutMS += 300;
    }
    if (isItZero(arrayCounter().passed) != 0) {
        setTimeout(() => {
            createToast('минали: ', 'toast-passed', isItZero(arrayCounter().passed))
        }, timeoutMS);
        timeoutMS += 300;
    }
}

function showToast() {
    var toast = document.getElementById("toast");
    toast.style.display = "block";
}

function closeToast() {
    var toast = document.getElementById("toast");
    console.log('click', this.parentElement.className.split('-')[1]);
    this.parentElement.classList.remove('show');

}

function tabOpen() {
    parentClass = this.className.split('-')[1];
    auctionsTable.forEach(el => {
        if (el.className === parentClass) {
            let link = el.querySelectorAll('td')[7].querySelector('a').href;
            window.open(link, "_blank");
        }
    })
}

function createToast(head, classN, number) {

    const toast = document.createElement('div');
    toast.className = 'toast'
    toast.style.display = "block";
    toast.classList.add('show');
    toast.classList.add(classN);

    const toastHead = document.createElement('div');
    toastHead.textContent = head;
    toastHead.onclick = tabOpen;

    const toastInfo = document.createElement('div');
    toastInfo.innerHTML = number;
    toastInfo.classList.add(classN);
    toastInfo.onclick = tabOpen;

    const closeButton = document.createElement('div');
    closeButton.onclick = closeToast;
    closeButton.innerText = 'x';
    closeButton.className = 'close-button'

    toast.appendChild(toastHead);
    toast.appendChild(toastInfo);
    toast.appendChild(closeButton);

    toastContainer.appendChild(toast);

    setTimeout(() => {
        // toast.classList.remove('show');
        toast.remove();
    }, 3000);
}
//TOAST FUNCTIONS


//INFOBAR FUNCTIONS
function addToInfoBar() {
    let cont = document.querySelector(".info-container");

    if (isItZero(arrayCounter().error) === 0) {
        cont.querySelector('#errors').classList.remove('show-info-cell')
        cont.querySelector('#errors').classList.textContent = '';
    } else {
        cont.querySelector('#errors').classList.add('show-info-cell')
        cont.querySelector('#errors').innerHTML = isItZero(arrayCounter().error)
    }

    if (isItZero(arrayCounter().danger) === 0) {
        cont.querySelector('#danger').classList.remove('show-info-cell')
        cont.querySelector('#danger').classList.textContent = '';
    } else {
        cont.querySelector('#danger').classList.add('show-info-cell')
        cont.querySelector('#danger').innerHTML = isItZero(arrayCounter().danger)
    }

    if (isItZero(arrayCounter().notPublished) === 0) {
        cont.querySelector('#notPublished').classList.remove('show-info-cell')
        cont.querySelector('#notPublished').classList.textContent = '';
    } else {
        cont.querySelector('#notPublished').classList.add('show-info-cell')
        cont.querySelector('#notPublished').innerHTML = isItZero(arrayCounter().notPublished) + isItZero(arrayCounter().today)
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

    if (isItZero(arrayCounter().commission) === 0) {
        cont.querySelector('#commission').classList.remove('show-info-cell')
        cont.querySelector('#commission').classList.textContent = '';
    } else {
        cont.querySelector('#commission').classList.add('show-info-cell')
        cont.querySelector('#commission').innerHTML = isItZero(arrayCounter().commission)
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
    auctionsTable.forEach(element => {
        if (element.className === this.id) {
            window.open(element.querySelectorAll('td')[7].querySelector('a').href, "_blank")
        }
    })
}

function barmouseover() {
    console.log("mouseover", this.id);
    auctionsTable.forEach(el => {
        if (el.className === this.id) {
            console.log(el.cells[0].innerText);
        }
    })

}

//INFOBAR FUNCTIONS

// called in main()
//clicks all auction publish buttons if present
function auctionPublish() {
    console.log("-------------------------------------------------------auctionPublish()");
    let btns = document.querySelector('tbody').querySelectorAll('button');
    if (btns.length != 0) {
        btns.forEach(el => {
            el.click();
        })
    }
}

// called in main()
// error check for duplicates and wrong type of auction
function errorCheck() {
    console.log("-------------------------------------------------------errorCheck()");
    for (let i = 0; i < auctionsTable.length; i++) {
        for (let j = 0; j < auctionsTable.length; j++) {
            if (i != j) {
                if (auctionsTable[i].cells[1].innerText === auctionsTable[j].cells[1].innerText && auctionsTable[i].cells[2].innerText === auctionsTable[j].cells[2].innerText) {
                    // auctionsTable[i].className = 'error';
                    // auctionsTable[j].className = 'error';
                    auctionsTable[i].classList.add('error');
                    auctionsTable[j].classList.add('error');
                }
            }
        }
    }
}

// called in main() in setTimeout
function populateTables() { //called in main()
    auctionsTable.forEach((element, index) => {
        auctions.forEach(el => {
            if (element.cells[0].innerText === el.id) {

                function docsInfo(element, docs, id) {
                    const docinf = document.createElement('span');
                    docinf.innerText = isItZero(docs.length);
                    docinf.onclick = newDocShow;
                    docinf.id = id;
                    if (isItZero(docs.length) != 0) {
                        let docinfTitle = '';
                        docs.forEach(item => {
                            docinfTitle += item.name + ' ' + item.date + "\n";
                        });
                        docinf.title = docinfTitle;
                    }

                    if (isItZero(docs.length) != 0) {
                        docinf.style.backgroundColor = "green";
                        docinf.style.opacity = "0.5";
                    } else {
                        let aucDateArr = element.cells[2].innerText.split(' ')[0].split('.');
                        let aucDate = new Date(aucDateArr[2], aucDateArr[1] - 1, aucDateArr[0]);

                        let deadlineDate = deadlineCheck(aucDateArr)

                        // pills backgroundColor = red when auction is notPublished and deadline is today;
                        if (deadlineDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
                            docinf.style.backgroundColor = "red";
                            docinf.style.opacity = "1";
                        }

                        if (aucDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
                            if (element.className === 'danger') {
                                docinf.style.backgroundColor = "grey";
                                docinf.style.opacity = "0.5";
                            } else {
                                docinf.style.backgroundColor = "red";
                                docinf.style.opacity = "1";
                            }
                        }
                    }

                    element.querySelector('#docsLengthInfo').appendChild(docinf);

                    function newDocShow() {
                        id = 'div#' + this.id
                        docDiv = this.parentElement.parentElement.querySelector(id)
                        if (docDiv.style.display === 'none') {
                            docDiv.style.display = 'inline'
                        } else if (docDiv.style.display === 'inline') {
                            docDiv.style.display = 'none'
                        }
                    }
                }

                docsInfo(element, el.documents, 'docs')
                docsInfo(element, el.firstByuer, 'first')
                if (isItZero(el.secondByuer.length) != 0) {
                    docsInfo(element, el.secondByuer, 'second')
                }

                function aucDocsCheck(element, docs, id) {
                    const contr = document.createElement('span');
                    contr.style.opacity = "1";
                    docs.forEach(doc => {
                        if (doc.name.includes('Договор')) {
                            contr.innerText = "Д";
                            contr.style.backgroundColor = "green";
                            element.querySelector('#docsLengthInfo').appendChild(contr);
                        }
                        if (doc.name.includes('pdf') || doc.name.includes('rar')) {
                            contr.innerText = "PDF";
                            contr.style.backgroundColor = "black";
                            element.querySelector('#docsLengthInfo').appendChild(contr);
                        }
                        if (doc.name.includes('изпълнител')) {
                            contr.innerText = "ЗИ";
                            contr.style.backgroundColor = "red";
                            element.querySelector('#docsLengthInfo').appendChild(contr);
                        }
                    })
                }
                if (el.documents.length != 0) {
                    aucDocsCheck(element, el.documents, 'contr')
                }

                function documentsDisplay() {
                    if (el.documents.length != 0) {
                        el.documents.forEach(doc => {
                            let docSpan = document.createElement('a')
                            docSpan.innerText = doc.name + " " + doc.date;
                            docSpan.href = doc.link;
                            docSpan.title = doc.download;
                            docSpan.download = doc.download;
                            docSpan.target = '_blank';
                            let newline = document.createElement('br')
                            element.querySelector('div#docs').appendChild(docSpan)
                            element.querySelector('div#docs').appendChild(newline)
                        })
                    }
                }
                documentsDisplay();


                function fillPills(obj) {
                    for (const [key, value] of Object.entries(obj)) {
                        id = '#' + key;
                        element.querySelector(id).style.opacity = '0.7'
                        element.querySelector(id).innerText = value;
                        element.querySelector(id).title += ": " + value;

                        if (value === '0') {
                            // element.querySelector(id).style.backgroundColor = 'green'
                            element.querySelector(id).style.opacity = '0.3'
                        }
                        if (key === 'percentage' && value > 5) {
                            element.querySelector(id).style.backgroundColor = 'red'
                        }
                    }
                }
                fillPills(el.woodsInfo)
                fillPills(el.money)
            }
        })
    })
}

// called in main()
function prepareCells() {
    auctionsTable.forEach(el => {
        subjectCell = el.cells[4];
        woodsCell = el.cells[5];
        priceCell = el.cells[6];
        // woodsCell = createContainer(woodsCell, 'woods', woodsTable)
        // priceCell = createContainer(priceCell, 'price', priceTable)
        subjectCell = createContainer(subjectCell, 'docs', auctionDocumetsTable)
        woodsCell = createPills(woodsCell, 'woods-pills', woodsTable)
        priceCell = createPills(priceCell, 'price-pills', priceTable)
    })
}

function createPills(cell, containerID, arrayTable) {
    const container = document.createElement('div');
    container.id = containerID;

    arrayTable.forEach(el => {
        const pill = document.createElement('span');
        pill.id = el.id;
        pill.title = el.title;
        container.append(pill)
    })

    cell.append(container)

}

// called in prepareCells()
function createContainer(cell, containerID, array) {
    // create container element
    const container = document.createElement('div');
    container.id = containerID;
    container.className = 'customContainer';
    container.style.display = 'none';


    array.forEach(el => {
        const contCell = document.createElement('div');
        contCell.className = 'containerCell';

        const title = document.createElement('div');
        title.innerHTML = (el.title + ": ").bold().italics();

        const info = document.createElement('div');
        info.id = el.id

        contCell.appendChild(title);
        contCell.appendChild(info);
        container.append(contCell)
    })

    cell.appendChild(container);
}

// called in main()
// creating iframes for each row in auctionsTable, and loading corresponding auction in frame
function createIFrames() {

    auctionsTable.forEach(el => {
        // create iframe element
        const iFrame = document.createElement('iframe');
        let frameid = el.cells[0].innerHTML
        iFrame.id = frameid;
        iFrame.style.display = 'none';
        iFrame.src = el.cells[el.querySelectorAll('td').length - 2].querySelector('a').href;
        el.cells[0].appendChild(iFrame);
        iFrame.onload = function () {
            let loadedFrame = iFrame.contentWindow.document;
            // increase counter by 1 and show total number of loaded iframes in #infoTable
            counter++;
            nav.querySelector('#frames').innerText = counter;
            // document.querySelector('#frames').innerText = counter;
            getInfoFromFrame(loadedFrame);
            assingedCommissionCheck(loadedFrame, el.className, el.cells[8], el.cells[1]);
        }
    })
}

// called in createIFrames
function assingedCommissionCheck(loadedFrame, classN, lastCell, tpCell) {
    // needs changes for more precise work
    console.log("-------------------------------------------------------assingedCommissionCheck()");
    if (classN === 'commission') {
        const commission = loadedFrame.querySelector('select.form-control.commision');
        if (!commission) {
            let requests = loadedFrame.querySelectorAll('tbody') // needs changing
            if (requests.length < 8) {
                lastCell.style.backgroundColor = "#fa2a07";
                tpCell.style.fontWeight  = "bold";
                tpCell.style.color  = "#fa2a07";

            }
        } else if (commission.value != '') {
            lastCell.style.backgroundColor = "#9eb3c6";
            tpCell.style.fontWeight  = "normal";
            tpCell.style.color  = "#676a6c";
        }
    }

}

// called in main() 
function uploadedFilesCheck() {
    auctionsTable.forEach(element => {
        if (element.className != 'danger' && element.className != 'commission') {
            auctions.forEach(item => {
                if (item.id === element.cells[0].innerText) {
                    if (item.documents.length != 0) {
                        element.className = 'passed'
                    }
                }
            })
        }
    })
}

// called in createIFrames()
function getInfoFromFrame(loadedFrame) {
    let obj = []; //maybe it shoud be inside iFrame.onload
    let woodsObj = {}
    let woodsTableInputs = loadedFrame.querySelector('tbody').querySelectorAll('input');
    woodsTableInputs.forEach((el, index) => {
        if (index != 0 && el.type === 'number') {
            woodsObj[el.name.split('][')[1]] = el.value;
        }
    })

    let money = {
        bidStep: loadedFrame.querySelector("#аuctionBidStep").value,
        guarantee: loadedFrame.querySelector("#аuctionGuarantee").value,
        percentage: ((loadedFrame.querySelector("#аuctionGuarantee").value / loadedFrame.querySelector("#auctionStartPrice").value) * 100).toFixed(2)
    }

    function getDocumentlist(id) {
        //check if id frame existst
        var elementExists = loadedFrame.getElementById(id);
        if (elementExists != null) {
            let docs = loadedFrame.getElementById(id).querySelector('tbody').querySelectorAll('a');
            let docsParameters = []
            docs.forEach(el => {
                let item = {
                    name: el.innerHTML.split('/')[0],
                    date: el.innerHTML.split('/')[1].trim().split(" ")[0],
                    link: el.href,
                    download: el.download
                }
                docsParameters.push(item)
            })
            return docsParameters;
        } else {
            return 0;
        }
    }

    delay(1000).then(() => saveToObj());

    function saveToObj() {
        obj.id = loadedFrame.title.split(' ')[4];
        obj.secondDate = loadedFrame.querySelector("#auctionSecondDueDate").value;
        obj.appDueDate = loadedFrame.querySelector("#auctionApplicationsDueDate").value.split(' ')[0];
        obj.woodsInfo = woodsObj;
        obj.documents = getDocumentlist("auctionDocuments");
        obj.firstByuer = getDocumentlist("auctionOrder");
        obj.secondByuer = getDocumentlist("auctionSecOrder");
        obj.money = money;

        auctions.push(obj);
    }
}

// called in main()
// when hovering on #infoTable it colors according rows in auctionsTable
// when clicked on element in #infoTable opens new tabs according to clicked id if any
function addMouseFunctionsToInfoTable() {
    console.log('🚀 ~ addMouseFunctionsToInfoTable ~ addMouseFunctionsToInfoTable: LOADED', addMouseFunctionsToInfoTable);
    infoTable.forEach(el => {
        nav.getElementById(el.id).addEventListener("mouseover", (event) => {
                // highlight the mouseover target
                event.target.style.color = "white";
                event.target.style.backgroundColor = el.color;
                auctionsTable.forEach(element => {
                    if (element.className === el.id) {
                        element.style.backgroundColor = el.color;
                        element.style.color = 'white';
                    }
                })

                // reset the color after a short delay
                setTimeout(() => {
                    event.target.style.color = "";
                    event.target.style.backgroundColor = "";
                    auctionsTable.forEach(element => {
                        if (element.className === el.id) {
                            element.style.backgroundColor = "";
                            element.style.color = "";
                        }
                    })
                }, 750);
            },
            false, );

        document.getElementById(el.id).addEventListener('click', function handleClick() {
            console.log("click:", this.innerText, this.id);
            auctionsTable.forEach(element => {
                if (element.className === el.id) {
                    window.open(element.querySelectorAll('td')[7].querySelector('a').href, "_blank")
                }
            })
        });
    })
}

// show deadline for publishing documents in forth column
// called in main()
// error in deadlineCheck()-> removed | will be written anew
function showDeadline() {
    auctionsTable.forEach(el => {
        let firstDate = el.cells[2].innerText.split(' ')[0].split(".");
        let dateToShow = deadlineCheck(firstDate).getDate() + "." + (deadlineCheck(firstDate).getMonth() + 1) + "." + deadlineCheck(firstDate).getFullYear();
        if (!el.cells[3].innerHTML.includes('br')) {
            el.cells[3].innerHTML += '<br>' + '<b><i>' + dateToShow + '</b></i>';
        }
    });
}

// called in auctionDateCheck(el) && showDeadline()
function deadlineCheck(date) {
    let firstDate = new Date(date[2], date[1] - 1, date[0]);
    let deadlineDate = new Date(firstDate);

    if (firstDate.getDay() === 1 || firstDate.getDay() === 4) {
        deadlineDate.setDate(firstDate.getDate() - 20);
    } else if (firstDate.getDay() === 2 || firstDate.getDay() === 5) {
        deadlineDate.setDate(firstDate.getDate() - 18);
    } else if (firstDate.getDay() === 3) {
        deadlineDate.setDate(firstDate.getDate() - 19);
    }
    return deadlineDate;
}

// called in auctionDateCheck(el)
function commissionDateCheck(date) {
    let firstDate = new Date(date[2], date[1] - 1, date[0]);
    let commissionDate = new Date(firstDate);

    if (firstDate.getDay() === 1) {
        commissionDate.setDate(firstDate.getDate() - 3);
    } else {
        commissionDate.setDate(firstDate.getDate() - 1);
    }
    return commissionDate;
}

// called in main()
function setAuctionsClasses() {
    auctionsTable.forEach(el => {
        if (el.className != 'danger') {
            if (window.getComputedStyle(el).color === "rgb(153, 153, 153)") {
                if (auctionDateCheck(el) === 'today') {
                    el.className = 'today';
                } else {
                    el.className = 'notPublished';
                    el.querySelector('b').className = auctionDateCheck(el);
                }
            } else {
                el.className = auctionDateCheck(el);
                el.querySelector('b').className = auctionDateCheck(el);
            }
        }
    })
}

// called in setAuctionsClasses()
function auctionDateCheck(el) {
    let firstDate = el.cells[2].innerText.split(' ')[0].split(".");
    let deadlineDate = deadlineCheck(firstDate);
    let commissionDate = commissionDateCheck(firstDate);

    if (deadlineDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
        return "today";
    } else if (deadlineDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0) && commissionDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
        return "commission";
    } else if (deadlineDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
        return "passed";
    } else {
        return "future";
    }
}

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

function tableOuput() {
    console.log("-------------------------------------------------------tableOuput()");
    let consoleTable = [];

    auctionsTable.forEach(el => {
        let obj = {
            number: el.cells[0].innerText,
            branch: el.cells[1].innerText,
            date: el.cells[2].innerText.split(" ")[0].trim(),
            object: el.cells[5].innerText.split("/").pop().split(/\r?\n/)[0].split(":").pop().trim(),
        }
    consoleTable.push(obj);
    });
    console.table(consoleTable);
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
.commission>td:nth-child(2) {
    font-weight: bold;
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
</style>`);