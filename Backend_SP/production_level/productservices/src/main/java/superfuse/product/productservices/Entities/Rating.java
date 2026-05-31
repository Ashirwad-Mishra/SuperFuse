package superfuse.product.productservices.Entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(
        name = "ratings",
        indexes = {
                @Index(name = "idx_rating_product", columnList = "product_id")
        },
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_product_user", columnNames = {"product_id", "raterId"})
        }
)
@Data
public class Rating
{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID ratingId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(nullable = false , updatable = false)
    private UUID raterId;

    @Column(nullable = false , updatable = true)
    @Min(1)
    @Max(5)
    private Integer rate;

    @Column(length = 2000)
    private String description;

    @Column(updatable = false)
    @CreationTimestamp
    private Instant createdAt;

    @UpdateTimestamp
    private Instant updatedAt;
}
