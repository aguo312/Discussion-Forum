package com.DiscussionForum.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.DiscussionForum.model.Answer;

public interface AnswerRepository extends MongoRepository<Answer, String> {

}
