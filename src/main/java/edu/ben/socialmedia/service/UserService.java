package edu.ben.socialmedia.service;

import edu.ben.socialmedia.model.dto.UserDTO;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

    int currentId = 3;

    public static Map<Integer, UserDTO> getAllUsers() {
        return realUserMap;
    }

    public UserDTO getUser(int id) {
        try {
            String username = realUserMap.get(id).getUsername();
        } catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This user does not exist");
        }
        return realUserMap.get(id);
    }

    public UserDTO createUser(UserDTO user) {
        realUserMap.put(currentId, user);
        currentId += 1;
        System.out.println("Current ID: " + currentId);
        return user;
    }

//    public UserDTO updateUser(UserDTO user1) {
//        UserDTO user2 = realUserMap.get(user1.getId());
//        user2.setUsername(user1.getUsername());
//        user2.setPassword(user1.getPassword());
//        return user2;
//    }

    private static Map<Integer, UserDTO> userMap = Map.of(
            1,UserDTO.of(1,"luke","kendall"),
            2,UserDTO.of(2,"tom","cat"));

    private static Map<Integer, UserDTO> realUserMap = new HashMap<>(userMap);
}
