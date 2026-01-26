package superfuse.address_services.Entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import superfuse.address_services.enums.AddressType;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@RequiredArgsConstructor
@AllArgsConstructor
@Table(
        name = "addresses",
        indexes = {
                @Index(name = "idx_user_id" , columnList = "user_id")
        }
)
public class Address
{
    //primary Key
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false , nullable = false)
    private UUID addressId;

    //forign key
    @Column(updatable = false , nullable = false)
    private String userId;

    @Column(updatable = true , nullable = false)
    @Enumerated(EnumType.STRING)
    private AddressType addressType;

    @Column(nullable = false)
    private String street;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String state;

    @Column(nullable = false)
    private String country;

    @Column(nullable = false)
    private String postalCode;

    @Column
    private String additionalInfo;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
