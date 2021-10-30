package edu.ben.socialmedia.model;

import lombok.Data;

import java.util.List;

@Data
public class Post {

    private Long id;
    private String text;
    private String time;
    private Long postedBy; // user id

    // can add later
//  private List<Long> likedBy; // user id’s
//  private List<Long> dislikedBy;  //  user id’s

    public static Post of(){
        return new Post();
    }

    public static Post of(Long id){
        Post result = of();
        result.setId(id);
        return result;
    }

    public static Post of(Long id, String text, String time, Long postedBy){
        Post result = of(id);
        result.setText(text);
        result.setTime(time);
        result.setPostedBy(postedBy);
        return result;
    }


}
