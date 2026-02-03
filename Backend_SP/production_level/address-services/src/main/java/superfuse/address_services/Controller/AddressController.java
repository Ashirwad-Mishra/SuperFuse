package superfuse.address_services.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import superfuse.address_services.DTOs.*;
import superfuse.address_services.services.AddressesServices;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/address")
public class AddressController
{
    private final AddressesServices addressesServices;

    public AddressController(AddressesServices addressesServices)
    {
        this.addressesServices = addressesServices;
    }

    @GetMapping
    public ResponseEntity<List<GetAddresses>> allAddress()
    {
        return ResponseEntity.ok(addressesServices.getAddresses());
    }

    @PostMapping("/add")
    public ResponseEntity<AddAddressResponseDTO> addAddress(@RequestBody AddANewAddressRequestDTO
                                                                        addANewAddressRequestDTO)
    {
        return ResponseEntity.ok(addressesServices.addANewAddress(addANewAddressRequestDTO));
    }

    @PatchMapping("update/{addressId}")
    public ResponseEntity<UpdateAddressResponseDTO> updateAddress(
            @PathVariable UUID addressId,
            @RequestBody UpdateAddressDTO updateAddressDTO
            )
    {

        return ResponseEntity.ok(addressesServices.updateAddress(addressId , updateAddressDTO));
    }
}
