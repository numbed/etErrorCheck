    createButton();

    function createButton() {
        // Create container element
        const div = document.createElement('div');
        div.id = 'infoButtonContainer';
        div.style.display = 'none';
        leftSideNavigation.appendChild(div);

        // Create a button element
        const button = document.createElement('button');
        button.id = 'infoButton';

        // Set the button's text
        button.textContent = 'SHOW';

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
            document.querySelectorAll(".customContainer").forEach(el => {
                el.style.display = "inline"
            })

        } else if (button.innerText === "HIDE") {
            button.innerText = "SHOW";
            document.querySelectorAll(".customContainer").forEach(el => {
                el.style.display = "none"
            })
        }
    }


    addMouseFunctionsToInfoTable();
    // called in main()
    // when hovering on #infoTable it colors according rows in auctionsTable
    // when clicked on element in #infoTable opens new tabs according to clicked id if any
    function addMouseFunctionsToInfoTable() {
        infoTable.forEach(el => {
            document.getElementById(el.id).addEventListener("mouseover", (event) => {
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