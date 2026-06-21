package org.novenobyte.tintabrava.controller;

import org.novenobyte.tintabrava.exceptions.PedidoNotFound;
import org.novenobyte.tintabrava.model.Pedido;
import org.novenobyte.tintabrava.model.Producto;
import org.novenobyte.tintabrava.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {
    private final PedidoService pedidoService;

    @Autowired
    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }


    // Mapear metodo getPedidos()
    @GetMapping("/get/todos")
    public List<Pedido> allPedidos(){
    return pedidoService.getpedidos();
        }

    // Mapear metodo findById()
    @GetMapping("pedido/id/{id}")
    public ResponseEntity<Pedido> getById(@PathVariable Long id){
        try {
            return ResponseEntity.ok(pedidoService.findById(id));
        }catch (PedidoNotFound e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    // Mapear el metodo createPedido
    @PostMapping("/crear-pedido")
    public ResponseEntity<Pedido> createPedido(
            @RequestBody Pedido newPedido){

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(pedidoService.createPedido(newPedido));
    }

    // Mapear metodo para actualizar pedido
    @PutMapping("/update-pedido/{id}")
    public ResponseEntity<Pedido> updatePedido(@RequestBody Pedido newPedido, @PathVariable Long id){
        try {
            pedidoService.updatePedido(newPedido, id);
            return ResponseEntity.noContent().build();
        }catch (PedidoNotFound e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }



    // Mapear el metodo para eliminar usuario por ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Pedido> deleteById(@PathVariable Long id){
        try {
            pedidoService.deletePedido(id);
            return ResponseEntity.noContent().build();
        }catch (PedidoNotFound e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // EndPoint especifico para el carrito
    @PostMapping("/cliente/{idCliente}")
    public ResponseEntity<Pedido> createPedido(
            @PathVariable Long idCliente) {

        Pedido pedido =
                pedidoService.crearPedidoCliente(idCliente);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(pedido);
    }






}
