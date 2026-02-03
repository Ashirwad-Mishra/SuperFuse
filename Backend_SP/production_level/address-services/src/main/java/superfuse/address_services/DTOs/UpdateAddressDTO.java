package superfuse.address_services.DTOs;

import lombok.Data;
import superfuse.address_services.enums.AddressType;


@Data
public class UpdateAddressDTO
{
    private AddressType addressType;
    private String street;
    private String city;
    private String state;
    private String country;
    private String postalCode;
    private String additionalInfo;
}
