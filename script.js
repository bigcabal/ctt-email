var defaultStyles = 'border-bottom: 1px dotted rgb(0,172,237);\
				background-color: rgba(0,172,237,0.1);\
				position: relative;\
				font-style: italic;\
				color: rgb(0,172,237);\
				text-decoration: none;';

function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
	var results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


// Set defaults

if ( getParameterByName('via') ) {
	document.getElementById('tweetVia').value = getParameterByName('via');
}

if ( getParameterByName('hashtags') ) {
	document.getElementById('tweetHashtags').value = getParameterByName('hashtags');
}

if ( getParameterByName('url') ) {
	document.getElementById('tweetUrl').value = getParameterByName('url');
}






function generate() {

	var tweetText = document.getElementById('tweetText').value;
	var tweetTextEncoded = encodeURIComponent(tweetText);

	var tweetUrl = document.getElementById('tweetUrl').value;
	tweetUrl = '&url='+tweetUrl || '';

	var tweetHashtags = document.getElementById('tweetHashtags').value;
	tweetHashtags = '&hashtags='+tweetHashtags || '';

	var tweetVia = document.getElementById('tweetVia').value;
	tweetVia = '&via='+tweetVia || '';


	var url = 'https://twitter.com/intent/tweet/?text='+tweetTextEncoded+tweetUrl+tweetVia+tweetHashtags;

	var tweetStyles = document.getElementById('tweetStyles').value || defaultStyles;

	var element = '<a href="'+url+'" style="'+tweetStyles+'" target="_blank">\
					<span>'+tweetText+'</span> \
					<img src="https://raw.githubusercontent.com/ireade/inlinetweetjs-email/master/twitter.png" style="width: 1em; height: auto;"> \
					</a>';
	document.getElementsByClassName('preview')[0].innerHTML = element;


	element = element.replace(/</g, '&lt;');
	document.getElementsByClassName('code')[0].innerHTML = element;

	document.getElementsByClassName('section-preview')[0].style.display = 'block';
	document.getElementsByClassName('section-code')[0].style.display = 'block';
}


var generateButton = document.getElementsByClassName('generate')[0];

generateButton.addEventListener('click', function(e) {
	generate();
	e.preventDefault();

	location.href = '#sectionPreview';

	return false;
});






function calcTweetCount() {

	var tweetTextCount = document.getElementById('tweetText').value.length;
	var tweetViaCount = document.getElementById('tweetVia').value.length;
	var tweetUrlCount = document.getElementById('tweetUrl').value.length;
	var tweetHashtagsCount = document.getElementById('tweetHashtags').value.length;

	if ( tweetHashtagsCount > 1 ) {
		var hashtags = document.getElementById('tweetHashtags').value.split(',');
		tweetHashtagsCount = hashtags.length + hashtags.join().length;
	}

	var tweetCount = 140 - (tweetTextCount + tweetHashtagsCount + tweetViaCount + tweetUrlCount);



	var tweetCountElement = document.getElementsByClassName('tweet-character-count')[0];
	tweetCountElement.innerHTML = tweetCount;

	generateButton.disabled = tweetCount < 1 ? true : false;
	tweetCountElement.style.color = tweetCount < 10 ? 'red' : 'inherit';

}



var inputs = document.querySelectorAll('input');
for (var i = 0; i < inputs.length; i++) {
	inputs[i].addEventListener('keyup', function() {
		calcTweetCount();
	});
	inputs[i].addEventListener('click', function() {
		calcTweetCount();
	});
}
document.querySelector('textarea').addEventListener('keyup', function() {
	calcTweetCount();
});
document.querySelector('textarea').addEventListener('click', function() {
	calcTweetCount();
});
calcTweetCount();






