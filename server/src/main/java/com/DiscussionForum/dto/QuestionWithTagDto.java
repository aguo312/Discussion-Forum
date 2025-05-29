package com.DiscussionForum.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.DiscussionForum.model.Question;
import com.DiscussionForum.model.Tag;

public class QuestionWithTagDto {

    private String id;
    private String title;
    private String summary;
    private String text;
    private List<Tag> tags;
    private List<String> answers;
    private List<String> comments;
    private LocalDateTime askDateTime;
    private int views;
    private String owner;
    private int votes;

    public QuestionWithTagDto(Question question, List<Tag> tags) {
        this.id = question.getId();
        this.title = question.getTitle();
        this.summary = question.getSummary();
        this.text = question.getText();
        this.tags = tags;
        this.answers = question.getAnswers();
        this.comments = question.getComments();
        this.askDateTime = question.getAskDateTime();
        this.views = question.getViews();
        this.owner = question.getOwner();
        this.votes = question.getVotes();
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getSummary() {
        return summary;
    }

    public String getText() {
        return text;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public List<String> getAnswers() {
        return answers;
    }

    public List<String> getComments() {
        return comments;
    }

    public LocalDateTime getAskDateTime() {
        return askDateTime;
    }

    public int getViews() {
        return views;
    }

    public String getOwner() {
        return owner;
    }

    public int getVotes() {
        return votes;
    }

}
