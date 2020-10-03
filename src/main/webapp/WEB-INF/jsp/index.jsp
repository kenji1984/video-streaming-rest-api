<%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>Getting Started: Serving Web Content</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/application.css">
</head>
<body>
    <h1>Video Streaming Testing</h1>
    <br><br>
    <div class="container-fluid">
    	<c:forEach var="video" varStatus="status" items="${videos}" begin="0" step="1">
    		<c:if test="${status.index % 4 == 0}">
    			<div class="row">			
			</c:if>
    		<div class="col-sm-6 col-lg-4 col-xl-3">
    			<div class="video-icon-label">${video.name}</div>
    			<a href="videos/play/${video.name}"><img class="video-icon" src="videos/img/${video.imageName}"/></a>
    		</div>
    		<c:if test="${status.index % 4 == 3}">
    			</div>			
			</c:if>
		</c:forEach>
    </div>
</body>
</html>