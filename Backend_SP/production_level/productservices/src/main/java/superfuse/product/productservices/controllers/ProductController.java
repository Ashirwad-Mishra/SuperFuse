package superfuse.product.productservices.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import superfuse.product.productservices.DTOs.ProductCreationRequestDTO;
import superfuse.product.productservices.DTOs.ProductResponseDTO;
import superfuse.product.productservices.services.ProductService;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController
{
    @Autowired
    private ProductService productService;

    @PostMapping("/create")
    public ResponseEntity<ProductResponseDTO> createProduct(
            @RequestBody ProductCreationRequestDTO productCreationRequestDTO) throws Exception
    {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(productService.createProduct(productCreationRequestDTO));
    }

    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> getProductsByMe() throws Exception
    {
        return ResponseEntity.status(HttpStatus.FOUND)
                .body(productService.giveMyProducts());
    }

    @GetMapping("/find/slug/{slug}")
    public ResponseEntity<ProductResponseDTO> getProductBySlug(@PathVariable String slug) throws Exception
    {
        return ResponseEntity.status(HttpStatus.FOUND)
                .body(productService.serachBySlugs(slug));
    }
}