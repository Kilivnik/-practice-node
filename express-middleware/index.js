/**
 * middleware - певні дії, які потрібно зробити для кожного запиту
 * Щоб використати middleware на проекті використовуємо метод веб серверу app.use()
 *Першим аргументом можна передати якийсь маршрут, тоді middleware буде привязанний до маршруту
 Або передаєм одразу ф-цію, то ф-ція спрацьовує для будь-якого запиту
 */

const express = require("express");

const books = require("./books");

const app = express();

app.use((req, res, next) => {
  console.log("First middleware ");
  next(); // продовжує пошук в інших запитах
});

app.get("/products", (req, res) => {
  res.json([]);
});

app.get("/books", (req, res) => {
  res.json(books);
});

app.listen(3000);
