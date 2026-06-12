export interface InterviewQuestion {
  id: number;
  question: string;
  category: "Joins & Set Operators" | "Aggregations & Filtering" | "Window Functions & CTEs" | "Optimization & Indexing" | "Database Design & Architecture";
  explanation: string;
  keyKeywords: string[];
  codeExample?: string;
}

export const interviewQuestions: InterviewQuestion[] = [
  {
    id: 1,
    question: "What is the difference between INNER, LEFT, RIGHT, and FULL OUTER joins? How do they handle NULL values?",
    category: "Joins & Set Operators",
    explanation: "Joins merge rows from two or more tables based on a related column:\n\n1. INNER JOIN: Returns rows only when there is a match in BOTH tables. Rows with no match are excluded.\n2. LEFT JOIN (Outer): Returns ALL rows from the left table, and matched rows from the right table. If there is no match, the right side returns NULL.\n3. RIGHT JOIN (Outer): Returns ALL rows from the right table, and matched rows from the left table. If there is no match, the left side returns NULL.\n4. FULL OUTER JOIN: Returns all rows from both tables. When there is no match on either side, it pads the missing columns with NULL.\n\nNULL Handling: Joins match values using equivalence (=). Because NULL represents an unknown value, NULL = NULL evaluates to UNKNOWN, not TRUE. Therefore, join keys containing NULL values will never match each other and are excluded from INNER joins (and return NULL padded columns in OUTER joins). To join on fields that might contain NULLs, you must use conditional joins (e.g. ON a.id = b.id OR (a.id IS NULL AND b.id IS NULL)).",
    keyKeywords: ["Equivalence match", "NULL padding", "NULL comparison", "Left table priority", "Inner intersect"],
    codeExample: "-- Left Join showing unmatched rows (Anti-join)\nSELECT u.user_id, u.username\nFROM users u\nLEFT JOIN orders o ON u.user_id = o.customer_id\nWHERE o.order_id IS NULL; -- Isolates users with 0 orders"
  },
  {
    id: 2,
    question: "What is the difference between UNION and UNION ALL? Which one is faster and why?",
    category: "Joins & Set Operators",
    explanation: "Both operators combine the result sets of two or more SELECT queries into a single output table:\n\n1. UNION: Combines the rows, performs a de-duplication step, and returns only distinct rows. To do this, the database engine must sort the combined dataset and perform a comparison scan to filter out duplicates.\n2. UNION ALL: Simply appends the datasets together, retaining all duplicate rows. It does not perform any sorting or filtering.\n\nPerformance: UNION ALL is significantly FASTER than UNION. This is because UNION requires an expensive sorting and de-duplication operation in memory or on disk, which scales poorly as the dataset size grows. \n\nInterview Tip: Always default to UNION ALL in your answers unless the business requirements explicitly demand deduplicated results, to show you are performance-conscious.",
    keyKeywords: ["Deduplication", "Append logs", "Sort overhead", "Query performance", "Distinct rows"],
    codeExample: "-- UNION ALL simply appends results\nSELECT user_id, 'Post Creator' AS role FROM posts\nUNION ALL\nSELECT user_id, 'Viewer' AS role FROM watch_history;"
  },
  {
    id: 3,
    question: "What is a self-join? When and why would you use one?",
    category: "Joins & Set Operators",
    explanation: "A self-join is a standard join in which a table is joined with itself. SQL does not have a 'SELF JOIN' keyword; instead, you achieve this by joining the table under two different aliases (e.g. FROM employees e1 JOIN employees e2).\n\nCommon Use Cases:\n1. Hierarchical Data: Finding relationships within a single table, such as linking employees to their direct managers, or category sub-folders to their parent categories.\n2. Sequential Events: Auditing sequential user behavior logs, such as checking if a user watched two movies in consecutive days.\n3. Deduplication: Locating records with identical values in some columns but different primary keys.",
    keyKeywords: ["Table aliases", "Hierarchical charts", "Direct supervisor links", "Consecutive logs comparison"],
    codeExample: "-- Finding employees earning more than their manager\nSELECT e.name AS emp, m.name AS mgr\nFROM employees e\nJOIN employees m ON e.manager_id = m.employee_id\nWHERE e.salary > m.salary;"
  },
  {
    id: 4,
    question: "What is the difference between WHERE and HAVING clauses?",
    category: "Aggregations & Filtering",
    explanation: "The key difference lies in WHEN the filtering occurs in the query execution order:\n\n1. WHERE Clause: Filters individual records BEFORE any grouping or aggregations are calculated. It cannot reference aggregate functions (e.g. WHERE SUM(amount) > 100 is invalid syntax).\n2. HAVING Clause: Filters grouped rows AFTER the GROUP BY clause has aggregated the records. It is used specifically to filter results based on aggregate computations (e.g. HAVING COUNT(order_id) > 5).\n\nPerformance: Always filter as much data as possible in the WHERE clause. This reduces the number of rows the database engine has to sort and aggregate, saving memory and CPU.",
    keyKeywords: ["Execution order", "Aggregation filter", "Pre-grouping filter", "Post-grouping filter", "Performance efficiency"],
    codeExample: "SELECT category, AVG(price) AS avg_price\nFROM products\nWHERE price > 10 -- Filters rows first\nGROUP BY category\nHAVING AVG(price) > 50; -- Filters group averages last"
  },
  {
    id: 5,
    question: "How does COUNT(*) differ from COUNT(column_name) and COUNT(DISTINCT column_name)?",
    category: "Aggregations & Filtering",
    explanation: "These statements compute row counts differently based on how they evaluate NULL values:\n\n1. COUNT(*): Counts every single row in the table or group, including rows that contain NULL values or duplicate entries. It simply counts row occurrences.\n2. COUNT(column_name): Counts only the rows where the specified column contains a non-NULL value. Rows where the column is NULL are excluded.\n3. COUNT(DISTINCT column_name): Counts only the unique, non-NULL values present in the specified column.\n\nInterview Tip: Mention that COUNT(1) and COUNT(*) perform identically in modern query optimizers; there is no performance difference between the two.",
    keyKeywords: ["NULL evaluation", "Deduplication", "Row count", "Non-null values count"],
    codeExample: "-- If table has values: [10, 20, NULL, 20]\nSELECT\n  COUNT(*) AS cnt_all,         -- Returns 4\n  COUNT(val) AS cnt_val,       -- Returns 3 (excludes NULL)\n  COUNT(DISTINCT val) AS distinct_val; -- Returns 2 ([10, 20])"
  },
  {
    id: 6,
    question: "How do you pivot rows into columns in SQL?",
    category: "Aggregations & Filtering",
    explanation: "Pivoting translates longitudinal row-level data into a consolidated cross-tab format. While some databases (like SQL Server or Snowflake) support a native `PIVOT` operator, the most portable and standard way to achieve this across all SQL engines is using **Conditional Aggregation** with `CASE WHEN` and `SUM` or `MAX`:\n\n1. Group the records by the primary row key (e.g., year, customer ID).\n2. For each column you want to create, write an aggregate function containing a `CASE WHEN` statement that isolates that column's specific key.\n3. Aggregate the values (usually using `SUM` for numbers or `MAX` for strings).",
    keyKeywords: ["Conditional aggregation", "CASE WHEN statement", "Cross-tab formatting", "Row-to-column mapping"],
    codeExample: "-- Pivoting quarterly sales by channel\nSELECT \n  year,\n  SUM(CASE WHEN channel = 'Retail' THEN revenue ELSE 0 END) AS retail_sales,\n  SUM(CASE WHEN channel = 'Online' THEN revenue ELSE 0 END) AS online_sales\nFROM sales\nGROUP BY year;"
  },
  {
    id: 7,
    question: "What are window functions? How do they differ from GROUP BY aggregations?",
    category: "Window Functions & CTEs",
    explanation: "Both window functions and `GROUP BY` perform aggregations over rows, but they differ in how they return rows:\n\n1. GROUP BY: Groups multiple rows into a single summary row. It collapses the detailed row granularity. You can only query the grouping keys and aggregate summaries.\n2. Window Functions: Perform calculations over a partition of rows (the 'window') but **retain the individual row details**. The number of rows returned matches the number of rows input, allowing you to display detailed columns alongside aggregate baselines.\n\nSyntax: They are identified by the `OVER` clause, which controls partition splitting (`PARTITION BY`) and ordering (`ORDER BY`) inside the window.",
    keyKeywords: ["OVER clause", "Row retention", "Partition splitting", "Detail granularity", "Analytic functions"],
    codeExample: "-- Running sum alongside detail columns\nSELECT \n  user_id, \n  watch_date, \n  duration_minutes,\n  SUM(duration_minutes) OVER (PARTITION BY user_id ORDER BY watch_date) AS running_total\nFROM watch_history;"
  },
  {
    id: 8,
    question: "Explain the difference between ROW_NUMBER(), RANK(), and DENSE_RANK() window functions.",
    category: "Window Functions & CTEs",
    explanation: "All three assign integers to rows based on their order in a partition, but they handle duplicate tie values ('ties') differently:\n\n1. ROW_NUMBER(): Assigns a unique, sequential integer to every single row. If there are tie values, it arbitrary breaks them and assigns consecutive numbers (e.g. 1, 2, 3, 4).\n2. RANK(): Assigns the same number to duplicate tie values. However, it **skips ranks** for subsequent rows to reflect the number of ties (e.g. 1, 2, 2, 4).\n3. DENSE_RANK(): Assigns the same number to duplicate tie values, but **never skips ranks**. The ranks are contiguous (e.g. 1, 2, 2, 3).",
    keyKeywords: ["Rank skipping", "Contiguous numbers", "Tie handling", "Ties resolution", "Sequence indexes"],
    codeExample: "-- Tie values for play count: [100, 100, 80]\n-- ROW_NUMBER: 1, 2, 3\n-- RANK:       1, 1, 3\n-- DENSE_RANK: 1, 1, 2"
  },
  {
    id: 9,
    question: "What is a correlated subquery? How does it differ from a non-correlated subquery?",
    category: "Window Functions & CTEs",
    explanation: "1. Non-correlated Subquery: Independent of the outer query. It runs once, returns a value or set, and the outer query uses that cached result. You can copy the subquery and run it on its own.\n2. Correlated Subquery: **References columns from the outer query**. Because it depends on the outer row, it must be evaluated once for *every single row* processed by the outer query. You cannot execute the subquery independently without the outer scope.\n\nPerformance Warning: Correlated subqueries are often slow on large tables because they act like a nested loop (quadratic time complexity O(N^2)). They should be refactored into JOINs or CTEs where possible.",
    keyKeywords: ["Outer reference", "Nested loops", "Row-by-row execution", "Query dependency", "Independent execution"],
    codeExample: "-- Finding products priced higher than their category average\nSELECT p1.title, p1.price\nFROM products p1\nWHERE p1.price > (\n  SELECT AVG(p2.price) \n  FROM products p2 \n  WHERE p2.category = p1.category -- Correlated filter\n);"
  },
  {
    id: 10,
    question: "What are Common Table Expressions (CTEs)? When should you use them over subqueries or temporary tables?",
    category: "Window Functions & CTEs",
    explanation: "A Common Table Expression (CTE) is a temporary result set defined using the `WITH` clause. It exists only during the execution of that single query:\n\n*   **Use CTEs instead of Subqueries** for code readability and modularity. CTEs allow you to write queries top-to-bottom rather than inside-out. They can also be referenced multiple times in a single query.\n*   **Use CTEs instead of Temp Tables** for simple, one-off calculations that don't need to be indexed. Temp tables require write operations to disk/tempdb, which introduces catalog lock overhead. CTEs run in-memory and the optimizer can integrate them directly.\n*   **Recursion**: CTEs support the `WITH RECURSIVE` clause, which is essential for querying hierarchical graph structures like org trees or bill-of-materials.",
    keyKeywords: ["WITH clause", "Readability", "Temporary result set", "Recursive queries", "Code modularity"],
    codeExample: "WITH monthly_revenue AS (\n  SELECT DATE_TRUNC('month', created_at) AS mth, SUM(amount) AS rev\n  FROM transactions\n  GROUP BY 1\n)\nSELECT mth, rev FROM monthly_revenue WHERE rev > 50000;"
  },
  {
    id: 11,
    question: "How do you optimize a slow-running SQL query? Outline your diagnostic steps.",
    category: "Optimization & Indexing",
    explanation: "Here is a structured, senior-level response framework for query optimization:\n\n1. **Analyze the Execution Plan**: Use `EXPLAIN` or `EXPLAIN ANALYZE` to pinpoint bottlenecks, looking for table scans (Sequential Scans), heavy sorting operations, or loops.\n2. **Check Indexing**: Verify that the columns used in joins (`JOIN`), filtering (`WHERE`), and sorting (`ORDER BY`) are indexed. Look for 'covering indexes' that can satisfy the query entirely from the index leaf nodes.\n3. **Refactor Joins**: Ensure joins match keys. Avoid joining on expressions or doing implicit conversions (e.g. joining VARCHAR to INT). Use INNER joins instead of OUTER joins if business rules permit.\n4. **Limit Columns & Rows**: Avoid `SELECT *`. Only request necessary fields. If possible, apply aggregate filters or LIMIT conditions early.\n5. **Evaluate Subqueries**: Replace expensive correlated subqueries with JOINs or window functions. Replace `IN` with `EXISTS` for subquery checks as `EXISTS` can short-circuit upon finding the first match.",
    keyKeywords: ["EXPLAIN plan", "Covering index", "Sequential scan", "Covering indexes", "Short-circuit evaluation", "Selective filters"],
    codeExample: "-- Use EXPLAIN to see execution details\nEXPLAIN SELECT name FROM products WHERE category = 'Electronics' AND price > 500;"
  },
  {
    id: 12,
    question: "What is a Database Index? How does it speed up retrieval, and what are the trade-offs?",
    category: "Optimization & Indexing",
    explanation: "An index is a pointer structure (most commonly implemented as a B-Tree) that organizes table data columns for fast search:\n\n*   **How it works**: Instead of scanning every page of a table from start to finish (a full table scan), the database navigates the B-Tree log-time structures (logarithmic complexity O(log N)) to jump directly to matching rows.\n*   **The Trade-off**: Writing operations (`INSERT`, `UPDATE`, `DELETE`) become slower because the database must keep the index updated alongside the raw data pages. Indexes also consume additional storage space on disk.\n\nBest Practice: Index columns with high **selectivity** (columns with a high ratio of distinct values, like customer IDs) rather than low selectivity (like status flags or booleans).",
    keyKeywords: ["B-Tree structure", "Selectivity", "Logarithmic complexity", "Write amplification", "Full table scan"],
    codeExample: "-- Create index to speed up product lookups\nCREATE INDEX idx_products_category ON products(category);"
  },
  {
    id: 13,
    question: "What is the difference between a Clustered Index and a Non-Clustered Index?",
    category: "Optimization & Indexing",
    explanation: "1. Clustered Index: Determines the physical, sorted order of data rows on disk. \n   - A table can have **only one** clustered index because data can only be physically sorted one way.\n   - Primary keys automatically create clustered indexes in most engines (like MySQL InnoDB or SQL Server).\n   - Leaf nodes contain the actual data rows.\n\n2. Non-Clustered Index: A separate, independent structure from the data rows.\n   - It contains pointers (bookmarks/Row IDs) back to the physical clustered index rows.\n   - You can create **multiple** non-clustered indexes on a table.\n   - Leaf nodes contain only index key columns and pointers, not full rows.",
    keyKeywords: ["Physical ordering", "Leaf nodes", "Row pointer", "Primary key indexing", "Bookmark lookup"],
    codeExample: "-- Clustered is created with PRIMARY KEY. Non-clustered is created manually:\nCREATE INDEX idx_orders_customer ON orders(customer_id);"
  },
  {
    id: 14,
    question: "Explain Database Normalization (1NF, 2NF, 3NF). Why is it important, and when would you denormalize?",
    category: "Database Design & Architecture",
    explanation: "Normalization organizes table structures to minimize data redundancy and prevent update anomalies:\n\n1. First Normal Form (1NF): Requires atomic values (no repeating groups/arrays) and unique row keys.\n2. Second Normal Form (2NF): Meets 1NF, and eliminates partial dependencies (every non-key column must depend on the ENTIRE primary key, relevant for composite keys).\n3. Third Normal Form (3NF): Meets 2NF, and eliminates transitive dependencies (non-key columns cannot depend on other non-key columns).\n\nWhy Denormalize? Normalization requires multiple JOINS, which slows down query execution. In analytical databases (OLAP/Data Warehouses), data is often denormalized into Star or Snowflake schemas to maximize read/reporting speeds at the expense of redundant storage.",
    keyKeywords: ["Data redundancy", "Atomic values", "Partial dependency", "Transitive dependency", "Star schema", "OLAP read speed"],
    codeExample: "-- Normalized (Orders links to Customers table)\n-- Denormalized (Orders contains customer name and address directly to save join latency)"
  },
  {
    id: 15,
    question: "What are the ACID properties in database transactions?",
    category: "Database Design & Architecture",
    explanation: "ACID properties guarantee that database transactions are processed reliably:\n\n1. Atomicity: 'All or nothing'. If any statement in a transaction fails, the entire transaction is rolled back, leaving the database unchanged.\n2. Consistency: Guarantees that a transaction transitions the database from one valid state to another, maintaining all schema constraints and foreign key rules.\n3. Isolation: Ensures that concurrently running transactions do not interfere with each other. Intermediate states of a transaction are invisible to other transactions until committed.\n4. Durability: Guarantees that once a transaction is committed, its changes are permanently written to disk (non-volatile storage) and will survive system failures or power cuts.",
    keyKeywords: ["Rollback", "Commit state", "Concurrent isolation", "Data durability", "Schema constraints validation"],
    codeExample: "BEGIN TRANSACTION;\n  UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;\n  UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;\nCOMMIT; -- If power cuts before COMMIT, Atomicity rolls it back."
  },
  {
    id: 16,
    question: "What is the difference between DELETE, TRUNCATE, and DROP commands?",
    category: "Database Design & Architecture",
    explanation: "These commands vary by speed, transaction logging, and structural consequences:\n\n1. DELETE: A DML (Data Manipulation Language) command.\n   - Removes rows matching a condition (`WHERE`).\n   - Logs every row deletion individually. Transactions can be rolled back.\n   - Slower than TRUNCATE. Does not reset auto-increment counters.\n\n2. TRUNCATE: A DDL (Data Definition Language) command.\n   - Removes ALL rows from a table by deallocating the database pages.\n   - Minimally logged. It cannot be rolled back in some databases (or is harder to). It is extremely fast.\n   - Resets auto-increment counters, but keeps table structure and indexes.\n\n3. DROP: A DDL command.\n   - Deletes the entire table structure, data, indexes, and constraints from the database catalog. It cannot be rolled back.",
    keyKeywords: ["DML vs DDL", "Transaction log", "Page deallocation", "Catalog deletion", "Auto-increment reset"],
    codeExample: "DELETE FROM users WHERE last_login < '2025-01-01'; -- Row level filter\nTRUNCATE TABLE logs; -- Fast wipe\nDROP TABLE temporary_users; -- Catalog delete"
  }
];
