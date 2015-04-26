
(function(){
	
	window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
	if(! window.SpeechRecognition) {
		warning.innerHTML = 'Your browser does not support voice recognition.';
		warning.style.display = '';
	}
	
	$('#start-video').click(function(){
		$(this).hide();
		video.play();
	});

	var recognizing = false;
	var text = '';
	var wrongAnswer = false;

	var action = {
		'0': {
			'video': 'video/0.mp4',
			'answers': ['привет', 'здравствуйте', 'здравствуй', 'добрый день'],
			'romanization': ['privet', 'zdrastvuyte', 'zdrastvuy', 'dobriy den\''],
			'vanswers': ['video/privet.mp4', 'video/zdravstvuyte.mp4', 'video/zdravstvuy.mp4', 'video/dobriy_den.mp4'],
			'hint': 'Say hello <em>(in russian)</em>',
			'last': false
		},
		'1': {
			'video': null,
			'answers': ['как ваши дела', 'как дела', 'как твои дела', 'как поживаешь', 'как поживаете'],
			'romanization': ['kak vashi dela', 'kak dela', 'kak tvoi dela', 'kak pozivaesh\'', 'kak pozivaete'],
			'vanswers': ['video/horosho_spasibo.mp4', 'video/horosho_spasibo.mp4', 'video/horosho_spasibo.mp4', 'video/horosho_spasibo.mp4', 'video/horosho_spasibo.mp4'], 
			'hint': 'Ask how are you? <em>(in russian)</em>',
			'last': false
		},
		'2': {
			'video': null,
			'answers': ['как вас зовут', 'как тебя зовут'],
			'romanization': ['kak vas zovut', 'kak tebya zovut'],
			'vanswers': ['video/menya_zovut_kak_vas.mp4', 'video/menya_zovut_kak_vas.mp4'],
			'hint': 'Ask what is you name?',
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
			showWarning('Allow the sites to access your microphone and resfresh this page');
		} else if (event.error == 'service-not-allowed'){
			showWarning('For using this site please open it in Google Chrome or Safari');
		} else {
			showWarning('Please refresh the page and start from beginning');
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
				wrongAnswer = false;
				nextVideo = action[currentActionIndex].vanswers[i];
				break;
			}
		}
		if(action[currentActionIndex].last) {
			hideAllMessages();
			video.onended = showFinal;
		}
		if(passed) {
			currentActionIndex++;
		} else {
			// @todo: it should be 'Sorry, I misunderstand you'
			nextVideo = 'video/ya_ne_ponimayu.mp4';
			wrongAnswer = true;
			// possible answers
			var romanization = action[currentActionIndex].romanization;
			var t = '<em>Possible anwers:</em> ';
			var l = answers.length;
			if (l > 2) l = 2;
			for (var i = 0; i < l; i++) {
				t += answers[i] + ' <span class="bold">(' + romanization[i] + ')</span>';
				if (i + 1 != l) t += ', ';
			}
			setAnswers(t);
		}
		hideAllMessages();
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
			if (wrongAnswer) showAnswers();
		} else {
			hideAllMessages();
		}
	};
	
	function showHint(text) {
		$('#hint').html(text).fadeIn(300);
	}
	function hideHint() {
		$('#hint').fadeOut(300);
	}
	function showWarning(text) {
		$('#warning').html(text).fadeIn(300);
	}
	function hideWarning() {
		$('#warning').fadeOut(300);
	}
	function setAnswers(text) {
		$('#answers').html(text);
	}
	function showAnswers() {
		$('#answers').fadeIn(300);
	}
	function hideAnswers() {
		$('#answers').fadeOut(300);
	}
	function hideAllMessages() {
		hideHint();
		hideAnswers();
		hideWarning();
	}
	function showFinal() {
		$('#lesson').fadeOut(300);
		$('#final').fadeIn(300);
	}
})();
