package org.novenobyte.tintabrava.repository;

import org.novenobyte.tintabrava.model.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public interface SubCategoryRepository extends JpaRepository<SubCategory,Long>{}
