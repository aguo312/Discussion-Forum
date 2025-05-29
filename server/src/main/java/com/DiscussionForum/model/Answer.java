package com.DiscussionForum.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Answers")
public class Answer {

    @Id
    private String id;
    private String text;
    private List<String> comments;
    private String ansBy;
    private LocalDateTime ansDateTime;
    private String owner;

    public Answer(String text, String ansBy, String owner) {
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

    public List<String> getComments() {
        return comments;
    }

    public void setComments(List<String> comments) {
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

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }
}
