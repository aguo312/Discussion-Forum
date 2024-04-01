package com.DiscussionForum.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DiscussionForum.model.Question;
import com.DiscussionForum.model.Tag;
import com.DiscussionForum.model.User;
import com.DiscussionForum.repository.QuestionRepository;

@Service
public class QuestionService {

    @Autowired
    QuestionRepository questionRepository;

    public void newQuestion(String title, String summary, String text, List<Tag> tags, User user) {
        questionRepository.save(new Question(title, summary, text, tags, user));
    }

    public List<Question> getAll() {
        return questionRepository.findAll();
    }

}
