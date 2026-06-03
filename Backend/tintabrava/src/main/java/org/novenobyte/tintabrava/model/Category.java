package org.novenobyte.tintabrava.model;

import jakarta.persistence.*;

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
