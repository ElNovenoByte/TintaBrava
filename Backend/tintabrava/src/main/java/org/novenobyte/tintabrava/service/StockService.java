package org.novenobyte.tintabrava.service;

import org.novenobyte.tintabrava.exceptions.StockNotFoundException;
import org.novenobyte.tintabrava.model.Stock;
import org.novenobyte.tintabrava.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StockService {
    private final StockRepository stockRepository;

    @Autowired
    public StockService(StockRepository stockRepository) {
        this.stockRepository = stockRepository;
    }

    //Get todos
    public List<Stock> getStock(){
        return stockRepository.findAll();
    }

    //Get por ID
    public Optional<Stock> getStockByID(Long id){
        if(stockRepository.existsById(id)){
            return stockRepository.findById(id);
        } else {
            throw new StockNotFoundException("No se encontró stock para ese producto");
        }
    }

    //Post
    public Stock nuevoStock(Stock nuevoStock){
        return stockRepository.save(nuevoStock);
    }

    //Delete por ID
    public void deleteStock(Long id){
        if(stockRepository.existsById(id)){
            stockRepository.deleteById(id);
        } else {
            throw new StockNotFoundException("No se encontró stock para ese producto.");
        }
    }
}
