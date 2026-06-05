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


    @Column(name = "id_cliente", nullable = false)
    private Long idCliente;


    @Column(name = "fecha_pedido", nullable = false)
    private Date fechaPedido;

    @Column(name = "fecha_entrega", nullable = false)
    private Date fechaEntrega;



}
