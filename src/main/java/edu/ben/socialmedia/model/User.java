package edu.ben.socialmedia.model;

import lombok.Data;

import java.util.List;

@Data
public class User {

    private Long id;
    private String username;
    private String password;
    private List<Integer> friends;

    public static User of(){
        return new User();
    }

    public static User of(Long id){
        User result = of();
        result.setId(id);
        return result;
    }

    public static User of(Long id, String username, String password){
        User result = of(id);
        result.setUsername(username);
        result.setPassword(password);
        return result;
    }
}
