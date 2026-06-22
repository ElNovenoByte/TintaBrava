package org.novenobyte.tintabrava.controller;

import org.apache.coyote.Response;
import org.novenobyte.tintabrava.model.Cliente;
import org.novenobyte.tintabrava.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/clientes")
public class ClienteController {
    private final ClienteService clienteService;

    @Autowired
    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    // Obtener todos los clientes
    @GetMapping("/get/api/clientes")
    public List<Cliente> getClientes(){
        return clienteService.getClientes();
    }

    //Obtener cliente por id
    @GetMapping("/{id}")
    public ResponseEntity<Cliente> getClientesByid(
            @PathVariable Long id){
        return ResponseEntity.ok(
                clienteService.getClienteById(id)
        );
    }

    // Obetener cliente por usuario
    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<Cliente> getClienteByUsuario(
            @PathVariable Long idUsuario){
        return ResponseEntity.ok(
                clienteService.getClienteByUsuario(idUsuario)
        );
    }

    // Crear cliente
    @PostMapping("/usuario/{idUsuario}")
    public ResponseEntity<Cliente> createCliente(
            @PathVariable Long idUsuario,
            @RequestBody Cliente nuevoCliente){
        Cliente clienteCreado =
                clienteService.createCliente(
                        idUsuario,
                        nuevoCliente);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(clienteCreado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cliente> updateCliente(
            @PathVariable Long id,
            @RequestBody Cliente updatedCliente){
        Cliente cliente =
                clienteService.updateCliente(
                        id,
                        updatedCliente);
        return ResponseEntity.ok(cliente);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCliente(
            @PathVariable Long id){
        clienteService.deleteCliente(id);

        return ResponseEntity.ok(
                "Cliente deleted successfully");
    }

}
