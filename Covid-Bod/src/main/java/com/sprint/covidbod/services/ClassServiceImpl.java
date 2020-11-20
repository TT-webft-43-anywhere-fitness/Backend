package com.sprint.covidbod.services;

import com.sprint.covidbod.exceptions.ResourceNotFoundException;
import com.sprint.covidbod.models.Class;
import com.sprint.covidbod.repository.ClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service(value = "classService")
public class ClassServiceImpl implements ClassService{

    @Autowired
    private ClassRepository classrepo;


    @Override
    public List<Class> findAll() {
        List<Class> list = new ArrayList<>();
        classrepo.findAll().iterator().forEachRemaining(list::add);
        return list;
    }

    @Override
    public Class save(Class c) {

        Class newClass = new Class();

        if (c.getClassid() != 0) {
            classrepo.findById(c.getClassid())
                    .orElseThrow(() -> new ResourceNotFoundException("Class id " + c.getClassid() + " not found"));
        }

        newClass.setName(c.getName());
        newClass.setType(c.getType());
        newClass.setStarttime(c.getStarttime());
        newClass.setDuration(c.getDuration());
        newClass.setIntensity(c.getIntensity());
        newClass.setLocation(c.getLocation());
        newClass.setCurrclasssize(c.getCurrclasssize());
        newClass.setMaxclasssize(c.getMaxclasssize());
        newClass.setUser(c.getUser());

        return classrepo.save(newClass);

    }

    @Override
    public Class findClassById(long id) throws ResourceNotFoundException {
        return classrepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Class id " + id + " not found"));
    }

    @Override
    public Class delete(long id) {
        return null;
    }

    @Override
    public Class update(long id, Class c) {
        Class currClass = findClassById(id);

        if (c.getUser() != null) {
            currClass.setUser(c.getUser());
        }

        if (c.getType() != null) {
            currClass.setType(c.getType());
        }

        if (c.getType() != null) {
            currClass.setStarttime(c.getStarttime());
        }

        if (c.durationHasValue == true) {
            currClass.setDuration(c.getDuration());
        }

        if (c.getIntensity() != null) {
            currClass.setIntensity(c.getIntensity());
        }

        if (c.getLocation() != null) {
            currClass.setLocation(c.getLocation());
        }

        if (c.currClassSizeHasValue == true ) {
        currClass.setCurrclasssize(c.getCurrclasssize());
        }

        if (c.maxClassSizeHasValue == true) {
        currClass.setMaxclasssize(c.getMaxclasssize());
        }

        if (c.getUser() != null){
        currClass.setUser(c.getUser());
        }

        return classrepo.save(currClass);
    }

    @Override
    public void deleteAll() {
        classrepo.deleteAll();
    }
}
