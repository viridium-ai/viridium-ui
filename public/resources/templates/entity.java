package com.viridium.data.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.viridium.common.MyBuilder;
import com.viridium.CommonEntity;
import lombok.Data;

import javax.persistence.Entity;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity @Data
public class Emission  extends CommonEntity {
    private String level; //company, product, activity
    private String standard;
    private String category;
    private String period; //year
    private String scope; //scope 1, 2, 3
    private double co2;
    private double ch4;
    private double m2O;
    private double hfcs;
    private double pfcs;
    private double sf6;
    public String toString() {
        MyBuilder mb = new MyBuilder(super.toString()).append(period)
                .append(level).append(category).append(scope).append(standard).append(co2);
        return mb.toString();
    }
}