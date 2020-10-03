<!DOCTYPE HTML>
<html>
	<head>
		<title>Video Player</title>
		<meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
		<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
		<link rel="stylesheet" href="../../css/video.css">
		<link rel="stylesheet" href="../../css/application.css">

		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
		<script src="../../js/application.js"></script>
	</head>
	<body>
		<div class="container">
			
			<div class="video-player-container">
				<div class="video-container">
					<video id="media-video" poster="../../videos/img/${NOW_PLAYING.imageName}">
		            <source src="../../videos/${NOW_PLAYING.name}" type="video/mp4">
		         </video>
				</div>
				<div class="player-container">

					<div class="play-control">

						<div class="play-button"><i class="fa fa-play"></i></div>
						<div class="pause-button"><i class="fa fa-pause"></i></div>
					</div>
					<div class="volume-control">

						<div class="volume-button"><i class="fa fa-volume-up"></i></div>
						<div class="volume-button-mute"><i class="fa fa-volume-off"></i></div>
					</div>
					<div class="indicator">0:00 / 0:00</div>
					<div class="progress">

						<div class="progress-background"></div>
						<div class="progress-over"></div>
						<div class="progress-hidden"></div>
					</div>
					<div class="fullscreen-button"><i class="fa fa-arrows-alt"></i></div>
				</div>
			</div>
			<div class="container-inner">
				<div class="title-div">
					<h1>Now Playing: ${NOW_PLAYING.name}</h1>
				</div>
			</div>
			
		</div>

	</body>
</html>