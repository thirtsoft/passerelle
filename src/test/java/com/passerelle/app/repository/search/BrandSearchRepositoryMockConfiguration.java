package com.passerelle.app.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of BrandSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class BrandSearchRepositoryMockConfiguration {

    @MockBean
    private BrandSearchRepository mockBrandSearchRepository;

}
