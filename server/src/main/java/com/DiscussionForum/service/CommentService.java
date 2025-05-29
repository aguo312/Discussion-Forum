package com.DiscussionForum.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DiscussionForum.model.Comment;
import com.DiscussionForum.model.User;
import com.DiscussionForum.repository.CommentRepository;

@Service
public class CommentService {

    @Autowired
    CommentRepository commentRepository;

    public Comment newComment(String text, User user) {
        return commentRepository.save(new Comment(text, text, user.getId()));
    }

    public Comment getCommentById(String cid) {
        return commentRepository.findById(cid).get();
    }
}
