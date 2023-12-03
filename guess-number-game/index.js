// імпортуєм необхідні для роботи бібліотеки
const { program } = require("commander");
const fs = require("fs").promises;
const readline = require("readline"); //взаїмодія з користувачем типу алерт в ноді
require("colors");

// 1. Налаштовуємо commander
// program.option прописує пару флаг-значення
// 1 аргумент флаг, 2 аргумент опис, 3 аргумент значення за замовчуванням

program.option(
  "-f, --file <type>",
  "file for saving game logs",
  "game_result.log"
);
program.parse(process.argv); // прийом аргументів командором для їх обробки (щоб розпарсити/обробити аргументи)

// console.log(program.opts()); // витягує всі прапорці які ми прописали
// console.log(program.opts().file); // витягує обєкт з прапорцями і звертаємось до конкретного прапорцярр

// 2. Налаштовуємо взаємодію скрипта з юзером

const rl = readline.createInterface({
  //приймає обєкт з налаштуваннями
  input: process.stdin, //вказуєм, що вводити інф ми будем через стандартний інтерфейс вводу інформації
  output: process.stdout,
});

// 3. Пишемо логіку гри вгадай число

/** Counter - лічильник спроб користувача вгадати число */

let counter = 0;

/** Загадане компютером число, рандомне число від 1 до 10  */

const mind = Math.ceil(Math.random() * 10); //генерація яисла від 1 до 10

/** Path to log file - файл куди ми логуєм результат гри */

const logFile = program.opts().file;

/**Logger to log into the log file, запис до файлової с-ми
 *
 * @param {string} msg - message to write
 * @returns {Promise} - так як дія асинхрона
 */

const logger = async (msg) => {
  try {
    await fs.appendFile(
      logFile,
      `${new Date().toLocaleString("uk-UA")}: ${msg}\n`
    );
    console.log(msg.magenta);
    console.log(`Saved game results to the log file ${logFile}`.yellow);
  } catch (error) {
    console.log(`Something went wrong ... ${error.message}`.red);
  }
};

/**Simple input value validation - ф-ція валідатор
 *@author Yulia
 *@param {number} num - значення число яке перевіряємо
 *@returns {boolean} - чи валідне значення
 */

const isValid = (num) => {
  // перевіряємо чи число не є не числом і чи в діапазоні від 0 до 10
  if (!isNaN(num) && num > 0 && num <= 10) return true;

  if (Number.isNaN(num)) console.log("Please, enter number".red);
  if (num < 1 || num > 10) console.log("Number should be between 1 and 10".red);

  return false;
};

/**
 * Зразок опису коду на проектах!!!!
 * Main game process - цикл гри
 * описуємо структуру, що приймає, повертає,автора коду для кращого розуміння написаного
 * @argument {string} str - input value
 * @returns {Promise} - що повертає
 * @author Yulia - хто написав код
 * @category Methods
 */

const game = () => {
  // question від readline відрізняється тим що line просто приймає якісь значення,
  // а question спочатку щось виводить, а потім приймає значення
  rl.question("Please, enter any whole number from 1 to 10\n".green, (val) => {
    // 2-гий аргумент val це відповідь юзера
    // конвертуєм val в number

    // const num = Number(val); // 1 спосіб
    const num = +val; // 2 спосіб, буде Nan якщо val не число

    // робимо валідацію щоб перевірити, що юзер ввів число

    if (!isValid(num)) return game();

    counter = counter + 1;
    // if number !== mind

    if (num !== mind) {
      console.log("Oh, no! Try again!".red);
      return game();
    }
    // if number === mind

    logger(`Congratulations! You guessed the number for ${counter} step(s)`);
    //   process.exit() - по закінчинню гри грубо вбиваєм код
    rl.close(); // закриваєм ітерацію методом, більш лояльне закриття
  }); // \n перекине на наступну лінію, щоб було питання, а наступна лінія відповідь
};

// launch the game - запуск гри
game();
