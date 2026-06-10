package org.novenobyte.tintabrava.service;

import org.novenobyte.tintabrava.exceptions.DetallePedidoNotFound;
import org.novenobyte.tintabrava.model.DetallesPedido;
import org.novenobyte.tintabrava.repository.DetallesPedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DetallesPedidoService {
    private final DetallesPedidoRepository detallesPedidoRepository;

    @Autowired
    public DetallesPedidoService(DetallesPedidoRepository detallesPedidoRepository) {
        this.detallesPedidoRepository = detallesPedidoRepository;
    }

    // Obtener todos los detalles de pedidos (get)
    public List<DetallesPedido> getDetallesPedido(){
        return detallesPedidoRepository.findAll();
    }


    // Obtener detalle de pedido por ID
    public DetallesPedido findById(Long id){
        return detallesPedidoRepository.findById(id)
                .orElseThrow(() -> new DetallePedidoNotFound(id));
    }

    // Crear detalle de pedido (post)
    public DetallesPedido createDetallesPedido( DetallesPedido newDetallesPedido){
        return detallesPedidoRepository.save(newDetallesPedido);
    }


    // put
    public DetallesPedido updateDetallesPedido(DetallesPedido detallesPedido, Long id){
        return detallesPedidoRepository.findById(id)
                .map(detallesPedidoData ->{
                    detallesPedidoData.setIdPedido(detallesPedido.getIdPedido());
                    detallesPedidoData.setIdProducto(detallesPedido.getIdProducto());
                    detallesPedidoData.setCantidadProducto(detallesPedido.getCantidadProducto());
                    detallesPedidoData.setTotal(detallesPedido.getTotal());
                    return detallesPedidoRepository.save(detallesPedidoData);
                })
                .orElseThrow(() -> new DetallePedidoNotFound(id));
    }


    // Eliminar elemento por ID (Delete)
    public void deleteDetallesPedido(Long id){
        if (detallesPedidoRepository.existsById(id)){
            detallesPedidoRepository.deleteById(id);
        }else {
            throw new DetallePedidoNotFound(id);
        }
    }

    //


}
