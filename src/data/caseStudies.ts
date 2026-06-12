export interface CaseStudy {
  id: number;
  title: string;
  domain: "User Retention" | "Fraud Analytics" | "Data Auditing" | "Marketing Attribution" | "Creator Analytics";
  company: string;
  difficulty: "Medium" | "Hard";
  situation: string;
  task: string;
  action: string;
  result: string;
  modelQuery: string;
  concepts: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Monthly User Cohort Retention Analysis",
    domain: "User Retention",
    company: "Meta / Netflix",
    difficulty: "Hard",
    situation: "To assess long-term platform health, user engagement retention must be tracked. Simply counting daily active users hides churn trends among cohorts of users who signed up in the same month.",
    task: "Calculate the Monthly Cohort Retention Rate: for each user signup cohort (grouped by signup month), find the percentage of those users who remained active (recorded watch history or uploaded a post) in the subsequent month.",
    action: "1. Define a user's signup cohort month using a CTE.\n2. Create a unified user activity CTE by taking the UNION of all post timestamps and watch history dates.\n3. Join the signup cohort with the activity logs on user_id, ensuring active_date is in the calendar month immediately following the signup month.\n4. Aggregate by cohort month, dividing the count of distinct active users by the total users in that cohort, multiplying by 100 to get a percentage.",
    result: "Produces a report showing cohort monthly drop-offs, identifying cohorts with lower engagement for targeted marketing interventions.",
    concepts: ["Common Table Expressions (CTEs)", "Date Truncation & Date Math", "Union of Event Logs", "Cohort Aggregation", "Self-Joins / Non-equi Joins"],
    modelQuery: `WITH cohort_users AS (
  SELECT user_id, DATE_TRUNC('month', signup_date) AS cohort_month
  FROM users
),
user_activity AS (
  -- Combine all activity dates across different tables
  SELECT user_id, DATE_TRUNC('month', post_date) AS activity_month FROM posts
  UNION
  SELECT user_id, DATE_TRUNC('month', watch_date) AS activity_month FROM watch_history
)
SELECT 
  c.cohort_month,
  COUNT(DISTINCT c.user_id) AS total_cohort_size,
  COUNT(DISTINCT a.user_id) AS retained_users,
  ROUND((COUNT(DISTINCT a.user_id)::DECIMAL / COUNT(DISTINCT c.user_id)) * 100, 2) AS retention_percentage
FROM cohort_users c
LEFT JOIN user_activity a 
  ON c.user_id = a.user_id 
  -- Active in the month immediately following the signup month
  AND a.activity_month = c.cohort_month + INTERVAL '1 month'
GROUP BY c.cohort_month
ORDER BY c.cohort_month;`
  },
  {
    id: 2,
    title: "7-Day Rolling Average Transaction Spikes",
    domain: "Fraud Analytics",
    company: "Stripe / Fintech",
    difficulty: "Medium",
    situation: "Malicious card testing and account takeovers result in sudden transactional velocity and volume spikes. Single-value thresholds fail because customer baseline spending habits differ widely.",
    task: "Build an anomaly detection query. Calculate the 7-day rolling average transaction amount for each customer and identify individual transactions that exceed 3x their respective rolling average.",
    action: "1. Use window functions with frame clauses to calculate the cumulative average over a sliding window.\n2. Specify 'ROWS BETWEEN 6 PRECEDING AND CURRENT ROW' (or RANGE bounds) ordered by timestamp.\n3. Wrap this calculation in a subquery or CTE to preserve the detailed row level transaction details.\n4. In the outer query, filter transactions where the transaction amount is strictly greater than 3 times the computed rolling average.",
    result: "Automatically flags outlier purchases in real-time, sending high-risk transactions directly to compliance workflows and blocking fraudulent payouts.",
    concepts: ["Window Functions (AVG() OVER)", "Sliding Frame Clauses (PRECEDING/CURRENT ROW)", "Fintech Risk Modeling", "Subquery Isolation"],
    modelQuery: `WITH rolling_metrics AS (
  SELECT 
    transaction_id,
    customer_id,
    created_at,
    amount,
    AVG(amount) OVER (
      PARTITION BY customer_id 
      ORDER BY created_at 
      RANGE BETWEEN INTERVAL '6 days' PRECEDING AND CURRENT ROW
    ) AS rolling_7day_avg
  FROM transactions
  WHERE status = 'succeeded'
)
SELECT 
  transaction_id,
  customer_id,
  created_at,
  amount,
  ROUND(rolling_7day_avg, 2) AS baseline_avg,
  ROUND(amount / rolling_7day_avg, 1) AS deviation_ratio
FROM rolling_metrics
WHERE amount > 3 * rolling_7day_avg
ORDER BY deviation_ratio DESC;`
  },
  {
    id: 3,
    title: "Org Chart Salary Audit (Self-Joins)",
    domain: "Data Auditing",
    company: "Big Tech / HR Systems",
    difficulty: "Medium",
    situation: "To ensure fair compensation and verify that organizational structures follow policy, corporate compliance teams run regular scans of employee salaries relative to hierarchy roles.",
    task: "Find all employees who earn a higher salary than their direct manager, showing the employee name, their salary, their manager's name, and the manager's salary.",
    action: "1. Formulate a self-join on the employees table, treating one alias (e) as the employee records and another alias (m) as the manager records.\n2. Equate e.manager_id to m.employee_id to link every employee to their direct supervisor.\n3. Apply a filter in the WHERE clause where e.salary is greater than m.salary.\n4. Project the relevant columns and sort by the salary delta in descending order.",
    result: "Flags structural anomalies where junior staff earn more than direct supervisors, enabling HR to correct job tiers or capture special contractor agreements.",
    concepts: ["Table Aliases", "Self-Joins", "Hierarchy Modeling", "NULL Value Exclusions"],
    modelQuery: `SELECT 
  e.name AS employee_name,
  e.salary AS employee_salary,
  m.name AS manager_name,
  m.salary AS manager_salary,
  (e.salary - m.salary) AS salary_surplus
FROM employees e
JOIN employees m ON e.manager_id = m.employee_id
WHERE e.salary > m.salary
ORDER BY salary_surplus DESC;`
  },
  {
    id: 4,
    title: "First-Touch Marketing Attribution Model",
    domain: "Marketing Attribution",
    company: "E-Commerce / Amazon",
    difficulty: "Hard",
    situation: "Marketing teams allocate multi-million dollar budgets across social media, search, and email. To justify spend, they need to attribute customer conversions to the very first campaign that introduced the customer to the brand.",
    task: "Implement a First-Touch Attribution model. For each conversion record, map it to the earliest marketing campaign interaction (click) the user had, calculating total attributed revenue per campaign.",
    action: "1. Create a CTE representing customer touchpoints sorted by timestamp.\n2. Use the ROW_NUMBER() window function partitioned by user_id and ordered by interaction_time ascending to assign a sequential index, identifying the first interaction where row_number = 1.\n3. Join the conversions table with this first-touch interaction CTE on user_id.\n4. Group by campaign name and channel, summing the conversion revenue to calculate total first-touch value.",
    result: "Enables marketing executives to identify top-of-funnel acquisition channels that successfully drive customer discovery, optimizing budget allocations.",
    concepts: ["Window Functions (ROW_NUMBER() OVER)", "Multi-table Joins", "Revenue Attribution Models", "Subquery Partitioning"],
    modelQuery: `WITH user_first_clicks AS (
  SELECT 
    user_id,
    campaign_id,
    click_time,
    ROW_NUMBER() OVER (
      PARTITION BY user_id 
      ORDER BY click_time ASC
    ) AS click_rank
  FROM campaign_clicks
)
SELECT 
  c.name AS campaign_name,
  c.channel AS marketing_channel,
  COUNT(con.conversion_id) AS conversion_count,
  SUM(con.revenue) AS total_attributed_revenue
FROM user_first_clicks ufc
JOIN campaigns c ON ufc.campaign_id = c.campaign_id
JOIN conversions con ON ufc.user_id = con.user_id
WHERE ufc.click_rank = 1 -- Only attribute to the first click
  AND con.conversion_date >= ufc.click_time -- Ensure conversion happened after the click
GROUP BY c.campaign_id, c.name, c.channel
ORDER BY total_attributed_revenue DESC;`
  },
  {
    id: 5,
    title: "Peak Post Upload Virality & Engagement",
    domain: "Creator Analytics",
    company: "TikTok / Meta",
    difficulty: "Hard",
    situation: "Platform recommendation algorithms penalize content posted at times when user bases are offline. Creators need data-backed recommendations on optimal post times to maximize immediate view-to-comment ratios.",
    task: "Analyze TikTok creator uploads. For each creator, find their video that achieved the highest view-to-comment ratio, the post hour, and how it ranked compared to their other uploads.",
    action: "1. Write a CTE calculating the view-to-comment ratio for every video, using COALESCE or NULLIF to prevent division-by-zero errors.\n2. Use the DENSE_RANK() OVER (PARTITION BY creator_id ORDER BY ratio DESC) window function to rank videos for each creator.\n3. Extract the hour of posting using date truncation/extraction methods.\n4. Filter the CTE in the outer query to display only the top ranked videos (rank = 1) per creator.",
    result: "Generates optimal posting schedule dashboards for influencers and creators, increasing average video engagement by 15-25%.",
    concepts: ["Window Functions (DENSE_RANK() OVER)", "Arithmetic Division & Null Safety", "Date/Time Extraction", "Outer Query Filters"],
    modelQuery: `WITH video_engagement AS (
  SELECT 
    video_id,
    creator_id,
    upload_time,
    view_count,
    comment_count,
    -- Prevent division-by-zero with NULLIF
    ROUND(view_count / NULLIF(comment_count, 0), 2) AS view_to_comment_ratio,
    DENSE_RANK() OVER (
      PARTITION BY creator_id 
      ORDER BY (view_count / NULLIF(comment_count, 0)) DESC
    ) AS engagement_rank
  FROM videos
)
SELECT 
  creator_id,
  video_id,
  EXTRACT(HOUR FROM upload_time) AS post_hour,
  view_count,
  comment_count,
  view_to_comment_ratio
FROM video_engagement
WHERE engagement_rank = 1
ORDER BY view_to_comment_ratio DESC;`
  }
];
