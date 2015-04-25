
(function(){
	var recognizing = false;
	var error = false;
	var text = '';
	var speechRecogniton = new webkitSpeechRecognition();
	speechRecogniton.lang = 'ru-RU';
	speechRecogniton.continuous = true;
	speechRecogniton.interimResults = true;

	speechRecogniton.onstart = function() {
		recognizing = true;
	};

	speechRecogniton.onerror = function(event) {
		error = true;
	}

	speechRecogniton.onend = function() {
		recognizing = false;
	}

	speechRecogniton.onresult = function(event) {
		for (var i = event.resultIndex; i < event.results.length; ++i) {
			if (event.results[i].isFinal) {
				text += event.results[i][0].transcript;
			} else {
				//console.log(event);
			}
		}
	}

	start.addEventListener('click', function(event) {
		if(recognizing) {
			speechRecogniton.stop();
			return;
		}

		text = '';
		speechRecogniton.start();
	});
})();
