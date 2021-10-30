package edu.ben.socialmedia.model.dto;

import edu.ben.socialmedia.model.Post;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class PostDTO {

    private Long id;
    private String text;
    private String time;
    private Long postedBy; // user id

    // can add later
//  private List<int> likedBy; // user id’s
//  private List<int> dislikedBy;  //  user id’s

    public static PostDTO of(){
        return new PostDTO();
    }

    public static PostDTO of(Long id){
        PostDTO result = of();
        result.setId(id);
        return result;
    }

    public static PostDTO of(Long id, String text, String time, Long postedBy){
        PostDTO result = of(id);
        result.setText(text);
        result.setTime(time);
        result.setPostedBy(postedBy);
        return result;
    }

}
