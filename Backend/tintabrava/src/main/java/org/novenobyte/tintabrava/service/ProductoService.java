package org.novenobyte.tintabrava.service;

import org.novenobyte.tintabrava.exceptions.ProductoNotFound;
import org.novenobyte.tintabrava.model.Producto;
import org.novenobyte.tintabrava.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {
    private final ProductoRepository productoRepository;

    @Autowired
    public ProductoService(ProductoRepository productoRepository){
        this.productoRepository = productoRepository;
    }

    //Get
    public List<Producto> getProductos(){
        return productoRepository.findAll();
    }

    //Post
    public Producto createProducto(Producto newProducto){
        return productoRepository.save(newProducto);
    }

    //Put


    //Delete
    public void deleteProductoBySku(Long sku){
        if(productoRepository.existsBySku(sku)){
            productoRepository.delete(findProductoBySku(sku));
        } else {
            throw new ProductoNotFound(sku);
        }
    }

    //Buscar por SKU
    public Producto findProductoBySku(Long sku){
        if(productoRepository.existsBySku(sku)){
            return productoRepository.findBySku(sku);
        }
        else {
            throw new ProductoNotFound(sku);
        }
    }

    //Existe el producto por SKU?
    public boolean productoExistsBySku(Long sku){
        return productoRepository.existsBySku(sku);
    }

    //Buscar por ID
    public Optional<Producto> findProductoByID(Long id){
        return productoRepository.findById(id);
    }

}
