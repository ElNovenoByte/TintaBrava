package org.novenobyte.tintabrava.controller;

import org.novenobyte.tintabrava.model.SubCategory;
import org.novenobyte.tintabrava.service.SubCategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/sub-categoria")
public class SubCategoriaController {
    private final SubCategoriaService subCategoriaService;

    @Autowired
    public SubCategoriaController(SubCategoriaService subCategoriaService) {
        this.subCategoriaService = subCategoriaService;
    }

    @GetMapping("/getall")
    public List<SubCategory> getSubCategorias(){
        return subCategoriaService.getSubCategorias();
    }
}
