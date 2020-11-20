package com.sprint.covidbod;

import com.github.javafaker.Faker;
import com.github.javafaker.service.FakeValuesService;
import com.github.javafaker.service.RandomService;
import com.sprint.covidbod.models.Class;
import com.sprint.covidbod.models.Role;
import com.sprint.covidbod.models.User;
import com.sprint.covidbod.models.UserRoles;
import com.sprint.covidbod.models.Useremail;
import com.sprint.covidbod.services.ClassService;
import com.sprint.covidbod.services.RoleService;
import com.sprint.covidbod.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Locale;

/**
 * SeedData puts both known and random data into the database. It implements CommandLineRunner.
 * <p>
 * CoomandLineRunner: Spring Boot automatically runs the run method once and only once
 * after the application context has been loaded.
 */
@Transactional
@Component
public class SeedData
        implements CommandLineRunner {
    /**
     * Connects the Role Service to this process
     */
    @Autowired
    RoleService roleService;

    /**
     * Connects the user service to this process
     */
    @Autowired
    UserService userService;


    @Autowired
    ClassService classService;
    /**
     * Generates test, seed data for our application
     * First a set of known data is seeded into our database.
     * Second a random set of data using Java Faker is seeded into our database.
     * Note this process does not remove data from the database. So if data exists in the database
     * prior to running this process, that data remains in the database.
     *
     * @param args The parameter is required by the parent interface but is not used in this process.
     */
    @Transactional
    @Override
    public void run(String[] args) throws
            Exception {
        userService.deleteAll();
        roleService.deleteAll();
        classService.deleteAll();

        Role r1 = new Role("client");
        Role r2 = new Role("instructor");

        r1 = roleService.save(r1);
        r2 = roleService.save(r2);


        // admin, data, user
        User u1 = new User("admin",
                "password",
                "admin@lambdaschool.local");
        u1.getRoles()
                .add(new UserRoles(u1,
                        r1));
        u1.getRoles()
                .add(new UserRoles(u1,
                        r2));
        u1.getUseremails()
                .add(new Useremail(u1,
                        "admin@email.local"));
        u1.getUseremails()
                .add(new Useremail(u1,
                        "admin@mymail.local"));

        userService.save(u1);

        // data, user
        User u2 = new User("cinnamon",
                "1234567",
                "cinnamon@lambdaschool.local");
        u2.getRoles()
                .add(new UserRoles(u2,
                        r2));
        u2.getUseremails()
                .add(new Useremail(u2,
                        "cinnamon@mymail.local"));
        u2.getUseremails()
                .add(new Useremail(u2,
                        "hops@mymail.local"));
        u2.getUseremails()
                .add(new Useremail(u2,
                        "bunny@email.local"));
        u2.getClasses()
                .add(new Class("Pilates",
                                "Easy",
                             "5:00 P.M. on M,W,F",
                              2.5,
                              "Easy",
                              "Fort Lauderdale",
                            15,
                            35,
                                      u2));
        userService.save(u2);

        // user
        User u3 = new User("barnbarn",
                "ILuvM4th!",
                "barnbarn@lambdaschool.local");
        u3.getRoles()
                .add(new UserRoles(u3,
                        r2));
        u3.getUseremails()
                .add(new Useremail(u3,
                        "barnbarn@email.local"));
        userService.save(u3);

        User u4 = new User("puttat",
                "password",
                "puttat@school.lambda");
        u4.getRoles()
                .add(new UserRoles(u4,
                        r2));
        userService.save(u4);

        User u5 = new User("misskitty",
                "password",
                "misskitty@school.lambda");
        u5.getRoles()
                .add(new UserRoles(u5,
                        r2));
        userService.save(u5);


        if (false) {
            // using JavaFaker create a bunch of regular users
            // https://www.baeldung.com/java-faker
            // https://www.baeldung.com/regular-expressions-java

            FakeValuesService fakeValuesService = new FakeValuesService(new Locale("en-US"),
                    new RandomService());
            Faker nameFaker = new Faker(new Locale("en-US"));

            for (int i = 0; i < 25; i++) {
                new User();
                User fakeUser;

                fakeUser = new User(nameFaker.name()
                        .username(),
                        "password",
                        nameFaker.internet()
                                .emailAddress());
                fakeUser.getRoles()
                        .add(new UserRoles(fakeUser,
                                r2));
                fakeUser.getUseremails()
                        .add(new Useremail(fakeUser,
                                fakeValuesService.bothify("????##@gmail.com")));
                userService.save(fakeUser);
            }
        }
    }
}