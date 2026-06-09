package org.novenobyte.tintabrava.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name ="productos")
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_producto")
    private Long idProducto;

    @ManyToOne
    @JoinColumn(name = "id_categoria", nullable = false)
    private Category idCategoria;

    @ManyToOne
    @JoinColumn(name = "id_subcategoria", nullable = false)
    private SubCategory idSubCategoria;

    @Column(name = "nombre_producto", nullable = false, unique = true)
    private String nombreProducto;

    @Column(name = "descripcion", nullable = false)
    private String descripcion;

    @Column(name = "precio", nullable = false)
    private Double precio;

    @Column(name = "sku", nullable = false, unique = true)
    private Long sku;

    @Column(name = "imagen_principal", nullable = false, unique = true)
    private String imagenPrincipal;

    //Mandamos esta ID a Producto
    @OneToMany(mappedBy = "idProducto", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<DetallesPedido> detallesPedido = new ArrayList<>();

    public Producto(Long idProducto, Category idCategoria, String nombreProducto, SubCategory idSubCategoria, String descripcion, Integer stock, Double precio, Long sku, String imagenPrincipal) {
        this.idProducto = idProducto;
        this.idCategoria = idCategoria;
        this.nombreProducto = nombreProducto;
        this.idSubCategoria = idSubCategoria;
        this.descripcion = descripcion;
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

    public Category getIdCategoria() {
        return idCategoria;
    }

    public void setIdCategoria(Category idCategoria) {
        this.idCategoria = idCategoria;
    }

    public SubCategory getIdSubCategoria() {
        return idSubCategoria;
    }

    public void setIdSubCategoria(SubCategory idSubCategoria) {
        this.idSubCategoria = idSubCategoria;
    }

    public String getNombreProducto() {
        return nombreProducto;
    }

    public void setNombreProducto(String nombreProducto) {
        this.nombreProducto = nombreProducto;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
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

    public List<DetallesPedido> getDetallesPedido() {
        return detallesPedido;
    }

    public void setDetallesPedido(List<DetallesPedido> detallesPedido) {
        this.detallesPedido = detallesPedido;
    }

    @Override
    public String toString() {
        return "Producto{" +
                "idProducto=" + idProducto +
                ", idCategoria=" + idCategoria +
                ", idSubCategoria=" + idSubCategoria +
                ", nombreProducto='" + nombreProducto + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", precio=" + precio +
                ", sku=" + sku +
                ", imagenPrincipal='" + imagenPrincipal + '\'' +
                ", detallesPedido=" + detallesPedido +
                '}';
    }
}
