package org.novenobyte.tintabrava.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "clientes")
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cliente")
    private Long idCliente;

    @OneToOne // Indicamos que es FK. Va a venir desde Usuario
    @JoinColumn(name = "id_usuario", nullable = false)
    private User usuario;

    @Column(name = "direccion", nullable = false)
    private String direccion;

    // Indicamos Onetomany porque este lado es el que solo se puede UNO.
    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, fetch = FetchType.LAZY) //Se supone lo de lazy es para no traer todos los pedidos de una vez
    private List<Pedido> pedidos = new ArrayList<>();

    public Cliente(Long idCliente, User usuario, String direccion) {
        this.idCliente = idCliente;
        this.usuario = usuario;
        this.direccion = direccion;
    }

    public Cliente() {
    }

    public Long getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Long idCliente) {
        this.idCliente = idCliente;
    }

    public User getUsuario() {
        return usuario;
    }

    public void setUsuario(User usuario) {
        this.usuario = usuario;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    @Override
    public String toString() {
        return "Cliente{" +
                "idCliente=" + idCliente +
                ", usuario=" + usuario +
                ", direccion='" + direccion + '\'' +
                '}';
    }
}
