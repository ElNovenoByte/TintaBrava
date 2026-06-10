package org.novenobyte.tintabrava.exceptions;

public class DetallePedidoNotFound extends RuntimeException {

    public DetallePedidoNotFound(Long id) {
        super("Pedido con ID: " + id + " no encontrado");
    }
}
