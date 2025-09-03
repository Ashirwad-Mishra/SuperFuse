package com.AshirwadLearns.journell.service;

import com.AshirwadLearns.journell.Entity.JournalEntry;
import com.AshirwadLearns.journell.repositories.JournalEntryRepos;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class JournalEntryService
{
    @Autowired
    JournalEntryRepos journalEntryRepos;

    public void saveEntry(JournalEntry journalEntry)
    {
        journalEntryRepos.save(journalEntry);
    }

    public ArrayList<JournalEntry> getAll() {
        return new ArrayList<>(journalEntryRepos.findAll());
    }

    public Optional<JournalEntry> findById(ObjectId myId)
    {
        return journalEntryRepos.findById(myId);
    }

    public void deleteById(ObjectId myId)
    {
        journalEntryRepos.deleteById(myId);
    }
}
