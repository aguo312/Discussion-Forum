package com.DiscussionForum.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DiscussionForum.repository.CommentRepository;

@Service
public class CommentService {

    @Autowired
    CommentRepository commentRepository;

}
