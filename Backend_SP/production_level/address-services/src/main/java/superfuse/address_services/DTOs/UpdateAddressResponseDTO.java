package superfuse.address_services.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import superfuse.address_services.enums.AddressType;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateAddressResponseDTO
{
    private String message;
    private UUID addressId;

    private AddressType addressType;

    private String street;
    private String city;
    private String state;
    private String country;
    private String postalCode;

    private String additionalInfo;

    private LocalDateTime updatedAt;
}
