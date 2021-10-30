package edu.ben.socialmedia.service;

import edu.ben.socialmedia.model.dto.UserDTO;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

    public UserDTO getUser(long id) {
        try {
            String username = realUserMap.get(id).getUsername();
        } catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This user does not exist");
        }
        return realUserMap.get(id);
    }

    public UserDTO createUser(UserDTO user) {
        realUserMap.put(user.getId(), user);
        return user;
    }

    public UserDTO updateUser(UserDTO user) {
        UserDTO uzer = realUserMap.get(user.getId());
        uzer.setUsername(user.getUsername());
        uzer.setPassword(user.getPassword());
        return uzer;
    }

    private static Map<Long, UserDTO> userMap = Map.of(
            1L,UserDTO.of(1L,"luke","kendall"),
            2L,UserDTO.of(2L,"tom","cat"));

    private static Map<Long, UserDTO> realUserMap = new HashMap<>(userMap);
}
