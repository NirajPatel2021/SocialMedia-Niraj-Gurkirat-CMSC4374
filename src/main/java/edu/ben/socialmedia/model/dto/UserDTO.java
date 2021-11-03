package edu.ben.socialmedia.model.dto;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Data
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class UserDTO {

    private int id;
    private String username;
    private String password;
    // list of user id's that are friends
    private List<Integer> friends = new ArrayList<>(
            Arrays.asList());
    // list of post id's, will include one's own posts
    private List<Integer> feed = new ArrayList<>(
            Arrays.asList());
    // list of user id's that are requests (Requests that you have received)
    private List<Integer> requests = new ArrayList<>(
            Arrays.asList());

    public static UserDTO of() {
        return new UserDTO();
    }

    public static UserDTO of(int id) {
        UserDTO result = of();
        result.setId(id);
        return result;
    }

    public static UserDTO of(int id, String username, String password) {
        UserDTO result = of(id);
        result.setUsername(username);
        result.setPassword(password);
        return result;
    }

    public static UserDTO of(int id, String username, String password, List<Integer> feed) {
        UserDTO result = of(id);
        result.setUsername(username);
        result.setPassword(password);
        result.setFeed(feed);
        return result;
    }

    public static UserDTO of(int id, String username, String password, List<Integer> friends, List<Integer> feed) {
        UserDTO result = of(id);
        result.setUsername(username);
        result.setPassword(password);
        result.setFriends(friends);
        result.setFeed(feed);
        return result;
    }

    public static UserDTO of(int id, String username, String password, List<Integer> friends, List<Integer> feed, List<Integer> requests) {
        UserDTO result = of(id);
        result.setUsername(username);
        result.setPassword(password);
        result.setFriends(friends);
        result.setFeed(feed);
        result.setRequests(requests);
        return result;
    }
}
