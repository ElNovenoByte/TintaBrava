package org.novenobyte.tintabrava.repository;

import org.novenobyte.tintabrava.model.DetallesPedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetallesPedidoRepository extends JpaRepository<DetallesPedido, Long> {
}
