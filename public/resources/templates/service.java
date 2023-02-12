package com.viridium.data.service;

import com.viridium.data.model.Emission;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface EmissionRepo extends CrudRepository<Emission, String>, JpaSpecificationExecutor<Emission> {

    Page<Emission> findByNameLike(String name, Pageable pageable);

    @Query("select u from Emission u where lower(u.text) like lower(concat('%', ?1,'%'))")
    List<Emission> findByTextFree(String text);
}