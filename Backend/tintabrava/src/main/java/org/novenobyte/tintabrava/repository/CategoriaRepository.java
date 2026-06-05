package org.novenobyte.tintabrava.repository;

import org.novenobyte.tintabrava.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepository extends JpaRepository<Category, Long> {
}
