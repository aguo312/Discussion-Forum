package com.DiscussionForum.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DiscussionForum.repository.AnswerRepository;

@Service
public class AnswerService {

    @Autowired
    AnswerRepository answerRepository;

}
