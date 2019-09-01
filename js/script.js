// Variables declared
let _modal = $('.modal-info-container') ;
let allimages = []
let gallery = $('#gallery');
let modal = $('.modal-container');
let cross = $('#modal-close-btn strong');
let html = '';
// let newList = [];

// Fetch data using API. Displays data to screen or throws error
fetch('https://randomuser.me/api/?results=12&nat=us,au,ca,ie,nz')
    .then(res => res.json())
    .then(data =>{
        addToDom(data.results);
        filterSearch(data.results)
    }).catch(error => {
        throw(error);
    }) 
   
// Adds data from the API to the DOM, displays 12 employees on the screen
function addToDom(result) {
    for (let i=0; i<result.length; i++) {
        allimages.push(result[i].picture.thumbnail);

        html = `<div class="card">
            <div class="card-img-container">
                <img class="card-img" src=${result[i].picture.thumbnail} alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap"> ${result[i].name.first}  ${result[i].name.last} <h3>
                <p class="card-text"> ${result[i].email} </p>
                <p class="card-text cap">${result[i].location.city},  ${result[i].location.state} </p>
            </div>
        </div>`
        gallery.append(html);    
    }
    cardInfo(result);
}

//  =========== CARD INFORMATION =================
// Opens a modal window to show additional information when the user clicks the image. 
function cardInfo(result) {
    let cardImage = $('.card-img-container');
    let index = [];
    cardImage.on('click', e => {    
        modal.css('display', 'block');
        
        index = allimages.indexOf( $(e.target).attr('src'));

        _modal.append(`<img class="modal-img" src=${result[index].picture.thumbnail} alt="profile picture">` )  
        _modal.append(`<h3 id="name" class="modal-name cap"> ${result[index].name.first}, ${result[index].name.last} </h3>`)
        _modal.append(`<p class="modal-text"> ${result[index].email} </p>`);
        _modal.append(`<p class="modal-text cap"> ${result[index].location.city} </p> <hr>`);

        _modal.append(`<p class="modal-text"> ${result[index].cell} </p>`)
        let location = result[index].location;
        _modal.append(`<p class="modal-text"> ${location.street}, ${location.city}, ${location.state} ${location.postcode} </p>`)
        let date = result[index].dob.date;
        _modal.append(`<p class="modal-text">Birthday: ${date.substring(5,7)}/${date.substring(8,10)}/${date.substring(0,4)}</p>`)
        
        // Calls the toggleCard function 
        toggleCard(result, index)

    });
    // Closes the modal when close button is clicked and removes the previous modal
    cross.on('click', () => {
        _modal.empty();
        modal.css('display', 'none');
    });
}

// =========== TOGGLE BUTTONS ===============
// Toggles the modal window to previous and next. 
function toggleCard(result, index) {
    let prevbutton = $('#modal-prev');
    let nextbutton = $('#modal-next');

    prevbutton.on('click', e => {
    index--;

        if (index >= 0) {
            _modal.empty();
            _modal.append(`<img class="modal-img" src=${result[index].picture.thumbnail} alt="profile picture">` )  
            _modal.append(`<h3 id="name" class="modal-name cap"> ${result[index].name.first}, ${result[index].name.last} </h3>`)
            _modal.append(`<p class="modal-text"> ${result[index].email} </p>`);
            _modal.append(`<p class="modal-text cap"> ${result[index].location.city} </p> <hr>`);
    
            _modal.append(`<p class="modal-text"> ${result[index].cell} </p>`)
            let location = result[index].location;
            _modal.append(`<p class="modal-text"> ${location.street}, ${location.city}, ${location.state} ${location.postcode} </p>`)
            let date = result[index].dob.date;
            _modal.append(`<p class="modal-text">Birthday: ${date.substring(5,7)}/${date.substring(8,10)}/${date.substring(0,4)}</p>`);
        }  
        // Stops the index number to go below 0 
        else if (index < 0) {
            index = 0;
        }
    });

    nextbutton.on('click', e => {
        index++;
        if (index <= 11) {
            _modal.empty();
            _modal.append(`<img class="modal-img" src=${result[index].picture.thumbnail} alt="profile picture">` )  
            _modal.append(`<h3 id="name" class="modal-name cap"> ${result[index].name.first}, ${result[index].name.last} </h3>`)
            _modal.append(`<p class="modal-text"> ${result[index].email} </p>`);
            _modal.append(`<p class="modal-text cap"> ${result[index].location.city} </p> <hr>`);
    
            _modal.append(`<p class="modal-text"> ${result[index].cell} </p>`)
            let location = result[index].location;
            _modal.append(`<p class="modal-text"> ${location.street}, ${location.city}, ${location.state} ${location.postcode} </p>`)
            let date = result[index].dob.date;
            _modal.append(`<p class="modal-text">Birthday: ${date.substring(5,7)}/${date.substring(8,10)}/${date.substring(0,4)}</p>`);
        }
        // Stops the index number to go above 11
        else if (index > 11) {
            index = 11;
        }
    });
}

//  =============== FILTER RESULTS ============
// Filters the result by name
function filterSearch(result) {
    let search = document.querySelector('#search-input');
    const card = document.querySelectorAll(".card");
    const submit = document.querySelector('#search-submit');
        submit.addEventListener('click', e => {
        e.preventDefault();
        for (let i=0; i<result.length; i++) { 
            if (result[i].name.first.toLowerCase().includes(search.value.toLowerCase()) ) {
                card[i].style.display = 'block'; 
            } 
            else {
                card[i].style.display = 'none'; 
            }
        }    
    });
}

// Hides the modal when page first loads.
modal.css('display', 'none');

