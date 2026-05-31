package superfuse.product.productservices.Repos;

import org.springframework.data.jpa.repository.JpaRepository;
import superfuse.product.productservices.Entities.Rating;

import java.util.Optional;

public interface RatingRepo extends JpaRepository<Rating , String>
{
    Optional<Rating> getByProductAndRatingI
}
