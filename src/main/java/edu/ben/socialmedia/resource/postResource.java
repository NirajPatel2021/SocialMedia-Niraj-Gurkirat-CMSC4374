package edu.ben.socialmedia.resource;

import edu.ben.socialmedia.model.dto.PostDTO;
import edu.ben.socialmedia.service.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController()
@RequestMapping(value = "api/post", produces = "application/json")
public class postResource {

    private final PostService postService;

    public postResource(PostService postService) {
        this.postService = postService;
    }


    @GetMapping()
    public Map<Integer, PostDTO> getAllPosts() {
        return postService.getAllPosts();
    }


    @GetMapping(value= "/{id}")
    public PostDTO getPost(@PathVariable int id){

//        if(id==null){
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Id cannot be null");
//        }

        return postService.getPost(id);
    }

    @PostMapping(value = "/createPost", consumes = "application/json", produces = "application/json")
    public PostDTO createPost(@RequestBody PostDTO post){

        PostDTO post2 = this.postService.createPost(post);

        System.out.println(post2);

        return post2;
    }

    @PutMapping(value = "/updatePost", consumes = "application/json", produces = "application/json")
    public PostDTO updateUser(@RequestBody PostDTO post){

        return this.postService.updatePost(post);
    }


    @DeleteMapping(value = "/deletePost/{id}")
    public void deletePost(@PathVariable int id){

        this.postService.deletePost(id);
    }

}
