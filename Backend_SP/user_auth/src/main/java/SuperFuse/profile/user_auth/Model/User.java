package SuperFuse.profile.user_auth.Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "users")
@RequiredArgsConstructor
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "password")
@Getter
@Setter
public class User
{
    @Id
    @Column(nullable = false , unique = true)
    @NotNull
    private String userId;

    @Column(nullable = false)
    @NotNull
    private String full_name;

    @Setter
    @Column(nullable = false, unique = true)
    @Email(message = "Invalid email format")
    @NotNull
    private String email;

    @Pattern(regexp = "^[0-9]{10}$", message = "Invalid Phone Number")
    @Column(unique = true)
    private String phone_no;

    @Column(nullable = false)
    @NotBlank(message = "Password Cannot be empty!!")
    @Size(min = 8 , message = "Password must be 8 characters long")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotNull
    private String password;

    @Column
    private boolean phone_verified;

    @Column
    private boolean email_verified;

}
