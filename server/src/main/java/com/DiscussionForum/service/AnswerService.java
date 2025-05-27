package com.DiscussionForum.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DiscussionForum.model.Answer;
import com.DiscussionForum.model.Comment;
import com.DiscussionForum.model.User;
import com.DiscussionForum.repository.AnswerRepository;

@Service
public class AnswerService {

    @Autowired
    AnswerRepository answerRepository;

    public Answer newAnswer(String text, User user) {
        return answerRepository.save(new Answer(text, user.getUsername(), user));
    }

    public Answer getAnswerById(String aid) {
        return answerRepository.findById(aid).get();
    }

    public void updateAnswerCommentById(String aid, Comment com) {
        Answer ans = answerRepository.findById(aid).get();
        ans.getComments().add(com);
        answerRepository.save(ans);
    }
}
