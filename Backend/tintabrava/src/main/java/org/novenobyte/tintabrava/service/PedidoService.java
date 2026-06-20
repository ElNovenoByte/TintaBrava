package org.novenobyte.tintabrava.service;

import org.novenobyte.tintabrava.exceptions.ClienteNotFoundException;
import org.novenobyte.tintabrava.exceptions.PedidoNotFound;
import org.novenobyte.tintabrava.exceptions.ProductoNotFound;
import org.novenobyte.tintabrava.model.Cliente;
import org.novenobyte.tintabrava.model.Pedido;
import org.novenobyte.tintabrava.model.Stock;
import org.novenobyte.tintabrava.repository.ClienteRepository;
import org.novenobyte.tintabrava.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.List;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class PedidoService {
    private final PedidoRepository pedidoRepository;
    private final ClienteRepository clienteRepository;

    @Autowired
    public PedidoService(PedidoRepository pedidoRepository, ClienteRepository clienteRepository){
        this.pedidoRepository = pedidoRepository;
        this.clienteRepository = clienteRepository;
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

    public Pedido crearPedidoCliente(Long idCliente){

        Cliente cliente =
                clienteRepository.findById(idCliente)
                        .orElseThrow(() ->
                                new ClienteNotFoundException(
                                        "Cliente not found"));

        Pedido pedido = new Pedido();

        pedido.setCliente(cliente);

        pedido.setFechaPedido(
                LocalDateTime.now());

        pedido.setFechaEntrega(
                LocalDate.now().plusDays(5));

        return pedidoRepository.save(pedido);
    }

}
