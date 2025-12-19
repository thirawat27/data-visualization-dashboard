const cors = require('cors');
const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const port = 3000;
const app = express();

app.use(cors())
app.use(express.json())

const db = new sqlite3.Database("./shop.db", (err) => {
  if (err) {
    console.error("Error connecting skibidi !", err.message);
  } else {
    console.log("Connected to the sqlite3 database.");
  }
});

app.get('/api/stats/balance', (req, res) => {
  const sql = "SELECT SUM(price * sales_count) as totalBalance FROM products";
  db.get(sql, [], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

app.get("/api/product/", (req, res) => {
  const sql = "SELECT * FROM products";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json(rows);
  })
});

app.get('/api/products/filter', (req, res) => {
  const category = req.query.category;
  const sql = "SELECT * FROM products WHERE category = ?";
  db.all(sql, [category], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/products/sales_count', (req, res) => {
  const count = req.query.count;
  const sql = "SELECT * FROM products WHERE sales_count > ?";
  db.all(sql, [count], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});


app.get('/api/products/total', (req, res) => {
  const category = req.query.category;

  const sql = "SELECT  category, SUM(price *  sales_count) as total FROM products WHERE category = ?";
  db.all(sql, [category], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/dashboard-summary', (req, res) => {
  const sql = `
        SELECT 
            COUNT(id) AS totalProducts, 
            SUM(sales_count) AS totalSalesCount, 
            SUM(price * sales_count) AS totalRevenue 
        FROM products
    `;
  db.get(sql, [], (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});


app.get("/", (req, res) => {
  res.send("ระบบเริ่มทำงานแล้ว");
})


app.listen(port, () => {
  console.log(`เซิฟเวอร์ทำงานอยู่ที่ http://localhost:${port}`);
});

