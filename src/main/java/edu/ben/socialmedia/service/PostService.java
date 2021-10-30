package edu.ben.socialmedia.service;

import edu.ben.socialmedia.model.dto.PostDTO;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@Service
public class PostService {

    int currentId = 3;

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
        realPostMap.put(currentId, post);
        currentId += 1;
        System.out.println("Current ID: " + currentId);
        return post;
    }

//    public PostDTO updateUser(PostDTO user1) {
//        PostDTO user2 = realUserMap.get(user1.getId());
//        user2.setUsername(user1.getUsername());
//        user2.setPassword(user1.getPassword());
//        return user2;
//    }

    private static Map<Integer, PostDTO> postMap = Map.of(
            1,PostDTO.of(1L,"first post","14:00",1L),
            2,PostDTO.of(2L,"segundo","14:01",2L));

    private static Map<Integer, PostDTO> realPostMap = new HashMap<>(postMap);
}
