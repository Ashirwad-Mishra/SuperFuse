package superfuse.product.productservices.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class ProductCreationRequestDTO
{
    private String name;
    private String slug;
    private String brand;
    private String description;
    private Integer stock;
    private BigDecimal price;
}