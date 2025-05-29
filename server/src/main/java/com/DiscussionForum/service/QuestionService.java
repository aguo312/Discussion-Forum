package com.DiscussionForum.service;

// import java.util.ArrayList;
// import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DiscussionForum.model.Answer;
import com.DiscussionForum.model.Comment;
import com.DiscussionForum.model.Question;
import com.DiscussionForum.model.User;
import com.DiscussionForum.repository.QuestionRepository;

@Service
public class QuestionService {

    @Autowired
    QuestionRepository questionRepository;

    public void newQuestion(String title, String summary, String text, List<String> tags, User user) {
        questionRepository.save(new Question(title, summary, text, tags, user.getId()));
    }

    public List<Question> getAll() {
        return questionRepository.findAll();
    }

    public Question getQuestionById(String qid) {
        return questionRepository.findById(qid).get();
    }

    public void updateQuestionAnswerById(String qid, Answer ans) {
        Question ques = questionRepository.findById(qid).get();
        ques.getAnswers().add(ans.getId());
        questionRepository.save(ques);
    }

    public void updateQuestionCommentById(String qid, Comment com) {
        Question ques = questionRepository.findById(qid).get();
        ques.getComments().add(com.getId());
        questionRepository.save(ques);
    }

}
