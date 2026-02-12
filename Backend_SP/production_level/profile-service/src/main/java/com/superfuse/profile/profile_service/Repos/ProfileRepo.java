package com.superfuse.profile.profile_service.Repos;

import com.superfuse.profile.profile_service.Entities.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepo extends JpaRepository<Profile , String>
{

}
