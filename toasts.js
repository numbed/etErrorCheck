let auctions = document.querySelector('tbody').querySelectorAll('tr');
const toastContainer = document.createElement('div');
toastContainer.className = 'toast-container';
document.querySelector('.navbar-header').appendChild(toastContainer);

auctions.forEach(row => {
    if (row.className === 'danger') {
        console.log(row.cells[0].innerText);
        createToast(row.cells[0].innerText);

    }
})

function showToast() {
    var toast = document.getElementById("toast");
    toast.style.display = "block";
}

function closeToast() {
    var toast = document.getElementById("toast");
    console.log('click', this.previousSibling.innerText);
    this.parentElement.style.display = 'none';
    this.parentElement.classList.remove('show');
    console.log('🚀 ~ closeToast ~ this.parentElement: LOADED', this.parentElement);
}

function createToast(params) {
    
    const toast = document.createElement('div');
    toast.className = 'toast'
    toast.style.display = "block";
    toast.classList.add('show');

    const toastInfo = document.createElement('div');
    toastInfo.textContent = params;

    const closeButton = document.createElement('span');
    closeButton.onclick = closeToast;
    closeButton.innerText = '[X]';
    closeButton.className = 'close-button'

    toast.appendChild(toastInfo);
    toast.appendChild(closeButton);
    
    toastContainer.appendChild(toast);

    // setTimeout(() => {
    //   toast.classList.remove('show');
    // }, 3000);
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
    background-color: #333;
    color: #fff;
    padding: 10px 20px;
    border-radius: 4px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    margin-bottom: 10px;
    opacity: 0;
    transform: translateX(100%);
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  }
  
  /* Show Animation */
  .toast.show {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  }

/* CSS for the close button */
.close-button {
    position: absolute;
    top: 5px;
    right: 5px;
    color: #fff;
    cursor: pointer;
}
</style>`);