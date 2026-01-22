package superfuse.user_service.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LogInResponse
{
    private String token;
    private String type;
    private String userId;
}
