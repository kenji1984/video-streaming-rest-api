package com.streaming.videos.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.FileUrlResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.ResourceRegion;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.MediaTypeFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import com.streaming.videos.Constant;

@Controller
public class VideoController {
	
	@Value("${video.path}")
	private String videoPath;
	
	@GetMapping("/videos/img/{name}")
	public ResponseEntity<Resource> image(@PathVariable("name") String name) {
		FileSystemResource res = new FileSystemResource(videoPath + "/images/" + name);
		return ResponseEntity.status(HttpStatus.OK).body(res);
	}
	
	@GetMapping("/videos/{name}")
	public ResponseEntity<ResourceRegion> getVideo(@PathVariable("name") String name, 
			@RequestHeader(value = "Range", defaultValue = "") String ranges, 
			@RequestHeader(value = "User-Agent") String userAgent) {

		String path = videoPath + "/videos";
		
		try {
			FileUrlResource resource = new FileUrlResource(path + "/" + name);
			long start = 0;
			long chunk = resource.contentLength();
			
			if (!ranges.isBlank()) {
				String[] rangeArray = ranges.replace("bytes=", "").split("-");
				start = Long.parseLong(rangeArray[0]);
				chunk = 1024 * 1024;
			}
			
			if (noByteRangeBrowser(userAgent)) {
				if (ranges.isBlank() || ranges.contains("bytes=0-")) {
					System.out.println("PS4 or WII U: Sending all contents. Range request: " + ranges);
					chunk = resource.contentLength();
				} else {
					chunk *= 5;
				}
			}
			
			ResourceRegion region = new ResourceRegion(resource, start, chunk);
			return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT)
					.contentType(MediaTypeFactory.getMediaType(resource)
							.orElse(MediaType.APPLICATION_OCTET_STREAM))
					.body(region);
					
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	private boolean noByteRangeBrowser(String userAgent) {
		userAgent = userAgent.toUpperCase();
		return userAgent.contains(Constant.NINTENDO) || userAgent.contains(Constant.PLAYSTATION);
	}
	
}