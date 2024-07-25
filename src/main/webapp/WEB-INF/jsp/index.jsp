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
    <div class="container-fluid">
    	<form class="w-100 pt-5 pb-3 text-center" method="get" action="search">
		    <input id="searchText" name="searchText" type="text" value="${searchText}"/>
			<input type="submit" value="Search"/>
    	</form>
    	<c:set var="searchTextParam" value="${searchText == null || searchText.isEmpty() ? '' : '&searchText='}${searchText }"/>
    	
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
		
		<nav aria-label="Page navigation example" class="w-100">
		  <ul class="pagination justify-content-center">
			<c:if test="${currentPage == startPage}">
			  <li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>
	  		</c:if>
	  		<c:if test="${currentPage > startPage}">
			  <li class="page-item">
			  	<a class="page-link" href="list?page=${currentPage-1}${searchTextParam}">Previous</a>
		  	  </li>
	  		</c:if>
		    
		  	<c:forEach begin="${startPage}" end="${endPage}" var="page">
		  		<c:if test="${page == currentPage}">
			  		<li class="page-item active">
			  			<a class="page-link" href="list?page=${page}${searchTextParam}">${page}</a>
			  		</li>
		  		</c:if>
		  		<c:if test="${page != currentPage}">
			  		<li class="page-item">
			  			<a class="page-link" href="list?page=${page}${searchTextParam}">${page}</a>
			  		</li>
		  		</c:if>
	  		</c:forEach>
	  		
		  	
			<c:if test="${currentPage == endPage}">
			  <li class="page-item disabled"><a class="page-link" href="#">Next</a></li>
	  		</c:if>
	  		<c:if test="${currentPage < endPage}">
			  <li class="page-item">
			  	<a class="page-link" href="list?page=${currentPage+1}${searchTextParam}">Next</a>
			  </li>
	  		</c:if>
		  </ul>
		</nav>
    </div>
</body>
</html>