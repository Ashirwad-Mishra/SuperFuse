package superfuse.user_service.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import superfuse.user_service.enums.AccountStatus;
import superfuse.user_service.enums.Role;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Getter
    @Column(updatable = false , nullable = false)
    private UUID userId;

    @NotNull
    @Column(unique = true)
    private String userName;

    @NotNull
    @Column(unique = true)
    private String phoneNumber;

    @Email
    @NotNull
    @Column(unique = true)
    private String email;

    @NotNull
    private String password;

    @Enumerated(EnumType.STRING)
    private AccountStatus accountStatus;

    @Enumerated(EnumType.STRING)
    private Role role;

    private Instant createdAt;
    private Instant updatedAt;

    @PrePersist
    void onCreate() {
        createdAt = Instant.now();
    }

    @PreUpdate
    void onUpdate() {
        updatedAt = Instant.now();
    }
}