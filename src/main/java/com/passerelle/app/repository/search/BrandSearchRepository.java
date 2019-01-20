package com.passerelle.app.repository.search;

import com.passerelle.app.domain.Brand;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Brand entity.
 */
public interface BrandSearchRepository extends ElasticsearchRepository<Brand, Long> {
}
