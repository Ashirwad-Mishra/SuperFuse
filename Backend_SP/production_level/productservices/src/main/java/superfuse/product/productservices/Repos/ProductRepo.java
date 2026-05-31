package superfuse.product.productservices.Repos;

import org.springframework.data.jpa.repository.JpaRepository;
import superfuse.product.productservices.Entities.Product;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


public interface ProductRepo extends JpaRepository<Product , UUID>
{
    Optional<List<Product>> findByAdminId(UUID uuid);
    Optional<Product> findBySlug(String slug);
}
