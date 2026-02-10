package super_fuse.production.preferences.Repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import super_fuse.production.preferences.Entities.Preference;

import java.util.Optional;

public interface PreferenceRepos extends JpaRepository<Preference , String>
{
    @Override
    Optional<Preference> findById(String s);

    @Modifying
    @Query("UPDATE Preference p SET p.theme = :theme WHERE p.userId = : userId")
    int updateThemeByUserId(@Param("userId") String userId,
                            @Param("theme") String theme);

    @Modifying
    @Query("""
       UPDATE Preference p 
       SET p.notificationEnabled = :notificationsEnabled 
       WHERE p.userId = :userId
       """)
    void updateNotifications(@Param("userId") String userId,
                             @Param("notificationsEnabled") boolean notificationsEnabled);
}
