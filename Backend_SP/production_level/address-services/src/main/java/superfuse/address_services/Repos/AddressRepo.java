package superfuse.address_services.Repos;

import org.springframework.data.jpa.repository.JpaRepository;
import superfuse.address_services.DTOs.GetAddresses;
import superfuse.address_services.Entities.Address;

import java.util.List;
import java.util.UUID;

public interface AddressRepo extends JpaRepository<Address , UUID>
{
    public List<GetAddresses> findByUserId(String userId);
}
