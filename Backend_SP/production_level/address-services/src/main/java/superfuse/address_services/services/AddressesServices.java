package superfuse.address_services.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import superfuse.address_services.DTOs.*;
import superfuse.address_services.Entities.Address;
import superfuse.address_services.Repos.AddressRepo;
import superfuse.address_services.Utils.SecurityUtil;

import java.util.List;
import java.util.UUID;

@Service
public class AddressesServices
{
    @Autowired
    private AddressRepo addressRepo;

    public AddAddressResponseDTO addANewAddress(AddANewAddressRequestDTO address) {

        String userId = SecurityUtil.getCurrentUser();

        Address addressEntity = new Address();
        addressEntity.setUserId(userId);
        addressEntity.setAddressType(address.getAddressType());
        addressEntity.setCity(address.getCity());
        addressEntity.setStreet(address.getStreet());
        addressEntity.setState(address.getState());
        addressEntity.setCountry(address.getCountry());
        addressEntity.setPostalCode(address.getPostalCode());
        addressEntity.setAdditionalInfo(address.getAdditionalInfo());

        Address saved = addressRepo.save(addressEntity);

        return new AddAddressResponseDTO(
                saved.getAddressId(),
                saved.getAddressType(),
                saved.getStreet(),
                saved.getCity(),
                saved.getState(),
                saved.getCountry(),
                saved.getPostalCode(),
                saved.getAdditionalInfo(),
                saved.getCreatedAt()
        );
    }
    public UpdateAddressResponseDTO updateAddress(UUID addressId , UpdateAddressDTO updateAddressDTO)
    {
        String userId = SecurityUtil.getCurrentUser();

        Address address = addressRepo.findByAddressIdAndUserId(addressId , userId)
                .orElseThrow(() -> new RuntimeException("wrong user id or address id............."));

        if (updateAddressDTO.getAddressType() != null)
        {
            address.setAddressType(updateAddressDTO.getAddressType());
        }

        if (updateAddressDTO.getStreet() != null)
        {
            address.setStreet(updateAddressDTO.getStreet());
        }

        if (updateAddressDTO.getCity() != null)
        {
            address.setCity(updateAddressDTO.getCity());
        }

        if (updateAddressDTO.getState() != null)
        {
            address.setState(updateAddressDTO.getState());
        }

        if (updateAddressDTO.getCountry() != null)
        {
            address.setCountry(updateAddressDTO.getCountry());
        }

        if (updateAddressDTO.getPostalCode() != null)
        {
            address.setPostalCode(updateAddressDTO.getPostalCode());
        }

        if (updateAddressDTO.getAdditionalInfo() != null)
        {
            address.setAdditionalInfo(updateAddressDTO.getAdditionalInfo());
        }
        Address saved = addressRepo.save(address);
        return new UpdateAddressResponseDTO(
                "The address has updated successfully.............",
                saved.getAddressId(),
                saved.getAddressType(),
                saved.getStreet(),
                saved.getCity(),
                saved.getState(),
                saved.getCountry(),
                saved.getPostalCode(),
                saved.getAdditionalInfo(),
                saved.getUpdatedAt()
        );
    }
    public List<GetAddresses> getAddresses()
    {
        String userId = SecurityUtil.getCurrentUser();
        return addressRepo.findByUserId(userId)
                .stream()
                .map(a -> new GetAddresses(
                        a.getAddressId(),
                        a.getAddressType(),
                        a.getStreet(),
                        a.getCity(),
                        a.getState(),
                        a.getCountry(),
                        a.getPostalCode(),
                        a.getAdditionalInfo(),
                        a.getCreatedAt()
                )).toList();
    }
}
