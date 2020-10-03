package com.streaming.videos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.streaming.videos.model.VideoFile;
import com.streaming.videos.model.VideoImageMapper;

@Controller
public class MainController {
	@Value("${video.path}")
	private String videoPath;
	
	@GetMapping({"/", "/home"}) 
	public String home(Model model) {
		VideoImageMapper mapper = VideoImageMapper.getInstance();
		System.out.println(videoPath);
		mapper.initialize(videoPath);
		List<VideoFile> videos = mapper.listVideos();
		videos.sort((a, b) -> a.getName().compareTo(b.getName()));
		model.addAttribute("videos", videos);
		return "index";
	}
	
	@GetMapping("/videos/play/{name}")
	public String play(Model model, @PathVariable("name") String name) {
		VideoImageMapper mapper = VideoImageMapper.getInstance();
		model.addAttribute("NOW_PLAYING", mapper.findVideo(name));
		return "play";
	}
	
}