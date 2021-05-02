package com.lauranagy.fightclub;

import com.lauranagy.fightclub.model.Fighter;
import com.lauranagy.fightclub.service.FighterService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fighter")
public class FighterResource {
    private final FighterService fighterService;

    public FighterResource(FighterService fighterService) {
        this.fighterService = fighterService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Fighter>> getAllFighters() {
        List<Fighter> fighters = fighterService.findAllFighters();
        return new ResponseEntity<>(fighters, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Fighter> getFighterById (@PathVariable("id") Long id) {
        Fighter fighter = fighterService.findFighterById(id);
        return new ResponseEntity<>(fighter, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Fighter> addFighter(@RequestBody Fighter fighter) {
        Fighter newFighter = fighterService.addFighter(fighter);
        return new ResponseEntity<>(newFighter, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Fighter> updateFighter(@RequestBody Fighter fighter) {
        Fighter updateFighter = fighterService.updateFighter(fighter);
        return new ResponseEntity<>(updateFighter, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteFighter(@PathVariable("id") Long id) {
        fighterService.deleteFighter(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
