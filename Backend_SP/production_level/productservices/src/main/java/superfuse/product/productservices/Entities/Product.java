package superfuse.product.productservices.Entities;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "products")
@Data
public class Product
{

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID productId;

    private UUID adminId;

    @Column(nullable = false)
    private String name;

    @Column(unique = true)
    private String slug;

    private String brand;

    @Column(length = 2000)
    private String description;

    @Column(nullable = false)
    private Integer stock;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal price;

    private Integer ratingCount;

    private boolean isFeatured;

    private LocalDateTime createdAt;

    @PrePersist
    void onCreate()
    {
        this.createdAt = LocalDateTime.now();
    }
}
