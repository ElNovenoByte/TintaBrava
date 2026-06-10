package org.novenobyte.tintabrava.service;

import org.novenobyte.tintabrava.exceptions.PedidoNotFound;
import org.novenobyte.tintabrava.exceptions.ProductoNotFound;
import org.novenobyte.tintabrava.model.Pedido;
import org.novenobyte.tintabrava.model.Stock;
import org.novenobyte.tintabrava.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.List;

@Service
public class PedidoService {
    private final PedidoRepository pedidoRepository;

    @Autowired
    public PedidoService(PedidoRepository pedidoRepository){
        this.pedidoRepository = pedidoRepository;
    }

    // Metodo para obtener todos los pedidos (get)
    public List<Pedido> getpedidos(){
        return pedidoRepository.findAll();
    }

    //Buscar por ID
    public Pedido findById(Long id){
        return pedidoRepository.findById(id)
                .orElseThrow(() -> new PedidoNotFound(id));
    }


    // Metodo para crear nuevos usuarios (post)
    public Pedido createPedido(Pedido newPedido){
        return pedidoRepository.save(newPedido);
    }

    // Put
    public Pedido updatePedido(Pedido pedido, Long id){
        return pedidoRepository.findById(id)
                .map(pedidoData ->{
                    pedidoData.setCliente(pedido.getCliente());
                    pedidoData.setFechaPedido(pedido.getFechaPedido());
                    return pedidoRepository.save(pedidoData);

                })
                .orElseThrow(() -> new PedidoNotFound(id));
    }



    // Eliminar elemento por ID (delete)
    public void deletePedido(Long id){
        if (pedidoRepository.existsById(id)){
            pedidoRepository.deleteById(id);
        } else {
            throw new PedidoNotFound(id);
        }
    }

}
