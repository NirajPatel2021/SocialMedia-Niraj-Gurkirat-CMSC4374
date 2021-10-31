package edu.ben.socialmedia.model;

import lombok.Data;

import java.util.List;

@Data
public class User {

    private int id;
    private String username;
    private String password;
    private List<Integer> friends; // list of user id's that are friends
    private List<Integer> feed; // list of post id's, will include one's own posts and friends posts


    public static User of(){
        return new User();
    }

    public static User of(int id){
        User result = of();
        result.setId(id);
        return result;
    }

    public static User of(int id, String username, String password){
        User result = of(id);
        result.setUsername(username);
        result.setPassword(password);
        return result;
    }
}
