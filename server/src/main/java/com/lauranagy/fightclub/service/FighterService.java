package com.lauranagy.fightclub.service;

import com.lauranagy.fightclub.exception.UserNotFoundException;
import com.lauranagy.fightclub.model.Fighter;
import com.lauranagy.fightclub.repo.FighterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class FighterService {
    private final FighterRepo fighterRepo;

    @Autowired
    public FighterService(FighterRepo fighterRepo) {
        this.fighterRepo = fighterRepo;
    }

    public Fighter addFighter(Fighter fighter) {
        return fighterRepo.save(fighter);
    }

    public List<Fighter> findAllFighters() {
        return fighterRepo.findAll();
    }

    public Fighter updateFighter(Fighter fighter) {
        return fighterRepo.save(fighter);
    }

    public Fighter findFighterById(Long id) {
        return fighterRepo.findFighterById(id)
                .orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
    }

    public Fighter findFighterByName(String name) {
        return fighterRepo.findFighterByName(name)
                .orElseThrow(() -> new UserNotFoundException("User by name " + name + "was not found"));
    }
    public void deleteFighter(Long id) {
        fighterRepo.deleteFighterById(id);
    }
}
