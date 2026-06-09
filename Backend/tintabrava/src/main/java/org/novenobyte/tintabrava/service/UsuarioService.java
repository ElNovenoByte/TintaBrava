package org.novenobyte.tintabrava.service;

import org.novenobyte.tintabrava.exceptions.UserNotFoundException;
import org.novenobyte.tintabrava.model.User;
import org.novenobyte.tintabrava.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;

    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository){
        this.usuarioRepository = usuarioRepository;
    }

    // Get
    public List<User> getUsers() {
        return usuarioRepository.findAll();
    }

    // Post
    public User createUser(User newUser){
        return usuarioRepository.save(newUser);
    }

    // Put

    public User updateUser(Long id, User updatedUser){

        User user = usuarioRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id)); //Revisar esto

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

     public void deleteUserByCorreo(String correo){
        User user = usuarioRepository.findByCorreo(correo);

        if (user != null){
            usuarioRepository.delete(user);
        } else {
            throw new UserNotFoundException(
                    "User not found with email: " + correo);
        }
    }

    public void deleteUserByTelefono(String telefono){
        User user = usuarioRepository.findByTelefono(telefono);

        if (user != null){
            usuarioRepository.delete(user);
        } else {
            throw new UserNotFoundException(
                    "User not found with phone: " + telefono);
        }
    }


}
