package com.plantcare.ai.repository;

import com.plantcare.ai.model.SoilScanRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SoilRepository extends JpaRepository<SoilScanRecord, Long> {
    List<SoilScanRecord> findTop20ByOrderByCreatedAtDesc();
    List<SoilScanRecord> findByUserIdentifierOrderByCreatedAtDesc(String userIdentifier);
}
