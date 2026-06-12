export interface TableSchema {
  name: string;
  columns: { name: string; type: string }[];
}

export interface Challenge {
  id: number;
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  company: "Amazon" | "Uber" | "Meta" | "Netflix" | "Stripe" | "Airbnb" | "Spotify" | "TikTok" | "Finance" | "Marketing" | "IT Support";
  persona: string;
  prompt: string;
  hint: string;
  expectedQuery: string;
  schemaTables: string[]; // List of tables relevant to this challenge
}

export const tableSchemas: Record<string, TableSchema> = {
  // 1. Amazon (E-Commerce)
  products: {
    name: "products",
    columns: [
      { name: "product_id", type: "INT" },
      { name: "title", type: "VARCHAR" },
      { name: "category", type: "VARCHAR" },
      { name: "price", type: "DECIMAL" },
      { name: "stock_quantity", type: "INT" }
    ]
  },
  orders: {
    name: "orders",
    columns: [
      { name: "order_id", type: "INT" },
      { name: "customer_id", type: "INT" },
      { name: "product_id", type: "INT" },
      { name: "order_date", type: "DATE" },
      { name: "quantity", type: "INT" },
      { name: "total_price", type: "DECIMAL" }
    ]
  },
  reviews: {
    name: "reviews",
    columns: [
      { name: "review_id", type: "INT" },
      { name: "customer_id", type: "INT" },
      { name: "product_id", type: "INT" },
      { name: "rating", type: "INT" },
      { name: "review_date", type: "DATE" }
    ]
  },
  // 2. Uber (Ride-Sharing)
  drivers: {
    name: "drivers",
    columns: [
      { name: "driver_id", type: "INT" },
      { name: "name", type: "VARCHAR" },
      { name: "rating", type: "DECIMAL" },
      { name: "join_date", type: "DATE" },
      { name: "is_active", type: "BOOLEAN" }
    ]
  },
  rides: {
    name: "rides",
    columns: [
      { name: "ride_id", type: "INT" },
      { name: "driver_id", type: "INT" },
      { name: "rider_id", type: "INT" },
      { name: "distance_miles", type: "DECIMAL" },
      { name: "fare_amount", type: "DECIMAL" },
      { name: "ride_timestamp", type: "TIMESTAMP" },
      { name: "status", type: "VARCHAR" }
    ]
  },
  // 3. Meta (Social Media)
  users: {
    name: "users",
    columns: [
      { name: "user_id", type: "INT" },
      { name: "username", type: "VARCHAR" },
      { name: "signup_date", type: "DATE" },
      { name: "country", type: "VARCHAR" }
    ]
  },
  friendships: {
    name: "friendships",
    columns: [
      { name: "user_id_1", type: "INT" },
      { name: "user_id_2", type: "INT" },
      { name: "establish_date", type: "DATE" }
    ]
  },
  posts: {
    name: "posts",
    columns: [
      { name: "post_id", type: "INT" },
      { name: "user_id", type: "INT" },
      { name: "post_date", type: "DATE" },
      { name: "likes_count", type: "INT" }
    ]
  },
  // 4. Netflix (Streaming Entertainment)
  titles: {
    name: "titles",
    columns: [
      { name: "title_id", type: "INT" },
      { name: "name", type: "VARCHAR" },
      { name: "type", type: "VARCHAR" },
      { name: "genre", type: "VARCHAR" },
      { name: "release_year", type: "INT" }
    ]
  },
  watch_history: {
    name: "watch_history",
    columns: [
      { name: "watch_id", type: "INT" },
      { name: "user_id", type: "INT" },
      { name: "title_id", type: "INT" },
      { name: "watch_date", type: "DATE" },
      { name: "duration_minutes", type: "INT" },
      { name: "device", type: "VARCHAR" }
    ]
  },
  // 5. Stripe (Fintech Payments)
  transactions: {
    name: "transactions",
    columns: [
      { name: "transaction_id", type: "INT" },
      { name: "customer_id", type: "INT" },
      { name: "amount", type: "DECIMAL" },
      { name: "currency", type: "VARCHAR" },
      { name: "status", type: "VARCHAR" },
      { name: "created_at", type: "TIMESTAMP" }
    ]
  },
  disputes: {
    name: "disputes",
    columns: [
      { name: "dispute_id", type: "INT" },
      { name: "transaction_id", type: "INT" },
      { name: "reason", type: "VARCHAR" },
      { name: "status", type: "VARCHAR" },
      { name: "created_at", type: "TIMESTAMP" }
    ]
  },
  // 6. Airbnb (Hospitality Marketplace)
  listings: {
    name: "listings",
    columns: [
      { name: "listing_id", type: "INT" },
      { name: "host_id", type: "INT" },
      { name: "name", type: "VARCHAR" },
      { name: "property_type", type: "VARCHAR" },
      { name: "price_per_night", type: "DECIMAL" },
      { name: "room_type", type: "VARCHAR" },
      { name: "country", type: "VARCHAR" }
    ]
  },
  bookings: {
    name: "bookings",
    columns: [
      { name: "booking_id", type: "INT" },
      { name: "listing_id", type: "INT" },
      { name: "guest_id", type: "INT" },
      { name: "check_in", type: "DATE" },
      { name: "check_out", type: "DATE" },
      { name: "total_amount", type: "DECIMAL" }
    ]
  },
  // 7. Spotify (Audio Streaming)
  songs: {
    name: "songs",
    columns: [
      { name: "song_id", type: "INT" },
      { name: "title", type: "VARCHAR" },
      { name: "artist", type: "VARCHAR" },
      { name: "album", type: "VARCHAR" },
      { name: "duration_seconds", type: "INT" },
      { name: "daily_plays", type: "INT" }
    ]
  },
  playlists: {
    name: "playlists",
    columns: [
      { name: "playlist_id", type: "INT" },
      { name: "user_id", type: "INT" },
      { name: "name", type: "VARCHAR" },
      { name: "created_at", type: "DATE" }
    ]
  },
  playlist_tracks: {
    name: "playlist_tracks",
    columns: [
      { name: "playlist_id", type: "INT" },
      { name: "song_id", type: "INT" },
      { name: "added_at", type: "DATE" }
    ]
  },
  // 8. TikTok (Short Video Feed)
  videos: {
    name: "videos",
    columns: [
      { name: "video_id", type: "INT" },
      { name: "creator_id", type: "INT" },
      { name: "duration_seconds", type: "INT" },
      { name: "upload_time", type: "TIMESTAMP" },
      { name: "view_count", type: "INT" },
      { name: "share_count", type: "INT" }
    ]
  },
  comments: {
    name: "comments",
    columns: [
      { name: "comment_id", type: "INT" },
      { name: "video_id", type: "INT" },
      { name: "user_id", type: "INT" },
      { name: "comment_text", type: "VARCHAR" },
      { name: "likes", type: "INT" },
      { name: "created_at", type: "TIMESTAMP" }
    ]
  },
  // 9. Finance (Wealth Management & Banking)
  accounts: {
    name: "accounts",
    columns: [
      { name: "account_id", type: "INT" },
      { name: "customer_name", type: "VARCHAR" },
      { name: "account_type", type: "VARCHAR" },
      { name: "balance", type: "DECIMAL" },
      { name: "opened_at", type: "DATE" }
    ]
  },
  loans: {
    name: "loans",
    columns: [
      { name: "loan_id", type: "INT" },
      { name: "account_id", type: "INT" },
      { name: "amount", type: "DECIMAL" },
      { name: "interest_rate", type: "DECIMAL" },
      { name: "status", type: "VARCHAR" },
      { name: "start_date", type: "DATE" }
    ]
  },
  // 10. Marketing (Campaign Management)
  campaigns: {
    name: "campaigns",
    columns: [
      { name: "campaign_id", type: "INT" },
      { name: "name", type: "VARCHAR" },
      { name: "channel", type: "VARCHAR" },
      { name: "budget", type: "DECIMAL" },
      { name: "start_date", type: "DATE" }
    ]
  },
  conversions: {
    name: "conversions",
    columns: [
      { name: "conversion_id", type: "INT" },
      { name: "campaign_id", type: "INT" },
      { name: "user_id", type: "INT" },
      { name: "revenue", type: "DECIMAL" },
      { name: "conversion_date", type: "DATE" }
    ]
  },
  // 11. IT Support (Helpdesk Systems)
  agents: {
    name: "agents",
    columns: [
      { name: "agent_id", type: "INT" },
      { name: "name", type: "VARCHAR" },
      { name: "department", type: "VARCHAR" },
      { name: "is_active", type: "BOOLEAN" }
    ]
  },
  tickets: {
    name: "tickets",
    columns: [
      { name: "ticket_id", type: "INT" },
      { name: "assignee_id", type: "INT" },
      { name: "priority", type: "VARCHAR" },
      { name: "status", type: "VARCHAR" },
      { name: "created_at", type: "TIMESTAMP" },
      { name: "resolved_at", type: "TIMESTAMP" }
    ]
  }
};

export const seedDatabaseQueries = `
  CREATE TABLE products(product_id INT, title VARCHAR, category VARCHAR, price DECIMAL, stock_quantity INT);
  INSERT INTO products VALUES (1, 'Kindle Paperwhite', 'Electronics', 139.99, 150);
  INSERT INTO products VALUES (2, 'Echo Dot', 'Electronics', 49.99, 300);
  INSERT INTO products VALUES (3, 'iPad Air', 'Electronics', 599.99, 80);
  INSERT INTO products VALUES (4, 'Coffee Maker', 'Home & Kitchen', 89.99, 45);
  INSERT INTO products VALUES (5, 'Running Shoes', 'Apparel', 120.00, 200);
  INSERT INTO products VALUES (6, 'Wool Sweater', 'Apparel', 75.00, 90);
  INSERT INTO products VALUES (7, 'Frying Pan', 'Home & Kitchen', 29.99, 120);
  INSERT INTO products VALUES (8, 'MacBook Pro', 'Electronics', 1999.99, 50);
  INSERT INTO products VALUES (9, 'Bose Headphones', 'Electronics', 349.99, 75);
  INSERT INTO products VALUES (10, 'iPhone 15', 'Electronics', 999.99, 120);
  INSERT INTO products VALUES (11, 'Smart Toaster', 'Home & Kitchen', 149.99, 30);
  INSERT INTO products VALUES (12, 'Slow Cooker', 'Home & Kitchen', 69.99, 60);
  INSERT INTO products VALUES (13, 'Winter Jacket', 'Apparel', 180.00, 40);
  INSERT INTO products VALUES (14, 'Denim Jeans', 'Apparel', 60.00, 150);
  INSERT INTO products VALUES (15, 'Air Purifier', 'Home & Kitchen', 249.99, 25);

  CREATE TABLE orders(order_id INT, customer_id INT, product_id INT, order_date DATE, quantity INT, total_price DECIMAL);
  INSERT INTO orders VALUES (101, 10, 1, '2026-05-01', 1, 139.99);
  INSERT INTO orders VALUES (102, 11, 2, '2026-05-02', 2, 99.98);
  INSERT INTO orders VALUES (103, 12, 3, '2026-05-03', 1, 599.99);
  INSERT INTO orders VALUES (104, 10, 2, '2026-05-04', 1, 49.99);
  INSERT INTO orders VALUES (105, 14, 5, '2026-05-05', 1, 120.00);
  INSERT INTO orders VALUES (106, 12, 1, '2026-05-06', 1, 139.99);
  INSERT INTO orders VALUES (107, 10, 4, '2026-05-07', 1, 89.99);
  INSERT INTO orders VALUES (108, 15, 8, '2026-05-08', 1, 1999.99);
  INSERT INTO orders VALUES (109, 16, 10, '2026-05-08', 2, 1999.98);
  INSERT INTO orders VALUES (110, 10, 9, '2026-05-09', 1, 349.99);
  INSERT INTO orders VALUES (111, 11, 14, '2026-05-10', 3, 180.00);
  INSERT INTO orders VALUES (112, 12, 12, '2026-05-10', 1, 69.99);
  INSERT INTO orders VALUES (113, 10, 15, '2026-05-11', 1, 249.99);
  INSERT INTO orders VALUES (114, 14, 13, '2026-05-12', 1, 180.00);
  INSERT INTO orders VALUES (115, 12, 2, '2026-05-13', 1, 49.99);

  CREATE TABLE reviews(review_id INT, customer_id INT, product_id INT, rating INT, review_date DATE);
  INSERT INTO reviews VALUES (1, 10, 1, 5, '2026-05-02');
  INSERT INTO reviews VALUES (2, 11, 2, 4, '2026-05-03');
  INSERT INTO reviews VALUES (3, 12, 3, 5, '2026-05-05');
  INSERT INTO reviews VALUES (4, 14, 5, 2, '2026-05-06');
  INSERT INTO reviews VALUES (5, 10, 2, 5, '2026-05-08');
  INSERT INTO reviews VALUES (6, 15, 8, 5, '2026-05-09');
  INSERT INTO reviews VALUES (7, 16, 10, 4, '2026-05-10');
  INSERT INTO reviews VALUES (8, 10, 9, 3, '2026-05-10');
  INSERT INTO reviews VALUES (9, 11, 14, 4, '2026-05-11');
  INSERT INTO reviews VALUES (10, 12, 12, 5, '2026-05-12');

  CREATE TABLE drivers(driver_id INT, name VARCHAR, rating DECIMAL, join_date DATE, is_active INT);
  INSERT INTO drivers VALUES (1, 'Sarah Jenkins', 4.9, '2024-01-15', 1);
  INSERT INTO drivers VALUES (2, 'Mike Ross', 4.3, '2024-03-22', 1);
  INSERT INTO drivers VALUES (3, 'David Beckham', 4.8, '2025-06-10', 1);
  INSERT INTO drivers VALUES (4, 'Emma Watson', 4.1, '2024-11-05', 0);
  INSERT INTO drivers VALUES (5, 'James Bond', 4.7, '2025-09-01', 1);
  INSERT INTO drivers VALUES (6, 'Harvey Specter', 5.0, '2025-01-10', 1);
  INSERT INTO drivers VALUES (7, 'Jessica Pearson', 4.9, '2025-02-14', 1);

  CREATE TABLE rides(ride_id INT, driver_id INT, rider_id INT, distance_miles DECIMAL, fare_amount DECIMAL, ride_timestamp TIMESTAMP, status VARCHAR);
  INSERT INTO rides VALUES (5001, 1, 901, 5.2, 18.50, '2026-06-01 10:15:00', 'completed');
  INSERT INTO rides VALUES (5002, 2, 902, 8.4, 28.00, '2026-06-01 11:30:00', 'completed');
  INSERT INTO rides VALUES (5003, 1, 903, 3.1, 12.00, '2026-06-01 12:45:00', 'completed');
  INSERT INTO rides VALUES (5004, 3, 901, 12.5, 45.00, '2026-06-02 08:00:00', 'completed');
  INSERT INTO rides VALUES (5005, 4, 905, 2.0, 9.50, '2026-06-02 09:15:00', 'cancelled');
  INSERT INTO rides VALUES (5006, 5, 906, 15.1, 52.00, '2026-06-02 14:00:00', 'completed');
  INSERT INTO rides VALUES (5007, 2, 901, 4.3, 15.00, '2026-06-03 16:30:00', 'completed');
  INSERT INTO rides VALUES (5008, 1, 902, 2.5, 9.00, '2026-06-01 18:30:00', 'completed');
  INSERT INTO rides VALUES (5009, 1, 904, 1.2, 7.50, '2026-06-01 19:45:00', 'cancelled');
  INSERT INTO rides VALUES (5010, 6, 901, 18.5, 65.00, '2026-06-02 10:00:00', 'completed');
  INSERT INTO rides VALUES (5011, 6, 903, 5.0, 20.00, '2026-06-02 15:30:00', 'cancelled');
  INSERT INTO rides VALUES (5012, 7, 902, 10.2, 32.50, '2026-06-03 09:00:00', 'completed');
  INSERT INTO rides VALUES (5013, 7, 904, 2.2, 10.00, '2026-06-03 14:15:00', 'cancelled');

  CREATE TABLE users(user_id INT, username VARCHAR, signup_date DATE, country VARCHAR);
  INSERT INTO users VALUES (1001, 'alex_g', '2025-12-25', 'USA');
  INSERT INTO users VALUES (1002, 'chloe_f', '2025-12-28', 'Canada');
  INSERT INTO users VALUES (1003, 'sam_b', '2025-12-29', 'UK');
  INSERT INTO users VALUES (1004, 'tariq_m', '2026-01-02', 'UAE');
  INSERT INTO users VALUES (1005, 'lisa_k', '2026-01-05', 'Germany');
  INSERT INTO users VALUES (1006, 'akash_p', '2026-01-10', 'Canada');
  INSERT INTO users VALUES (1007, 'matt_h', '2026-01-15', 'USA');
  INSERT INTO users VALUES (1008, 'sophie_r', '2026-01-20', 'France');

  CREATE TABLE friendships(user_id_1 INT, user_id_2 INT, establish_date DATE);
  INSERT INTO friendships VALUES (1001, 1002, '2025-12-29');
  INSERT INTO friendships VALUES (1001, 1003, '2025-12-30');
  INSERT INTO friendships VALUES (1002, 1006, '2026-01-11');
  INSERT INTO friendships VALUES (1005, 1008, '2026-01-22');
  INSERT INTO friendships VALUES (1001, 1007, '2026-01-25');
  INSERT INTO friendships VALUES (1003, 1005, '2026-02-01');

  CREATE TABLE posts(post_id INT, user_id INT, post_date DATE, likes_count INT);
  INSERT INTO posts VALUES (201, 1001, '2025-12-26', 12);
  INSERT INTO posts VALUES (202, 1002, '2025-12-30', 5);
  INSERT INTO posts VALUES (203, 1001, '2025-12-31', 60);
  INSERT INTO posts VALUES (204, 1004, '2026-01-03', 25);
  INSERT INTO posts VALUES (205, 1006, '2026-01-12', 110);
  INSERT INTO posts VALUES (206, 1007, '2026-01-16', 45);
  INSERT INTO posts VALUES (207, 1003, '2026-01-18', 0);
  INSERT INTO posts VALUES (208, 1005, '2026-01-22', 80);
  INSERT INTO posts VALUES (209, 1008, '2026-01-25', 120);

  CREATE TABLE titles(title_id INT, name VARCHAR, type VARCHAR, genre VARCHAR, release_year INT);
  INSERT INTO titles VALUES (301, 'Stranger Things', 'Show', 'Sci-Fi', 2016);
  INSERT INTO titles VALUES (302, 'The Queen''s Gambit', 'Show', 'Drama', 2020);
  INSERT INTO titles VALUES (303, 'Squid Game', 'Show', 'Thriller', 2021);
  INSERT INTO titles VALUES (304, 'Irishman', 'Movie', 'Crime', 2019);
  INSERT INTO titles VALUES (305, 'Glass Onion', 'Movie', 'Comedy', 2022);
  INSERT INTO titles VALUES (306, 'Wednesday', 'Show', 'Comedy', 2022);
  INSERT INTO titles VALUES (307, 'Black Mirror', 'Show', 'Sci-Fi', 2011);
  INSERT INTO titles VALUES (308, 'The Crown', 'Show', 'Drama', 2016);
  INSERT INTO titles VALUES (309, 'Enola Holmes', 'Movie', 'Mystery', 2020);
  INSERT INTO titles VALUES (310, 'Roma', 'Movie', 'Drama', 2018);

  CREATE TABLE watch_history(watch_id INT, user_id INT, title_id INT, watch_date DATE, duration_minutes INT, device VARCHAR);
  INSERT INTO watch_history VALUES (4001, 1001, 301, '2026-05-10', 45, 'TV');
  INSERT INTO watch_history VALUES (4002, 1001, 301, '2026-05-11', 50, 'TV');
  INSERT INTO watch_history VALUES (4003, 1002, 302, '2026-05-12', 60, 'Laptop');
  INSERT INTO watch_history VALUES (4004, 1003, 303, '2026-05-13', 55, 'Mobile');
  INSERT INTO watch_history VALUES (4005, 1001, 305, '2026-05-12', 139, 'TV');
  INSERT INTO watch_history VALUES (4006, 1006, 306, '2026-05-15', 45, 'Laptop');
  INSERT INTO watch_history VALUES (4007, 1006, 306, '2026-05-16', 50, 'TV');
  INSERT INTO watch_history VALUES (4008, 1005, 307, '2026-05-10', 60, 'TV');
  INSERT INTO watch_history VALUES (4009, 1005, 307, '2026-05-11', 60, 'TV');
  INSERT INTO watch_history VALUES (4010, 1005, 308, '2026-05-12', 55, 'TV');
  INSERT INTO watch_history VALUES (4011, 1007, 309, '2026-05-15', 120, 'Mobile');

  CREATE TABLE transactions(transaction_id INT, customer_id INT, amount DECIMAL, currency VARCHAR, status VARCHAR, created_at TIMESTAMP);
  INSERT INTO transactions VALUES (9001, 10, 150.00, 'USD', 'succeeded', '2026-05-01 10:00:00');
  INSERT INTO transactions VALUES (9002, 11, 25.00, 'USD', 'succeeded', '2026-05-01 11:30:00');
  INSERT INTO transactions VALUES (9003, 12, 600.00, 'USD', 'failed', '2026-05-02 08:15:00');
  INSERT INTO transactions VALUES (9004, 13, 850.00, 'USD', 'succeeded', '2026-05-02 09:45:00');
  INSERT INTO transactions VALUES (9005, 14, 120.00, 'USD', 'succeeded', '2026-05-03 14:00:00');
  INSERT INTO transactions VALUES (9006, 12, 600.00, 'USD', 'succeeded', '2026-05-03 15:30:00');
  INSERT INTO transactions VALUES (9007, 10, 80.00, 'USD', 'succeeded', '2026-05-04 16:00:00');
  INSERT INTO transactions VALUES (9008, 15, 750.00, 'USD', 'failed', '2026-05-05 10:20:00');
  INSERT INTO transactions VALUES (9009, 16, 950.00, 'USD', 'succeeded', '2026-05-06 11:00:00');
  INSERT INTO transactions VALUES (9010, 17, 45.00, 'USD', 'succeeded', '2026-05-07 09:15:00');
  INSERT INTO transactions VALUES (9011, 11, 300.00, 'USD', 'succeeded', '2026-05-07 14:30:00');
  INSERT INTO transactions VALUES (9012, 18, 1100.00, 'USD', 'succeeded', '2026-05-08 10:00:00');

  CREATE TABLE disputes(dispute_id INT, transaction_id INT, reason VARCHAR, status VARCHAR, created_at TIMESTAMP);
  INSERT INTO disputes VALUES (801, 9001, 'fraudulent', 'lost', '2026-05-05 09:00:00');
  INSERT INTO disputes VALUES (802, 9004, 'unrecognized', 'won', '2026-05-06 14:30:00');
  INSERT INTO disputes VALUES (803, 9009, 'fraudulent', 'under_review', '2026-05-07 10:00:00');
  INSERT INTO disputes VALUES (804, 9012, 'unrecognized', 'lost', '2026-05-09 11:30:00');

  CREATE TABLE listings(listing_id INT, host_id INT, name VARCHAR, property_type VARCHAR, price_per_night DECIMAL, room_type VARCHAR, country VARCHAR);
  INSERT INTO listings VALUES (1, 101, 'Charming Downtown Apartment', 'Apartment', 120.00, 'Entire home', 'USA');
  INSERT INTO listings VALUES (2, 102, 'Cozy Beachside Bungalow', 'Bungalow', 180.00, 'Entire home', 'USA');
  INSERT INTO listings VALUES (3, 101, 'Modern Loft near Subway', 'Apartment', 95.00, 'Private room', 'USA');
  INSERT INTO listings VALUES (4, 103, 'Rustic Cabin in the Woods', 'Cabin', 150.00, 'Entire home', 'Canada');
  INSERT INTO listings VALUES (5, 104, 'Luxury Penthouse', 'Apartment', 350.00, 'Entire home', 'USA');
  INSERT INTO listings VALUES (6, 102, 'Art Deco Studio', 'Apartment', 85.00, 'Entire home', 'USA');
  INSERT INTO listings VALUES (7, 105, 'Stunning Lakefront Cottage', 'Cabin', 220.00, 'Entire home', 'Canada');

  CREATE TABLE bookings(booking_id INT, listing_id INT, guest_id INT, check_in DATE, check_out DATE, total_amount DECIMAL);
  INSERT INTO bookings VALUES (201, 1, 301, '2026-06-01', '2026-06-05', 480.00);
  INSERT INTO bookings VALUES (202, 2, 302, '2026-06-02', '2026-06-07', 900.00);
  INSERT INTO bookings VALUES (203, 3, 303, '2026-06-04', '2026-06-06', 190.00);
  INSERT INTO bookings VALUES (204, 1, 304, '2026-06-08', '2026-06-10', 240.00);
  INSERT INTO bookings VALUES (205, 5, 305, '2026-06-05', '2026-06-08', 1050.00);
  INSERT INTO bookings VALUES (206, 6, 301, '2026-06-10', '2026-06-12', 170.00);
  INSERT INTO bookings VALUES (207, 7, 306, '2026-06-04', '2026-06-09', 1100.00);
  INSERT INTO bookings VALUES (208, 3, 302, '2026-06-11', '2026-06-12', 95.00);

  CREATE TABLE songs(song_id INT, title VARCHAR, artist VARCHAR, album VARCHAR, duration_seconds INT, daily_plays INT);
  INSERT INTO songs VALUES (401, 'Blinding Lights', 'The Weeknd', 'After Hours', 200, 120000);
  INSERT INTO songs VALUES (402, 'Stay', 'Kid LAROI', 'F*CK LOVE 3', 140, 85000);
  INSERT INTO songs VALUES (403, 'Bad Habits', 'Ed Sheeran', '=', 230, 45000);
  INSERT INTO songs VALUES (404, 'Levitating', 'Dua Lipa', 'Future Nostalgia', 203, 95000);
  INSERT INTO songs VALUES (405, 'Shape of You', 'Ed Sheeran', 'divide', 233, 35000);
  INSERT INTO songs VALUES (406, 'Starboy', 'The Weeknd', 'Starboy', 230, 95000);
  INSERT INTO songs VALUES (407, 'Perfect', 'Ed Sheeran', 'divide', 263, 60000);
  INSERT INTO songs VALUES (408, 'Save Your Tears', 'The Weeknd', 'After Hours', 215, 80000);

  CREATE TABLE playlists(playlist_id INT, user_id INT, name VARCHAR, created_at DATE);
  INSERT INTO playlists VALUES (501, 1001, 'Summer Vibes 2026', '2026-05-01');
  INSERT INTO playlists VALUES (502, 1002, 'Chill Coding Beats', '2026-05-05');
  INSERT INTO playlists VALUES (503, 1003, 'Acoustic Hits', '2026-05-06');

  CREATE TABLE playlist_tracks(playlist_id INT, song_id INT, added_at DATE);
  INSERT INTO playlist_tracks VALUES (501, 401, '2026-05-01');
  INSERT INTO playlist_tracks VALUES (501, 404, '2026-05-02');
  INSERT INTO playlist_tracks VALUES (502, 401, '2026-05-05');
  INSERT INTO playlist_tracks VALUES (502, 402, '2026-05-06');
  INSERT INTO playlist_tracks VALUES (502, 403, '2026-05-07');
  INSERT INTO playlist_tracks VALUES (503, 405, '2026-05-08');
  INSERT INTO playlist_tracks VALUES (503, 407, '2026-05-08');
  INSERT INTO playlist_tracks VALUES (501, 406, '2026-05-03');

  CREATE TABLE videos(video_id INT, creator_id INT, duration_seconds INT, upload_time TIMESTAMP, view_count INT, share_count INT);
  INSERT INTO videos VALUES (601, 701, 15, '2026-06-01 09:00:00', 1200000, 45000);
  INSERT INTO videos VALUES (602, 702, 45, '2026-06-02 10:15:00', 800000, 20000);
  INSERT INTO videos VALUES (603, 701, 120, '2026-06-02 11:30:00', 300000, 5000);
  INSERT INTO videos VALUES (604, 703, 30, '2026-06-03 14:00:00', 1500000, 95000);
  INSERT INTO videos VALUES (605, 704, 60, '2026-06-04 15:00:00', 250000, 3000);
  INSERT INTO videos VALUES (606, 701, 59, '2026-06-04 16:30:00', 1800000, 150000);

  CREATE TABLE comments(comment_id INT, video_id INT, user_id INT, comment_text VARCHAR, likes INT, created_at TIMESTAMP);
  INSERT INTO comments VALUES (701, 601, 1001, 'This is amazing!', 1200, '2026-06-01 09:10:00');
  INSERT INTO comments VALUES (702, 601, 1002, 'Wow, so creative!', 800, '2026-06-01 09:15:00');
  INSERT INTO comments VALUES (703, 604, 1003, 'LMAO I cannot stop watching this', 5500, '2026-06-03 14:05:00');
  INSERT INTO comments VALUES (704, 602, 1004, 'Underwhelming tbh', 150, '2026-06-02 10:30:00');
  INSERT INTO comments VALUES (705, 606, 1001, 'Unbelievable skill!', 10500, '2026-06-04 16:40:00');
  INSERT INTO comments VALUES (706, 606, 1006, 'First!', 45, '2026-06-04 16:31:00');

  CREATE TABLE accounts(account_id INT, customer_name VARCHAR, account_type VARCHAR, balance DECIMAL, opened_at DATE);
  INSERT INTO accounts VALUES (2001, 'John Doe', 'Checking', 1500.00, '2025-01-15');
  INSERT INTO accounts VALUES (2002, 'Jane Smith', 'Savings', 12000.00, '2025-02-20');
  INSERT INTO accounts VALUES (2003, 'Robert Johnson', 'Checking', 850.00, '2025-03-10');
  INSERT INTO accounts VALUES (2004, 'Emily Davis', 'Savings', 500.00, '2025-04-05');
  INSERT INTO accounts VALUES (2005, 'Michael Brown', 'Checking', 25000.00, '2025-05-12');

  CREATE TABLE loans(loan_id INT, account_id INT, amount DECIMAL, interest_rate DECIMAL, status VARCHAR, start_date DATE);
  INSERT INTO loans VALUES (3001, 2001, 5000.00, 0.05, 'active', '2025-06-01');
  INSERT INTO loans VALUES (3002, 2003, 1000.00, 0.07, 'active', '2025-06-15');
  INSERT INTO loans VALUES (3003, 2005, 12000.00, 0.04, 'active', '2025-07-01');
  INSERT INTO loans VALUES (3004, 2002, 2000.00, 0.06, 'completed', '2025-05-01');

  CREATE TABLE campaigns(campaign_id INT, name VARCHAR, channel VARCHAR, budget DECIMAL, start_date DATE);
  INSERT INTO campaigns VALUES (4001, 'Summer Sale 2026', 'Email', 5000.00, '2026-06-01');
  INSERT INTO campaigns VALUES (4002, 'Black Friday Pre-launch', 'Social Media', 15000.00, '2026-11-01');
  INSERT INTO campaigns VALUES (4003, 'Spring Clearance', 'Search Engine', 8000.00, '2026-03-01');
  INSERT INTO campaigns VALUES (4004, 'Holiday Gift Guide', 'Social Media', 12000.00, '2026-12-01');
  INSERT INTO campaigns VALUES (4005, 'Re-engagement Email', 'Email', 2500.00, '2026-07-01');

  CREATE TABLE conversions(conversion_id INT, campaign_id INT, user_id INT, revenue DECIMAL, conversion_date DATE);
  INSERT INTO conversions VALUES (5001, 4001, 1001, 150.00, '2026-06-02');
  INSERT INTO conversions VALUES (5002, 4001, 1002, 250.00, '2026-06-03');
  INSERT INTO conversions VALUES (5003, 4002, 1003, 1200.00, '2026-11-02');
  INSERT INTO conversions VALUES (5004, 4002, 1001, 850.00, '2026-11-03');
  INSERT INTO conversions VALUES (5005, 4003, 1005, 300.00, '2026-03-05');
  INSERT INTO conversions VALUES (5006, 4004, 1006, 450.00, '2026-12-05');
  INSERT INTO conversions VALUES (5007, 4004, 1007, 600.00, '2026-12-06');
  INSERT INTO conversions VALUES (5008, 4002, 1008, 2000.00, '2026-11-05');

  CREATE TABLE agents(agent_id INT, name VARCHAR, department VARCHAR, is_active INT);
  INSERT INTO agents VALUES (6001, 'Alice Green', 'Hardware', 1);
  INSERT INTO agents VALUES (6002, 'Bob White', 'Software', 1);
  INSERT INTO agents VALUES (6003, 'Charlie Black', 'Network', 1);
  INSERT INTO agents VALUES (6004, 'Diana Blue', 'Billing', 0);

  CREATE TABLE tickets(ticket_id INT, assignee_id INT, priority VARCHAR, status VARCHAR, created_at TIMESTAMP, resolved_at TIMESTAMP);
  INSERT INTO tickets VALUES (7001, 6001, 'HIGH', 'resolved', '2026-06-01 09:00:00', '2026-06-01 14:30:00');
  INSERT INTO tickets VALUES (7002, 6002, 'MEDIUM', 'resolved', '2026-06-01 10:00:00', '2026-06-01 18:00:00');
  INSERT INTO tickets VALUES (7003, 6001, 'URGENT', 'resolved', '2026-06-02 08:00:00', '2026-06-02 20:00:00');
  INSERT INTO tickets VALUES (7004, 6003, 'LOW', 'open', '2026-06-02 11:00:00', NULL);
  INSERT INTO tickets VALUES (7005, 6002, 'HIGH', 'pending', '2026-06-03 13:00:00', NULL);
  INSERT INTO tickets VALUES (7006, 6001, 'LOW', 'resolved', '2026-06-03 14:00:00', '2026-06-04 10:00:00');
`;

export const challenges: Challenge[] = [
  {
    id: 1,
    title: "High-Ticket Category Audit",
    difficulty: "Beginner",
    company: "Amazon",
    persona: "VP of Merchandising",
    prompt: "Hey team, the merchandising VP wants a quick list of all products in our 'Electronics' catalog that cost more than $100. Please sort them from most expensive to least so we can review pricing.",
    hint: "Use SELECT, WHERE with category = 'Electronics' AND price > 100, and ORDER BY price DESC.",
    expectedQuery: "SELECT * FROM products WHERE category = 'Electronics' AND price > 100 ORDER BY price DESC",
    schemaTables: ["products"]
  },
  {
    id: 2,
    title: "Expansion Target Demographics",
    difficulty: "Beginner",
    company: "Meta",
    persona: "VP of Growth & Expansion",
    prompt: "Hello team. We had a massive holiday campaign in late December 2025. Please fetch me all user accounts signed up between '2025-12-25' and '2025-12-31' inclusive. Show their usernames and countries so we can audit geo-conversions.",
    hint: "Use SELECT with a WHERE clause checking signup_date BETWEEN '2025-12-25' AND '2025-12-31'.",
    expectedQuery: "SELECT username, country FROM users WHERE signup_date BETWEEN '2025-12-25' AND '2025-12-31'",
    schemaTables: ["users"]
  },
  {
    id: 3,
    title: "Modern Catalog Audit",
    difficulty: "Beginner",
    company: "Netflix",
    persona: "Head of Content Acquisition",
    prompt: "Hey data team. I need to audit our modern releases. Show me all TV shows (type = 'Show') released in or after 2021. Sort the results alphabetically by title name.",
    hint: "Use SELECT * FROM titles WHERE type = 'Show' AND release_year >= 2021 ORDER BY name ASC.",
    expectedQuery: "SELECT * FROM titles WHERE type = 'Show' AND release_year >= 2021 ORDER BY name",
    schemaTables: ["titles"]
  },
  {
    id: 4,
    title: "High-Performer Driver Audit",
    difficulty: "Intermediate",
    company: "Uber",
    persona: "City General Manager",
    prompt: "I need to audit our active high-performers for bonus rewards. Find the driver_id, their total completed ride fares, and their overall rating, but only for active drivers (is_active = 1) who have a driver rating above 4.5. Sort them by total fares descending.",
    hint: "Join drivers and rides, filter WHERE is_active = 1 AND rating > 4.5 and status = 'completed', GROUP BY driver_id, name, and rating.",
    expectedQuery: "SELECT d.driver_id, d.name, SUM(r.fare_amount) AS total_fares, d.rating FROM drivers d JOIN rides r ON d.driver_id = r.driver_id WHERE d.is_active = 1 AND d.rating > 4.5 AND r.status = 'completed' GROUP BY d.driver_id, d.name, d.rating ORDER BY total_fares DESC",
    schemaTables: ["drivers", "rides"]
  },
  {
    id: 5,
    title: "Product Rating Health Checks",
    difficulty: "Intermediate",
    company: "Amazon",
    persona: "Director of Product Integrity",
    prompt: "Hey analytics team. I'm auditing our product health. Generate a report showing each product's title, its average review rating, and the total count of reviews. Only include products that have received reviews, and order by average rating descending.",
    hint: "Inner join products with reviews, aggregate using AVG(rating) and COUNT(review_id), group by product_id and title.",
    expectedQuery: "SELECT p.title, AVG(r.rating) AS avg_rating, COUNT(r.review_id) AS total_reviews FROM products p JOIN reviews r ON p.product_id = r.product_id GROUP BY p.product_id, p.title ORDER BY avg_rating DESC",
    schemaTables: ["products", "reviews"]
  },
  {
    id: 6,
    title: "Failed Transactions Recovery",
    difficulty: "Intermediate",
    company: "Stripe",
    persona: "Head of Merchant Support",
    prompt: "We need to recover failed checkout volumes. Find the customer_id, their total failed transaction volume (sum of amount), and the count of their failed transactions, but only for customers who have experienced failed transactions totaling more than $500.",
    hint: "Filter transactions WHERE status = 'failed', GROUP BY customer_id, and use HAVING SUM(amount) > 500.",
    expectedQuery: "SELECT customer_id, SUM(amount) AS total_failed_amount, COUNT(transaction_id) AS failed_count FROM transactions WHERE status = 'failed' GROUP BY customer_id HAVING SUM(amount) > 500",
    schemaTables: ["transactions"]
  },
  {
    id: 7,
    title: "Creators Retention Check",
    difficulty: "Intermediate",
    company: "Meta",
    persona: "VP of Creators & Community",
    prompt: "Hey developers, I need to check on our creators. Show me the user_id, username, and signup_date of creators who have published at least one post, but whose posts have received zero likes in total. We want to reach out to them for feedback.",
    hint: "Join users and posts, group by user_id, username, and signup_date, and filter HAVING SUM(likes_count) = 0.",
    expectedQuery: "SELECT u.user_id, u.username, u.signup_date FROM users u JOIN posts p ON u.user_id = p.user_id GROUP BY u.user_id, u.username, u.signup_date HAVING SUM(p.likes_count) = 0",
    schemaTables: ["users", "posts"]
  },
  {
    id: 8,
    title: "Netflix Engagement Analysis",
    difficulty: "Advanced",
    company: "Netflix",
    persona: "Director of Engagement Metrics",
    prompt: "Hey team, to analyze user retention, calculate a running total of watch duration (in minutes) for each user over time. Show the user_id, watch_date, duration_minutes, and the cumulative watch duration (ordered by watch_date).",
    hint: "Use the window function SUM(duration_minutes) OVER (PARTITION BY user_id ORDER BY watch_date) as cumulative_duration.",
    expectedQuery: "SELECT user_id, watch_date, duration_minutes, SUM(duration_minutes) OVER (PARTITION BY user_id ORDER BY watch_date) AS cumulative_duration FROM watch_history ORDER BY user_id, watch_date",
    schemaTables: ["watch_history"]
  },
  {
    id: 9,
    title: "Island Creators Discovery",
    difficulty: "Advanced",
    company: "Meta",
    persona: "Product Growth Manager",
    prompt: "Growth team here. We need to identify 'island' creators: users who have created a post that received more than 50 likes, but currently have fewer than 2 friends established in their friendships database. Show their user_id, username, and the count of their friendships.",
    hint: "Use subqueries or left joins. Count active friendships where user_id matches user_id_1 or user_id_2, join with posts and users, and filter appropriately.",
    expectedQuery: "SELECT u.user_id, u.username, COUNT(DISTINCT f.establish_date) AS friendship_count FROM users u JOIN posts p ON u.user_id = p.user_id LEFT JOIN friendships f ON (u.user_id = f.user_id_1 OR u.user_id = f.user_id_2) WHERE p.likes_count > 50 GROUP BY u.user_id, u.username HAVING COUNT(DISTINCT f.establish_date) < 2",
    schemaTables: ["users", "posts", "friendships"]
  },
  {
    id: 10,
    title: "Merchant Loss Analysis",
    difficulty: "Advanced",
    company: "Stripe",
    persona: "VP of Risk & Compliance",
    prompt: "Compliance needs a report on merchant revenue losses. Find the total volume disputed and the count of disputes for transactions that originally succeeded. Group the results by dispute status.",
    hint: "Join transactions and disputes, filter transactions WHERE status = 'succeeded', and group by the disputes.status.",
    expectedQuery: "SELECT d.status AS dispute_status, SUM(t.amount) AS total_disputed_amount, COUNT(d.dispute_id) AS dispute_count FROM transactions t JOIN disputes d ON t.transaction_id = d.transaction_id WHERE t.status = 'succeeded' GROUP BY d.status",
    schemaTables: ["transactions", "disputes"]
  },
  {
    id: 11,
    title: "Host Portfolio Yield",
    difficulty: "Intermediate",
    company: "Airbnb",
    persona: "VP of Host Relations",
    prompt: "I need to analyze US host revenue. Show me the host_id, the count of unique listings they own, and the total revenue generated by completed bookings (check_out before or on '2026-06-12'). Only show hosts who own more than 1 listing, and sort them by total revenue descending.",
    hint: "Join listings and bookings, filter where country = 'USA' and check_out <= '2026-06-12', group by host_id, filter having count(distinct listing_id) > 1.",
    expectedQuery: "SELECT l.host_id, COUNT(DISTINCT l.listing_id) AS listing_count, SUM(b.total_amount) AS total_revenue FROM listings l JOIN bookings b ON l.listing_id = b.listing_id WHERE l.country = 'USA' AND b.check_out <= '2026-06-12' GROUP BY l.host_id HAVING COUNT(DISTINCT l.listing_id) > 1 ORDER BY total_revenue DESC",
    schemaTables: ["listings", "bookings"]
  },
  {
    id: 12,
    title: "Popular Track Discovery",
    difficulty: "Beginner",
    company: "Spotify",
    persona: "Head of Playlist Curation",
    prompt: "We are building a new 'Daily Hit' playlist. Find all songs that have been played more than 50,000 times daily. Display their title, artist, and daily_plays, sorted by daily_plays descending.",
    hint: "Use SELECT title, artist, daily_plays FROM songs WHERE daily_plays > 50000 ORDER BY daily_plays DESC.",
    expectedQuery: "SELECT title, artist, daily_plays FROM songs WHERE daily_plays > 50000 ORDER BY daily_plays DESC",
    schemaTables: ["songs"]
  },
  {
    id: 13,
    title: "Playlist Crossover Hits",
    difficulty: "Intermediate",
    company: "Spotify",
    persona: "Director of Music Programming",
    prompt: "We are tracking song curation across user playlists. Find songs that are included in at least two different playlists. Return the song title, artist, and the number of playlists it appears in, sorted by playlist count descending.",
    hint: "Join songs and playlist_tracks, GROUP BY song_id, title, and artist, and use HAVING COUNT(DISTINCT playlist_id) >= 2.",
    expectedQuery: "SELECT s.title, s.artist, COUNT(DISTINCT pt.playlist_id) AS playlist_count FROM songs s JOIN playlist_tracks pt ON s.song_id = pt.song_id GROUP BY s.song_id, s.title, s.artist HAVING COUNT(DISTINCT pt.playlist_id) >= 2 ORDER BY playlist_count DESC",
    schemaTables: ["songs", "playlist_tracks"]
  },
  {
    id: 14,
    title: "Viral Video Audit",
    difficulty: "Beginner",
    company: "TikTok",
    persona: "VP of Creator Growth",
    prompt: "We need a list of short-form videos (duration_seconds less than 60) that achieved viral status with over 1,000,000 views. Return the video_id, creator_id, and view_count, sorted by view_count descending.",
    hint: "Use SELECT video_id, creator_id, view_count FROM videos WHERE duration_seconds < 60 AND view_count > 1000000 ORDER BY view_count DESC.",
    expectedQuery: "SELECT video_id, creator_id, view_count FROM videos WHERE duration_seconds < 60 AND view_count > 1000000 ORDER BY view_count DESC",
    schemaTables: ["videos"]
  },
  {
    id: 15,
    title: "High-Engagement Comments Tracking",
    difficulty: "Advanced",
    company: "TikTok",
    persona: "Head of Safety & Moderation",
    prompt: "We need to audit high-engagement comments on popular videos. For each video that has a total view count above 500,000, find the comment_id, comment_text, and comment likes, but only for comments that received more than 1,000 likes. Sort the results by comment likes descending.",
    hint: "Join comments and videos on video_id. Filter where view_count > 500000 and likes > 1000, then order by likes DESC.",
    expectedQuery: "SELECT c.comment_id, c.comment_text, c.likes AS comment_likes FROM comments c JOIN videos v ON c.video_id = v.video_id WHERE v.view_count > 500000 AND c.likes > 1000 ORDER BY comment_likes DESC",
    schemaTables: ["videos", "comments"]
  },
  {
    id: 16,
    title: "Active Driver Cancellation Rate",
    difficulty: "Advanced",
    company: "Uber",
    persona: "VP of Operations",
    prompt: "Operations needs the daily cancellation rate of rides served by active drivers (is_active = 1) between '2026-06-01' and '2026-06-03'. The cancellation rate is the count of cancelled rides divided by the total rides for active drivers on that day. Show the date as ride_date and round the rate to two decimal places. Sort by ride_date ascending.",
    hint: "Join rides and drivers, filter where is_active = 1 and date between '2026-06-01' and '2026-06-03'. Group by the SUBSTRING of timestamp as ride_date and divide cancelled count by count(*).",
    expectedQuery: "SELECT SUBSTRING(r.ride_timestamp, 1, 10) AS ride_date, ROUND(SUM(CASE WHEN r.status = 'cancelled' THEN 1.0 ELSE 0.0 END) / COUNT(*), 2) AS cancellation_rate FROM rides r JOIN drivers d ON r.driver_id = d.driver_id WHERE d.is_active = 1 AND SUBSTRING(r.ride_timestamp, 1, 10) BETWEEN '2026-06-01' AND '2026-06-03' GROUP BY SUBSTRING(r.ride_timestamp, 1, 10) ORDER BY ride_date",
    schemaTables: ["rides", "drivers"]
  },
  {
    id: 17,
    title: "Consecutive Binge Days",
    difficulty: "Advanced",
    company: "Netflix",
    persona: "VP of Audience Engagement",
    prompt: "Find the user IDs of users who watched content on Netflix for 3 or more consecutive days. Return the user_id sorted in ascending order.",
    hint: "Self-join watch_history three times on matching user_id where DATEDIFF(day, w1.watch_date, w2.watch_date) = 1 and DATEDIFF(day, w1.watch_date, w3.watch_date) = 2.",
    expectedQuery: "SELECT DISTINCT w1.user_id FROM watch_history w1 JOIN watch_history w2 ON w1.user_id = w2.user_id AND DATEDIFF(day, w1.watch_date, w2.watch_date) = 1 JOIN watch_history w3 ON w1.user_id = w3.user_id AND DATEDIFF(day, w1.watch_date, w3.watch_date) = 2 ORDER BY w1.user_id",
    schemaTables: ["watch_history"]
  },
  {
    id: 18,
    title: "Category Top 3 Products",
    difficulty: "Advanced",
    company: "Amazon",
    persona: "Director of Merchandising",
    prompt: "Identify our premium items per sector. Find the top 3 highest-priced products within each product category. Return the category, product title, and price, sorted by category name ascending and then by price descending.",
    hint: "Use a correlated subquery checking where category matches and the count of distinct products with higher price is less than 3.",
    expectedQuery: "SELECT p1.category, p1.title, p1.price FROM products p1 WHERE (SELECT COUNT(DISTINCT p2.price) FROM products p2 WHERE p2.category = p1.category AND p2.price > p1.price) < 3 ORDER BY p1.category, p1.price DESC",
    schemaTables: ["products"]
  },
  {
    id: 19,
    title: "Second Highest Transaction",
    difficulty: "Intermediate",
    company: "Stripe",
    persona: "Director of Compliance Audit",
    prompt: "Merchant risk compliance requires auditing outlier amounts. Find the second-highest successful ('succeeded') transaction amount. If no such transaction exists, return NULL. Display this single value under the column name second_highest_amount.",
    hint: "Use nested subqueries: select MAX(amount) from transactions where status = 'succeeded' and amount is strictly less than the maximum amount.",
    expectedQuery: "SELECT MAX(amount) AS second_highest_amount FROM transactions WHERE status = 'succeeded' AND amount < (SELECT MAX(amount) FROM transactions WHERE status = 'succeeded')",
    schemaTables: ["transactions"]
  },
  {
    id: 20,
    title: "Rank Songs by Play Count",
    difficulty: "Intermediate",
    company: "Spotify",
    persona: "VP of Artist Royalty Operations",
    prompt: "Rank our library catalog based on engagement. Find each song title, its daily plays, and its dense rank order based on plays descending (meaning identical plays share the same rank number, and the next rank is consecutive). Sort by plays descending.",
    hint: "Use a subquery counting the number of distinct songs with daily_plays strictly greater than the current song plus 1.",
    expectedQuery: "SELECT s1.title, s1.daily_plays, (SELECT COUNT(DISTINCT s2.daily_plays) + 1 FROM songs s2 WHERE s2.daily_plays > s1.daily_plays) AS rank_order FROM songs s1 ORDER BY s1.daily_plays DESC",
    schemaTables: ["songs"]
  },
  {
    id: 21,
    title: "High-Budget Campaigns",
    difficulty: "Beginner",
    company: "Marketing",
    persona: "VP of Digital Marketing",
    prompt: "I need a list of our major campaigns. Find all marketing campaigns that have a budget exceeding $10,000. Display the campaign name, marketing channel, and budget, sorted chronologically by the start_date.",
    hint: "Use SELECT name, channel, budget FROM campaigns WHERE budget > 10000 ORDER BY start_date.",
    expectedQuery: "SELECT name, channel, budget FROM campaigns WHERE budget > 10000 ORDER BY start_date",
    schemaTables: ["campaigns"]
  },
  {
    id: 22,
    title: "Critical Unresolved Tickets",
    difficulty: "Beginner",
    company: "IT Support",
    persona: "Helpdesk Supervisor",
    prompt: "We need to clear our bottlenecked queries. Fetch all ticket records that have a priority of 'HIGH' or 'URGENT' and a status of 'open' or 'pending'. Show the ticket_id, assignee_id, and priority.",
    hint: "Use SELECT ticket_id, assignee_id, priority FROM tickets WHERE priority IN ('HIGH', 'URGENT') AND status IN ('open', 'pending').",
    expectedQuery: "SELECT ticket_id, assignee_id, priority FROM tickets WHERE priority IN ('HIGH', 'URGENT') AND status IN ('open', 'pending')",
    schemaTables: ["tickets"]
  },
  {
    id: 23,
    title: "High Loan-to-Balance Ratios",
    difficulty: "Intermediate",
    company: "Finance",
    persona: "VP of Credit Risk Management",
    prompt: "Identify accounts with high debt exposure. Find all accounts where their active loan amount exceeds 50% of their current account balance. Return the account_id, customer_name, active balance, and loan amount, sorted by loan amount descending.",
    hint: "Inner join accounts and loans on account_id, filter where loan status is 'active' and loan amount is greater than (balance * 0.5), and sort.",
    expectedQuery: "SELECT a.account_id, a.customer_name, a.balance, l.amount AS loan_amount FROM accounts a JOIN loans l ON a.account_id = l.account_id WHERE l.status = 'active' AND l.amount > (a.balance * 0.5) ORDER BY l.amount DESC",
    schemaTables: ["accounts", "loans"]
  },
  {
    id: 24,
    title: "Marketing Campaign ROI",
    difficulty: "Intermediate",
    company: "Marketing",
    persona: "Chief Marketing Officer (CMO)",
    prompt: "I need to evaluate campaign efficiency. Calculate the Return on Investment (ROI) percentage for each marketing campaign that has generated conversions. ROI is defined as: ((Total Revenue - Budget) / Budget) * 100. Display the campaign name and ROI (rounded to 2 decimal places), sorted by ROI descending.",
    hint: "Join campaigns and conversions, group by campaign_id, name, and budget. Use HAVING SUM(revenue) > 0 and calculate the ROI formula.",
    expectedQuery: "SELECT c.name, ROUND(((SUM(con.revenue) - c.budget) / c.budget) * 100, 2) AS roi FROM campaigns c JOIN conversions con ON c.campaign_id = con.campaign_id GROUP BY c.campaign_id, c.name, c.budget HAVING SUM(con.revenue) > 0 ORDER BY roi DESC",
    schemaTables: ["campaigns", "conversions"]
  },
  {
    id: 25,
    title: "Agent SLA Resolution Performance",
    difficulty: "Intermediate",
    company: "IT Support",
    persona: "Director of Customer Support Operations",
    prompt: "Audit our response SLA metrics. For each active support agent (is_active = 1), calculate the average resolution time in hours for their completed (resolved) tickets. Return the agent's name and average resolution hours (rounded to 1 decimal place).",
    hint: "Join agents and tickets, filter where is_active = 1 and status = 'resolved', group by agent_id and name. Use AVG(DATEDIFF(hour, created_at, resolved_at)).",
    expectedQuery: "SELECT a.name, ROUND(AVG(DATEDIFF(hour, t.created_at, t.resolved_at)), 1) AS avg_resolution_hours FROM agents a JOIN tickets t ON a.agent_id = t.assignee_id WHERE a.is_active = 1 AND t.status = 'resolved' GROUP BY a.agent_id, a.name",
    schemaTables: ["agents", "tickets"]
  },
  {
    id: 26,
    title: "Customer Net Wealth Audit",
    difficulty: "Advanced",
    company: "Finance",
    persona: "VP of Wealth Management",
    prompt: "We need a list of our customers sorted by liquidity. Calculate the net wealth of each customer, defined as their account balance minus the total amount of their active loans. If a customer has no active loans, their net wealth is equal to their account balance. Sort the results by net wealth descending.",
    hint: "Left join accounts and loans on account_id and loan status 'active'. Use COALESCE(SUM(l.amount), 0) to subtract from the account balance.",
    expectedQuery: "SELECT a.customer_name, a.balance - COALESCE(SUM(l.amount), 0) AS net_wealth FROM accounts a LEFT JOIN loans l ON a.account_id = l.account_id AND l.status = 'active' GROUP BY a.account_id, a.customer_name, a.balance ORDER BY net_wealth DESC",
    schemaTables: ["accounts", "loans"]
  },
  {
    id: 27,
    title: "Multi-Channel User Attribution",
    difficulty: "Advanced",
    company: "Marketing",
    persona: "Director of Customer Analytics",
    prompt: "Identify users responsive to cross-channel efforts. Find the user IDs of customers who converted in campaigns across more than one distinct marketing channel. Show the user_id, count of distinct channels they converted on, and the total revenue they generated.",
    hint: "Join conversions and campaigns, group by user_id, and filter using HAVING COUNT(DISTINCT c.channel) > 1.",
    expectedQuery: "SELECT con.user_id, COUNT(DISTINCT c.channel) AS channel_count, SUM(con.revenue) AS total_revenue FROM conversions con JOIN campaigns c ON con.campaign_id = c.campaign_id GROUP BY con.user_id HAVING COUNT(DISTINCT c.channel) > 1",
    schemaTables: ["campaigns", "conversions"]
  },
  {
    id: 28,
    title: "SLA Risk: Unassigned Critical Backlog",
    difficulty: "Advanced",
    company: "IT Support",
    persona: "VP of IT Infrastructure",
    prompt: "We are auditing critical incident response risk. Identify support agents who have NEVER been assigned a ticket of 'HIGH' or 'URGENT' priority. Show their names.",
    hint: "Use a subquery to find all distinct assignee_ids for high/urgent tickets, and select agent names who are NOT IN that list.",
    expectedQuery: "SELECT name FROM agents WHERE agent_id NOT IN (SELECT DISTINCT assignee_id FROM tickets WHERE priority IN ('HIGH', 'URGENT') AND assignee_id IS NOT NULL)",
    schemaTables: ["agents", "tickets"]
  },
  {
    id: 29,
    title: "Account Growth Asset Tiers",
    difficulty: "Advanced",
    company: "Finance",
    persona: "Chief Financial Officer (CFO)",
    prompt: "Finance needs an asset concentration report. Classify all accounts into three growth tiers based on balance: 'High Value' (balance > 10,000), 'Standard' (balance between 1,000 and 10,000), and 'Basic' (balance < 1,000). Show the tier classification and the count of accounts in each tier, sorted by account count descending.",
    hint: "Use a CASE WHEN statement to tier the balance, group by that tier, and count records.",
    expectedQuery: "SELECT CASE WHEN balance > 10000 THEN 'High Value' WHEN balance BETWEEN 1000 AND 10000 THEN 'Standard' ELSE 'Basic' END AS tier, COUNT(*) AS account_count FROM accounts GROUP BY tier ORDER BY account_count DESC",
    schemaTables: ["accounts"]
  },
  {
    id: 30,
    title: "Peak Activity Post Upload Hours",
    difficulty: "Advanced",
    company: "Meta",
    persona: "VP of Product Strategy",
    prompt: "Our engineering group wants to optimize database indexing for peak post traffic. Find the peak post upload hours. Show the hour of post upload as peak_hour and the count of posts uploaded in that hour. Sort by post count descending, and then by peak_hour ascending.",
    hint: "Use the HOUR() function on post_date, group by that hour, and sort by the aggregated count descending, and hour ascending.",
    expectedQuery: "SELECT HOUR(post_date) AS peak_hour, COUNT(*) AS post_count FROM posts GROUP BY HOUR(post_date) ORDER BY post_count DESC, peak_hour ASC",
    schemaTables: ["posts"]
  },
  {
    id: 31,
    title: "Category Stock Count",
    difficulty: "Beginner",
    company: "Amazon",
    persona: "Director of Inventory Logistics",
    prompt: "We need an inventory stock audit. Count the total stock quantity of all products grouped by category, and sort the result by the total stock quantity in descending order.",
    hint: "Use SELECT category, SUM(stock_quantity) AS total_stock FROM products GROUP BY category ORDER BY total_stock DESC.",
    expectedQuery: "SELECT category, SUM(stock_quantity) AS total_stock FROM products GROUP BY category ORDER BY total_stock DESC",
    schemaTables: ["products"]
  },
  {
    id: 32,
    title: "Active Driver Count",
    difficulty: "Beginner",
    company: "Uber",
    persona: "Operations Lead",
    prompt: "Identify our highly-rated active drivers. Count the total number of active drivers (is_active = 1) who have a rating of 4.5 or higher.",
    hint: "Use SELECT COUNT(*) AS active_high_rated_drivers FROM drivers WHERE is_active = 1 AND rating >= 4.5.",
    expectedQuery: "SELECT COUNT(*) AS active_high_rated_drivers FROM drivers WHERE is_active = 1 AND rating >= 4.5",
    schemaTables: ["drivers"]
  },
  {
    id: 33,
    title: "Disputed Revenue Loss",
    difficulty: "Intermediate",
    company: "Stripe",
    persona: "VP of Risk & Fraud Operations",
    prompt: "Calculate the total transactional revenue lost to chargebacks/disputes. Find the sum of transaction amounts for transactions that resulted in disputes where the dispute status is 'lost'.",
    hint: "Join transactions and disputes on transaction_id, filter where disputes.status = 'lost', and sum the transaction amount.",
    expectedQuery: "SELECT SUM(t.amount) AS total_disputed_loss FROM transactions t JOIN disputes d ON t.transaction_id = d.transaction_id WHERE d.status = 'lost'",
    schemaTables: ["transactions", "disputes"]
  },
  {
    id: 34,
    title: "Country Signups Count",
    difficulty: "Intermediate",
    company: "Meta",
    persona: "Director of User Growth",
    prompt: "Identify signup counts for North American users. Count the number of users who signed up from 'Canada' or 'USA' on or after '2026-01-01'. Group the results by country.",
    hint: "Use SELECT country, COUNT(*) AS user_count FROM users WHERE country IN ('Canada', 'USA') AND signup_date >= '2026-01-01' GROUP BY country.",
    expectedQuery: "SELECT country, COUNT(*) AS user_count FROM users WHERE country IN ('Canada', 'USA') AND signup_date >= '2026-01-01' GROUP BY country",
    schemaTables: ["users"]
  },
  {
    id: 35,
    title: "Show vs Movie Average Duration",
    difficulty: "Intermediate",
    company: "Netflix",
    persona: "VP of Streaming Performance",
    prompt: "Our content team wants to compare viewing patterns. Calculate the average watch history duration in minutes for Shows vs Movies (type in the titles table). Round the average to 1 decimal place.",
    hint: "Join watch_history and titles on title_id, group by titles.type, and calculate AVG(watch_history.duration_minutes) rounded.",
    expectedQuery: "SELECT t.type, ROUND(AVG(w.duration_minutes), 1) AS avg_duration FROM watch_history w JOIN titles t ON w.title_id = t.title_id GROUP BY t.type",
    schemaTables: ["watch_history", "titles"]
  },
  {
    id: 36,
    title: "Host Revenue by Property Type",
    difficulty: "Intermediate",
    company: "Airbnb",
    persona: "VP of Host Growth",
    prompt: "We want to track host revenue metrics. Find the total revenue (total_amount in bookings) generated for each property type, but only include bookings where the booking total exceeds $200. Sort by total revenue descending.",
    hint: "Join listings and bookings on listing_id, filter where bookings.total_amount > 200, group by listings.property_type, and sum total_amount.",
    expectedQuery: "SELECT l.property_type, SUM(b.total_amount) AS total_revenue FROM listings l JOIN bookings b ON l.listing_id = b.listing_id WHERE b.total_amount > 200 GROUP BY l.property_type ORDER BY total_revenue DESC",
    schemaTables: ["listings", "bookings"]
  },
  {
    id: 37,
    title: "High Interest Loans",
    difficulty: "Intermediate",
    company: "Finance",
    persona: "Credit Risk Analyst",
    prompt: "List our high interest debt exposures. Find the customer name, loan amount, and interest rate for all accounts with active loans that have an interest rate above 5% (0.05). Sort by interest rate descending.",
    hint: "Join accounts and loans on account_id, filter where interest_rate > 0.05, and sort by interest_rate DESC.",
    expectedQuery: "SELECT a.customer_name, l.amount, l.interest_rate FROM accounts a JOIN loans l ON a.account_id = l.account_id WHERE l.interest_rate > 0.05 ORDER BY l.interest_rate DESC",
    schemaTables: ["accounts", "loans"]
  },
  {
    id: 38,
    title: "Inactive Campaigns",
    difficulty: "Advanced",
    company: "Marketing",
    persona: "Director of Marketing Efficiency",
    prompt: "Audit campaigns with zero returns. Identify the campaign names and channels for all marketing campaigns that have generated exactly zero conversions (i.e. no matching record in the conversions table).",
    hint: "Left join campaigns and conversions on campaign_id, and filter where conversions.conversion_id IS NULL.",
    expectedQuery: "SELECT c.name, c.channel FROM campaigns c LEFT JOIN conversions con ON c.campaign_id = con.campaign_id WHERE con.conversion_id IS NULL",
    schemaTables: ["campaigns", "conversions"]
  },
  {
    id: 39,
    title: "Top Resolved Priority",
    difficulty: "Advanced",
    company: "IT Support",
    persona: "Director of Helpdesk Support",
    prompt: "Audit helpdesk metrics. Find the ticket priority level that has the highest number of resolved tickets, and show the priority and the count of resolved tickets.",
    hint: "Filter where tickets.status = 'resolved', group by priority, sort by COUNT(*) descending, and LIMIT 1.",
    expectedQuery: "SELECT priority, COUNT(*) AS resolved_count FROM tickets WHERE status = 'resolved' GROUP BY priority ORDER BY resolved_count DESC LIMIT 1",
    schemaTables: ["tickets"]
  },
  {
    id: 40,
    title: "Artist Play Count Dominance",
    difficulty: "Advanced",
    company: "Spotify",
    persona: "Director of Publisher & Songwriter Relations",
    prompt: "Analyze artist performance dominance. Identify all artists whose total play count across all their songs in our catalog exceeds 100,000. Display the artist name and the total plays, sorted by total plays descending.",
    hint: "Group the songs table by artist, filter using HAVING SUM(daily_plays) > 100000, and sort DESC.",
    expectedQuery: "SELECT artist, SUM(daily_plays) AS total_plays FROM songs GROUP BY artist HAVING SUM(daily_plays) > 100000 ORDER BY total_plays DESC",
    schemaTables: ["songs"]
  }
];
