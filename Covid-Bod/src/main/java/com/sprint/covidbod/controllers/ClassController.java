package com.sprint.covidbod.controllers;

import com.sprint.covidbod.models.Class;
import com.sprint.covidbod.services.ClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/class")
public class ClassController {

    @Autowired
    private ClassService classService;

    @GetMapping(value = "/classes", produces = "application/json")
    public ResponseEntity<?> listAllClasses() {
        List<Class> classList = classService.findAll();
        return new ResponseEntity<>(classList, HttpStatus.OK);
    }

    @GetMapping(value = "/class/{classid}", produces = "application/json")
    public ResponseEntity<?> getClassById(@PathVariable long classid){
        Class c = classService.findClassById(classid);
        return new ResponseEntity<>(c, HttpStatus.OK);
    }

    @PostMapping(value = "/class", consumes = "application/json")
    public ResponseEntity<?> addNewClass(
            @Valid
            @RequestBody
            Class newclass
    ) throws URISyntaxException {
        newclass.setClassid(0);
        newclass = classService.save(newclass);

        HttpHeaders responseHeaders = new HttpHeaders();
        URI newClassURI = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{classid}")
                .buildAndExpand(newclass.getClassid())
                .toUri();
        responseHeaders.setLocation(newClassURI);

        return new ResponseEntity<>(null, responseHeaders, HttpStatus.CREATED);
    }

    @PutMapping(value = "/class/{classid}", consumes = "application/json")
    public ResponseEntity<?> updateClass(@Valid
                                         @RequestBody
                                         Class updatedClass,
                                         @PathVariable long classid){
        updatedClass.setClassid(classid);
        classService.save(updatedClass);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping(value = "/class/{id}")
    public ResponseEntity<?> deleteClassById(@PathVariable long id) {
        classService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
