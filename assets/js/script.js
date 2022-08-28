// set the variables 
var searchArtistEl = $('#searchInput');
var searchHistoryEl = $('#searchHistory');
var maxItems = 5;

let lastArtist;
let searchHistoryArray;

// Event listener to retrieve input data with button.
$('#searchBtn').click (() => {
	let artistName = searchArtistEl.val();

	handleSearch(artistName);
	searchArtistEl.val('');

});

// Run this function to search the history from localStorage when page is load.
$(document).ready(() => {
	searchHistoryArray = JSON.parse(localStorage.getItem('searchHistory')) || [];
	lastArtist = searchHistoryArray[0];
	updateSearchHistory();

	if (lastArtist) {
		getArtistTrack(lastArtist);
	};


});

// function to fetch the music API to search artist's top 5 tracks
function getArtistTrack(artistName) {

	var queryURL = `https://spotify23.p.rapidapi.com/search/?q=${artistName}&type=tracks&offset=0&limit=5&numberOfTopResults=5`
	
	$.ajax({
		url: queryURL,
		async: true,
		crossDomain: true,
		method: 'GET',
		headers: {
			"X-RapidAPI-Key": "1b67c35036mshade3492e44ff5e0p1761b2jsnbca7fe3e0702",
			"X-RapidAPI-Host": "spotify23.p.rapidapi.com" }
	}).then((response) => {       // Good code to use it.
			//console.log(response);
    		var trackArray = response.tracks.items;
    		console.log(trackArray);
    

    		for (var index = 0; index < trackArray.length; index++) {
				var artist = trackArray[index].data.artists.items[0].profile.name;
        		var cover = trackArray[index].data.albumOfTrack.coverArt.sources[1].url;
        		var title = trackArray[index].data.albumOfTrack.name;
        		//var play = trackArray[index].data.uri;

        		console.log(title);

				var artistEl = $('<h3>').text(artist)
				var trackTitleEl = $('<div>').text(title);
				var albumCoverEl = $('<img>').attr('src', cover);

				$(`#s-${index + 1}`).html('');
				$(`#artName`).html('');
				$(`#artName`).append(artistEl);
				$(`#s-${index + 1}`).append(trackTitleEl).append(albumCoverEl);
    			};
			});
};

// function to look at the searchHistoryArray to update and execute search
function handleSearch (artistName) {
	if (searchHistoryArray.includes(artistName)) {
		let repeatIndex = searchHistoryArray.indexOf(artistName);

		searchHistoryArray.splice(repeatIndex, 1);
	};
	searchHistoryArray.unshift(artistName);
	updateSearchHistory();

	getArtistTrack(artistName);
};

// function to update the search history list. 
function updateSearchHistory() {
	if (searchHistoryArray.length > maxItems) {
		searchHistoryArray.pop();
	};
	localStorage.setItem('searchHistory', JSON.stringify(searchHistoryArray));

	searchHistoryEl.html('');
	for (var artist of searchHistoryArray) {
		var newItem = $('<button type="button">'); //might need to add class

		newItem.text(artist);
		newItem.click((event) => {
			getArtistTrack(event.target.textContent);
		});
		searchHistoryEl.append(newItem);
	};
};


// initialize the top 5 songs from Billboard when page loaded
$(document).ready(function() {

	var queryURL2 = "https://billboard-api2.p.rapidapi.com/billboard-200?date=2022-08-10&range=1-5"
	
	$.ajax({
		url: queryURL2,
		async: true,
		crossDomain: true,
		method: 'GET',
		headers: {
			"X-RapidAPI-Key": "1b67c35036mshade3492e44ff5e0p1761b2jsnbca7fe3e0702",
			"X-RapidAPI-Host": "billboard-api2.p.rapidapi.com" }

	}).then((response) => {
		console.log(response);

		var topArray = response.content;
		console.log(topArray);

		for (var i = 0; i < topArray.length; i++) {
	
		var topAlbum = topArray[i].album;
		var imgCover = topArray[i].image;

		console.log(topAlbum);
		/*
		var topTitleEl = $('<div>').text(topAlbum);
		var imgCoverEl = $('<img>').attr('src', imgCover);

		$(`#t-${i + 1}`).html('');
		$(`#t-${i + 1}`).append(topTitleEl).append(imgCoverEl);
		*/
		};
	});

});



// Dump codes
/*
$.each(topArray, function(j) {
	 var topTracks = {
		"async": true,
		"crossDomain": true,
		"url": `https://spotify23.p.rapidapi.com/search/?q=${artistName}&type=tracks&offset=0&limit=5&numberOfTopResults=5`,
		"method": "GET",
		"headers": {
			"X-RapidAPI-Key": "1b67c35036mshade3492e44ff5e0p1761b2jsnbca7fe3e0702",
			"X-RapidAPI-Host": "spotify23.p.rapidapi.com"
		} */
/*
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="./assets/js/script.js"></script>

var apiKey = "N2ExNGYyM2MtYjhjNi00NGMxLWE3YjgtZWE3ZTI4MWY5MmRl";
var artistName = "beyonce";
var queryUrl2 = `http://api.napster.com/v2.2/${artistName}/Art.28463069/albums/top?apikey=${apiKey}&limit=5`
var queryUrl = `https://api.napster.com/v2.2/${artistName}/art.978?apikey=${apiKey}&catalog=DE&limit=5`
var queryUrl3 = `http://api.napster.com/v2.2/search?apikey=${apiKey}&query=${artistName}&type=album$limit=5`
var queryUrl4 = `http://api.napster.com/v2.2/search?apikey=${apiKey}&offset=5&per_type_limit=5&query=${artistName}`

console.log(queryUrl3);

function testAPI() {
    $.ajax ( {
        url: queryUrl3,
        method: 'GET'
    }).then((response) => {
        console.log(response);
        return response.json();
        console.log(response);
        });
};

testAPI(); */

/*for (var i = 0; i < testArray.length; i++) {
    var contentN = testArray[i].tracks;
    console.log(contentN);
}; 

var billboard = {
		"async": true,
		"crossDomain": true,
		"url": "https://billboard-api2.p.rapidapi.com/billboard-200?date=2022-08-10&range=1-5",
		"method": "GET",
		"headers": {
			"X-RapidAPI-Key": "1b67c35036mshade3492e44ff5e0p1761b2jsnbca7fe3e0702",
			"X-RapidAPI-Host": "billboard-api2.p.rapidapi.com"
		}
	};
*/