package org.novenobyte.tintabrava.repository;

import org.novenobyte.tintabrava.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    Producto findBySku(Long sku);
    boolean existsBySku(Long sku);
    List<Producto> findByIdCategoria_IdCategoria(Long idCategoria);
}
