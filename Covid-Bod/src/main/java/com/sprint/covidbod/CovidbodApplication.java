package com.sprint.covidbod;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class CovidbodApplication {

    public static void main(String[] args) {
        SpringApplication.run(CovidbodApplication.class, args);
    }

}
