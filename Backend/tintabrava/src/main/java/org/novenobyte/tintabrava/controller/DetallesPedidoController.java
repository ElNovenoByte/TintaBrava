package org.novenobyte.tintabrava.controller;

import org.novenobyte.tintabrava.exceptions.DetallePedidoNotFound;
import org.novenobyte.tintabrava.model.DetallesPedido;
import org.novenobyte.tintabrava.service.DetallesPedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/detalles-pedido")
public class DetallesPedidoController {
    private final DetallesPedidoService detallesPedidoService;

    @Autowired
    public DetallesPedidoController(DetallesPedidoService detallesPedidoService) {
        this.detallesPedidoService = detallesPedidoService;
    }

    // Mapeo de metodo getDetallasPedido
    @GetMapping("/todos/detalles-pedido")
    public List<DetallesPedido> allDetallesPedido(){
        return detallesPedidoService.getDetallesPedido();
    }

    // Mapeo de metodo getById
    @GetMapping("/detalles-pedido/{id}")
    public ResponseEntity<DetallesPedido> detallesPedidoById(@PathVariable Long id){
        try {
            return ResponseEntity.ok(detallesPedidoService.findById(id));
        }catch (DetallePedidoNotFound e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/crear/detalle-pedido")
    public ResponseEntity<DetallesPedido>  createDetallesPedido(@RequestBody DetallesPedido newDetallesPedido){
        DetallesPedido detallesPedidoById = detallesPedidoService.findById(newDetallesPedido.getIdDetalle());
        if (detallesPedidoById != null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else{
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(detallesPedidoService.createDetallesPedido(newDetallesPedido));
        }
    }


    @PutMapping("/update/detalles-pedido/{id}")
    public ResponseEntity<DetallesPedido> updateDetallesPedido(@RequestBody DetallesPedido newDetallesPedido,@PathVariable Long id){
        try {
            detallesPedidoService.updateDetallesPedido(newDetallesPedido, id);
            return ResponseEntity.noContent().build();
        }catch (DetallePedidoNotFound e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }



    @DeleteMapping("/delete/{id}")
    public ResponseEntity<DetallesPedido> deleteDetallesPedido(@PathVariable Long id){
        try {
            detallesPedidoService.deleteDetallesPedido(id);
            return ResponseEntity.noContent().build();
        }catch (DetallePedidoNotFound e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }



}
