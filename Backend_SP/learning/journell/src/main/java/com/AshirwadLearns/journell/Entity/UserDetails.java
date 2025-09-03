package com.AshirwadLearns.journell.Entity;

public class UserDetails
{
    private String phone;
    private String name;
    private String userName;
    private String email;
    private String password;


    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getUserName() {
        return userName;
    }

    public String getPhone() {
        return phone;
    }
}
