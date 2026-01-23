package superfuse.user_service.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import superfuse.user_service.enums.AccountStatus;
import java.util.UUID;

@Data
@AllArgsConstructor
public class RegisterResponseDTO
{
    private UUID userId;
    private String userName;
    private String email;
    private String phoneNumber;
    private AccountStatus accountStatus;
}