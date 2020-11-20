package com.sprint.covidbod.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "class")
public class Class {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long classid;

    @NotNull
    private String name;

    @NotNull
    private String type;

    @NotNull
    private String starttime;

    @Transient
    @NotNull
    public boolean durationHasValue = false;
    private double duration;

    @NotNull
    private String intensity;

    @NotNull
    private String location;

    @Transient
    @NotNull
    public boolean currClassSizeHasValue = false;
    private int currclasssize;

    @NotNull
    @Transient
    public boolean maxClassSizeHasValue = false;
    private int maxclasssize;

    @ManyToOne
    @JoinColumn(name = "userid")
    @JsonIgnoreProperties(value = "classes")
    private User user;

    public Class() {
    }

    public Class(@NotNull String name,
                 @NotNull String type,
                 @NotNull String starttime,
                 @NotNull double duration,
                 @NotNull String intensity,
                 @NotNull String location,
                 @NotNull int currclasssize,
                 @NotNull int maxclasssize,
                 User user) {
        this.name = name;
        this.type = type;
        this.starttime = starttime;
        this.duration = duration;
        this.intensity = intensity;
        this.location = location;
        this.currclasssize = currclasssize;
        this.maxclasssize = maxclasssize;
        this.user = user;
    }

    public long getClassid() {
        return classid;
    }

    public void setClassid(long userid) {
        this.classid = classid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStarttime() {
        return starttime;
    }

    public void setStarttime(String starttime) {
        this.starttime = starttime;
    }

    public double getDuration() {
        return duration;
    }

    public void setDuration(double duration) {
        durationHasValue = true;
        this.duration = duration;
    }

    public String getIntensity() {
        return intensity;
    }

    public void setIntensity(String intensity) {
        this.intensity = intensity;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public int getCurrclasssize() {
        return currclasssize;
    }

    public void setCurrclasssize(int currclasssize) {
        currClassSizeHasValue = true;
        this.currclasssize = currclasssize;
    }

    public int getMaxclasssize() {
        return maxclasssize;
    }

    public void setMaxclasssize(int maxclasssize) {
        maxClassSizeHasValue = true;
        this.maxclasssize = maxclasssize;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
