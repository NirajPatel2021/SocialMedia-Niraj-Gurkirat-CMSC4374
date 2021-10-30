package edu.ben.socialmedia.model.dto;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class UserDTO {

    private Long id;
    private String username;
    private String password;
    private List<Integer> friends;

    public static UserDTO of(){
        return new UserDTO();
    }

    public static UserDTO of(Long id){
        UserDTO result = of();
        result.setId(id);
        return result;
    }

    public static UserDTO of(Long id, String username, String password){
        UserDTO result = of(id);
        result.setUsername(username);
        result.setPassword(password);
        return result;
    }


}
