package edu.ben.socialmedia.service;

import edu.ben.socialmedia.model.dto.PostDTO;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@Service
public class PostService {

    Integer currentId = 3;

    public static Map<Integer, PostDTO> getAllPosts() {
        return realPostMap;
    }

    public PostDTO getPost(int id) {
        try {
            String text = realPostMap.get(id).getText();
        } catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This post does not exist");
        }
        return realPostMap.get(id);
    }

    public PostDTO createPost(PostDTO post) {
        post.setId(currentId);
        System.out.println("Current ID: " + currentId);
        realPostMap.put(currentId, post);
        currentId += 1;
        return post;
    }

    public PostDTO updatePost(PostDTO post1) {
        PostDTO post2 = realPostMap.get(post1.getId());
        post2.setText(post1.getText());
//        post2.setTime(post1.getTime());
//        can only update text
        return post2;
    }

    private static Map<Integer, PostDTO> postMap = Map.of(
            1,PostDTO.of(1,"first post","14:00",1),
            2,PostDTO.of(2,"segundo","14:01",2));

    private static Map<Integer, PostDTO> realPostMap = new HashMap<>(postMap);
}
