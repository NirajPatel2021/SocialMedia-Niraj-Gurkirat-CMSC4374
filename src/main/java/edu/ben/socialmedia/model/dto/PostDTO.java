package edu.ben.socialmedia.model.dto;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class PostDTO {

    private int id;
    private String text;
    private String time;
    private int postedBy; // user id

    public static PostDTO of(){
        return new PostDTO();
    }

    public static PostDTO of(int id){
        PostDTO result = of();
        result.setId(id);
        return result;
    }

    public static PostDTO of(int id, String text, String time, int postedBy){
        PostDTO result = of(id);
        result.setText(text);
        result.setTime(time);
        result.setPostedBy(postedBy);
        return result;
    }
}
