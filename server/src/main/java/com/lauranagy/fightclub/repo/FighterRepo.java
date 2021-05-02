package com.lauranagy.fightclub.repo;

import com.lauranagy.fightclub.model.Fighter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FighterRepo extends JpaRepository<Fighter, Long> {
    void deleteFighterById(Long id);

    Optional<Fighter> findFighterById(Long id);

    Optional<Fighter> findFighterByName(String name);
}
