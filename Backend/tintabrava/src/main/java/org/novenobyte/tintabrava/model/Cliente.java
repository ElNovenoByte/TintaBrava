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

    @Column(name = "direccion", nullable = false)
    private String direccion;



    // Relacion de 1 a 1 ( 1 : 1)
    @OneToOne
    @JoinColumn(name = "cliente_id_usuario")
    private User usuario;


    @OneToMany
    @JoinColumn(name = "cliente_id_pedido")
    private Pedido pedido;


    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Pedido> pedidos = new ArrayList<>();


}
