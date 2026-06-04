package org.novenobyte.tintabrava.model;

import jakarta.persistence.*;

@Entity
@Table(name ="productos")
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_producto")
    private Long idProducto;

    @Column(name = "id_categoria", nullable = false)
    private Long idCategoria;

    @Column(name = "id_subcategoria", nullable = false)
    private Long idSubCategoria;

    @Column(name = "nombre_categoria", nullable = false, unique = true)
    private String nombreCategoria;

    @Column(name = "descripcion", nullable = false)
    private String descripcion;

    @Column(name = "stock", nullable = false)
    private Integer stock;

    @Column(name = "precio", nullable = false)
    private Double precio;

    @Column(name = "sku", nullable = false, unique = true)
    private Long sku;

    @Column(name = "imagen_principal", nullable = false, unique = true)
    private String imagenPrincipal;

    public Producto(Long idProducto, Long idCategoria, String nombreCategoria, Long idSubCategoria, String descripcion, Integer stock, Double precio, Long sku, String imagenPrincipal) {
        this.idProducto = idProducto;
        this.idCategoria = idCategoria;
        this.nombreCategoria = nombreCategoria;
        this.idSubCategoria = idSubCategoria;
        this.descripcion = descripcion;
        this.stock = stock;
        this.precio = precio;
        this.sku = sku;
        this.imagenPrincipal = imagenPrincipal;
    }

    public Producto() {
    }

    public Long getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(Long idProducto) {
        this.idProducto = idProducto;
    }

    public Long getIdCategoria() {
        return idCategoria;
    }

    public void setIdCategoria(Long idCategoria) {
        this.idCategoria = idCategoria;
    }

    public Long getIdSubCategoria() {
        return idSubCategoria;
    }

    public void setIdSubCategoria(Long idSubCategoria) {
        this.idSubCategoria = idSubCategoria;
    }

    public String getNombreCategoria() {
        return nombreCategoria;
    }

    public void setNombreCategoria(String nombreCategoria) {
        this.nombreCategoria = nombreCategoria;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public Long getSku() {
        return sku;
    }

    public void setSku(Long sku) {
        this.sku = sku;
    }

    public String getImagenPrincipal() {
        return imagenPrincipal;
    }

    public void setImagenPrincipal(String imagenPrincipal) {
        this.imagenPrincipal = imagenPrincipal;
    }

    @Override
    public String toString() {
        return "Producto{" +
                "idProducto=" + idProducto +
                ", idCategoria=" + idCategoria +
                ", idSubCategoria=" + idSubCategoria +
                ", nombreCategoria='" + nombreCategoria + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", stock=" + stock +
                ", precio=" + precio +
                ", sku=" + sku +
                ", imagenPrincipal='" + imagenPrincipal + '\'' +
                '}';
    }
}
