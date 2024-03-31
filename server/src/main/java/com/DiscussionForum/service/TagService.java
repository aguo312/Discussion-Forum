package com.DiscussionForum.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DiscussionForum.model.Tag;
import com.DiscussionForum.model.User;
import com.DiscussionForum.repository.TagRepository;

@Service
public class TagService {

    @Autowired
    TagRepository tagRepository;

    public List<Tag> getTagNames() {
        return tagRepository.findAll();
    }

    public void newTags(User user, String[] newTags) {
        for (String s : newTags) {
            tagRepository.save(new Tag(s, user));
        }
    }
}
