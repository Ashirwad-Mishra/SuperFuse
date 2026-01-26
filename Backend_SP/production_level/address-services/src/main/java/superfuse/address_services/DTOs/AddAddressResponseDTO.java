package superfuse.address_services.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import superfuse.address_services.enums.AddressType;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
public class AddAddressResponseDTO
{

    private UUID addressId;

    private AddressType addressType;

    private String street;
    private String city;
    private String state;
    private String country;
    private String postalCode;

    private String additionalInfo;

    private LocalDateTime createdAt;
}