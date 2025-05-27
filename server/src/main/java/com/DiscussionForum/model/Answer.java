package com.DiscussionForum.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Answers")
public class Answer {

    @Id
    private String id;
    private String text;
    @DBRef
    private List<Comment> comments;
    private String ansBy;
    private LocalDateTime ansDateTime;
    @DBRef
    private User owner;

    public Answer(String text, String ansBy, User owner) {
        this.text = text;
        this.comments = new ArrayList<>();
        this.ansBy = ansBy;
        this.ansDateTime = LocalDateTime.now();
        this.owner = owner;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public String getAnsBy() {
        return ansBy;
    }

    public void setAnsBy(String ansBy) {
        this.ansBy = ansBy;
    }

    public LocalDateTime getAnsDateTime() {
        return ansDateTime;
    }

    public void setAnsDateTime(LocalDateTime ansDateTime) {
        this.ansDateTime = ansDateTime;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }
}
