package org.novenobyte.tintabrava.service;

import org.novenobyte.tintabrava.model.Category;
import org.novenobyte.tintabrava.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {
    private final CategoriaRepository categoriaRepository;

    @Autowired
    public CategoriaService(CategoriaRepository categoriaRepository){
        this.categoriaRepository = categoriaRepository;
    }

    //Método para buscar categoria por ID
    public Optional<Category> findCategoryByID(Long id){
        return categoriaRepository.findById(id);
    }

    //Get todos
    public List<Category> getCategorias(){
        return categoriaRepository.findAll();
    }
}
