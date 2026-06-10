package org.novenobyte.tintabrava.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="categorias")
public class Category {
    @Id //Se asigna llave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Para autoincrementar
    @Column(name = "id_categoria")
    private Long idCategory;

    @Column(name = "nombre", nullable = false, length = 30, unique = true)
    private String nombre;

    public Category(String nombre, Long idCategory) {
        this.nombre = nombre;
        this.idCategory = idCategory;
    }

    @OneToMany(mappedBy = "idCategoria", cascade = CascadeType.ALL, fetch = FetchType.LAZY) //Se supone lo de lazy es para no traer todos los pedidos de una vez
    private List<Producto> producto = new ArrayList<>();

    public Category(){} //JPA Constructor

    public Long getIdCategory() {
        return idCategory;
    }

    public void setIdCategory(Long idCategory) {
        this.idCategory = idCategory;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    @Override
    public String toString() {
        return "Category{" +
                "idCategory=" + idCategory +
                ", nombre='" + nombre + '\'' +
                '}';
    }
}
