package edu.ben.socialmedia.service;

import edu.ben.socialmedia.model.dto.PostDTO;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@Service
public class PostService {

    Integer currentId = 11;

    private final UserService userService;

    public PostService(UserService userService) {

        this.userService = userService;
    }

    public static Map<Integer, PostDTO> getAllPosts() {
        return realPostMap;
    }

    public PostDTO getPost(int id) {
        try {
            String text = realPostMap.get(id).getText();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This post does not exist");
        }
        return realPostMap.get(id);
    }

    public PostDTO createPost(PostDTO post) {
        post.setId(currentId);
        realPostMap.put(currentId, post);

        int userId = post.getPostedBy();
        userService.getRealUserMap().get(userId).getFeed().add(currentId);
        currentId += 1;
        return post;
    }

    public PostDTO updatePost(PostDTO post1) {
        realPostMap.get(post1.getId()).setText(post1.getText());
        return realPostMap.get(post1.getId());
    }

    public void deletePost(Integer postId) {
        for (Integer key2 : userService.getRealUserMap().keySet()) {
            if (userService.getRealUserMap().get(key2).getFeed().contains(postId)){
                userService.getRealUserMap().get(key2).getFeed().remove(postId);
            }
        }
    }

    private static Map<Integer, PostDTO> postMap = Map.of(
            1, PostDTO.of(1, "Where's my meat?", "11/3/2021, 1:01:01 PM", 1),
            2, PostDTO.of(2, "Where am I?", "11/3/2021, 2:02:02 PM", 2),
            3, PostDTO.of(3, "Where's my money?", "11/3/2021, 3:03:03 PM", 3),
            4, PostDTO.of(4, "Where's is the hideout?", "11/3/2021, 4:04:04 PM", 4),
            5, PostDTO.of(5, "Where are my ingredients?", "11/3/2021, 5:05:05 PM", 5),
            6, PostDTO.of(6, "Where is the medicine? ", "11/3/2021, 6:06:06 PM", 6),
            7, PostDTO.of(7, "Where is my book?", "11/3/2021, 7:07:07 PM", 7),
            8, PostDTO.of(8, "Where is my cola?", "11/3/2021, 8:08:08 PM", 8),
            9, PostDTO.of(9, "Where is my guitar?", "11/3/2021, 9:09:09 PM", 9),
            10, PostDTO.of(10, "Where is the water?", "11/3/2021, 10:10:10 PM", 10));

    private static Map<Integer, PostDTO> realPostMap = new HashMap<>(postMap);
}
