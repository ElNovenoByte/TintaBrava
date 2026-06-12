package org.novenobyte.tintabrava.controller;

import org.novenobyte.tintabrava.exceptions.ProductoNotFound;
import org.novenobyte.tintabrava.model.Category;
import org.novenobyte.tintabrava.model.Producto;
import org.novenobyte.tintabrava.model.SubCategory;
import org.novenobyte.tintabrava.repository.CategoriaRepository;
import org.novenobyte.tintabrava.repository.SubCategoriaRepository;
import org.novenobyte.tintabrava.service.FileStorageService;
import org.novenobyte.tintabrava.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {
    private final ProductoService productoService;
    private final CategoriaRepository categoryRepository;
    private final SubCategoriaRepository subCategoryRepository;
    private final FileStorageService fileStorageService;

    @Autowired
    public ProductoController(ProductoService productoService,
                              CategoriaRepository categoryRepository,
                              SubCategoriaRepository subCategoryRepository,
                              FileStorageService fileStorageService) {
        this.productoService = productoService;
        this.categoryRepository = categoryRepository;
        this.subCategoryRepository = subCategoryRepository;
        this.fileStorageService = fileStorageService;
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

    @PostMapping("/post/nuevo-producto")
    public ResponseEntity<?> createProducto(
            @RequestParam("nombreProducto") String nombreProducto,
            @RequestParam("descripcion") String descripcion,
            @RequestParam("precio") Double precio,
            @RequestParam("idCategoria") Long idCategoria,
            @RequestParam("idSubCategoria") Long idSubCategoria,
            @RequestParam("imagen1") MultipartFile imagen1,
            @RequestParam("imagen2") MultipartFile imagen2,
            @RequestParam("imagen3") MultipartFile imagen3) {

        // Logs de evaluacion 1
        System.out.println("=== ENTRÓ A createProducto ===");
        System.out.println("nombreProducto = " + nombreProducto);
        System.out.println("imagen1 = " + imagen1.getOriginalFilename() + " | size = " + imagen1.getSize());
        System.out.println("imagen2 = " + imagen2.getOriginalFilename() + " | size = " + imagen2.getSize());
        System.out.println("imagen3 = " + imagen3.getOriginalFilename() + " | size = " + imagen3.getSize());

        // Validar que las tres imágenes estén presentes
        if (imagen1.isEmpty() || imagen2.isEmpty() || imagen3.isEmpty()) {
            return ResponseEntity.badRequest().body("Debe subir tres imágenes.");
        }

        // Obtener entidades de categoría y subcategoría
        Category categoria = categoryRepository.findById(idCategoria)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
        SubCategory subCategoria = subCategoryRepository.findById(idSubCategoria)
                .orElseThrow(() -> new RuntimeException("Subcategoría no encontrada"));

        // Generar SKU según la lógica indicada
        String catNombre = categoria.getNombre().toLowerCase(); // "playeras", "hoodies", "gorras"
        String subNombre = subCategoria.getNombre().toLowerCase(); // "bandas", "series/comics", "otros"

        String prefijoCat;
        switch (catNombre) {
            case "playeras": prefijoCat = "10"; break;
            case "hoodies":  prefijoCat = "20"; break;
            case "gorras":   prefijoCat = "30"; break;
            default: prefijoCat = "00";
        }

        String prefijoSub;
        switch (subNombre) {
            case "bandas": prefijoSub = "10"; break;
            case "series/comics": prefijoSub = "20"; break;
            case "otros": prefijoSub = "30"; break;
            default: prefijoSub = "00";
        }

        long totalProductos = productoService.countProductos();
        long numeroSecuencia = totalProductos + 1;
        String numeroFormateado = String.format("%04d", numeroSecuencia);
        Long sku = Long.parseLong(prefijoCat + prefijoSub + numeroFormateado);

        // Construir la estructura de carpetas: productos/{categoriaPlural}/{categoriaSingular}-{subcategoriaNombre}/{sku}
        String subCategoriaNombreCarpeta = subNombre.equals("series/comics") ? "series-comics" : subNombre;

        String carpeta = catNombre + "/"
                + catNombre + "-" + subCategoriaNombreCarpeta + "/"
                + sku;

        String subPath = "productos/" + carpeta;

        System.out.println("=== DEBUG PRODUCTO ===");
        System.out.println("SKU generado: " + sku);
        System.out.println("subPath generado: " + subPath);
        // Guardar las imágenes y obtener las rutas
        try {
            String ruta1 = fileStorageService.saveImage(imagen1, subPath, sku + "-1");
            String ruta2 = fileStorageService.saveImage(imagen2, subPath, sku + "-2");
            String ruta3 = fileStorageService.saveImage(imagen3, subPath, sku + "-3");

            // Crear la entidad Producto
            Producto producto = new Producto();
            producto.setNombreProducto(nombreProducto);
            producto.setDescripcion(descripcion);
            producto.setPrecio(precio);
            producto.setIdCategoria(categoria);
            producto.setIdSubCategoria(subCategoria);
            producto.setSku(sku);
            producto.setImagen1(ruta1);
            producto.setImagen2(ruta2);
            producto.setImagen3(ruta3);

            // Verificar si el SKU ya existe (por si acaso)
            if (productoService.productoExistsBySku(sku)) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("El SKU ya existe");
            }

            Producto saved = productoService.createProducto(producto);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al guardar las imágenes: " + e.getMessage());
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
