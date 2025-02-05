package com.syfassignment.studentmanagementapp.repository;

import com.syfassignment.studentmanagementapp.entity.Student;
import jakarta.transaction.Transactional;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {
    @Query("SELECT s FROM Student s WHERE s.name = :getName")
    Optional<Student> findStudentByName(@Param("getName") String getName);

    @Modifying
    @Transactional
    @Query("DELETE FROM Student s WHERE s.name = :getName")
    void deleteStudentByName(@Param("getName") String getName);
}
