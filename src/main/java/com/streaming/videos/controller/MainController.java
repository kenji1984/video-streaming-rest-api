package com.streaming.videos.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.streaming.videos.model.VideoFile;
import com.streaming.videos.model.VideoImageMapper;

@Controller
public class MainController {
	private static int ITEMS_PER_PAGE = 20;
	private VideoImageMapper mapper = VideoImageMapper.getInstance();
	
	@Value("${video.path}")
	private String videoPath;
	
	@GetMapping({"/", "/home"}) 
	public String home(Model model) {
		mapper.initialize(videoPath);
		return list(model, 1, null);
	}
	
	@GetMapping("/search")
	public String search(Model model, @RequestParam("searchText") String searchText) {
		return list(model, 1, searchText);
	}
	
	@GetMapping("/list")
	public String list(Model model, @RequestParam(value = "page", required = false) Integer pageNum,
			@RequestParam(value = "searchText", required = false) String searchText) {
		List<VideoFile> videos = mapper.listVideos(videoPath).stream()
				.filter(videoFile -> searchText == null || videoFile.getName().toUpperCase().contains(searchText.toUpperCase()))
				.collect(Collectors.toList());
		videos.sort((a, b) -> a.getName().compareTo(b.getName()));
		
		int maxPage = (int) Math.ceil(videos.size() * 1.0 / ITEMS_PER_PAGE);
		maxPage = Math.max(1, maxPage);
		pageNum = pageNum == null ? 1 : Math.min(pageNum, maxPage);
		
		model.addAttribute("startPage", getStartPage(pageNum, maxPage));
		model.addAttribute("currentPage", pageNum);
		model.addAttribute("endPage", getEndPage(pageNum, maxPage));
		if (!videos.isEmpty()) {
			model.addAttribute("videos", videos.subList((pageNum-1) * ITEMS_PER_PAGE, Math.min(videos.size(), pageNum * ITEMS_PER_PAGE)));
		}
		model.addAttribute("searchText", searchText);
		
		return "index";
	}
	
	private int getStartPage(int currentPage, int maxPage) {
		if (currentPage <= 2) {
			return 1;
		}
		if (currentPage > maxPage) {
			return maxPage - 2;
		}
		return currentPage - 2;
	}
	
	private int getEndPage(int currentPage, int maxPage) {
		if (currentPage <= 2) {
			return Math.min(5, maxPage);
		}
		if (currentPage >= maxPage - 2) {
			return maxPage;
		}
		return currentPage + 2;
	}
	
	@GetMapping("/videos/play/{name}")
	public String play(Model model, @PathVariable("name") String name) {
		VideoImageMapper mapper = VideoImageMapper.getInstance();
		model.addAttribute("NOW_PLAYING", mapper.findVideo(videoPath, name));
		return "play";
	}
	
}