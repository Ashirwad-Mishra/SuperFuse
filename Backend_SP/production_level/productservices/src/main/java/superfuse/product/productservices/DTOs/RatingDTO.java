package superfuse.product.productservices.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class RatingDTO
{
    private UUID productId;
    private UUID raterId;
    private Integer rate;
    private String description;
}
