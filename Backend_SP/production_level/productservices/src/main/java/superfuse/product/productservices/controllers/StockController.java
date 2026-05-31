package superfuse.product.productservices.controllers;

import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import superfuse.product.productservices.services.StockServices;

import java.math.BigDecimal;
import java.util.UUID;

@RestController("/stock/update")
public class StockController
{
    @Autowired
    private StockServices stockServices;

    @SneakyThrows
    @PatchMapping("/{productId}/price")
    public ResponseEntity<String> updatePrice(
            @PathVariable UUID productId,
            @RequestBody BigDecimal newPrice)
    {

        return ResponseEntity.ok(
                stockServices.updatePriceInfo(productId , newPrice)
        );
    }

    @SneakyThrows
    @PatchMapping("/{productId}/stock")
    public ResponseEntity<String> updateStock(
            @PathVariable UUID productId,
            @RequestBody Integer newStock
        )
    {
        return ResponseEntity.ok(stockServices.updateStockInfo(productId,newStock));
    }
}
