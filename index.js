
fetch('https://lotrapi.co/api/v1/characters')//fetches the api and has a throw new error if no reponse come back,if succesful returns into json format
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json(); 
    })
    .then(data => {//This block runs after the data has been converted to JSON
        console.log("Data received:", data); //just here for debugging  
        const characters = data.results || [];//return the characters from the fetched data if not found defaults to an empty array

        characters.forEach(character => {//loops through each character in the array and creates some html for each character
            const markup = `<li><a href="#" class="character-link" data-id="${character.id}">${character.name}</a></li>`; 
            document.querySelector('#character-list').insertAdjacentHTML('beforeend', markup);//assigns the class to character-link 
        });

        
        document.querySelectorAll('.character-link').forEach(link => {//this selects all the elements within the character-link class
            link.addEventListener('click', (event) => {//this allows the user to click on the names
                event.preventDefault(); //this prevents the link from following its link behavior
                const characterId = link.getAttribute('data-id');// this recieves the id of each character from the link
                fetchCharacterDetails(characterId, link);//allows user to fetch more details from the link
            });
        });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error); 
    });


function fetchCharacterDetails(characterId, link) {
    fetch(`https://lotrapi.co/api/v1/characters/${characterId}`)//allows user to fetch details about certain characters
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json(); 
        })
        .then(character => {
            displayCharacterDetails(character, link);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error); 
        });
}


function displayCharacterDetails(character) {
    const detailsElement = document.getElementById('character-details');//finds html element where character details will be displayed

    if (!detailsElement) {
        console.error('Details element not found');//just an error message that helps show if the details element is shown
        return; 
    }

    if (detailsElement.innerHTML.includes(character.name)) {//just updates the inner html of the element with character details
        detailsElement.innerHTML = ''; 
    } else {
        const characterImages = {
            "Gimli": 'https://th.bing.com/th/id/OIP.LhWchyMj3UOX8EefjHFLFAAAAA?w=176&h=189&c=7&r=0&o=5&pid=1.7&adlt=strict',
            "Frodo Baggins": 'https://th.bing.com/th?id=OIP.T6QLn6XVL_ndlfehlhVyKwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2&adlt=strict',
            "Aragorn II": 'https://th.bing.com/th?id=OIP.xl8pYXJa_ls7gOJZuKvX4AHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2&adlt=strict',
            "Gandalf": 'https://th.bing.com/th?id=OIP.u0H8kpGTNJMFPimYi4T-BwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2&adlt=strict',
            "Boromir": 'https://th.bing.com/th?id=OIP.jyYwE1WK99-k96kZPfDvWwHaE4&w=307&h=203&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2&adlt=strict',
            "Bilbo Baggins": 'https://th.bing.com/th?id=OIP.o8k5aHEImGGvo8N9jy0VgwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2&adlt=strict',
            "Peregrin Took": 'https://th.bing.com/th/id/OIP.GtJAo2qExZ4NgB2Qjrs0HwHaHa?w=167&h=180&c=7&r=0&o=5&pid=1.7&adlt=strict',
            "Meriadoc Brandybuck": 'https://th.bing.com/th/id/OIP.BVn1xD_IL2odW_9bEkNlmQHaHa?w=169&h=180&c=7&r=0&o=5&pid=1.7&adlt=strict',
            "Legolas": 'https://th.bing.com/th/id/OIP.xIf34er_8PnUKiaNLmtKVAHaJd?w=135&h=180&c=7&r=0&o=5&pid=1.7&adlt=strict',
            "Samwise Gamgee": 'https://bing.com/th?id=OIP.m40T3j81kbWoUTDQPdBVOgHaHa&w=206&h=206&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2&adlt=strict'
        };

        const imageUrl = characterImages[character.name] || '';

        const detailsMarkup = `
            <h2>${character.name}</h2>
            ${imageUrl ? `<img src="${imageUrl}" alt="${character.name}" style="width: 100px; height: auto;" />` : ''}
            <p><strong>Height:</strong> ${character.height}</p>
            <p><strong>Gender:</strong> ${character.gender}</p>
            <p><strong>Birth Year:</strong> ${character.date_of_birth}</p>
            <p><strong>Weapons:</strong> ${character.weapons}</p>
        `;

        detailsElement.innerHTML = detailsMarkup; 
    }
}
const quotes = ['You shall not pass!” — Gandalf, The Fellowship of the Ring.',
    'It’s mine. My own. My precious.” — Bilbo, The Fellowship of the Ring.', 'I would have gone with you to the end, into the very fires of Mordor.” — Aragorn, The Fellowship of the Ring',
    'This task was appointed to you. And if you do not find a way, no one will.” — Galadriel, The Fellowship of the Ring', 'They have a cave troll.” — Boromir, The Fellowship of the Ring'
];
const quoteButton = document.getElementById('quote-button');
const quoteDisplay = document.getElementById('quote-display');
quoteButton.addEventListener('click', () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteDisplay.textContent = randomQuote;
})
