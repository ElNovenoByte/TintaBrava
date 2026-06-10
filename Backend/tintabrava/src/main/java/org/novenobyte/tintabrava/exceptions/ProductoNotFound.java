package org.novenobyte.tintabrava.exceptions;

public class ProductoNotFound extends RuntimeException {

    public ProductoNotFound(Long sku) {
        super("Producto con SKU: "+sku+" no encontrado.");
    }
}
