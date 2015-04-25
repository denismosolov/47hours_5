
(function(){
	var recognizing = false;
	var error = false;
	var text = '';

	var action = {
		'0': {
			'video': 'video/0.mp4',
			'answers': ['привет', 'здравствуйте', 'здравствуй', 'добрый день'],
			'vanswers': ['video/privet.mp4', 'video/zdravstvuyte.mp4', 'video/zdravstvuy.mp4', 'video/dobriy_den.mp4'],
			'last': false
		},
		'1': {
			'video': null,
			'answers': ['как ваши дела', 'как дела', 'как поживаешь', 'как поживаете'],
			'vanswers': ['video/horosho_spasibo.mp4', 'video/horosho_spasibo.mp4', 'video/horosho_spasibo.mp4', 'video/horosho_spasibo.mp4'], 
			'last': false
		},
		'2': {
			'video': null,
			'answers': ['как вас зовут', 'как тебя зовут'],
			'vanswers': ['video/menya_zovut_kak_vas.mp4', 'video/menya_zovut_kak_vas.mp4'],
			'last': false
		},
		'3': {
			'video': null,
			'answers': [],
			'last': false
		},
		'4': {
			'video': 'video/priyatno_poznakomitsa.mp4',
			'answers': [],
			'last': true
		}
	};
	var currentActionIndex = 0;

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
		if (answers.length == 0) {
			var passed = true;
		} else {
			var passed = false;
			for (var i = 0; i < answers.length; i++) {
				if(answers[i] === text) {
					passed = true;
					action[currentActionIndex + 1].video = action[currentActionIndex].vanswers[i];
					break;
				}
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
