package org.novenobyte.tintabrava.controller;

import org.novenobyte.tintabrava.exceptions.ProductoNotFound;
import org.novenobyte.tintabrava.model.Category;
import org.novenobyte.tintabrava.model.Producto;
import org.novenobyte.tintabrava.model.SubCategory;
import org.novenobyte.tintabrava.repository.CategoriaRepository;
import org.novenobyte.tintabrava.repository.SubCategoriaRepository;
import org.novenobyte.tintabrava.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {
    private final ProductoService productoService;
    private final CategoriaRepository categoryRepository;
    private final SubCategoriaRepository subCategoryRepository;

    @Autowired
    public ProductoController(ProductoService productoService,
                              CategoriaRepository categoryRepository,
                              SubCategoriaRepository subCategoryRepository) {
        this.productoService = productoService;
        this.categoryRepository = categoryRepository;
        this.subCategoryRepository = subCategoryRepository;
    }

    //Get
    @GetMapping("/get/todos")
    public List<Producto> allProductos(){
        return productoService.getProductos();
    }

    // Get Playeras
    @GetMapping("/get/playeras")
    public List<Producto> getPlayeras() {
        return productoService.getProductosByCategoria(1L);
    }

    // Get Hoodies
    @GetMapping("/get/hoodies")
    public List<Producto> getHoodies() {
        return productoService.getProductosByCategoria(2L);
    }

    // Get gorras
    @GetMapping("/get/gorras")
    public List<Producto> getGorras() {
        return productoService.getProductosByCategoria(3L);
    }

    //Get por ID
    @GetMapping("/get/{id}")
    public ResponseEntity<Optional<Producto>> getProductoByID(@PathVariable Long id){
        try{
            return ResponseEntity.ok(productoService.findProductoByID(id));
        } catch (ProductoNotFound e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //Get

    //Post
    @PostMapping("/post/nuevo-producto")
    public ResponseEntity<Producto> createProducto(@RequestBody Producto newProducto){

        // Extraer los IDs de los objetos anidados
        Long catId = newProducto.getIdCategoria().getIdCategory();
        Long subCatId = newProducto.getIdSubCategoria().getIdSubcategory();

        // Buscar las entidades reales en la BD (o lanzar excepción si no existen)
        Category categoria = categoryRepository.findById(catId)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
        SubCategory subCategoria = subCategoryRepository.findById(subCatId)
                .orElseThrow(() -> new RuntimeException("Subcategoría no encontrada"));

        // Reemplazar los objetos temporales por los gestionados
        newProducto.setIdCategoria(categoria);
        newProducto.setIdSubCategoria(subCategoria);

        //Validar si el producto existe por sku
        if(productoService.productoExistsBySku(newProducto.getSku())){
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
