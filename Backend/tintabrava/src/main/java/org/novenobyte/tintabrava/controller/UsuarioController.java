package org.novenobyte.tintabrava.controller;

import org.novenobyte.tintabrava.model.User;
import org.novenobyte.tintabrava.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios") // Definir un endpoint de Class (general)
@CrossOrigin(origins = "*")
public class UsuarioController {
    private final UsuarioService usuarioService;

    @Autowired
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    //Get
    @GetMapping("/get/todos/usuarios")
    public List<User> allUsuarios() {
        return usuarioService.getUsers();
    }

    //Post
    @PostMapping("/post/create")
    public ResponseEntity<User> createUser(@RequestBody User newUser) {

        User createdUser = usuarioService.createUser(newUser);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(createdUser);
    }


    //Put
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable Long id,
            @RequestBody User updatedUser) {
        User user = usuarioService.updateUser(id, updatedUser);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id){
        usuarioService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully");
    }
}
