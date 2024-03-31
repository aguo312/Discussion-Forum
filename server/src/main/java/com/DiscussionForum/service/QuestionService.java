package com.DiscussionForum.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DiscussionForum.repository.QuestionRepository;

@Service
public class QuestionService {

    @Autowired
    QuestionRepository questionRepository;

}
