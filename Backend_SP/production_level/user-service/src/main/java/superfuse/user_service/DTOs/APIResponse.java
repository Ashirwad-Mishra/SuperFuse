package superfuse.user_service.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class APIResponse<T>
{
    private String message;
    private T data;
}
