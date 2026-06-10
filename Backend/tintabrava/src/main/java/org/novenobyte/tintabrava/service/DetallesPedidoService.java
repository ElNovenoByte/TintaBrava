package org.novenobyte.tintabrava.service;

import org.novenobyte.tintabrava.repository.DetallesPedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DetallesPedidoService {
    private final DetallesPedidoRepository detallesPedidoRepository;

    @Autowired
    public DetallesPedidoService(DetallesPedidoRepository detallesPedidoRepository) {
        this.detallesPedidoRepository = detallesPedidoRepository;
    }
}
