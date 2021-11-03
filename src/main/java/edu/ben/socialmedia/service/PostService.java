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
            1, PostDTO.of(1, "this is the first post", "01:01", 1),
            2, PostDTO.of(2, "this is the second post", "02:02", 2),
            3, PostDTO.of(3, "this is the third post", "03:03", 3),
            4, PostDTO.of(4, "this is the fourth post", "04:04", 4),
            5, PostDTO.of(5, "this is the fifth post", "05:05", 5),
            6, PostDTO.of(6, "this is the sixth post", "06:06", 6),
            7, PostDTO.of(7, "this is the seventh post", "07:07", 7),
            8, PostDTO.of(8, "this is the eighth post", "08:08", 8),
            9, PostDTO.of(9, "this is the ninth post", "09:09", 9),
            10, PostDTO.of(10, "this is the tenth post", "10:10", 10));


    private static Map<Integer, PostDTO> realPostMap = new HashMap<>(postMap);
}
