package com.DiscussionForum.service;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DiscussionForum.dto.QuestionWithTagDto;
import com.DiscussionForum.model.Answer;
import com.DiscussionForum.model.Comment;
import com.DiscussionForum.model.Question;
import com.DiscussionForum.model.Tag;
import com.DiscussionForum.repository.QuestionRepository;
import com.DiscussionForum.repository.TagRepository;

@Service
public class QuestionService {

    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    TagRepository tagRepository;

    public void newQuestion(String title, String summary, String text, List<String> tags, String uid) {
        questionRepository.save(new Question(title, summary, text, tags, uid));
    }

    public List<QuestionWithTagDto> getAllWithTags() {
        List<Question> questions = questionRepository.findAll();
        Set<String> tagsId = questions.stream().flatMap((ques) -> ques.getTags().stream()).collect(Collectors.toSet());
        Map<String, Tag> tagMap = tagRepository.findAllById(tagsId).stream()
                .collect(Collectors.toMap(tag -> tag.getId(), tag -> tag));
        return questions.stream().map((ques) -> {
            List<Tag> tags = ques.getTags().stream().map((id) -> tagMap.get(id)).toList();
            return new QuestionWithTagDto(ques, tags);
        }).toList();
    }

    public QuestionWithTagDto getQuestionWithTagsById(String qid) {
        Question question = questionRepository.findById(qid).get();
        List<Tag> tags = tagRepository.findAllById(question.getTags());
        return new QuestionWithTagDto(question, tags);
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
