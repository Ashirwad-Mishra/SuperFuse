package superfuse.product.productservices.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import superfuse.product.productservices.DTOs.RatingDTO;
import superfuse.product.productservices.Entities.Rating;
import superfuse.product.productservices.Repos.ProductRepo;
import superfuse.product.productservices.Repos.RatingRepo;
import superfuse.product.productservices.utils.SecurityUtil;

import java.nio.file.AccessDeniedException;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class RatingServices
{
    @Autowired
    private RatingRepo ratingRepo;

    @Autowired
    private ProductRepo productRepo;

    public RatingDTO addRating(RatingDTO ratingDTO) throws Exception
    {
        UUID user = SecurityUtil.getCurrentUser();
        if (user == null)
        {
            throw new AccessDeniedException("Log in needed..............");
        }
        Rating rating = new Rating();
        rating.setProduct(
                productRepo.findById(ratingDTO.getProductId())
                        .orElseThrow(() -> new NoSuchElementException("Product not found"))
        );
        rating.setRaterId(user);
        rating.setRate(rating.getRate());
        rating.setDescription(rating.getDescription());

        Rating saved = ratingRepo.save(rating);

        return new RatingDTO(
                saved.getRatingId(),
                saved.getRaterId(),
                saved.getRate(),
                saved.getDescription()
        );
    }


    public RatingDTO editRating(RatingDTO ratingDTO) throws Exception
    {
        UUID user = SecurityUtil.getCurrentUser();

        if (user == null) throw new AccessDeniedException("Log in needed............");

        Rating rating = ratingRepo.getByProductAndRaterId(productRepo.findById(ratingDTO.getProductId())
                        .orElseThrow(() -> new NoSuchElementException("Product doesn't exist..........")),
                ratingDTO.getRaterId()).or

    }
}