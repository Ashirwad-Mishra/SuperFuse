package com.AshirwadLearns.journell.controllers;


import com.AshirwadLearns.journell.Entity.JournalEntry;
import com.AshirwadLearns.journell.service.JournalEntryService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/journal")
public class JournalEntryController
{

    @Autowired
    private JournalEntryService journalEntryService;

    @GetMapping
    public ArrayList<JournalEntry> getEntries()
    {
        return journalEntryService.getAll();
    }

    @PostMapping
    public String craeteEntry(@RequestBody JournalEntry journalEntry)
    {
        journalEntryService.saveEntry(journalEntry);
        return "Entry added";
    }

    @GetMapping("/id/{myId}")
    public JournalEntry getParticularEntry(@PathVariable ObjectId myId)
    {
        return journalEntryService.findById(myId).orElse(null);
    }

    @DeleteMapping("/id/{myId}")
    public String delParticularEntry(@PathVariable ObjectId myId)
    {
        journalEntryService.deleteById(myId);
        return "the id " + myId + " got deleted.";
    }

    @PutMapping("id/{myId}")
    public JournalEntry updateEntry(@PathVariable ObjectId myId, @RequestBody JournalEntry newEntry) {
        JournalEntry oldEntry = journalEntryService.findById(myId).orElse(null);

        if (oldEntry != null) {
            oldEntry.setTitle(
                    newEntry.getTitle() != null && !Objects.equals(newEntry.getTitle(), "")
                            ? newEntry.getTitle()
                            : oldEntry.getTitle()
            );
            oldEntry.setContent(
                    newEntry.getContent() != null && !Objects.equals(newEntry.getContent(), "")
                            ? newEntry.getContent()
                            : oldEntry.getContent()
            );
            journalEntryService.saveEntry(oldEntry);
        }

        return oldEntry; // will be null if not found
    }
}
