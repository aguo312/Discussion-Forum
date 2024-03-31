package com.DiscussionForum.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.DiscussionForum.model.Tag;

public interface TagRepository extends MongoRepository<Tag, String> {

}