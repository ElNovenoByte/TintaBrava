package org.novenobyte.tintabrava.service;

import org.novenobyte.tintabrava.model.SubCategory;
import org.novenobyte.tintabrava.repository.SubCategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubCategoriaService {
    private final SubCategoriaRepository subCategoriaRepository;

    @Autowired
    public SubCategoriaService(SubCategoriaRepository subCategoriaRepository){
        this.subCategoriaRepository = subCategoriaRepository;
    }

    public List<SubCategory> getAll() {
        return subCategoriaRepository.findAll();
    }

    public SubCategory getById(Long id) {
        return subCategoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("SubCategoría no encontrada con id: " + id));
    }

    public SubCategory save(SubCategory subCategoria) {
        return subCategoriaRepository.save(subCategoria);
    }

    public SubCategory update(Long id, SubCategory subCategoria) {
        SubCategory existing = getById(id);
        existing.setNombre(subCategoria.getNombre());
        existing.setDescripcion(subCategoria.getDescripcion());
        return subCategoriaRepository.save(existing);
    }

    public void delete(Long id) {
        getById(id); // valida que exista antes de borrar
        subCategoriaRepository.deleteById(id);
    }

}
