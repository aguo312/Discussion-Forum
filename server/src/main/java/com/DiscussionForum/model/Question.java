package com.DiscussionForum.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Questions")
public class Question {

    @Id
    private String id;
    private String title;
    private String summary;
    private String text;
    @DBRef
    private List<Tag> tags;
    @DBRef
    private List<Answer> answers;
    @DBRef
    private List<Comment> comments;
    private LocalDateTime askDateTime;
    private int views;
    @DBRef
    private User owner;

    public Question(String title, String summary, String text, List<Tag> tags, User owner) {
        this.title = title;
        this.summary = summary;
        this.text = text;
        this.tags = tags;
        this.answers = new ArrayList<>();
        this.comments = new ArrayList<>();
        this.askDateTime = LocalDateTime.now();
        this.views = 0;
        this.owner = owner;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    public List<Answer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<Answer> answers) {
        this.answers = answers;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public LocalDateTime getAskDateTime() {
        return askDateTime;
    }

    public void setAskDateTime(LocalDateTime askDateTime) {
        this.askDateTime = askDateTime;
    }

    public int getViews() {
        return views;
    }

    public void setViews(int views) {
        this.views = views;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

}
