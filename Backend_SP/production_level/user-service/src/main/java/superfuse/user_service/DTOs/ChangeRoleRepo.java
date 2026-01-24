package superfuse.user_service.DTOs;


import lombok.AllArgsConstructor;
import lombok.Data;
import superfuse.user_service.enums.Role;

@Data
@AllArgsConstructor
public class ChangeRoleRepo
{
    private String userName;
    private Role role;
    private String message;
}
