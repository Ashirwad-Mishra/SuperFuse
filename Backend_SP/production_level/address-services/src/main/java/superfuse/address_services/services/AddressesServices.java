package superfuse.address_services.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import superfuse.address_services.DTOs.AddANewAddressRequestDTO;
import superfuse.address_services.DTOs.AddAddressResponseDTO;
import superfuse.address_services.DTOs.GetAddresses;
import superfuse.address_services.Entities.Address;
import superfuse.address_services.Repos.AddressRepo;
import superfuse.address_services.Utils.SecurityUtil;

import java.util.List;

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
