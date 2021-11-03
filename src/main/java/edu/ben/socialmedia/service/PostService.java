package edu.ben.socialmedia.service;

import edu.ben.socialmedia.model.dto.PostDTO;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@Service
public class PostService {

    private final UserService userService;

    public PostService(UserService userService) {

        this.userService = userService;
    }

    Integer currentId = 11;

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
        System.out.println("Current ID: " + currentId);
        realPostMap.put(currentId, post);

        int userId = post.getPostedBy();
        userService.getRealUserMap().get(userId).getFeed().add(currentId);
        currentId += 1;
        return post;
    }

    public PostDTO updatePost(PostDTO post1) {
//        PostDTO post2 = realPostMap.get(post1.getId());
//        post2.setText(post1.getText());
//        post2.setTime(post1.getTime());
//        can only update text

        realPostMap.get(post1.getId()).setText(post1.getText());
        System.out.println(realPostMap.get(post1.getId()));
        return realPostMap.get(post1.getId());
    }

    public void deletePost(Integer postId) {

       // try {

//        realPostMap.remove(postId);
        for (Integer key2 : userService.getRealUserMap().keySet()) {
            if (userService.getRealUserMap().get(key2).getFeed().contains(postId)){
                userService.getRealUserMap().get(key2).getFeed().remove(postId);
            }
        }

//            for(Integer key : realPostMap.keySet()){
//                realPostMap.get(key);
//                if (realPostMap.get(key).getId() == postId){
//
//                    // Remove post from everyone's feed
//                    for (Integer key2 : userService.getRealUserMap().keySet()){
//                        List<Integer> userfeed = userService.getRealUserMap().get(key2).getFeed();
//
//                        //loop through feed and remove postId
//                        for(int i = 0; i < userfeed.size(); i++){
//                            if (userfeed.get(i) == postId){
//                                userfeed.remove(i);
//                            }
//                        }
//
//                        //set users feed equal to new feed
//                        userService.getRealUserMap().get(key2).setFeed(userfeed);
//
//                    }
//
//                    realPostMap.remove(key);
//                    break;
//                }
//              }
//        } catch (Exception e) {
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This post does not exist");
//        }
    }

    private static Map<Integer, PostDTO> postMap = Map.of(
            1, PostDTO.of(1, "Where's my meat?", "01:01", 1),
            2, PostDTO.of(2, "Where am I going?", "02:02", 2),
            3, PostDTO.of(3, "Where's my money?", "03:03", 3),
            4, PostDTO.of(4, "Where's is the hideout?", "04:04", 4),
            5, PostDTO.of(5, "Where are my ingredients?", "05:05", 5),
            6, PostDTO.of(6, "Where is the medicine? ", "06:06", 6),
            7, PostDTO.of(7, "Where is my book?", "07:07", 7),
            8, PostDTO.of(8, "Where is my cola?", "08:08", 8),
            9, PostDTO.of(9, "Where is my guitar?", "09:09", 9),
            10, PostDTO.of(10, "Where is the water?", "10:10", 10));


    private static Map<Integer, PostDTO> realPostMap = new HashMap<>(postMap);
}
