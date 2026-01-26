package superfuse.address_services.DTOs;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import superfuse.address_services.enums.AddressType;

@Data
@AllArgsConstructor
public class AddANewAddressRequestDTO
{
    @NotNull
    private AddressType addressType;

    @NotBlank
    private String street;

    @NotBlank
    private String city;

    @NotBlank
    private String state;

    @NotBlank
    private String country;

    @NotBlank
    private String postalCode;

    private String additionalInfo;
}