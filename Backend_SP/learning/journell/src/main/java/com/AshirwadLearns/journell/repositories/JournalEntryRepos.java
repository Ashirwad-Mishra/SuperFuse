package com.AshirwadLearns.journell.repositories;

import com.AshirwadLearns.journell.Entity.JournalEntry;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface JournalEntryRepos extends MongoRepository<JournalEntry , ObjectId>
{

}
