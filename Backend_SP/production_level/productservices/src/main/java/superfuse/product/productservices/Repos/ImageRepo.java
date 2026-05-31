package superfuse.product.productservices.Repos;

import org.springframework.data.jpa.repository.JpaRepository;
import superfuse.product.productservices.Entities.Image;
import superfuse.product.productservices.Entities.Product;

import java.util.List;
import java.util.UUID;

public interface ImageRepo extends JpaRepository<Image , UUID>
{
    Image findByUrl(String url);
    List<Image> findAllByProduct(Product product);
}
