package com.theloveteam.web.repositories;

import com.theloveteam.web.dao.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("select u from User u where u.email = ?1")
    List<User> findUsersByEmail(String email);

    @Query("select u from User u where u.email = ?1")
    User findUserByEmail(String email);
}
