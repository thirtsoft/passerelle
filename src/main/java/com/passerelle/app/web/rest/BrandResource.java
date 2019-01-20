package com.passerelle.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.passerelle.app.domain.Brand;
import com.passerelle.app.repository.BrandRepository;
import com.passerelle.app.repository.search.BrandSearchRepository;
import com.passerelle.app.web.rest.errors.BadRequestAlertException;
import com.passerelle.app.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Brand.
 */
@RestController
@RequestMapping("/api")
public class BrandResource {

    private final Logger log = LoggerFactory.getLogger(BrandResource.class);

    private static final String ENTITY_NAME = "brand";

    private final BrandRepository brandRepository;

    private final BrandSearchRepository brandSearchRepository;

    public BrandResource(BrandRepository brandRepository, BrandSearchRepository brandSearchRepository) {
        this.brandRepository = brandRepository;
        this.brandSearchRepository = brandSearchRepository;
    }

    /**
     * POST  /brands : Create a new brand.
     *
     * @param brand the brand to create
     * @return the ResponseEntity with status 201 (Created) and with body the new brand, or with status 400 (Bad Request) if the brand has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/brands")
    @Timed
    public ResponseEntity<Brand> createBrand(@RequestBody Brand brand) throws URISyntaxException {
        log.debug("REST request to save Brand : {}", brand);
        if (brand.getId() != null) {
            throw new BadRequestAlertException("A new brand cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Brand result = brandRepository.save(brand);
        brandSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/brands/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /brands : Updates an existing brand.
     *
     * @param brand the brand to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated brand,
     * or with status 400 (Bad Request) if the brand is not valid,
     * or with status 500 (Internal Server Error) if the brand couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/brands")
    @Timed
    public ResponseEntity<Brand> updateBrand(@RequestBody Brand brand) throws URISyntaxException {
        log.debug("REST request to update Brand : {}", brand);
        if (brand.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Brand result = brandRepository.save(brand);
        brandSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, brand.getId().toString()))
            .body(result);
    }

    /**
     * GET  /brands : get all the brands.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of brands in body
     */
    @GetMapping("/brands")
    @Timed
    public List<Brand> getAllBrands() {
        log.debug("REST request to get all Brands");
        return brandRepository.findAll();
    }

    /**
     * GET  /brands/:id : get the "id" brand.
     *
     * @param id the id of the brand to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the brand, or with status 404 (Not Found)
     */
    @GetMapping("/brands/{id}")
    @Timed
    public ResponseEntity<Brand> getBrand(@PathVariable Long id) {
        log.debug("REST request to get Brand : {}", id);
        Optional<Brand> brand = brandRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(brand);
    }

    /**
     * DELETE  /brands/:id : delete the "id" brand.
     *
     * @param id the id of the brand to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/brands/{id}")
    @Timed
    public ResponseEntity<Void> deleteBrand(@PathVariable Long id) {
        log.debug("REST request to delete Brand : {}", id);

        brandRepository.deleteById(id);
        brandSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/brands?query=:query : search for the brand corresponding
     * to the query.
     *
     * @param query the query of the brand search
     * @return the result of the search
     */
    @GetMapping("/_search/brands")
    @Timed
    public List<Brand> searchBrands(@RequestParam String query) {
        log.debug("REST request to search Brands for query {}", query);
        return StreamSupport
            .stream(brandSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
