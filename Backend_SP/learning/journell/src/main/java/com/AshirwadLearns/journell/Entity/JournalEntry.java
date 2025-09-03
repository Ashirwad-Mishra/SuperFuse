package com.AshirwadLearns.journell.Entity;


import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Collection;

@Document(collection = "journal_entries")
public class JournalEntry
{
    @Id
    private ObjectId id;


    private String title;
    private String content;
    private final LocalDateTime createdAt = LocalDateTime.now();
//    Getters
    public ObjectId getId()
    {
        return this.id;
    }

    public String getTitle()
    {
        return title;
    }

    public String getContent()
    {
        return content;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

//    Setters


    public void setId(ObjectId id)
    {
        this.id = id;
    }

    public void setTitle(String title)
    {
        this.title = title;
    }

    public void setContent(String content)
    {
        this.content = content;
    }

}
