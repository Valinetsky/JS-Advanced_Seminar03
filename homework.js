"usr strict";

/*
Создайте интерактивную веб-страницу для оставления и просмотра отзывов о продуктах. Пользователи могут добавлять отзывы о различных продуктах и просматривать добавленные отзывы.

Страница добавления отзыва:

Поле для ввода названия продукта.
Текстовое поле для самого отзыва.
Кнопка "Добавить отзыв", которая сохраняет отзыв о продукте в LocalStorage.

Страница просмотра отзывов:

Показывает список всех продуктов, о которых были оставлены отзывы.
При клике на название продукта отображается список всех отзывов по этому продукту.
Возможность удаления отзыва (при нажатии на кнопку "Удалить" рядом с отзывом, данный отзыв удаляется из LocalStorage).

Здесь может пригодиться странный код из предыдущего ДЗ.

```js
const initialData = [
    {
        product: "Apple iPhone 13",
        reviews: [
            {
                id: "1",
                text: "Отличный телефон! Батарея держится долго.",
            },
            {
                id: "2",
                text: "Камера супер, фото выглядят просто потрясающе.",
            },
        ],
    },
    {
        product: "Samsung Galaxy Z Fold 3",
        reviews: [
            {
                id: "3",
                text: "Интересный дизайн, но дорогой.",
            },
        ],
    },
    {
        product: "Sony PlayStation 5",
        reviews: [
            {
                id: "4",
                text: "Люблю играть на PS5, графика на высоте.",
            },
        ],
    },
];
```

Вы можете использовать этот массив initialData для начальной загрузки данных при запуске вашего приложения.

### Замечание

Видимо, этот блок кода попал в задание 2 ненароком.
*/

const initialData = [
    {
        product: "Apple iPhone 13",
        reviews: [
            {
                id: "1",
                text: "Отличный телефон! Батарея держится долго.",
            },
            {
                id: "2",
                text: "Камера супер, фото выглядят просто потрясающе.",
            },
        ],
    },
    {
        product: "Samsung Galaxy Z Fold 3",
        reviews: [
            {
                id: "3",
                text: "Интересный дизайн, но дорогой.",
            },
        ],
    },
    {
        product: "Sony PlayStation 5",
        reviews: [
            {
                id: "4",
                text: "Люблю играть на PS5, графика на высоте.",
            },
        ],
    },
];

const siteGoods = document.getElementById("goods");

render();

function render() {
    siteGoods.innerHTML = "";
    let stringHTML = "";
    initialData.forEach(function (element, index) {
        stringHTML = siteGoods.innerHTML;
        stringHTML =
            stringHTML +
            `<div class='myProduct' productID=${index}>` +
            element.product +
            "<button class='add'>Add comment</button>";

        let counter = 0;
        for (const review of element.reviews) {
            stringHTML =
                stringHTML +
                `<div class='myProductCommentDiv' commentID=${counter}> <p class='myProductComment'>` +
                review.text +
                "</p>" +
                "<button class='delete'>Delete</button></div>";
            counter++;
        }
        stringHTML = stringHTML + "</div>";

        siteGoods.innerHTML = stringHTML;
    });
}

// Могу удалять комменты
document.querySelector(".goods").onclick = function (e) {
    const btn = e.target.closest(".delete");
    console.log(btn);
    if (!btn) {
        return;
    }
    const productID = btn.parentElement.parentElement.getAttribute("productID");
    const commentID = btn.parentElement.getAttribute("commentID");
    console.log(productID);

    console.log(commentID);
    initialData[productID].reviews.splice(commentID, 1);
    console.log(initialData[productID].reviews);
    render();
};

// localStorage.clear();
// localStorage.setItem("test", 1);

// for (let key in localStorage) {
//     if (!localStorage.hasOwnProperty(key)) {
//         continue; // пропустит такие ключи, как "setItem", "getItem" и так далее
//     }
//     console.log(`${key}: ${localStorage.getItem(key)}`);
// }

// function parseObject(myObject) {}

// console.log();

// // Получение элементов DOM
// const reviewForm = document.getElementById("review-form");
// const productList = document.getElementById("product-list");

// // Обработчик отправки формы
// reviewForm.addEventListener("submit", function (event) {
//     event.preventDefault();

//     // Получение значений полей формы
//     const productName = document.getElementById("product-name").value;
//     const reviewText = document.getElementById("review-text").value;

//     // Создание объекта отзыва
//     const review = {
//         product: productName,
//         text: reviewText,
//     };

//     // Получение текущих отзывов из LocalStorage
//     let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

//     // Добавление нового отзыва
//     reviews.push(review);

//     // Сохранение отзывов в LocalStorage
//     localStorage.setItem("reviews", JSON.stringify(reviews));

//     // Очистка полей формы
//     document.getElementById("product-name").value = "";
//     document.getElementById("review-text").value = "";

//     // Обновление списка отзывов
//     displayProductList();
// });

// // Функция отображения списка продуктов
// function displayProductList() {
//     // Очистка списка
//     productList.innerHTML = "";

//     // Получение текущих отзывов из LocalStorage
//     let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

//     // Получение уникальных названий продуктов
//     let products = [...new Set(reviews.map((review) => review.product))];

//     // Отображение списка продуктов
//     products.forEach((product) => {
//         const productElement = document.createElement("details");
//         productElement.classList.add("product-list");

//         const summaryElement = document.createElement("summary");
//         summaryElement.textContent = product;
//         productElement.appendChild(summaryElement);

//         const reviewsContainer = document.createElement("div");

//         // Обработчик клика на название продукта
//         summaryElement.addEventListener("click", function () {
//             // Отображение отзывов по выбранному продукту
//             displayReviews(product, reviewsContainer);
//         });

//         productElement.appendChild(reviewsContainer);
//         productList.appendChild(productElement);
//     });
// }

// // Функция отображения отзывов по выбранному продукту
// function displayReviews(product, container) {
//     // Очистка контейнера отзывов
//     container.innerHTML = "";

//     // Получение текущих отзывов из LocalStorage
//     let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

//     // Фильтрация отзывов по выбранному продукту
//     let filteredReviews = reviews.filter(
//         (review) => review.product === product
//     );

//     // Отображение отзывов
//     filteredReviews.forEach((review) => {
//         const reviewElement = document.createElement("div");
//         reviewElement.classList.add("review");

//         const productName = document.createElement("h3");
//         productName.textContent = review.product;
//         reviewElement.appendChild(productName);

//         const reviewText = document.createElement("p");
//         reviewText.textContent = review.text;
//         reviewElement.appendChild(reviewText);

//         const deleteButton = document.createElement("span");
//         deleteButton.classList.add("delete-button");
//         deleteButton.textContent = "Удалить";
//         reviewElement.appendChild(deleteButton);

//         // Обработчик клика на кнопку "Удалить"
//         deleteButton.addEventListener("click", function () {
//             // Удаление отзыва
//             deleteReview(review);

//             // Обновление списка отзывов
//             displayReviews(product, container);
//         });

//         container.appendChild(reviewElement);
//     });
// }

// // Функция удаления отзыва
// function deleteReview(review) {
//     // Получение текущих отзывов из LocalStorage
//     let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

//     // Поиск индекса отзыва в массиве
//     const index = reviews.findIndex(
//         (r) => r.product === review.product && r.text === review.text
//     );

//     // Удаление отзыва из массива
//     if (index !== -1) {
//         reviews.splice(index, 1);
//     }

//     // Сохранение отзывов в LocalStorage
//     localStorage.setItem("reviews", JSON.stringify(reviews));
// }

// // Инициализация страницы
// displayProductList();
