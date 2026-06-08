package org.novenobyte.tintabrava.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "pedidos")
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pedido")
    private Long idPedido;

    @ManyToOne //Indicamos Muchos a uno porque este lado es el que puede ser varios.
    @JoinColumn(name = "id_cliente", nullable = false)
    private Cliente cliente;

    @Column(name = "fecha_pedido", nullable = false)
    private Date fechaPedido;

    @Column(name = "fecha_entrega", nullable = false)
    private Date fechaEntrega;

    //Mandamos esta a detallesPedidos
    @OneToMany(mappedBy = "idPedido", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<DetallesPedido> detallesPedidos = new ArrayList<>();

    public Pedido(Long idPedido, Cliente cliente, Date fechaPedido, Date fechaEntrega) {
        this.idPedido = idPedido;
        this.cliente = cliente;
        this.fechaPedido = fechaPedido;
        this.fechaEntrega = fechaEntrega;
    }

    public Pedido(){}

    public Long getIdPedido() {
        return idPedido;
    }

    public void setIdPedido(Long idPedido) {
        this.idPedido = idPedido;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Date getFechaPedido() {
        return fechaPedido;
    }

    public void setFechaPedido(Date fechaPedido) {
        this.fechaPedido = fechaPedido;
    }

    public Date getFechaEntrega() {
        return fechaEntrega;
    }

    public void setFechaEntrega(Date fechaEntrega) {
        this.fechaEntrega = fechaEntrega;
    }

    @Override
    public String toString() {
        return "Pedido{" +
                "idPedido=" + idPedido +
                ", cliente=" + cliente +
                ", fechaPedido=" + fechaPedido +
                ", fechaEntrega=" + fechaEntrega +
                '}';
    }
}
