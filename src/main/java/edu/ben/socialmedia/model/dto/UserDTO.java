package edu.ben.socialmedia.model.dto;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class UserDTO {

    private int id;
    private String username;
    private String password;
    private List<Integer> friends; // list of user id's that are friends
    private List<Integer> feed; // list of post id's, will include one's own posts and friends posts

    public static UserDTO of(){
        return new UserDTO();
    }

    public static UserDTO of(int id){
        UserDTO result = of();
        result.setId(id);
        return result;
    }

    public static UserDTO of(int id, String username, String password){
        UserDTO result = of(id);
        result.setUsername(username);
        result.setPassword(password);
        return result;
    }


}
