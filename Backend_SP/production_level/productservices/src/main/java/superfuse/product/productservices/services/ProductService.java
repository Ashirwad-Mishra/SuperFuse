package superfuse.product.productservices.services;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import superfuse.product.productservices.DTOs.ProductCreationRequestDTO;
import superfuse.product.productservices.DTOs.ProductResponseDTO;
import superfuse.product.productservices.Entities.Product;
import superfuse.product.productservices.Repos.ProductRepo;
import superfuse.product.productservices.utils.SecurityUtil;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
public class ProductService
{
    @Autowired
    private ProductRepo productRepo;

    public ProductResponseDTO createProduct(ProductCreationRequestDTO productCreationRequestDTO)
            throws Exception {
        UUID user = SecurityUtil.getCurrentUser();
        if (user == null) {
            throw new BadRequestException("Login token required.................................");
        }
        if (productCreationRequestDTO == null) {
            throw new BadRequestException("Product payload is required..............");
        }

        if (productCreationRequestDTO.getName() == null ||
                productCreationRequestDTO.getName().trim().isEmpty()) {
            throw new BadRequestException("Product name not given.........................");
        }

        if (productCreationRequestDTO.getBrand() == null ||
                productCreationRequestDTO.getBrand().trim().isEmpty()) {
            throw new BadRequestException("Brand not given....................");
        }

        if (productCreationRequestDTO.getPrice() == null ||
                productCreationRequestDTO.getPrice().compareTo(BigDecimal.valueOf(0)) < 0) {
            throw new BadRequestException("Price cannot be negative.....................");
        }

        if (productCreationRequestDTO.getStock() == null || productCreationRequestDTO.getStock() <= 0) {
            throw new BadRequestException("Add product when you have at least 1 in stock.............");
        }

        Product product = new Product();
        product.setAdminId(user);
        product.setName(productCreationRequestDTO.getName());
        product.setSlug(productCreationRequestDTO.getSlug());
        product.setBrand(productCreationRequestDTO.getBrand());
        product.setDescription(productCreationRequestDTO.getDescription());
        product.setStock(productCreationRequestDTO.getStock());
        product.setPrice(productCreationRequestDTO.getPrice());

        Product saved = productRepo.save(product);

        return new ProductResponseDTO(
                saved.getProductId(),
                saved.getAdminId(),
                saved.getName(),
                saved.getSlug(),
                saved.getBrand(),
                saved.getDescription(),
                saved.getStock(),
                saved.getPrice(),
                saved.getRatingCount(),
                saved.isFeatured(),
                saved.getCreatedAt()
        );
    }

    public List<ProductResponseDTO> giveMyProducts() throws Exception
    {
        UUID user = SecurityUtil.getCurrentUser();

        if (user == null)
        {
            throw new BadRequestException("Login token required.................................");
        }
        List<Product> products = productRepo.findByAdminId(user)
                .orElseThrow(() -> new RuntimeException("Couldn't find a single product........"));

        if (products.isEmpty())
        {
            throw new RuntimeException("Couldn't find a single product........");
        }

        return products
                .stream()
                .map(p -> new ProductResponseDTO(
                        p.getProductId(),
                        p.getAdminId(),
                        p.getName(),
                        p.getSlug(),
                        p.getBrand(),
                        p.getDescription(),
                        p.getStock(),
                        p.getPrice(),
                        p.getRatingCount(),
                        p.isFeatured(),
                        p.getCreatedAt()
                ))
                .toList();
    }

    public ProductResponseDTO serachBySlugs(String slug)
    {
        Product product = productRepo.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("The searched product don't exist........"));

        return new ProductResponseDTO(
                product.getProductId(),
                product.getAdminId(),
                product.getName(),
                product.getSlug(),
                product.getBrand(),
                product.getDescription(),
                product.getStock(),
                product.getPrice(),
                product.getRatingCount(),
                product.isFeatured(),
                product.getCreatedAt()
        );
    }
}
