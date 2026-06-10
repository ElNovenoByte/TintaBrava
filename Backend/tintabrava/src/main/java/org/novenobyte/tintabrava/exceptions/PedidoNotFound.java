package org.novenobyte.tintabrava.exceptions;

public class PedidoNotFound extends RuntimeException {

    public PedidoNotFound(Long id) {
        super("Pedido con ID: " + id + " no encontrado" );
    }
}
