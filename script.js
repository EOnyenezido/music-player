DZ.init({
		appId  : '154751',
		channelUrl : 'http://andela-eonyenezido.github.io/activate',
		player : {
			container: 'player',
			width : 600,
			height : 300,
			format : 'vertical',
			onload : function(player){
				player.volume = 200;
			}
		}
		
});

//$(document).ready(function(){$("#modal1").openModal()});
//(document).ready(radio());

function radio()  {
	DZ.api("/radio", function(json){
		var qualen = Math.ceil(json.data.length / 4);
		var count = 0;
		for (var i = 0; i < qualen; i++)  {
			$('#test4').append('<div class="row">');
			for (var j = 0; j < 4; j++)  {
				$('#test4').append('<div class="col s3"><div class="card"><div class="card-image"><img src="' + json.data[count].picture + '"><span class="card-title">' + json.data[count].title + '</span></div><div class="red center-align"><i class="medium mdi-av-play-arrow waves-effect waves-light" onclick="DZ.player.playRadio(' + json.data[count].id + ')"></i></div></div>');
				count++;
			}
			$('#test4').append('</div>');
		}
	})
}

/*DZ.login(function(response) {
	if (response.authResponse) {
		login();
		DZ.api('/user/me', function(response) {
		$("<li><a id='welcome' href='" + response.link + "' target='_blank'>Welcome,&nbsp" + response.name + "</a></li>").insertBefore("#loginstatus")
		document.getElementById("loginstatus").innerHTML = "&nbsp&nbsp&nbspLogout&nbsp&nbsp&nbsp";
		document.getElementById('loginstatus').setAttribute('onclick', "logout()");
		document.getElementById('userpic').setAttribute('src', response.picture);
		document.getElementById('username').innerHTML = response.name;
		document.getElementById('userid').innerHTML = response.id;
		document.getElementById('userlink').innerHTML = "<a href='" + response.link + "' target='_blank'>Open profile</a>";
		document.getElementById('country').innerHTML = response.country;
		});
		search2(145);
		nowP(90428585);
		/*console.log('Welcome!  Fetching your information.... ');
		DZ.api('/user/me', function(response) {
			console.log('Good to see you, ' + response.name + '.');
		});
	} else {
		console.log('User cancelled login or did not fully authorize.');
	}
}, {perms: 'basic_access,email'});*/

function login(){
	/*DZ.api('/user/me', function(response) {
		$("<li><a id='welcome' href='" + response.link + "' target='_blank'>Welcome,&nbsp" + response.name + "</a></li>").insertBefore("#loginstatus")
		document.getElementById("loginstatus").innerHTML = "&nbsp&nbsp&nbspLogout&nbsp&nbsp&nbsp";
		document.getElementById('loginstatus').setAttribute('onclick', "logout()");
		document.getElementById('userpic').setAttribute('src', response.picture);
		document.getElementById('username').innerHTML = response.name;
		document.getElementById('userid').innerHTML = response.id;
		document.getElementById('userlink').innerHTML = "<a href='" + response.link + "' target='_blank'>Open profile</a>";
		document.getElementById('country').innerHTML = response.country;
	});
	search2(145);*/
	DZ.login(function(response) {
	if (response.authResponse) {
		DZ.api('/user/me', function(response) {
		$("<li><a id='welcome' href='" + response.link + "' target='_blank'>Welcome,&nbsp" + response.name + "</a></li>").insertBefore("#loginstatus")
		document.getElementById("loginstatus").innerHTML = "&nbsp&nbsp&nbspLogout&nbsp&nbsp&nbsp";
		document.getElementById('loginstatus').setAttribute('onclick', "logout()");
		document.getElementById('userpic').setAttribute('src', response.picture);
		document.getElementById('username').innerHTML = response.name;
		document.getElementById('userid').innerHTML = response.id;
		document.getElementById('userlink').innerHTML = "<a href='" + response.link + "' target='_blank'>Open profile</a>";
		document.getElementById('country').innerHTML = response.country;
		});
		search2(145);
		nowP(90428585);
		radio();
		/*console.log('Welcome!  Fetching your information.... ');
		DZ.api('/user/me', function(response) {
			console.log('Good to see you, ' + response.name + '.');
		});*/
	} else {
		console.log('User cancelled login or did not fully authorize.');
	}
	}, {perms: 'basic_access,email'});
};

function logout()  {
	DZ.logout(function() {
		document.getElementById("loginstatus").innerHTML = "Login";
		document.getElementById('loginstatus').setAttribute('onclick', "login()");
		$("#welcome").remove();
		document.getElementById('userpic').setAttribute('src', "");
		document.getElementById('username').innerHTML = "UserName";
		document.getElementById('userid').innerHTML = "SomeId";
		document.getElementById('userlink').innerHTML = "SomeLink";
		document.getElementById('country').innerHTML = "Country";
	});
}

function search() {DZ.api('/search?q=' + document.getElementById("search").value, function(json){
				$('#results').empty();
				for (var i=0, len = json.data.length; i<len ; i++)
				{
			      $('#results').append('<a href="#!" class="collection-item">' + json.data[i].title + ' - ' + json.data[i].album.title + '<i class="small mdi-av-playlist-add right" onclick="playlist(' + json.data[i].id + ')"></i><i class="small mdi-av-play-circle-outline right" onclick="DZ.player.playTracks([' + json.data[i].id + '])"></i></a>');
				}
})}


function recent(current) {
	DZ.api("/track/" + current, function(json){
		$('#recent').prepend('<a href="#!" class="collection-item">' + json.title + ' - ' + json.album.title + '<i class="small mdi-av-play-circle-outline right" onclick="DZ.player.playTracks([' + json.id + '])"></i></a>');
	})
}

var pl_list = [];

function playlist(current) {
	DZ.api("/track/" + current, function(json){
		$('#playlist').append('<a href="#!" id="' + json.id + '"  class="collection-item">' + json.title + ' - ' + json.album.title + '<i class="small mdi-content-clear right" onclick="removeFromPlaylist(' + json.id + ')"></i></a>');
		pl_list.push(json.id);
	})
}

function playPlaylist() {
	DZ.player.playTracks(pl_list);
}

function clearPlaylist() {
	pl_list = [];
	$('#playlist').empty();
}

function removeFromPlaylist(item) {
	$('#' + item).remove();
	pl_list = $.grep(pl_list, function(value, index)  {
		return (value !== item);
	})
}

DZ.Event.subscribe('current_track', function(track, evt_name){
	nowP(track.track.id);
});

function nowP(current) {
	DZ.api("/track/" + current, function(json){
		document.getElementById('alimg').setAttribute("src", json.album.cover);
		document.getElementById('altxt').innerHTML = json.album.title;
		document.getElementById('sotxt').innerHTML = json.title;
		document.getElementById('artxt').innerHTML = json.artist.name;
		document.getElementById('albumname').innerHTML = json.album.title;
		document.getElementById('reldate').innerHTML = json.album.release_date;
		document.getElementById('songname').innerHTML = json.title;
		document.getElementById('songpos').innerHTML = json.track_position;
		document.getElementById('songrank').innerHTML = json.rank;
		nowB(json.artist.id);
		nowC(json.album.id);
		recent(json.id);
	})
}

/*function nowR(current) {
	DZ.api("/radio/" + current, function(json){
		document.getElementById('alimg').setAttribute("src", json.picture);
		document.getElementById('altxt').innerHTML = "Radio: &nbsp" + json.title;
		document.getElementById('sotxt').innerHTML = json.title;
		document.getElementById('artxt').innerHTML = "Radio";
	})
}*/

function nowB(current)  {
	DZ.api("/artist/" + current, function(json){
		document.getElementById('artistpic').setAttribute("src", json.picture)
		document.getElementById('artistname').innerHTML = json.name;
		document.getElementById('artistlink').innerHTML = json.link;
		document.getElementById('artistalbums').innerHTML = json.nb_album;
		document.getElementById('artistfans').innerHTML = json.nb_fan;
		top5(current);
	})
}

function nowC(current)  {
	DZ.api("/album/" + current, function(json){
		$('#othersongs').empty();
		for (var i=0, len = json.tracks.data.length; i<len ; i++)
		{
		    $('#othersongs').append('<a href="#!" class="collection-item truncate colText"><span class="colText">' + json.tracks.data[i].title + '</span><i class="mdi-av-play-circle-fill right small red-text" onclick="DZ.player.playTracks([' + json.tracks.data[i].id + '])"></i></a>');
		}
	})
}

function top5(current)  {
	DZ.api("/artist/" + current + "/top", function(json){
		$('#top5').empty();
		for (var i=0, len = json.data.length; i<len ; i++)
		{
		    $('#top5').append('<a href="#!" class="colText collection-item truncate"><span class="colText">' + json.data[i].title + '</span><i class="small red-text mdi-av-play-circle-fill right" onclick="DZ.player.playTracks([' + json.data[i].id + '])"></i></a>');
		}
	})
	moreSongs(current);
}

function moreSongs(current)  {
	DZ.api("/artist/" + current + "/related", function(json){
		$('#moresongs').empty();
		for (var i=0; i<5 ; i++)
		{
		    $('#moresongs').append('<li class="colText collection-item avatar"><img src="' + json.data[i].picture + '" alt="" class="circle"><span class="colText">' + json.data[i].name + '<br>No. of albums:&nbsp' + json.data[i].nb_album + '<br>Fans:&nbsp' + json.data[i].nb_fan + '</span><a href="#!" class="secondary-content"><i class="small mdi-av-play-circle-fill red-text right" onclick="search2(' + json.data[i].id + ')"></i></a></li>');
		}
	})
}

/*<li class="collection-item avatar">
      <img src="json.data[i].picture" alt="" class="circle">
      <span class="title">json.data[i].name</span>
      <p>No. of albums:&nbsp json.data[i].nb_album <br>
         Fans:&nbsp json.data[i].nb_fans
      </p>
      <a href="#!" class="secondary-content"><i class="mdi-av-play-arrow red-text" onclick="search2(json.data[i].name)"></i></a>
</li>*/

function search2(current) {console.log(current);
	DZ.api("/artist/" + current + "/top?limit=20", function(json){
	
				$('#results').empty();
				for (var i=0, len = json.data.length; i<len ; i++)
				{
			      $('#results').append('<a href="#!" class="collection-item">' + json.data[i].title + ' - ' + json.data[i].album.title + '<i class="small mdi-av-playlist-add right" onclick="playlist(' + json.data[i].id + ')"></i><i class="small mdi-av-play-circle-outline right" onclick="DZ.player.playTracks([' + json.data[i].id + '])"></i></a>');
				}
})}

//var ike = document.createElement("p");

//ike.innerHTML = emeka;