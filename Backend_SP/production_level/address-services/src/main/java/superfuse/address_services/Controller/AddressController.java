package superfuse.address_services.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import superfuse.address_services.DTOs.AddANewAddressRequestDTO;
import superfuse.address_services.DTOs.AddAddressResponseDTO;
import superfuse.address_services.DTOs.GetAddresses;
import superfuse.address_services.services.AddressesServices;

import java.util.List;

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
}
