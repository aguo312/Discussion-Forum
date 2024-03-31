package com.DiscussionForum.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.DiscussionForum.model.Comment;

public interface CommentRepository extends MongoRepository<Comment, String> {

}
