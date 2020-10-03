package com.streaming.videos.model;

import java.io.File;

public class VideoFile {
	
	private String name;
	private String ext;
	private long size;
	private String imageName;
	
	public VideoFile(String filePath) {
		File file = new File(filePath);
		setName(file.getName());
		setSize(file.length());
		setExt(name.substring(name.lastIndexOf(".")));		
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getExt() {
		return ext;
	}

	public void setExt(String ext) {
		this.ext = ext;
	}

	public long getSize() {
		return size;
	}

	public void setSize(long size) {
		this.size = size;
	}

	public String getImageName() {
		return imageName;
	}

	public void setImageName(String imageName) {
		this.imageName = imageName;
	}
	
	@Override
	public String toString() {
		return getName() + "\n" + getSize() + "\n" + "\n" + getImageName() + "\n";
	}
	
}