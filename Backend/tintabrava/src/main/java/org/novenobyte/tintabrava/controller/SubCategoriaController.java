package org.novenobyte.tintabrava.controller;

import org.novenobyte.tintabrava.model.SubCategory;
import org.novenobyte.tintabrava.service.SubCategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sub-categoria")
public class SubCategoriaController {
    private final SubCategoriaService subCategoriaService;

    @Autowired
    public SubCategoriaController(SubCategoriaService subCategoriaService) {
        this.subCategoriaService = subCategoriaService;
    }

    @GetMapping
    public ResponseEntity<List<SubCategory>> getAll() {
        return ResponseEntity.ok(subCategoriaService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubCategory> getById(@PathVariable Long id) {
        return ResponseEntity.ok(subCategoriaService.getById(id));
    }

    @PostMapping
    public ResponseEntity<SubCategory> create(@RequestBody SubCategory subCategoria) {
        return ResponseEntity.status(HttpStatus.CREATED).body(subCategoriaService.save(subCategoria));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SubCategory> update(@PathVariable Long id, @RequestBody SubCategory subCategoria) {
        return ResponseEntity.ok(subCategoriaService.update(id, subCategoria));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        subCategoriaService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
