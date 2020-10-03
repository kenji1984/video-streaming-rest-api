package com.streaming.videos.model;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class VideoImageMapper {
	private String videoPath;
	private Map<String, VideoFile> videoFiles;
	
	private VideoImageMapper() {};
	
	private static class VideoImageMapperInstance {
		// final so 2 cannot be created. This object is not immutable.
		private final static VideoImageMapper INSTANCE = new VideoImageMapper();
	}
	
	public static VideoImageMapper getInstance() {
		return VideoImageMapperInstance.INSTANCE;
	}
	
	public static void main(String[] args) {
		File[] file = new File("E:\\backup/videos").listFiles();
		System.out.println(file.length);
	}
	
	// inefficient but only I'll be using so who cares.
	public void initialize(String videoPath) {
		this.videoPath = videoPath;
		videoFiles = new HashMap<>();
		System.out.println(videoPath + "/videos");
		File[] videos = new File(videoPath + "/videos").listFiles();
		File[] images = new File(videoPath + "/images").listFiles();
		
		for (File video : videos) {
			String imgName = findMatchingImg(video.getName(), images);
			VideoFile videoFile = new VideoFile(video.getAbsolutePath());
			videoFile.setImageName(imgName);
			videoFiles.put(video.getName().toUpperCase(), videoFile);
		}
	}
	
	private String findMatchingImg(String videoName, File[] images) {
		String regex = "[^A-Za-z0-9]";
		videoName = videoName.replaceAll(regex, "").toUpperCase();
		
		for (File image : images) {
			String imgName = image.getName().substring(0, image.getName().length() - 4)
					.replaceAll(regex, "").toUpperCase();			
			
			if (videoName.contains(imgName)) {
				return image.getName();
			}
		}
		return "default.png";
	}
	
	public List<VideoFile> listVideos() {
		if (videoFiles == null) {
			initialize(videoPath);
		}
		return new ArrayList<>(videoFiles.values());
	}
	
	public VideoFile findVideo(String videoName) {
		if (videoFiles == null) {
			initialize(videoPath);
		}
		return videoFiles.get(videoName.toUpperCase());
	}
	
}