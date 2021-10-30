package edu.ben.socialmedia.resource;

import edu.ben.socialmedia.model.dto.UserDTO;
import edu.ben.socialmedia.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController()
@RequestMapping(value = "api/user", produces = "application/json")
public class userResource {

    private final UserService userService;

    public userResource(UserService userService) {
        this.userService = userService;
    }


    @GetMapping()
    public Map<Integer, UserDTO> getAllUsers() {
        return userService.getAllUsers();
    }


    @GetMapping(value= "/{id}")
    public UserDTO getUser(@PathVariable int id){

//        if(id==null){
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Id cannot be null");
//        }

        return userService.getUser(id);
    }

    @PostMapping(value = "/createUser", consumes = "application/json", produces = "application/json")
    public UserDTO createUser(@RequestBody UserDTO user){

        return this.userService.createUser(user);
    }

//    @PutMapping(value = "/updateUser", consumes = "application/json", produces = "application/json")
//    public UserDTO updateUser(@RequestBody UserDTO user){
//
//        return this.userService.updateUser(user);
//    }

}
