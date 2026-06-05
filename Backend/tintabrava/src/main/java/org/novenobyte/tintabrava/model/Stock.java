package org.novenobyte.tintabrava.model;

import jakarta.persistence.*;

@Entity
@Table(name = "stock")
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_stock")
    private Long idStock;

    @Column(name = "id_producto",nullable = false)
    private Long idProducto;

    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;

    public Stock(Long idStock, Long idProducto, Integer cantidad) {
        this.idStock = idStock;
        this.idProducto = idProducto;
        this.cantidad = cantidad;
    }

    public Stock() {
    }

    public Long getIdStock() {
        return idStock;
    }

    public void setIdStock(Long idStock) {
        this.idStock = idStock;
    }

    public Long getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(Long idProducto) {
        this.idProducto = idProducto;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    @Override
    public String toString() {
        return "Stock{" +
                "idStock=" + idStock +
                ", idProducto=" + idProducto +
                ", cantidad=" + cantidad +
                '}';
    }
}
