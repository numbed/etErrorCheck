let auctions = document.querySelector('tbody').querySelectorAll('tr');
const toastContainer = document.createElement('div');
toastContainer.className = 'toast-container';
document.querySelector('.navbar-header').appendChild(toastContainer);



setTimeout(() => {
createToast('today', 'toast-today', isCounterZero(arrayCounter().today))
}, 50);
setTimeout(() => {
createToast('commission', 'toast-commission', isCounterZero(arrayCounter().commission))
}, 250);
setTimeout(() => {
    createToast('danger', 'toast-danger', isCounterZero(arrayCounter().danger))
}, 450);
setTimeout(() => {
    createToast('future', 'toast-future', isCounterZero(arrayCounter().future))
}, 650);
setTimeout(() => {
    createToast('passed', 'toast-passed', isCounterZero(arrayCounter().passed))
}, 850);

function showToast() {
    var toast = document.getElementById("toast");
    toast.style.display = "block";
}

function closeToast() {
    var toast = document.getElementById("toast");
    console.log('click', this.parentElement.className.split('-')[1]);
    this.parentElement.parentElement.style.display = 'none';
    this.parentElement.parentElement.classList.remove('show');

}

function tabOpen(){
    parentClass = this.parentElement.className.split('-')[1];
    
    auctionsTable.forEach(el => {
        if (el.className === parentClass){
           console.log( el.cells[0].innerText)
            // window.open(window.open(el.querySelectorAll('td')[7].querySelector('a').href, "_blank"))
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

    const toastInfo = document.createElement('div');
    toastInfo.innerHTML = number;
    toastInfo.onclick = tabOpen;


    const closeButton = document.createElement('div');
    closeButton.onclick = closeToast;
    closeButton.innerText = '[X]';
    closeButton.className = 'close-button'

    toast.appendChild(toastHead);
    toast.appendChild(toastInfo);
    toast.appendChild(closeButton);
    
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove('show');
    }, 10000);
}





//styling bellow
document.head.insertAdjacentHTML("beforeend", `<style>
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
    width: 350px;
    height: 40px;
    line-height: 35px;
    border-left: 8px solid;
    padding: 2px 0px 0px 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    margin-bottom: 10px;
    opacity: 0;
    transform: translateX(100%);
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  }
  .toast>div{
    display: inline-block;
    padding: 3px 0px 0px 15px;
    font-size: large;
}


.toast>div:first-of-type {
    width: 30px;
    display: inline;
    
    
}
.toast>div:last-of-type{
    display: inline;
    width: 300px;
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
  
  /* Show Animation */
  .toast.show {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  }

/* CSS for the close button */
.close-button {
    width:max-content;
    margin-left:auto;
    top: 0.5px;
    right: 8px;
    color: black;
    cursor: pointer;
}
</style>`);