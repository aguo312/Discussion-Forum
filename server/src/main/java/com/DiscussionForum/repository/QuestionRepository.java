package com.DiscussionForum.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.DiscussionForum.model.Question;

public interface QuestionRepository extends MongoRepository<Question, String> {

}
