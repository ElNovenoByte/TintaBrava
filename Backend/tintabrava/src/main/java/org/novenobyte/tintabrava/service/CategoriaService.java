package org.novenobyte.tintabrava.service;

import org.novenobyte.tintabrava.model.Category;
import org.novenobyte.tintabrava.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {
    private final CategoriaRepository categoriaRepository;

    @Autowired
    public CategoriaService(CategoriaRepository categoriaRepository){
        this.categoriaRepository = categoriaRepository;
    }

    public List<Category> getAll() {
        return categoriaRepository.findAll();
    }

    public Category getById(Long id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada con id: " + id));
    }

    public Category save(Category categoria) {
        if (categoriaRepository.existsByNombre(categoria.getNombre())) {
            throw new RuntimeException("Ya existe una categoría con ese nombre");
        }
        return categoriaRepository.save(categoria);
    }

    public Category update(Long id, Category categoria) {
        Category existing = getById(id);
        existing.setNombre(categoria.getNombre());
        return categoriaRepository.save(existing);
    }

    public void delete(Long id) {
        getById(id); // valida que exista antes de poder borrar
        categoriaRepository.deleteById(id);
    }

}
