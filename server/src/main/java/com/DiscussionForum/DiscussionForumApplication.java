package com.DiscussionForum;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class DiscussionForumApplication {

	public static void main(String[] args) {

		Dotenv dotenv = Dotenv.configure().directory("./server").filename(".env").load();
		System.setProperty("MONGO_URI", dotenv.get("MONGO_URI"));
		System.setProperty("JWT_SECRET", dotenv.get("JWT_SECRET"));
		SpringApplication.run(DiscussionForumApplication.class, args);
	}

}
