
(function(){
	var recognizing = false;
	var error = false;
	var text = '';

	var action = {
		'0': {
			'video': 'video/1/2.mp4',
			'answers': ['привет', 'здравствуйте', 'здравствуй'],
			'last': false
		},
		'1': {
			'video': 'video/1/2.mp4',
			'answers': ['как ваши дела', 'как дела', 'как поживаешь', 'как поживаете'],
			'last': false
		},
		'2': {
			'video': 'video/1/2.mp4',
			'answers': ['как вас зовут', 'как ваше имя'],
			'last': false
		},
		'3': {
			'video': 'video/1/2.mp4',
			'last': true
		}
	};
	var currentActionIndex = '0';

	var speechRecogniton = new webkitSpeechRecognition();
	speechRecogniton.lang = 'ru-RU';
	speechRecogniton.continuous = false;
	speechRecogniton.interimResults = false;

	speechRecogniton.onstart = function() {
		recognizing = true;
	};

	speechRecogniton.onerror = function(event) {
		error = true;
	};

	speechRecogniton.onend = function() {
		recognizing = false;
		console.log(text);
		var answers = action[currentActionIndex].answers;
		var passed = false;
		for (var i = 0; i < answers.length; i++) {
			if(answers[i] === text) {
				passed = true;
			}
		}
		if(passed) {
			currentActionIndex++;
			video.src = action[currentActionIndex].video;
		} else {
			// @todo: not recognized
		}
		text = '';
	};

	speechRecogniton.onresult = function(event) {
		for (var i = event.resultIndex; i < event.results.length; ++i) {
			if (event.results[i].isFinal) {
				text += event.results[i][0].transcript;
			} else {
				//console.log(event);
			}
		}
	}

	video.onended = function(){
		speechRecogniton.start();
		recognizing = true;
	};
})();
