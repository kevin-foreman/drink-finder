// // import config from './config.json' assert {type: "json"};

$('#drinkPick').on('click', function () {
    let drinkSearch = $('#userSearch').val();
    // let myPrivateAPIKey =  config.myPrivateAPIKey;
    // let myPublicAPIKey = config.myPublicAPIKey;

    $.get(`https://drink-finder-2qxj.onrender.com/api/drinks/${drinkSearch}`, (data) => {

        // let arrayData = JSON.stringify(data);
        // let dataObj = JSON.parse(arrayData);
        console.log(data);
        // console.log(data.name);
        // console.log(data.type);
        // console.log(data[0].image);
        // Clear previous search if a new search is initiated
        $('#drinkResult').empty();
        // Variables will be assigned to each data point we pull from our API
        let header = data.name;
        let image = data[0].image;
        if (image === undefined) {
            image = 'https://i.imgur.com/FZ7eyDi.jpeg';
        } else {
            // image = dataObj.data.results[0].thumbnail.path + '/standard_xlarge.jpg';
        };
        let type = data.type;
        let drinks = data; // .join(', ');  
        let sortedDrinks = [];
        for (let i = 0; i < drinks.length; i++) {
            sortedDrinks.push(drinks[i].name);
            sortedDrinks.toString().split(', ');
            // sortedDrinks.split(', ');
        };
        // Append all the information we want to the DOM
        $(`#drinkResult`).append(`<span class='result-card' id='span'></span>`);
        $(`#span`).append(`<h2 class='card-title' id='header'>${header}</h3>`);
        $(`#span`).append(`<img src='${image}' class='card' id='image'>`);
        $(`#span`).append(`<h3 class='type' id='subheader'>${type}</h2>`);
        // $(`#span`).append(`<h4 class='popularDrinks' id='popDrinks'>Drinks that go well with ${header} in the summer</h4>`);
        $(`#span`).append(`<h4 class='comicbooks' id='comics'>${sortedDrinks}</h4>`);
    });
});