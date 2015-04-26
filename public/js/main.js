
(function(){
	
	window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
	var recognizing = false;
	var text = '';

	var action = {
		'0': {
			'video': 'video/0.mp4',
			'answers': ['привет', 'здравствуйте', 'здравствуй', 'добрый день'],
			'romanization': ['privet', 'zdrastvuyte', 'zdrastvuy', 'dobriy den\''],
			'vanswers': ['video/privet.mp4', 'video/zdravstvuyte.mp4', 'video/zdravstvuy.mp4', 'video/dobriy_den.mp4'],
			'hint': 'Say, hello',
			'last': false
		},
		'1': {
			'video': null,
			'answers': ['как ваши дела', 'как дела', 'как поживаешь', 'как поживаете'],
			'romanization': ['kak vashi dela', 'kak dela', 'kak pozivaesh\'', 'kak pozivaete'],
			'vanswers': ['video/horosho_spasibo.mp4', 'video/horosho_spasibo.mp4', 'video/horosho_spasibo.mp4', 'video/horosho_spasibo.mp4'], 
			'hint': 'Ask, how are you?',
			'last': false
		},
		'2': {
			'video': null,
			'answers': ['как вас зовут', 'как тебя зовут'],
			'romanization': ['kak vas zovut', 'kak tebya zovut'],
			'vanswers': ['video/menya_zovut_kak_vas.mp4', 'video/menya_zovut_kak_vas.mp4'],
			'hint': 'Ask, what is you name?',
			'last': false
		},
		'3': {
			'video': null,
			'answers': [],
			'vanswers': ['video/priyatno_poznakomitsa.mp4'],
			'hint': 'Answer the queston',
			'last': true
		}
	};
	var currentActionIndex = 0;

	var speechRecogniton = new SpeechRecognition();
	speechRecogniton.lang = 'ru-RU';
	speechRecogniton.continuous = false;
	speechRecogniton.interimResults = false;

	speechRecogniton.onstart = function() {
		recognizing = true;
	};

	speechRecogniton.onerror = function(event) {
		if(event.error == 'no-speech') {
			if(! recognizing) {
				speechRecogniton.start();
			}
		} else if (event.error == 'not-allowed'){
			warning.innerHTML = 'Allow the sites to access your microphone and resfresh this page';
			warning.style.display = '';
		} else if (event.error == 'service-not-allowed'){
			warning.innerHTML = 'For using this site please open it in Google Chrome or Safari';
			warning.style.display = '';
		} else {
			warning.innerHTML = 'Please refresh the page and start from beginning';
			warning.style.display = '';
		}
	};

	speechRecogniton.onend = function() {
		recognizing = false;
		
		console.log(text);
		
		if (! text) {
			if(! recognizing) {
				speechRecogniton.start();
			}
			return;
		}

		var answers = action[currentActionIndex].answers;
		var passed = ! action[currentActionIndex].answers.length;
		var nextVideo;

		if(passed) {
			nextVideo = action[currentActionIndex].vanswers[0];
		}
		for (var i = 0; i < answers.length; i++) {
			if(answers[i] === text) {
				passed = true;
				nextVideo = action[currentActionIndex].vanswers[i];
				break;
			}
		}
		if(action[currentActionIndex].last) {
			hideHint();
			video.onended = function(){alert('Congratulations!')};
		}
		if(passed) {
			currentActionIndex++;
		} else {
			// @todo: it should be 'Sorry, I misunderstand you'
			nextVideo = 'video/ya_ne_ponimayu.mp4';
		}
		hideHint();
		video.src = nextVideo;
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
		if(recognizing) {
			speechRecogniton.stop();
			recognizing = false;
		}

		speechRecogniton.start();
		recognizing = true;

		if(action[currentActionIndex].hint) {
			showHint(action[currentActionIndex].hint);
		} else {
			hideHint();
		}
	};
	
	function showHint(text) {
		$('#hint').text(text).fadeIn(300);
	}
	function hideHint() {
		$('#hint').fadeOut(300);
	}
	function showWarning(text) {
		$('#warning').text(text).fadeIn(300);
	}
	function hideWarning() {
		$('#warning').fadeOut(300);
	}
	function showAnwers(text) {
		$('#answers').text(text).fadeIn(300);
	}
	function hideAnswers() {
		$('#answers').fadeOut(300);
	}
})();
