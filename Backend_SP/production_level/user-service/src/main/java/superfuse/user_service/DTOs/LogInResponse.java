package superfuse.user_service.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.UUID;

@Data
@AllArgsConstructor
public class LogInResponse
{
    private String token;
    private String type;
    private UUID userId;
}
