package superfuse.product.productservices.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class ProductResponseDTO
{
    private UUID productId;
    private UUID adminId;
    private String name;
    private String slug;
    private String brand;
    private String description;
    private Integer stock;
    private BigDecimal price;
    private Integer ratingCount;
    private boolean isFeatured;
    private LocalDateTime createdAt;
}
