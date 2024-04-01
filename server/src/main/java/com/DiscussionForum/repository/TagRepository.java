package com.DiscussionForum.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.DiscussionForum.model.Tag;

public interface TagRepository extends MongoRepository<Tag, String> {

    @Query("{ 'id': { '$in': ?0 } }")
    List<Tag> findByIds(String[] ids);

}