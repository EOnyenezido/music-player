DZ.init({
		appId  : '154751',
		channelUrl : 'http://andela-eonyenezido.github.io/activate',
		/*player : {
			container: 'player',
			width : 600,
			height : 300,
			format : 'vertical',
			onload : function(player){
				player.volume = 200;
			}
		}*/
		
});

$(document).ready(function(){$("#modal1").openModal()});

function login(){DZ.login(function(response) {
	if (response.authResponse) {
		console.log('Welcome!  Fetching your information.... ');
		DZ.api('/user/me', function(response) {
			console.log('Good to see you, ' + response.name + '.');
		});
	} else {
		console.log('User cancelled login or did not fully authorize.');
	}
}, {perms: 'basic_access,email'})};

var x;

function search() {DZ.api('/search?q=' + document.getElementById("search").value, function(json){
				x = json;
				$('#results').empty();
				for (var i=0, len = json.data.length; i<len ; i++)
				{
			      $('#results').append('<a href="#!" class="collection-item">' + json.data[i].title + ' - ' + json.data[i].album.title + '<i class="mdi-av-play-circle-outline right" onclick="DZ.player.playTracks([' + json.data[i].id + ']), nowP(' + i + ')"></i></a>');
				}
})}

//<a href="#!" class="collection-item">Alvin<i class="mdi-av-play-circle-outline right"></i></a>



function nowP(current) {
	document.getElementById('alimg').setAttribute("src", x.data[current].album.cover);
	document.getElementById('altxt').innerHTML = x.data[current].album.title;
	document.getElementById('sotxt').innerHTML = x.data[current].title;
	document.getElementById('artxt').innerHTML = x.data[current].artist.name;
}


//var ike = document.createElement("p");

//ike.innerHTML = emeka;