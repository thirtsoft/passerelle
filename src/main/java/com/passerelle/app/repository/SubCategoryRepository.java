package com.passerelle.app.repository;

import com.passerelle.app.domain.SubCategory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SubCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubCategoryRepository extends JpaRepository<SubCategory, Long> {

}
