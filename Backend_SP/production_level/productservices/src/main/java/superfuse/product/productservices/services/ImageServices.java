package superfuse.product.productservices.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import superfuse.product.productservices.DTOs.ProductImageDTO;
import superfuse.product.productservices.Entities.Image;
import superfuse.product.productservices.Entities.Product;
import superfuse.product.productservices.Repos.ImageRepo;
import superfuse.product.productservices.Repos.ProductRepo;
import superfuse.product.productservices.utils.SecurityUtil;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class ImageServices
{
    @Autowired
    private ImageRepo imageRepo;

    @Autowired
    private ProductRepo productRepo;

    public String addImage(ProductImageDTO productImageDTO)
            throws Exception
    {
        Product product = productRepo.findById(productImageDTO.getProductId())
                .orElseThrow(() -> new Exception("couldn't find that image.........."));
        UUID admin = SecurityUtil.getCurrentUser();
        if (!product.getAdminId().equals(admin))
        {
            throw new AccessDeniedException("You are not allowed to add info about this product.....");
        }

        Image image = new Image();
        image.setProduct(product);
        image.setUrl(productImageDTO.getUrl());

        imageRepo.save(image);
        return "Image uploaded..............";
    }

    public List<Image> getImages(UUID productId)
    {
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new NoSuchElementException("The product does not exit............"));
        return imageRepo.findAllByProduct(product);
    }

    public String deleteImage(ProductImageDTO productImageDTO) throws Exception
    {
        Product product = productRepo.findById(productImageDTO.getProductId())
                .orElseThrow(() -> new Exception("couldn't find that image.........."));
        UUID admin = SecurityUtil.getCurrentUser();
        if (!product.getAdminId().equals(admin))
        {
            throw new AccessDeniedException("You are not allowed to update info about this product.....");
        }

        Image image = imageRepo.findByUrl(productImageDTO.getUrl());

        if (!image.getProduct().getProductId().equals(product.getProductId()))
        {
            throw new AccessDeniedException("This image doesn't belong to this product...........");
        }
        imageRepo.delete(image);

        return "Image deleted.................................................";
    }
}