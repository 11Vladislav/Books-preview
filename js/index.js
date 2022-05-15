//Массив объектов данных для формы редактирования книги

const books = [
  {
    id: "1",
    title: `Apple. Эволюция компьютера`,
    author: `Владимир Невзоров`,
    img: `https://bukva.ua/img/products/449/449532_200.jpg`,
    plot: `Богато иллюстрированный хронологический справочник по истории компьютеров, в котором увлекательно 
    и в структурированном виде изложена информация о создании и развитии техники Apple на фоне истории 
    персональных компьютеров в целом.
    В книге даны описания десятков наиболее значимых моделей устройств как Apple, так и других производителей, 
    сопровождающиеся большим количеством оригинальных студийных фотографий.
    Книга предназначена для широкого круга читателей, интересующихся историей электроники. 
    Она также может послужить источником вдохновения для дизайнеров, маркетологов и предпринимателей.`,
  },
  {
    id: "2",
    title: `Как объяснить ребенку информатику`,
    author: `Кэрол Вордерман`,
    img: `https://bukva.ua/img/products/480/480030_200.jpg`,
    plot: `Иллюстрированная энциклопедия в формате инфографики о технических, социальных и культурных аспектах 
    в информатике. Пошагово объясняет, как детям максимально эффективно использовать компьютеры и интернет-сервисы, 
    оставаясь в безопасности. 
    Книга рассказывает обо всем: от хранения данных до жизни в интернет-пространстве, 
    от программирования до компьютерных атак. О том, как компьютеры функционируют, о современном программном 
    обеспечении, устройстве Интернета и цифровом этикете. Все концепты - от хакера до биткоина - 
    объясняются наглядно с помощью иллюстраций и схем.`,
  },
  {
    id: "3",
    title: `Путь скрам-мастера. #ScrumMasterWay`,
    author: `Зузана Шохова`,
    img: `https://bukva.ua/img/products/480/480090_200.jpg`,
    plot: `Эта книга поможет вам стать выдающимся скрам-мастером и добиться отличных результатов с вашей командой. 
    Она иллюстрированная и легкая для восприятия - вы сможете прочитать ее за выходные, а пользоваться полученными 
    знаниями будете в течение всей карьеры.
    Основываясь на 15-летнем опыте, Зузана Шохова рассказывает, какие роли и обязанности есть у скрам-мастера, 
    как ему решать повседневные задачи, какие компетенции нужны, чтобы стать выдающимся скрам-мастером, 
    какими инструментами ему нужно пользоваться.`,
  },
];

const BOOKS = "books"; // ключ для хранения книг в localStorage

if (!localStorage.getItem(BOOKS)) { // если в localStorage нет книг, то записываем в него массив книг
  localStorage.setItem(BOOKS, JSON.stringify(books)); // записываем в localStorage массив книг
}

const divEl = document.querySelector("#root");  // получаем корневой элемент для вставки книг

const divLeft = document.createElement("div"); // создаем левый блок
const divRight = document.createElement("div"); // создаем правый блок

divEl.prepend(divLeft, divRight); // выводим разметку

divLeft.classList.add("left_container"); // добавляем класс для левого блока
divRight.classList.add("right_container"); // отрисовываем превью книги

const title = document.createElement("h1"); // отрисовываем превью книги
title.textContent = "Biblioteka"; // отрисовываем превью книги
const ulEl = document.createElement("ul"); // отрисовываем превью книги
const btnEl = document.createElement("button"); // создаем кнопку
btnEl.textContent = "ADD";  // добавляем текст кнопки

divLeft.prepend(title, ulEl, btnEl); // выводим разметку

title.classList.add("title"); // добавляем класс для заголовка
ulEl.classList.add("ul"); // добавляем класс для списка
btnEl.classList.add("btn_add"); // добавляем класс для кнопки

function createList() { // функция для создания списка книг
  const books = JSON.parse(localStorage.getItem(BOOKS)); // получаем массив книг из localStorage
  const markup = books // получаем массив книг из localStorage
    .map(
      (book) =>
        `<li id="${book.id}" class="list"><p class="text">${book.title}</p>
        <button class="edit_btn">Edit</button>
        <button class="delete_btn">Delete</button></li>`
    )
    .join(""); // преобразуем массив в строку
 
  ulEl.insertAdjacentHTML("afterbegin", markup); // вставляем список в разметку

  const pEl = document.querySelectorAll(".text"); // получаем массив элементов с текстом книг
  pEl.forEach((el) => el.addEventListener("click", showPreiw)); // добавляем обработчик клика на текст книги

  const editBtnEl = document.querySelectorAll(".edit_btn"); // получаем массив элементов с кнопкой редактирования
  editBtnEl.forEach((el) => el.addEventListener("click", editBook)); // добавляем обработчик клика на кнопку редактирования

  const deleteBtnEl = document.querySelectorAll(".delete_btn"); // получаем массив элементов с кнопкой удаления
  deleteBtnEl.forEach((el) => el.addEventListener("click", deleteBook)); // добавляем обработчик клика на кнопку удаления
}

const addBookEl = document.querySelector(".btn_add"); // получаем кнопку добавления книги
addBookEl.addEventListener("click", addBookFunc); // добавляем обработчик клика на кнопку добавления книги

createList(); // выводим список книг

function showPreiw(event) { // функция для отображения превью книги
  const books = JSON.parse(localStorage.getItem(BOOKS)); // получаем массив книг из localStorage
  const book = books.find((book) => event.target.textContent === book.title); // получаем книгу из массива по названию
  renderPreiw(book); // выводим превью книги
}

function renderPreiw(book) { // функция для отображения превью книги
  divRight.innerHTML = ""; // очищаем превью книги
  divRight.insertAdjacentHTML("afterbegin", createPreiwMarkup(book)); // выводим превью книги
}

function createPreiwMarkup(obj) { // функция для отрисовки превью книги
  return `<div class ="preview" id ="${obj.id}">
  <h2>${obj.title}</h2><p>${obj.author}</p>
  <img src="${obj.img}"><p>${obj.plot}</p></div`; // возвращаем разметку превью книги
}

function editBook(event) { // функция для редактирования книги
  const books = JSON.parse(localStorage.getItem(BOOKS)); // получаем массив книг из localStorage
  const book = books.find((book) => event.target.parentNode.id === book.id); // получаем книгу из массива по id
  divRight.innerHTML = ""; // очищаем превью книги
  divRight.insertAdjacentHTML("afterbegin", createFormMarkup(book)); // выводим форму редактирования книги
  fillObject(book); // заполняем объект данными книги из localStorage
  const saveBtn = document.querySelector(".save-btn") // получаем кнопку сохранения книги
  saveBtn.addEventListener("click", onBtnSave) // добавляем обработчик клика на кнопку сохранения книги

  function onBtnSave() { // функция для сохранения книги
    for (let i = 0; i < books.length; i += 1) { // проходимся по массиву книг
      if (books[i] === books.indexOf(book)) { // если нашли книгу в массиве
        books.splice(books[i], 1, book) // удаляем книгу из массива и добавляем ее в массив по новому объекту
      }
    }
    localStorage.setItem(BOOKS, JSON.stringify(books)) // обновляем массив книг в localStorage
    ulEl.innerHTML = ""; // очищаем список книг
    createList(); // выводим список книг
    renderPreiw(book); // выводим превью книги
   setTimeout(() => alert("Book edit"), 2000) // выводим предупреждение об успешном сохранении книги
    
  }

}



  function deleteBook(event) { // функция для удаления книги
    const books = JSON.parse(localStorage.getItem(BOOKS)); // получаем массив книг из localStorage
    const book = books.filter((book) => event.target.parentNode.id !== book.id); // получаем массив книг без удаляемой
    localStorage.setItem(BOOKS, JSON.stringify(book)); // записываем массив книг без удаляемой в localStorage
    ulEl.innerHTML = ""; // очищаем список книг
    createList(); // выводим список книг
    if (divRight.innerHTML !== "") { // если превью книги не пустое
      const divRightEl = document.querySelector(".preview"); // получаем элемент превью книги

      if (divRightEl.id === event.target.parentNode.id) { // если удаляемая книга совпадает с превью книги
        divRight.innerHTML = ""; // очищаем превью книги
      }
    }
  }
  function addBookFunc() { // функция для добавления книги
    const newBook = { // создаем объект новой книги
      id: `${Date.now()}`, // присваиваем id новой книги
      author: "", // присваиваем автора новой книги
      title: "", // присваиваем название новой книги
      plot: "", // присваиваем описание новой книги
      img: "", // присваиваем картинку новой книги
    };
    divRight.innerHTML = ""; // очищаем превью книги
    divRight.insertAdjacentHTML("afterbegin", createFormMarkup(newBook)); // выводим форму добавления новой книги
    fillObject(newBook); // заполняем объект новой книги
    const saveBtnEl = document.querySelector(".save-btn"); // получаем элемент кнопки сохранения новой книги
    saveBtnEl.addEventListener("click", saveBook); // добавляем обработчик события на кнопку сохранения новой книги

    function saveBook() { // функция для сохранения новой книги
      const books = JSON.parse(localStorage.getItem(BOOKS)); // получаем массив книг из localStorage
      books.push(newBook); // добавляем новую книгу в массив 
      localStorage.setItem(BOOKS, JSON.stringify(books)); // записываем массив книг в localStorage
      ulEl.innerHTML = ""; // очищаем список книг
      createList(); // выводим список книг
      renderPreiw(newBook); // выводим превью новой книги
      setTimeout(() => {
        alert("Книга успешно добавлена!")
      }, 100); // выводим сообщение об успешном добавлении книги
    }
  }

  const createFormMarkup = (book) => { // функция для создания формы добавления или редактирования книги
    return `<form class = 'add_book'>
  <label>Author<input class='input' name = 'author' value ='${book.author}' type = 'text'></label>
  <label>Title<input class='input' name = 'title'  value ='${book.title}' type = 'text'></label>
  <label>Image<input class='input' name = 'img'  value ='${book.img}' type = 'text'></label>
  <label>Plot<input class='input' name = 'plot'  value ='${book.plot}'></label>
  <button class ='save-btn' type='button'>Save</button>
  </form>`;
  };

  function fillObject(book) { // функция для заполнения объекта новой книги
    const inputsAll = document.querySelectorAll("input"); // получаем все поля формы
    inputsAll.forEach((el) => { // перебираем все поля формы
      el.addEventListener("input", addValue); // добавляем обработчик события на каждое поле формы
    });
    function addValue(event) { // функция для добавления значения в объект новой книги
      return (book[event.target.name] = event.target.value); // добавляем значение в объект новой книги
    }
  }
