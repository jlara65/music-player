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

var billBoard = {
	"async": true,
	"crossDomain": true,
	"url": "https://billboard-api2.p.rapidapi.com/billboard-200?date=2022-08-01&range=1-5",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "1b67c35036mshade3492e44ff5e0p1761b2jsnbca7fe3e0702",
		"X-RapidAPI-Host": "billboard-api2.p.rapidapi.com"
	}
};


$.ajax(topTracks).then((response) => {
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
    
	
});




$.ajax(billBoard).then(function (response) {
	//console.log(response);
});

const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://spotify23.p.rapidapi.com/playlist_tracks/?id=37i9dQZF1DX4Wsb4d7NKfP&offset=0&limit=10",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "1b67c35036mshade3492e44ff5e0p1761b2jsnbca7fe3e0702",
		"X-RapidAPI-Host": "spotify23.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});

/* var apiKey = "N2ExNGYyM2MtYjhjNi00NGMxLWE3YjgtZWE3ZTI4MWY5MmRl";
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