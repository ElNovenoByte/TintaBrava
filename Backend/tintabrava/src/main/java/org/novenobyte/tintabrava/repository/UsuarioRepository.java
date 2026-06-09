package org.novenobyte.tintabrava.repository;

import org.novenobyte.tintabrava.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<User, Long> {

    User findByCorreo(String correo);

    User findByTelefono(String telefono);

    boolean existsByCorreo(String correo);

}