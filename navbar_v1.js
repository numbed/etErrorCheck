let navbar = document.querySelector(".navbar.navbar-static-top.white-bg").querySelector("ul");
const li = document.createElement('li');
const tr = document.createElement('tr');
const td = document.createElement('tr');
const td1 = document.createElement('tr');
td.innerText = 'first cell'
td1.innerText = 'second cell'
tr.append(td)
tr.append(td1)
li.append(tr)
navbar.prepend(li);

function addElementsToNavbar(id,text, title) {
    const li = document.createElement('li');
    li.id = id;
    li.style.width = "55px";
    li.innerText = text;
    li.style.fontSize = "large";
    li.style.textAlign = "center";
    navbar.prepend(li);
}

addElementsToNavbar("separator", " | ");
addElementsToNavbar("headerInfo", "", "seconds");
addElementsToNavbar("separator", " | ");
addElementsToNavbar("commissionInfo", "comm");
addElementsToNavbar("separator", " | ");
addElementsToNavbar("deadlineInfo", "dead");



let headerInfo = document.querySelector("#headerInfo");
startCountdown(5);

function startCountdown(seconds) {
    let counter = seconds;

    const interval = setInterval(() => {
        headerInfo.innerText = counter;
        counter--;

        if (counter < 0) {
            clearInterval(interval);
            headerInfo.innerText = 'Ding!';
        }
    }, 1000);
}