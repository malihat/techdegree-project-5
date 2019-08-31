// // let image = $('.card-img-container .card-img');
// // let name = $('#name')
// // let email = $('.card-text');
// // let address = $('.cap');

// let cardInfo = $('.card .card-info-container')
let _modal = $('.modal-info-container') ;
let wholemodal = $('.modal-container');
let allimages = []
let gallery = $('#gallery');
let modal = $('.modal-container');
let cross = $('#modal-close-btn strong');
let index;
let html = '';

fetch('https://randomuser.me/api/?results=12&nat=us,dk,fr,gb')
    .then(res => res.json())
    .then(data =>{
        addToDom(data.results);
        filterSearch(data.results)//console.log(data.results)
    }) 
    //.then(datas =>  console.log(datas));  //filterSearch(data.results))


function addToDom(result) {
    for (let i=0; i<result.length; i++) {
        allimages.push(result[i].picture.thumbnail);
        // let image = `<img class="card-img" src=${result[i].picture.thumbnail} alt="profile picture"> `
        // let name = `<h3 id="name" class="card-name cap"> ${result[i].name.first}  ${result[i].name.last} <h3>`
        // let email = `<p class="card-text"> ${result[i].email} </p>`
        // let address = `<p class="card-text cap">${result[i].location.city},  ${result[i].location.state} </p> `

        // cardImage.append(image);
        // cardInfo.append(name);
        // cardInfo.append(email);
        // cardInfo.append(address);

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

    let cardImage = $('.card-img-container')

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
    
    });
    cross.on('click', () => {
        _modal.empty();
        modal.css('display', 'none');
    });

// ==========  TOGGLE BUTTON ====================
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
            _modal.append(`<p class="modal-text">Birthday: ${date.substring(5,7)}/${date.substring(8,10)}/${date.substring(0,4)}</p>`)
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
            _modal.append(`<p class="modal-text">Birthday: ${date.substring(5,7)}/${date.substring(8,10)}/${date.substring(0,4)}</p>`)
        }
    });
}

//  ==========================  FILTER RESULTS  ===================

function filterSearch(result) {
    let search = document.querySelector('#search-input');
    const card = document.querySelectorAll(".card");
    const searchResults = [];

    // console.log('its a match', search.value.toLowerCase());
    // document.querySelector('#search-submit').addEventListener('click', (e) => {
        // document.querySelector('form').addEventListener('submit', e => {
            search.addEventListener('keyup', e => {
            e.preventDefault();
            for (let i=0; i<result.length; i++) { 
                console.log(typeof card)
        
            if (result[i].name.first.toLowerCase().includes(search.value.toLowerCase()) ) {
                card[i].style.display = 'block'; 

                // addToDom(result[i])
                // let _index = i;

                // console.log('its a match',e.target.value.toLowerCase(), i, result[_index].email );
                // html = `<div class="card"> what
                // <div class="card-img-container">
                //     <img class="card-img" src=${result[_index].picture.thumbnail} alt="profile picture">
                // </div>
                // <div class="card-info-container">
                //     <h3 id="name" class="card-name cap"> ${result[_index].name.first}  ${result[_index].name.last} <h3>
                //     <p class="card-text"> ${result[_index].email} </p>
                //     <p class="card-text cap">${result[_index].location.city},  ${result[_index].location.state} </p>
                // </div>
                // </div>`
                // gallery.append(html);

                // $('.card').css('display', 'block');
            } 
            else {
                // $('.card').css('display', 'none');
                card[i].style.display = 'none' 
            }
        }    
    });
    
}



// ***** WHY WON'T THE KEYUP LISTENER WORK??? ********************        

// searchField.addEventListener('keyup', () => {
//     cardNames.forEach(card => { 
//         if (card.innerText.includes(searchField.value.toLowerCase())) {
//         card.style.display = "";
//         } else {
//         card.style.display = "none";     
//         };
//     });
//  }); 
// };
// using to call my variables and their values inside ^^^^ function                          
// };  

// -----------------------Modal-----------------------------

modal.css('display', 'none');


// =============================================================================================
/*
const modalContainer = document.createElement('div');
modalContainer.classList.add('modal-container');
const gallery = document.getElementById('gallery');
const cards = document.getElementsByClassName('card');
const names = document.getElementsByClassName('card-name');
const noResults = document.createElement('h3');
noResults.textContent = 'Your search did not produce any results.';
noResults.style.color = 'red';
document.body.append(noResults);
noResults.style.display = 'none';
let hiddenCount = 0;
let htmlBank = new HTMLBank();

//Get information from API
fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json())
    .then(data => generateGallery(data.results))

//Generate the gallery and the search bar functionality
function generateGallery(results) {
    htmlBank.getGalleryHTML(results);
    const searchBar = document.getElementById("search-input");
   
    //Create search functionality that works when user clicks the button
    const submitButton = document.getElementById("search-submit");
    submitButton.addEventListener('click', () => {
        const searchBarValue = new RegExp('^' + searchBar.value.toLowerCase());
        filterResults(searchBarValue); 
        searchBar.value = '';
    })
    //Create search functionality that works when user hits enter
    searchBar.addEventListener('keydown', function(event) {
        if(event.keyCode === 13) {
            event.preventDefault();
            const searchBarValue = new RegExp('^' + searchBar.value.toLowerCase());
            filterResults(searchBarValue); 
            searchBar.value = '';
        }
    })
    
    createModal(results);
}

//Generate the modal functionality as well as the 'next' and 'previous' buttons to scroll through address book in modal view
function createModal(results) {
    gallery.addEventListener('click', (event) => {
        let index = getEventTargetId(event.target); //Locate id of card, which corresponds to index number in the results array
        if(index !== undefined) {
            modalContainer.innerHTML = htmlBank.getInitialModalHTML(results, index); 
            document.body.appendChild(modalContainer);
            
            //Creat X button functionality
            const xBtn = document.getElementById('modal-close-btn');  
            xBtn.addEventListener('click', () => { 
                document.body.removeChild(modalContainer);
            }) 
            
            //Create functionality for 'next' and 'previous' button 
            const buttonContainer = document.querySelector('.modal-btn-container');
            const infoContainer = document.querySelector('.modal-info-container');
            buttonContainer.addEventListener('click', (event) => {
                
                if(event.target.id === 'modal-next') {
                    index === results.length - 1 ? index = 0 : index++;
                    infoContainer.innerHTML = htmlBank.getUpdatedModalHTML(results, index); 
                }
                else if(event.target.id === 'modal-prev') {
                    index === 0 ? index = results.length - 1 : index--;
                    infoContainer.innerHTML = htmlBank.getUpdatedModalHTML(results, index); 
                }
            })
        } 
          
    });
    
}

//Filer results based on search display special message if no results are found
function filterResults(searchBarValue) {
   
    for(let x = 0; x<cards.length; x++) {
        if(searchBarValue.test(names[x].textContent)) {
            if(getComputedStyle(cards[x], null).display === 'none') {
                cards[x].style.display = 'flex';
                hiddenCount--;
            }
        }
        else {
            if(getComputedStyle(cards[x], null).display === 'flex') {
               cards[x].style.display = 'none';
               hiddenCount++; 
            }
        }
            
        if(hiddenCount === cards.length) {
            noResults.style.display = 'block';
        }
        else {
            noResults.style.display = 'none';
        }
     }
}

//Get card id to be able to match the modal employee with clicked employee
function getEventTargetId(element) {
    const id = parseInt(element.id);
    const parentId = parseInt(element.parentNode.id);
    const grandparentId = parseInt(element.parentNode.parentNode.id);
    
    if(!isNaN(id)) {
        return id;
    }
    else if(!isNaN(parentId)) {
        return parentId;
    }
    else if(!isNaN(grandparentId)) {
        return grandparentId;
    }
    else {
        return undefined;
    }
}

//Format birth date correctly in modal
function formatBirthday(dob) {
    const unFormattedBirthday = dob.slice(0, 10);
    const formattedBirthday = unFormattedBirthday.replace(/(\d{4})-(\d{2})-(\d{2})/, '$2/$3/$1' );
    return formattedBirthday;
}




*/