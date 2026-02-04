package super_fuse.production.preferences.Entities;

import jakarta.persistence.*;
import lombok.Data;
import super_fuse.production.preferences.enums.Theme;

@Data
@Entity
@Table(name = "preferences")
public class Preference
{
    @Id
    @Column(name = "user_id" , nullable = false, updatable = false)
    private String userId;  //foreign key

    @Enumerated(EnumType.STRING)
    private Theme theme;

    private boolean notificationEnabled;

    private boolean emailNotification;

    private boolean smsNotification;
}