package com.sprint.covidbod.services;


import com.sprint.covidbod.CovidbodApplication;
import com.sprint.covidbod.models.Class;
import com.sprint.covidbod.models.User;
import org.junit.After;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = CovidbodApplication.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class ClassServiceImplUnitTest {

    @Autowired
    ClassService classService;

    @Before
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);
    }

    @After
    public void tearDown() throws Exception {}

    @Test
    public void a_findAll() {
        assertEquals(1, classService.findAll().size());
    }

    @Test
    public void findClassById() {
        assertEquals("TESTPilates", classService.findClassById(7).getName());
    }

    @Test
    public void save() {
        String c2Name = "TESTtaekwondoe";
        User testuser = new User("john", "65168498", "Johnny@email.com");

        Class c2 = new Class(c2Name,"Soft", "3:00 P.M T, TH",2.8,"Easy","Miami",10,25,);
    }

}
