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

    //Get
    public List<SubCategory> getSubCategorias(){
        return subCategoriaRepository.findAll();
    }
}
