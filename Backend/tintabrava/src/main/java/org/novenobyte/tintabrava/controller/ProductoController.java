package org.novenobyte.tintabrava.controller;

import org.novenobyte.tintabrava.exceptions.ProductoNotFound;
import org.novenobyte.tintabrava.model.Producto;
import org.novenobyte.tintabrava.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {
    private final ProductoService productoService;

    @Autowired
    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    //Get
    @GetMapping("/get/todos")
    public List<Producto> allProductos(){
        return productoService.getProductos();
    }

    //Post
    @PostMapping("/post/nuevo-producto")
    public ResponseEntity<Producto> createProducto(@RequestBody Producto newProducto){
        Producto productoBySku = productoService.findProductoBySku(newProducto.getSku());

        //Validar si el producto existe por sku
        if(productoBySku != null){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        } else {
            //Si un producto no existe, lanzar un estatus: 201 CREATE
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(productoService.createProducto(newProducto));
        }
    }

    //Put

    //Delete
    @DeleteMapping("/delete/{sku}")
    public ResponseEntity<Producto> deleteBySku(@PathVariable Long sku){
        try{
            productoService.deleteProductoBySku(sku);
            return ResponseEntity.noContent().build();
        } catch (ProductoNotFound e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
