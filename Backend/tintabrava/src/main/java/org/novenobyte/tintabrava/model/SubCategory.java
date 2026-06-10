package org.novenobyte.tintabrava.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "sub_categorias")
public class SubCategory {
    @Id //Se asigna llave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Para autoincrementar
    @Column(name = "id_sub_categoria")
    private Long idSubcategory;

    @Column(name = "nombre", nullable = false, length = 30, unique = true)
    private String nombre;

    @Column(name = "descripcion", nullable = false)
    private String descripcion;

    @OneToMany(mappedBy = "idSubCategoria", cascade = CascadeType.ALL, fetch = FetchType.LAZY) //Se supone lo de lazy es para no traer todos los pedidos de una vez
    private List<Producto> producto = new ArrayList<>();

    public SubCategory(Long idSubcategory, String nombre, String descripcion) {
        this.idSubcategory = idSubcategory;
        this.nombre = nombre;
        this.descripcion = descripcion;
    }

    public Long getIdSubcategory() {
        return idSubcategory;
    }

    public void setIdSubcategory(Long idSubcategory) {
        this.idSubcategory = idSubcategory;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    @Override
    public String toString() {
        return "SubCategory{" +
                "idSubcategory=" + idSubcategory +
                ", nombre='" + nombre + '\'' +
                ", descripcion='" + descripcion + '\'' +
                '}';
    }
}
