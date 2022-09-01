// initialize functions when page loaded
$(document).ready(() => {
	initializeBillboard();
	initializeSearchHistory();
});

// Event listener to retrieve input data with button and send it to functions.
$('.search-btn').on('click', () => {
	let $searchArtist = $('.search-input');
	let artistName = $searchArtist.val();
	updateSearchHistory(artistName);
	getArtistTrack(artistName);
	$searchArtist.val('');
});

// History of search list button. trigger when click and start getArtistTrack function using delegated event handlers.
$('.search-history').on('click', '.search-history-item', event => {
	const artistName = $(event.target).data('artist');
	getArtistTrack(artistName);
});

// Initialize to display the top 5 billboard albums
function initializeBillboard() {
	$.ajax({
		url: 'https://billboard-api2.p.rapidapi.com/billboard-200?date=2022-08-26&range=1-5',
		crossDomain: true,
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '1b67c35036mshade3492e44ff5e0p1761b2jsnbca7fe3e0702',
			'X-RapidAPI-Host': 'billboard-api2.p.rapidapi.com' 
		}
	}).then(response => {
		var content = response?.content; // "?" is the optional chaining operator to check if the data either undefined or null. 

		$.each(content, (index, album) => {
			const $album = $('<span>')
				.text(album?.album)
				.append(`<img class="flex justify- rounded m-0" src="${album?.image}" width="75%" height="75%"/>`);

			$('.albums').append($album);
		});
	});
}


// function initialize the last search in history to send getArtistTrack
function initializeSearchHistory() {
	const lastArtistName = updateSearchHistory();

	if (lastArtistName) {
		getArtistTrack(lastArtistName);
	}
}

// function to fetch the music API to search artist's top 5 tracks
function getArtistTrack(artistName) {
	$.ajax({
		url: `https://spotify23.p.rapidapi.com/search/?q=${artistName}&type=tracks&offset=0&limit=5&numberOfTopResults=5`,
		crossDomain: true,
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '1b67c35036mshade3492e44ff5e0p1761b2jsnbca7fe3e0702',
			'X-RapidAPI-Host': 'spotify23.p.rapidapi.com' 
		}
	}).then(response => { // Good code to use it.
		const tracks = response?.tracks?.items;
		$('.tracks').empty();

		tracks.forEach(track => {
			const data = track?.data;
			console.log(data);

			const $track = $('<h3>')
				.text(data?.artists?.items[0]?.profile?.name)
				.append(`
					<br><iframe class="" style="border-radius:12px" src="https://open.spotify.com/embed/track/${data.id}?utm_source=generator" width="99%" height="80" frameBorder="0" allowfullscreen="" 
					allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
				`);
			$('.tracks').append($track);
		});
	});
}
// function to update the search history list. 
function updateSearchHistory(artistName) {
	let maxItems = 5;
	let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

	if (artistName) {
		if (searchHistory.includes(artistName)) {
			let repeatIndex = searchHistory.indexOf(artistName);
			searchHistory.splice(repeatIndex, 1);
		}
	
		searchHistory.unshift(artistName);
	}

	if (searchHistory.length > maxItems) {
		searchHistory.pop();
	}

	localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
	$('.search-history').empty();

	for (var artist of searchHistory) {
		var searchHistoryItem = $('<button type="button" class="search-history-item bg-freeze-purple h-box"">');
		searchHistoryItem.text(artist).data('artist', artist);
		$('.search-history').append(searchHistoryItem);
	}

	let lastArtist = searchHistory[0];

	return lastArtist;
}
