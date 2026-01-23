package superfuse.user_service.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class UserProfileResponse
{
    private UUID uuid;
    private String userName;
    private String email;
    private String phone;
}
