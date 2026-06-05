package org.novenobyte.tintabrava.service;

import org.novenobyte.tintabrava.repository.SubCategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SubCategoriaService {
    private final SubCategoriaRepository subCategoriaRepository;

    @Autowired
    public SubCategoriaService(SubCategoriaRepository subCategoriaRepository){
        this.subCategoriaRepository = subCategoriaRepository;
    }
}
