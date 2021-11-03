package edu.ben.socialmedia.model;

import lombok.Data;

@Data
public class Post {

    private int id;
    private String text;
    private String time;
    private Long postedBy; // user id

    public static Post of(){
        return new Post();
    }

    public static Post of(int id){
        Post result = of();
        result.setId(id);
        return result;
    }

    public static Post of(int id, String text, String time, Long postedBy){
        Post result = of(id);
        result.setText(text);
        result.setTime(time);
        result.setPostedBy(postedBy);
        return result;
    }
}
