package super_fuse.production.preferences.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import super_fuse.production.preferences.enums.Theme;

@Data
@AllArgsConstructor
public class PreferenceDTO
{
    private String userName;
    private Theme theme;
    private boolean notificationEnabled;
    private boolean emailNotification;
    private boolean smsNotification;
}