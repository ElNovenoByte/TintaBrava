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

    @Column(name = "imagen_1", nullable = false)
    private String imagen1;

    @Column(name = "imagen_2", nullable = false)
    private String imagen2;

    @Column(name = "imagen_3", nullable = false)
    private String imagen3;

    //Mandamos esta ID a Producto
    @OneToMany(mappedBy = "idProducto", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<DetallesPedido> detallesPedido = new ArrayList<>();

    public Producto(Long idProducto, Category idCategoria, SubCategory idSubCategoria, String nombreProducto, String descripcion, Double precio, Long sku, String imagen1, String imagen2, String imagen3, List<DetallesPedido> detallesPedido) {
        this.idProducto = idProducto;
        this.idCategoria = idCategoria;
        this.idSubCategoria = idSubCategoria;
        this.nombreProducto = nombreProducto;
        this.descripcion = descripcion;
        this.precio = precio;
        this.sku = sku;
        this.imagen1 = imagen1;
        this.imagen2 = imagen2;
        this.imagen3 = imagen3;
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

    public String getImagen1() {
        return imagen1;
    }

    public void setImagen1(String imagen1) {
        this.imagen1 = imagen1;
    }

    public String getImagen2() {
        return imagen2;
    }

    public void setImagen2(String imagen2) {
        this.imagen2 = imagen2;
    }

    public String getImagen3() {
        return imagen3;
    }

    public void setImagen3(String imagen3) {
        this.imagen3 = imagen3;
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
                ", imagen1='" + imagen1 + '\'' +
                ", imagen2='" + imagen2 + '\'' +
                ", imagen3='" + imagen3 + '\'' +
                '}';
    }
}
