
var artistName = "eminem";


var topTracks = {
	"async": true,
	"crossDomain": true,
	"url": `https://spotify23.p.rapidapi.com/search/?q=${artistName}&type=tracks&offset=0&limit=5&numberOfTopResults=5`,
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "1b67c35036mshade3492e44ff5e0p1761b2jsnbca7fe3e0702",
		"X-RapidAPI-Host": "spotify23.p.rapidapi.com"
	}
};

/* Maxed the limited # of request
 var billBoard = {
	"async": true,
	"crossDomain": true,
	"url": "https://billboard-api2.p.rapidapi.com/billboard-200?date=2022-08-01&range=1-5",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "1b67c35036mshade3492e44ff5e0p1761b2jsnbca7fe3e0702",
		"X-RapidAPI-Host": "billboard-api2.p.rapidapi.com"
	}
}; */


/* $.ajax(topTracks).then((response) => {       // Good code.
	//console.log(response);
    var trackArray = response.tracks.items;
    //console.log(trackArray);
    

    $.each(trackArray, function(index) {
        //var cover = trackArray[index].data.albumOfTrack.cover.sources.url;
        var title = trackArray[index].data.albumOfTrack.name;
        var play = trackArray[index].data.uri;

        console.log(title);
        console.log(play);
    });
    
	
}); */



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


$.ajax(billboard).then(function (response) {
	console.log(response);

	var topArray = response.content;

	$.each(topArray, function(j) {
		var topAlbum = topArray[j].album;
		var imgCover = topArray[j].image;

		console.log(topAlbum);
		console.table(imgCover);

		var topTitleEl = $('<h2>').text(topAlbum);
		var imgCoverEl = $('<img>').attr('src', imgCover);

		$(`#t-${j + 1}`).html('');
		$(`#t-${j + 1}`).append(topTitleEl).append(imgCoverEl);

		//$(`#test-${j + 1}`).attr("src", imgCover);
		//$(`#top-title-${j + 1}`).text("<span>topAlbum</span>");

		//console.log(topAlbum);
		//console.log(imgCover);

	});
});





// Dump codes
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
}; */