package org.novenobyte.tintabrava.controller;

import org.novenobyte.tintabrava.exceptions.StockNotFoundException;
import org.novenobyte.tintabrava.model.Stock;
import org.novenobyte.tintabrava.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/stock")
@CrossOrigin(origins = "*")
public class StockController {
    private final StockService stockService;

    @Autowired
    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    //Endpoint para get todos
    @GetMapping("/get/todos")
    public List<Stock> getStocks(){
        return stockService.getStock();
    }

    //Endpoint para get por id
    @GetMapping("/get/{id}")
    public ResponseEntity<Optional<Stock>> getStockByID(@PathVariable Long id){
        try{
            return ResponseEntity.ok(stockService.getStockByID(id));
        } catch (StockNotFoundException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //Endpoint para post
    @PostMapping("/post/nuevo-stock")
    public ResponseEntity<Stock> nuevoStock(@RequestBody Stock nuevoStock){
        Stock stockCreado = stockService.nuevoStock(nuevoStock);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(stockCreado);
    }

    //Endpoint para delete
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Stock> stockBorrarByID(@PathVariable Long id){
        try{
            stockService.deleteStock(id);
            return ResponseEntity.noContent().build();
        } catch (StockNotFoundException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
