package org.novenobyte.tintabrava.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "usuarios")
public class User {
    @Id //Se asigna llave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Para autoincrementar
    @Column(name = "id_usuario")
    private Long idUsuario;

    @Column(name = "nombre", nullable = false, length = 20) // No puede ser null, maximo 20 caracteres
    private String nombre;

    @Column(name = "apellido", nullable = false, length = 20)// No puede ser null, maximo 20 caracteres
    private String apellido;

    @Column(name = "correo", nullable = false, unique = true)//No puede ser null, no puede repetirse
    private String correo;

    @Column(name = "telefono", nullable = false, unique = true, length = 10)//No puede ser null, no puede repetirse
    private String telefono;


    @Column(name = "contrasena", nullable = false, length = 20) //No puede ser null
    private String contrasena;

    public User(Long idUsuario, Boolean admin, String nombre, String apellido, String correo, String telefono, String contrasena) {
        this.idUsuario = idUsuario;
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.telefono = telefono;
        this.contrasena = contrasena;
    }

    public User(){} //Constructor vacio para JPA

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    @Override
    public String toString() {
        return "User{" +
                "idUsuario=" + idUsuario +
                ", nombre='" + nombre + '\'' +
                ", apellido='" + apellido + '\'' +
                ", correo='" + correo + '\'' +
                ", telefono='" + telefono + '\'' +
                ", contrasena='" + contrasena + '\'' +
                '}';
    }
}
