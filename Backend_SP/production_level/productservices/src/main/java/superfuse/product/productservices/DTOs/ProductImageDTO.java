package superfuse.product.productservices.DTOs;

import lombok.Data;
import java.util.UUID;

@Data
public class ProductImageDTO
{
    private UUID productId;
    private String url;
}
