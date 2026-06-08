package org.novenobyte.tintabrava.controller;

import org.novenobyte.tintabrava.exceptions.ProductoNotFound;
import org.novenobyte.tintabrava.model.Producto;
import org.novenobyte.tintabrava.model.User;
import org.novenobyte.tintabrava.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios") // Definir un endpoint de Class (general)
public class UsuarioController {
    private final UsuarioService usuarioService;

    @Autowired
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    //Get
    @GetMapping("/get/todos/usuarios")
    public List<User> allUsuarios(){
        return usuarioService.getUsers();
    }

    //Post
    @PostMapping("/post/create")
    public ResponseEntity<User> createUser(@RequestBody User newUser){

        User createdUser = usuarioService.createUser(newUser);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(createdUser);
    }
    /*
    //Post
    @PostMapping("/post/nuevo-producto")
    public ResponseEntity<Producto> createProducto(@RequestBody Producto newProducto){
        Producto productoBySku = productoService.findProductoBySku(newProducto.getSku());

        //Validar si el producto existe por sku
        if(productoBySku != null){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        } else {
            //Si un producto no existe, lanzar un estatus: 201 CREATE
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(productoService.createProducto(newProducto));
        }
    }


     */


}
