package com.passerelle.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A SubCategory.
 */
@Entity
@Table(name = "sub_category")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "subcategory")
public class SubCategory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "alcohol")
    private Boolean alcohol;

    @ManyToOne
    @JsonIgnoreProperties("subcategories")
    private Category category;

    @ManyToOne
    @JsonIgnoreProperties("subcategories")
    private Product product;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public SubCategory name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean isAlcohol() {
        return alcohol;
    }

    public SubCategory alcohol(Boolean alcohol) {
        this.alcohol = alcohol;
        return this;
    }

    public void setAlcohol(Boolean alcohol) {
        this.alcohol = alcohol;
    }

    public Category getCategory() {
        return category;
    }

    public SubCategory category(Category category) {
        this.category = category;
        return this;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Product getProduct() {
        return product;
    }

    public SubCategory product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        SubCategory subCategory = (SubCategory) o;
        if (subCategory.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), subCategory.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SubCategory{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", alcohol='" + isAlcohol() + "'" +
            "}";
    }
}
