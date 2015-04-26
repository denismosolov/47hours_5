
(function(){

	var recognizing = false;
	var text = '';

	var action = {
		'0': {
			'video': 'video/0.mp4',
			'answers': ['привет', 'здравствуйте', 'здравствуй', 'добрый день'],
			'vanswers': ['video/privet.mp4', 'video/zdravstvuyte.mp4', 'video/zdravstvuy.mp4', 'video/dobriy_den.mp4'],
			'hint': 'Say, hello',
			'last': false
		},
		'1': {
			'video': null,
			'answers': ['как ваши дела', 'как дела', 'как поживаешь', 'как поживаете'],
			'vanswers': ['video/horosho_spasibo.mp4', 'video/horosho_spasibo.mp4', 'video/horosho_spasibo.mp4', 'video/horosho_spasibo.mp4'], 
			'hint': 'Ask, how are you?',
			'last': false
		},
		'2': {
			'video': null,
			'answers': ['как вас зовут', 'как тебя зовут'],
			'vanswers': ['video/menya_zovut_kak_vas.mp4', 'video/menya_zovut_kak_vas.mp4'],
			'hint': 'Ask, what is you name?',
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
		warning.innerHTML = 'Allow the sites to access your camera and microphone and resfresh this page';
		warning.style.display = '';
	};

	speechRecogniton.onend = function() {
		recognizing = false;

		console.log(text);

		var answers = action[currentActionIndex].answers;
		var passed = false;
		var nextVideo;
		for (var i = 0; i < answers.length; i++) {
			if(answers[i] === text) {
				passed = true;
				nextVideo = action[currentActionIndex].vanswers[i];
				break;
			}
		}
		if(passed) {
			if(action[currentActionIndex].last) {
				currentActionIndex = 0;
				nextVideo = 'video/0.mp4';
				video.controls = true;
				hint.innerHTML = '';
				hint.style.display = 'none';
				// @todo: lesson is ended
			} else {
				currentActionIndex++;
				// go to next frame
			}
			video.src = nextVideo;
		} else {
			// @todo: it should be 'Sorry, I misunderstand you'
		}
		video.play();
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

	video.onplay = function(){
		video.controls = false;
	};

	video.onended = function(){
		speechRecogniton.start();
		recognizing = true;

		if(action[currentActionIndex].hint) {
			hint.innerHTML = action[currentActionIndex].hint;
			hint.style.display = '';
		} else {
			hint.innerHTML = '';
			hint.style.display = 'none';
		}
	};
})();
