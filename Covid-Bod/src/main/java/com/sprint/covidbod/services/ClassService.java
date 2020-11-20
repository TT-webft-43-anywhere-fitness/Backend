package com.sprint.covidbod.services;

import com.sprint.covidbod.models.Class;
import org.springframework.context.annotation.Bean;

import java.util.List;

public interface ClassService {

    List<Class> findAll();

    Class save(Class c);

    Class findClassById(long id);

    Class delete(long id);

    Class update(long id, Class c);

    public void deleteAll();
}
