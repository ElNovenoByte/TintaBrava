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

    @Column(name = "id_usuario", nullable = false)
    private Long idUsuario;

    @Column(name = "id_pedido", nullable = false)
    private Long idPedido;

    @Column(name = "direccion", nullable = false)
    private String direccion;

    public Cliente(Long idCliente, Long idUsuario, Long idPedido, String direccion) {
        this.idCliente = idCliente;
        this.idUsuario = idUsuario;
        this.idPedido = idPedido;
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

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Long getIdPedido() {
        return idPedido;
    }

    public void setIdPedido(Long idPedido) {
        this.idPedido = idPedido;
    }

    @Override
    public String toString() {
        return "Cliente{" +
                "idCliente=" + idCliente +
                ", idUsuario=" + idUsuario +
                ", idPedido=" + idPedido +
                ", direccion='" + direccion + '\'' +
                '}';
    }
}
