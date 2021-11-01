package edu.ben.socialmedia.service;

import edu.ben.socialmedia.model.dto.UserDTO;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

    int currentId = 11;

    static ArrayList<Integer> friends1 = new ArrayList<>(
            Arrays.asList(2, 3, 4, 5));
    static ArrayList<Integer> friends2 = new ArrayList<>(
            Arrays.asList(3, 4, 5, 6));
    static ArrayList<Integer> friends3 = new ArrayList<>(
            Arrays.asList(4, 5, 6, 7));
    static ArrayList<Integer> friends4 = new ArrayList<>(
            Arrays.asList(5, 6, 7, 8));
    static ArrayList<Integer> friends5 = new ArrayList<>(
            Arrays.asList(6, 7, 8, 9));


    public static Map<Integer, UserDTO> getAllUsers() {
        return realUserMap;
    }

    public UserDTO getUser(int id) {
        try {
            String username = realUserMap.get(id).getUsername();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This user does not exist");
        }
        return realUserMap.get(id);
    }

    public UserDTO createUser(UserDTO user) {
        user.setId(currentId);
        realUserMap.put(currentId, user);
        user.setId(currentId);
        currentId += 1;
        System.out.println("Current ID: " + currentId);
        return user;
    }

    // Loops through hashmap to see if username and password match
    // if so return id
    // if not return null
    public UserDTO checkCredentials(UserDTO user1) {
        UserDTO userdto;
        System.out.println(realUserMap.size());
        for (int i = 1; i <= realUserMap.size(); i++) {
            System.out.println(i + "IIIIII");
            System.out.println(user1.toString() + "user 1");
            if (realUserMap.get(i).getUsername().equals(user1.getUsername())) {
                if (realUserMap.get(i).getPassword().equals(user1.getPassword())) {
                    System.out.println("YES");

                    return realUserMap.get(i);
                }
            }
        }

        return null;
    }

//    public UserDTO updateUser(UserDTO user1) {
//        UserDTO user2 = realUserMap.get(user1.getId());
//        user2.setUsername(user1.getUsername());
//        user2.setPassword(user1.getPassword());
//        return user2;
//    }

    private static Map<Integer, UserDTO> userMap = Map.of(

            1, UserDTO.of(1, "luffy", "captain", friends1, friends1),
            2, UserDTO.of(2, "zoro", "1stmate", friends2, friends2),
            3, UserDTO.of(3, "nami", "navigator", friends3, friends3),
            4, UserDTO.of(4, "usopp", "blacksmith", friends4, friends4),
            5, UserDTO.of(5, "sanji", "cook", friends5, friends5),
            6, UserDTO.of(6, "chopper", "doctor"),
            7, UserDTO.of(7, "robin", "scholor"),
            8, UserDTO.of(8, "franky", "shipwright"),
            9, UserDTO.of(9, "brook", "musician"),
            10, UserDTO.of(10, "jimbei", "helmsman")

    );


    private static Map<Integer, UserDTO> realUserMap = new HashMap<>(userMap);
}
