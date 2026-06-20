package org.novenobyte.tintabrava.service;

import org.novenobyte.tintabrava.exceptions.UserNotFoundException;
import org.novenobyte.tintabrava.model.User;
import org.novenobyte.tintabrava.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.novenobyte.tintabrava.model.Cliente;
import org.novenobyte.tintabrava.repository.ClienteRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
    private final ClienteRepository clienteRepository;

    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository,
                          ClienteRepository clienteRepository){
        this.usuarioRepository = usuarioRepository;
        this.clienteRepository = clienteRepository;
    }

    // Get
    // Obtener usuarios
    public List<User> getUsers() {
        return usuarioRepository.findAll();
    }

    //Obtener usuario por correo
    public User getUserByCorreo(String correo){
        return usuarioRepository.findByCorreo(correo);
    }

    // Post
    // Crear usuario
    @Transactional
    public User createUser(User newUser){

        if(usuarioRepository.existsByCorreo(newUser.getCorreo())){
            throw new RuntimeException("Email already exist");
        }

        if(usuarioRepository.existsByTelefono(newUser.getTelefono())){
            throw new RuntimeException("Phone already exist");
        }

        User usuarioGuardado = usuarioRepository.save(newUser);

        Cliente cliente = new Cliente();
        cliente.setUsuario(usuarioGuardado);

        clienteRepository.save(cliente);

        return usuarioGuardado;
    }

    // Put
    // Actualizar usuarios
    public User updateUser(Long id, User updatedUser){

        User user = usuarioRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("Not found user with id: " + id));

        user.setNombre(updatedUser.getNombre());
        user.setApellido(updatedUser.getApellido());
        user.setCorreo(updatedUser.getCorreo());
        user.setTelefono(updatedUser.getTelefono());
        user.setContrasena(updatedUser.getContrasena());

        return usuarioRepository.save(user);
    }

    // Delete
    public void deleteUser(Long id){
        if (usuarioRepository.existsById(id)){
            usuarioRepository.deleteById(id);
        } else {
            throw new UserNotFoundException(
                    "User not found with id: " + id);
        }
    }
    // Eliminar por correo
     public void deleteUserByCorreo(String correo){
        User user = usuarioRepository.findByCorreo(correo);

        if (user != null){
            usuarioRepository.delete(user);
        } else {
            throw new UserNotFoundException(
                    "User not found with email: " + correo);
        }
    }
    // Eliminar por telefono
    public void deleteUserByTelefono(String telefono){
        User user = usuarioRepository.findByTelefono(telefono);

        if (user != null){
            usuarioRepository.delete(user);
        } else {
            throw new UserNotFoundException(
                    "User not found with phone: " + telefono);
        }
    }

    // Validar si el correo existe
    public boolean existsCorreo(String correo){
        return usuarioRepository.existsByCorreo(correo);
    }


}
