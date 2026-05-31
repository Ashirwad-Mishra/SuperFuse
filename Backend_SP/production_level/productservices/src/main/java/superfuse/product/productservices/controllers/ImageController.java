package superfuse.product.productservices.controllers;

import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import superfuse.product.productservices.DTOs.ProductImageDTO;
import superfuse.product.productservices.Entities.Image;
import superfuse.product.productservices.services.ImageServices;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/product/image")
public class ImageController
{
    @Autowired
    private ImageServices imageServices;

    @SneakyThrows
    @PostMapping
    public ResponseEntity<String> addImage(@RequestBody ProductImageDTO productImageDTO)
    {
        return ResponseEntity.ok(imageServices.addImage(productImageDTO));
    }

    @SneakyThrows
    @DeleteMapping
    public ResponseEntity<String> delImage(@RequestBody ProductImageDTO productImageDTO)
    {
        return ResponseEntity.ok(imageServices.deleteImage(productImageDTO));
    }

    @SneakyThrows
    @GetMapping("/{productId}")
    public ResponseEntity<List<Image>> getImages(@PathVariable UUID productId)
    {
        return ResponseEntity.ok(imageServices.getImages(productId));
    }
}
