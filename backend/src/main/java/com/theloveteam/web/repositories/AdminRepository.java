package com.theloveteam.web.repositories;

import com.theloveteam.web.dao.Admin;
import com.theloveteam.web.dao.Provider;
import com.theloveteam.web.dao.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;




@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

    @Query("select a from Admin a where a.email = ?1")
    Admin findAdminByEmail(String email);

}
