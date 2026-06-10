package org.novenobyte.tintabrava.service;

import org.novenobyte.tintabrava.exceptions.ClienteNotFoundException;
import org.novenobyte.tintabrava.exceptions.UserNotFoundException;
import org.novenobyte.tintabrava.model.Cliente;
import org.novenobyte.tintabrava.model.User;
import org.novenobyte.tintabrava.repository.ClienteRepository;
import org.novenobyte.tintabrava.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {
    private final ClienteRepository clienteRepository;
    private final UsuarioRepository usuarioRepository;

    @Autowired
    public ClienteService(ClienteRepository clienteRepository,
                          UsuarioRepository usuarioRepository){
        this.clienteRepository = clienteRepository;
        this.usuarioRepository = usuarioRepository;
    }

    // Obtener todos los clientes
    public List<Cliente> getClientes(){
        return clienteRepository.findAll();
    }

    // Obtener por ID
    public Cliente getClienteById(Long id){
        return clienteRepository.findById(id)
                .orElseThrow(() ->
                        new ClienteNotFoundException(
                         "Cliente not found with id: " + id));
    }

    // Obtener cliente de un usuario
    public Cliente getClienteByUsuario(Long idUsuario){
        Cliente cliente = clienteRepository.findByUsuarioIdUsuario(idUsuario);

        if(cliente == null){
            throw new ClienteNotFoundException(
                    "No costumer found for user: " + idUsuario);
        }
        return cliente;
    }

    // Crear cliente

    public Cliente createCliente(
            Long idUsuario,
            Cliente nuevoCliente){
        User usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() ->
                        new UserNotFoundException(
                                "User not found with id: " + idUsuario));
        if(clienteRepository.existsByUsuarioIdUsuario(idUsuario)){
            throw new RuntimeException(
                    "This user already has a customer profile");
        }

        nuevoCliente.setUsuario(usuario);

        return clienteRepository.save(nuevoCliente);
    }

    public Cliente updateCliente(
            Long id,
            Cliente updatedCliente){
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() ->
                new ClienteNotFoundException(
                        "Cliente not found with id: " + id));
        cliente.setDireccion(
                updatedCliente.getDireccion());
        return clienteRepository.save(cliente);
    }

    public void deleteCliente(Long id){
        if(clienteRepository.existsById(id)){
            clienteRepository.deleteById(id);
        } else {
            throw new ClienteNotFoundException(
                    "Cliente not found with id: " + id);
        }
    }

    public boolean usuarioYaEsCliente(Long idUsuario){
        return clienteRepository
                .existsByUsuarioIdUsuario(idUsuario);
    }

    public boolean clienteExistsByUsuarioId(Long id){
        return clienteRepository.existsByUsuarioIdUsuario(id);
    }

}
