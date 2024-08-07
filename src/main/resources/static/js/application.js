var mainFunction = 
{
	elements: {
		container 			: ".container",
		containerInner		: ".container-inner",
		videoPlayerContainer: ".video-player-container",
		videoContainer 		: ".video-container",
		playerContainer		: ".player-container",
		mediaVideo 			: "#media-video",
		playControl 		: ".play-control",
		playButton 			: ".play-button",
		pauseButton 		: ".pause-button",
		volumeControl 		: ".volume-control",
		volumeButton 		: ".volume-button",
		volumeButtonMute 	: ".volume-button-mute",
		progress 			: ".progress",
		progressOver 		: ".progress-over",
		progressHidden 		: ".progress-hidden",
		progressBackground 	: ".progress-background",
		indicator 			: ".indicator",
		fullScreenButton	: ".fullscreen-button"
	},

	isPlay 		: false,
	isVolume 	: true,
	isEnd		: false,
	progressBarHeight : 100,

	init: function(){
		mainFunction.defaultSettings();
		mainFunction.clickSettings();
		mainFunction.playControlVideo();
		mainFunction.volumeControlVideo();
		mainFunction.progressControlVideo();
		mainFunction.mouseHideControl();
	},

	defaultSettings: function(){

		$(mainFunction.elements.mediaVideo)[0].controls = false;

		$(window).on("resize", onResize);

		function onResize(){
			$(mainFunction.elements.progress).width( $(mainFunction.elements.playerContainer).width() - 223 );
			$(mainFunction.elements.progressBackground).width( $(mainFunction.elements.playerContainer).width() - 223 - 40 );		
			$(mainFunction.elements.progressHidden).width( $(mainFunction.elements.playerContainer).width() - 223 - 40 );		
			mainFunction.progressBarHeight = $(mainFunction.elements.playerContainer).width() - 223 - 40;
			$(mainFunction.elements.progressOver).css("width", String( (mainFunction.progressBarHeight / $(mainFunction.elements.mediaVideo)[0].duration) * $(mainFunction.elements.mediaVideo)[0].currentTime ));
		}

		onResize();

	},

	clickSettings: function(){
		$(mainFunction.elements.playControl).on("click", mainFunction.playControlVideo);
		$(mainFunction.elements.volumeControl).on("click", mainFunction.volumeControlVideo);
		$(mainFunction.elements.mediaVideo).on("click", mainFunction.playControlVideo);
		$(mainFunction.elements.fullScreenButton).on("click", mainFunction.fullScreenControl);
		$("body").on("keyup", function(e){ if(e.which == 27) { mainFunction.exitFullScreen(); } });
	},

	fullScreenControl:function(){
		
		if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement)
		{
			if (document.documentElement.requestFullscreen)
			{
				document.documentElement.requestFullscreen();
				mainFunction.onFullScreen();
			}
			else if (document.documentElement.msRequestFullscreen)
			{
				document.documentElement.msRequestFullscreen();
				mainFunction.onFullScreen();
			}
			else if (document.documentElement.mozRequestFullScreen)
			{
				document.documentElement.mozRequestFullScreen();
				mainFunction.onFullScreen();
			}
			else if (document.documentElement.webkitRequestFullscreen)
			{
				document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
				mainFunction.onFullScreen();
			}
		}
		else
		{
			if (document.exitFullscreen)
			{
				document.exitFullscreen();
				mainFunction.exitFullScreen();
			}
			else if(document.msExitFullscreen)
			{
				document.msExitFullscreen();
				mainFunction.exitFullScreen();
			}
			else if (document.mozCancelFullScreen)
			{
				document.mozCancelFullScreen();
				mainFunction.exitFullScreen();
			}
			else if (document.webkitExitFullscreen)
			{
				document.webkitExitFullscreen();
				mainFunction.exitFullScreen();
			}
		}
	},

	onFullScreen: function(){

		$(mainFunction.elements.progressOver).css("width", String( (mainFunction.progressBarHeight / $(mainFunction.elements.mediaVideo)[0].duration) * $(mainFunction.elements.mediaVideo)[0].currentTime ));
		$(mainFunction.elements.container).css("display", "block");
		$(mainFunction.elements.videoPlayerContainer).width("100%");
		$(mainFunction.elements.videoPlayerContainer).height("calc(100% - 40px)");
		$(mainFunction.elements.videoContainer).height("calc(100% - 40px)");
		$(mainFunction.elements.progress).width( $(mainFunction.elements.playerContainer).width() - 223 );
		$(mainFunction.elements.progressBackground).width( $(mainFunction.elements.playerContainer).width() - 223 - 40 );		
		$(mainFunction.elements.progressHidden).width( $(mainFunction.elements.playerContainer).width() - 223 - 40 );		
		mainFunction.progressBarHeight = $(mainFunction.elements.playerContainer).width() - 223 - 40;
		$(".container-inner").css("display", "none");

	},

	exitFullScreen: function(){
		
		$(mainFunction.elements.container).css("display", "-webkit-box");
		$(mainFunction.elements.container).css("display", "-moz-box");
		$(mainFunction.elements.container).css("display", "-ms-flexbox");
		$(mainFunction.elements.container).css("display", "-webkit-flex");
		$(mainFunction.elements.container).css("display", "flex");
		$(mainFunction.elements.videoPlayerContainer).width("1296");
		$(mainFunction.elements.videoPlayerContainer).height("700");
		$(mainFunction.elements.videoContainer).height("660");
		$(mainFunction.elements.progress).width( $(mainFunction.elements.playerContainer).width() - 223 );
		$(mainFunction.elements.progressBackground).width( $(mainFunction.elements.playerContainer).width() - 223 - 40 );		
		$(mainFunction.elements.progressHidden).width( $(mainFunction.elements.playerContainer).width() - 223 - 40 );		
		mainFunction.progressBarHeight = $(mainFunction.elements.playerContainer).width() - 223 - 40;
		$(mainFunction.elements.progressOver).css("width", String( (mainFunction.progressBarHeight / $(mainFunction.elements.mediaVideo)[0].duration) * $(mainFunction.elements.mediaVideo)[0].currentTime ));
		$(".container-inner").css("display", "inherit");

	},

	mouseHideControl: function(){

		var mouseHide = setTimeout(onMouseHide, 3000);

		$(mainFunction.elements.containerInner).on("mousemove", function(){

			clearTimeout( mouseHide );

			onMouseShow();

		});

		$(mainFunction.elements.containerInner).on("mousemoveend", function(){

			clearTimeout( mouseHide );

			mouseHide = setTimeout(onMouseHide, 3000);

		});

		function onMouseHide(){ $("body").css("cursor", "none"); }

		function onMouseShow(){ $("body").css("cursor", "inherit"); }

	},

	playControlVideo: function() {
		if(mainFunction.isPlay) { 
		    $(mainFunction.elements.mediaVideo)[0].play(); 
		} else { 
		    $(mainFunction.elements.mediaVideo)[0].pause(); 
		}
		$(mainFunction.elements.playButton).css("display", ( (mainFunction.isPlay) ? "none" : "table-cell" ) );
		$(mainFunction.elements.pauseButton).css("display", ( (!mainFunction.isPlay) ? "none" : "table-cell" ) );
		mainFunction.isPlay = !mainFunction.isPlay;
		mainFunction.isEnd = false;
	},

	volumeControlVideo: function(){
		$(mainFunction.elements.mediaVideo)[0].muted = !mainFunction.isVolume;
		$(mainFunction.elements.volumeButtonMute).css("display", ( (mainFunction.isVolume) ? "none" : "table-cell" ) );
		$(mainFunction.elements.volumeButton).css("display", ( (!mainFunction.isVolume) ? "none" : "table-cell" ) );
		mainFunction.isVolume = !mainFunction.isVolume;
	},

	progressControlVideo: function(){

		var mouseX 		= 0;
		var isDown 		= false;
		var currentMinute 	= 0;
		var currentSecond 	= 0;
		var mediaPlayer 	= $(mainFunction.elements.mediaVideo)[0];

		mediaPlayer.addEventListener("timeupdate", onProgressVideo, false);

		function onProgressVideo(){
			$(mainFunction.elements.progressOver).css("width", String( (mainFunction.progressBarHeight / mediaPlayer.duration) * mediaPlayer.currentTime ));
			videoEndControl();
			setIndicator(mediaPlayer.currentTime, mediaPlayer.duration);
		}

		function videoEndControl(){
			if(mediaPlayer.currentTime >= mediaPlayer.duration)
			{
				mainFunction.isPlay = false;
				mainFunction.playControlVideo();
				mainFunction.isEnd = true;
			}
		}
		
		function getTime(seconds) {
		    var minute = Math.floor(seconds / 60);
		    var hour = Math.floor(minute / 60);
		    var second = Math.floor(seconds % 60);
		    
		    var hourStr = (hour < 1) ? "" : hour + ":";
		    var secondStr = (second < 10)? "0" + second : second;
		    
		    minute = (minute > 59) ? minute % 60 : minute; // over 59 already converted to hours
		    minuteStr = (minute < 10) ? "0" + minute : minute;
		    return hourStr + minuteStr + ":" + secondStr;
		}

		function setIndicator(current, duration) {
		    var currentLabel = getTime(current);
		    var durationLabel = getTime(duration);
		    var indicatorLabel = currentLabel + " / " + durationLabel;
		    $(mainFunction.elements.indicator).text(indicatorLabel );
		}

		$(mainFunction.elements.progressHidden).on("mousemove", onProgressHiddenMouseMove);

		function onProgressHiddenMouseMove(e){
			var parentOffset = $(this).parent().offset(); 
			mouseX = Math.floor( e.pageX - parentOffset.left - 20 );
			if(isDown) { mediaPlayer.currentTime = (mediaPlayer.duration / mainFunction.progressBarHeight) * mouseX; }
		}

		$(mainFunction.elements.progressHidden).on("click", function() { 
		    if(!isDown) { 
			mediaPlayer.currentTime = (mediaPlayer.duration / mainFunction.progressBarHeight) * mouseX; 
		    } 
		});

		$(mainFunction.elements.progressHidden).on("mousedown", onProgressHiddenMouseDown);

		function onProgressHiddenMouseDown(){

			isDown = true;

			mediaPlayer.currentTime = (mediaPlayer.duration / mainFunction.progressBarHeight) * mouseX;

			$(mainFunction.elements.mediaVideo)[0].pause();
		}

		$(mainFunction.elements.progressHidden).on("mouseup", function() { 
		    isDown = false; 
		    if(!mainFunction.isEnd) {  
			mainFunction.isPlay = true; 
			mainFunction.playControlVideo(); 
		    }
		});

		/*$(mainFunction.elements.progressHidden).on("mouseout", function() { 
		    isDown = false; 
		    if(!mainFunction.isEnd) {  
			mainFunction.isPlay = true; 
			mainFunction.playControlVideo(); 
		    } 
		});*/

	}
};

$(document).on("ready", mainFunction.init);
(function ($) {
    var timeout;
    $(document).on('mousemove', function (event) {
        if (timeout !== undefined) {
            window.clearTimeout(timeout);
        }
        timeout = window.setTimeout(function () {
            $(event.target).trigger('mousemoveend');
        }, 100);
    });
}(jQuery));