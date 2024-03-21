package com.DiscussionForum.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.DiscussionForum.model.User;

public interface UserRepository extends MongoRepository<User, ObjectId> {

    User findByEmail(String email);

}