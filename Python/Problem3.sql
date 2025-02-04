SELECT 
  D.name AS 'Department', 
  E.name AS 'Employee', 
  E.salary AS 'Salary' 
FROM 
  Department AS D 
  INNER JOIN (
    SELECT 
      *, 
      DENSE_RANK() OVER (
        PARTITION BY departmentId 
        ORDER BY 
          salary DESC
      ) AS salaryRank 
    FROM Employee
  ) AS E ON D.id = E.departmentId 
WHERE 
  E.salaryRank <= 3;