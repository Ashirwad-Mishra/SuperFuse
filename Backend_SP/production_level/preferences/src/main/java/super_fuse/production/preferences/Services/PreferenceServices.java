package super_fuse.production.preferences.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.reactive.StaticResourceRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import super_fuse.production.preferences.DTOs.PreferenceDTO;
import super_fuse.production.preferences.Entities.Preference;
import super_fuse.production.preferences.Repos.PreferenceRepos;
import super_fuse.production.preferences.enums.Theme;
import super_fuse.production.preferences.utils.SecurityUtil;

@Service
public class PreferenceServices
{
    @Autowired
    private PreferenceRepos preferenceRepos;

    public PreferenceDTO setPreferences(PreferenceDTO preferenceDTO)
    {
        String user = SecurityUtil.getCurrentUser();
        Preference preference = preferenceRepos.findById(user.toString())
                        .orElseGet(() ->{
                            this.createDefaultPreferences();

                            return preferenceRepos.findById(user.toString())
                                    .orElseThrow(() -> new RuntimeException("Couldn't find the id.\n" +
                                            "Probably It doesn't exist.\n" +
                                            "Even trying to create default notifications failed......"));
                        });

        preference.setTheme(preferenceDTO.getTheme());
        preference.setNotificationEnabled( preferenceDTO.isNotificationEnabled() );
        preference.setEmailNotification( preferenceDTO.isEmailNotification() );
        preference.setSmsNotification( preferenceDTO.isSmsNotification() );
        Preference saved = preferenceRepos.save( preference );

        return new PreferenceDTO(
                user,
                saved.getTheme(),
                saved.isNotificationEnabled(),
                saved.isEmailNotification(),
                saved.isSmsNotification()
        );
    }

    public PreferenceDTO createDefaultPreferences()
    {

        String userId = SecurityUtil.getCurrentUser();

        Preference p = new Preference();
        p.setUserId(userId);
        p.setNotificationEnabled(true);
        p.setEmailNotification(true);
        p.setSmsNotification(false);
        p.setTheme(Theme.Dark);

        Preference saved = preferenceRepos.save(p);

        return new PreferenceDTO(
                userId,
                saved.getTheme(),
                saved.isNotificationEnabled(),
                saved.isEmailNotification(),
                saved.isSmsNotification()
        );
    }

    public PreferenceDTO getPrefernces()
    {
        String userId = SecurityUtil.getCurrentUser();

        Preference preference = preferenceRepos.findById(userId)
                .orElseGet(
                        () -> {
                            this.createDefaultPreferences();

                            return preferenceRepos.findById(userId)
                                    .orElseThrow(() -> new RuntimeException ("Tried everything, but, " +
                                            "couldn't get anything in your case............"));
                        }
                );

        return new PreferenceDTO(
                preference.getUserId(),
                preference.getTheme(),
                preference.isNotificationEnabled(),
                preference.isEmailNotification(),
                preference.isSmsNotification()
        );
    }
}
