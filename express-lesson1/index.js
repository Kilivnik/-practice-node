/** Приклад 1 - в якості відповіді відправляєм html
 * const express = require("express");
*
  *  const app = express(); // виклик ф-ції express створює наш веб сервер
 * 
 * Додаємо інструкції (ф-ції) для роботи серверу
 * Веб сервер як велика записна книжка, де вказані назви маршруту і описані дії що робити по цьому маршруту
 * Пишемо назву серверу, викликаємо потрібний метод і вказуємо назву маршруту, 2-гий аргумент колбек ф-ція ,
 * яка спрацьовує коли маршрут знайдено
 *
 * В колбек ф-цію express передає 2 аргументи - request, respons
 *
 * request - обєкт в якому зберігається вся інф про запит який прийшов (тіло запита, адреса, метод і тд)
 * respons - обєкт, який дозволяє налаштувати і відправити відповідь
 * 
 * app.get("/", (request, respons) => {
  *respons.send("<h2>Home page</h2>");
*  });
    *app.get("/contacts", (request, respons) => {
    *console.log(request.url);
    *console.log(request.method);
    *respons.send("<h2>Contacts page</h2>");
    *});

*app.listen(3000, () => console.log("Server running")); - запускаєм веб сервер
 */

/** Приклад 2
 * Найчастіше веб сервер відправляє в якості відповіді дані в форматі JSON (масив або обєкт)
 */

const express = require("express");
const books = require("./books");
const app = express();

app.get("/books", (req, res) => {
  //   res.send(books); - коли бз поверне null то send нічого не повертає
  res.json(books); // правильніший варіант щоб отримати відповідь, бо коли бз поверне null то json обробить цю відповідь
});

app.listen(3000);
