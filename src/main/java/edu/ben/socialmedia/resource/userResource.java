package edu.ben.socialmedia.resource;

import edu.ben.socialmedia.model.User;
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


    @GetMapping(value = "/{id}")
    public UserDTO getUser(@PathVariable int id) {

//        if(id==null){
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Id cannot be null");
//        }

        return userService.getUser(id);
    }

    @PostMapping(value = "/createUser", consumes = "application/json", produces = "application/json")
    public UserDTO createUser(@RequestBody UserDTO user) {

        return this.userService.createUser(user);
    }

    @PostMapping(value = "/checkCredentials", consumes = "application/json", produces = "application/json")
    public UserDTO checkCredentials(@RequestBody UserDTO user) {

        if (this.userService.checkCredentials(user) == null) {
            return UserDTO.of(0, "null", "null");
        }
        return this.userService.checkCredentials(user);
    }

//    @PostMapping(value = "/sendFriendRequest", consumes = "application/json", produces = "application/json")
//    public UserDTO sendFriendRequest(@RequestBody UserDTO user) {
////        System.out.println("USERNAME: " + user.getUsername());
////        System.out.println("PASSWORD: " + user.getPassword());
//        if (this.userService.checkCredentials(user) == null) {
//            return UserDTO.of(0, "null", "null");
//        }
//        return this.userService.checkCredentials(user);
//    }


    @PostMapping(value = "/sendFriendRequest", consumes = "application/json", produces = "application/json")
    public void sendFriendRequest(@RequestBody UserDTO user) {
        this.userService.sendFriendRequest(user);
    }

    @PostMapping(value = "/unFriend", consumes = "application/json", produces = "application/json")
    public void unFriend(@RequestBody UserDTO user) {
        this.userService.unFriend(user);
    }

    @PostMapping(value = "/acceptRequest", consumes = "application/json", produces = "application/json")
    public void acceptRequest(@RequestBody UserDTO user) {
        this.userService.acceptRequest(user);
    }

    @PostMapping(value = "/denyRequest", consumes = "application/json", produces = "application/json")
    public void denyRequest(@RequestBody UserDTO user) {
        this.userService.denyRequest(user);
    }


//    @PutMapping(value = "/updateUser", consumes = "application/json", produces = "application/json")
//    public UserDTO updateUser(@RequestBody UserDTO user){
//
//        return this.userService.updateUser(user);
//    }

}
