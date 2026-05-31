package superfuse.product.productservices.services;


import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import superfuse.product.productservices.Entities.Product;
import superfuse.product.productservices.Repos.ProductRepo;
import superfuse.product.productservices.utils.SecurityUtil;

import java.math.BigDecimal;
import java.nio.file.AccessDeniedException;
import java.util.UUID;

@Service
public class StockServices
{
    @Autowired
    private ProductRepo productRepo;

    public String updateStockInfo(UUID productId , int newStock)
            throws BadRequestException, AccessDeniedException
    {
        var user = SecurityUtil.getCurrentUser();

        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("The product doesn't exist............."));

        if (!user.equals(product.getAdminId()))
        {
            throw new AccessDeniedException("You are not allowed to update information about this product.......");
        }

        if (newStock <= 0)
        {
            throw new BadRequestException("Stock cannot be less than 0................");
        }

        product.setStock(newStock);
        Product saved = productRepo.save(product);

        if (saved.getStock().equals(newStock))
            return "The stock updated successfully........................";

        else return "Couldn't update the stock.............";
    }

    public String updatePriceInfo(UUID productId , BigDecimal newPrice)
            throws BadRequestException, AccessDeniedException
    {
        var user = SecurityUtil.getCurrentUser();

        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("The product doesn't exist............."));

        if (!user.equals(product.getAdminId()))
        {
            throw new AccessDeniedException("You are not allowed to update information about this product.......");
        }

        if (newPrice.compareTo(BigDecimal.ZERO) < 0)
        {
            throw new BadRequestException("Stock cannot be less than 0................");
        }

        product.setPrice(newPrice);
        Product saved = productRepo.save(product);

        if (saved.getPrice().equals(newPrice))
            return "The stock updated successfully........................";

        else return "Couldn't update the stock.............";
    }
}