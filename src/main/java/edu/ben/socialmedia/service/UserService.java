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

//    static ArrayList<Integer> friends1 = new ArrayList<>(
//            Arrays.asList(2, 4, 6, 8));
//    static ArrayList<Integer> friends2 = new ArrayList<>(
//            Arrays.asList(4, 6, 8, 10));
//    static ArrayList<Integer> friends3 = new ArrayList<>(
//            Arrays.asList(6, 8, 10, 2));
//    static ArrayList<Integer> friends4 = new ArrayList<>(
//            Arrays.asList(8, 10, 2, 4));
//    static ArrayList<Integer> friends5 = new ArrayList<>(
//            Arrays.asList(10, 2, 4, 6));

//    static ArrayList<Integer> requests1 = new ArrayList<>(
//            Arrays.asList(1, 3, 5, 7));
//    static ArrayList<Integer> requests2 = new ArrayList<>(
//            Arrays.asList(3, 5, 7, 9));
//    static ArrayList<Integer> requests3 = new ArrayList<>(
//            Arrays.asList(5, 7, 9, 1));
//    static ArrayList<Integer> requests4 = new ArrayList<>(
//            Arrays.asList(7, 9, 1, 3));
//    static ArrayList<Integer> requests5 = new ArrayList<>(
//            Arrays.asList(9, 1, 3, 5));

    static ArrayList<Integer> feed1 = new ArrayList<>(
            Arrays.asList(1));
    static ArrayList<Integer> feed2 = new ArrayList<>(
            Arrays.asList(2));
    static ArrayList<Integer> feed3 = new ArrayList<>(
            Arrays.asList(3));
    static ArrayList<Integer> feed4 = new ArrayList<>(
            Arrays.asList(4));
    static ArrayList<Integer> feed5 = new ArrayList<>(
            Arrays.asList(5));
    static ArrayList<Integer> feed6 = new ArrayList<>(
            Arrays.asList(6));
    static ArrayList<Integer> feed7 = new ArrayList<>(
            Arrays.asList(7));
    static ArrayList<Integer> feed8 = new ArrayList<>(
            Arrays.asList(8));
    static ArrayList<Integer> feed9 = new ArrayList<>(
            Arrays.asList(9));
    static ArrayList<Integer> feed10 = new ArrayList<>(
            Arrays.asList(10));


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

        String username1 = user.getUsername();
        for (int i = 1; i <= this.getRealUserMap().size(); i++) {
            String username2 = getRealUserMap().get(i).getUsername();
            if (username1.equals(username2)) {
                return null;
            }
        }

        user.setId(currentId);
        realUserMap.put(currentId, user);
        user.setId(currentId);
        currentId += 1;
        return user;
    }

    // Loops through hashmap to see if username and password match
    // if so return id
    // if not return null
    public UserDTO checkCredentials(UserDTO user1) {
        for (int i = 1; i <= realUserMap.size(); i++) {
            if (realUserMap.get(i).getUsername().equals(user1.getUsername())) {
                if (realUserMap.get(i).getPassword().equals(user1.getPassword())) {
                    return realUserMap.get(i);
                }
            }
        }
        return null;
    }

    public UserDTO sendFriendRequest(UserDTO user) {
        int id1 = Integer.parseInt(user.getUsername());
        int id2 = Integer.parseInt(user.getPassword());
        if (id1 != 0 && id2 != 0 && id1 != id2) {
            if (!realUserMap.get(id2).getRequests().contains(id1) &&
                    !realUserMap.get(id2).getFriends().contains(id1)) {
                realUserMap.get(id2).getRequests().add(id1);
            }
        }
        return null;
    }

    public UserDTO unFriend(UserDTO user) {
        int id1 = Integer.parseInt(user.getUsername());
        int id2 = Integer.parseInt(user.getPassword());
        if (realUserMap.get(id2).getFriends().contains(id1)) {
            realUserMap.get(id2).getFriends().remove(realUserMap.get(id2).getFriends().indexOf(id1));
        }
        if (realUserMap.get(id1).getFriends().contains(id2)) {
            realUserMap.get(id1).getFriends().remove(realUserMap.get(id1).getFriends().indexOf(id2));
        }
        return null;
    }

    public UserDTO acceptRequest(UserDTO user) {
        int id1 = Integer.parseInt(user.getUsername());
        int id2 = Integer.parseInt(user.getPassword());
        if (!realUserMap.get(id2).getFriends().contains(id1)) {
            if (id2 != 0 && id1 != 0 && id1 != id2) {
                realUserMap.get(id2).getFriends().add(id1);
            }
        }
        if (realUserMap.get(id2).getRequests().contains(id1)) {
            realUserMap.get(id2).getRequests().remove(realUserMap.get(id2).getRequests().indexOf(id1));
        }
        if (!realUserMap.get(id1).getFriends().contains(id2)) {
            if (id2 != 0 && id1 != 0 && id1 != id2) {
                realUserMap.get(id1).getFriends().add(id2);
            }
        }
        if (realUserMap.get(id1).getRequests().contains(id2)) {
            realUserMap.get(id1).getRequests().remove(realUserMap.get(id1).getRequests().indexOf(id2));
        }
        return null;
    }

    public UserDTO denyRequest(UserDTO user) {
        int id1 = Integer.parseInt(user.getUsername());
        int id2 = Integer.parseInt(user.getPassword());
        realUserMap.get(id1).getRequests().remove(realUserMap.get(id1).getRequests().indexOf(id2));
        return null;
    }

    private static Map<Integer, UserDTO> userMap = Map.of(

            1, UserDTO.of(1, "luffy", "captain", feed1),
            2, UserDTO.of(2, "zoro", "1stmate", feed2),
            3, UserDTO.of(3, "nami", "navigator", feed3),
            4, UserDTO.of(4, "usopp", "blacksmith", feed4),
            5, UserDTO.of(5, "sanji", "cook", feed5),
            6, UserDTO.of(6, "chopper", "doctor", feed6),
            7, UserDTO.of(7, "robin", "scholor", feed7),
            8, UserDTO.of(8, "franky", "shipwright", feed8),
            9, UserDTO.of(9, "brook", "musician", feed9),
            10, UserDTO.of(10, "jimbei", "helmsman", feed10)

    );

    private static Map<Integer, UserDTO> realUserMap = new HashMap<>(userMap);

    public Map<Integer, UserDTO> getRealUserMap() {
        return realUserMap;
    }

}
