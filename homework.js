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

const productDiv = document.getElementById("goods");
productDiv.onclick = function (event) {
    console.log(event.target.dataset.index);
    const actionType = event.target.dataset.type;
    if (actionType === "delete") {
        console.log("---");
        deleteCommentary(event.target.dataset.index);
        event.target.parentElement.remove();
    }
    if (actionType === "add") {
        console.log("+++");
    }
};

render();

let curretCommentID = getMaxIdCommentary();
console.log(curretCommentID);

function getMaxIdCommentary() {
    let maxId = 1;
    initialData.forEach(function (element) {
        for (const review of element.reviews) {
            if (parseInt(review.id) > maxId) {
                maxId = parseInt(review.id);
            }
        }
    });
    return maxId;
}

function render() {
    productDiv.innerHTML = "";
    let productHTML = "";
    initialData.forEach(function (element, index) {
        productHTML += `
		<div class='product' id='product${index}'>
			<details>
				<summary>
					<h2 class='product__head'>${element.product}</h2>
                </summary>
        `;
        let reviewIndex = 0;
        for (const review of element.reviews) {
            productHTML += `
                <div class='product__commentary' id='commentary${review.id}'>${
                review.text
            } 
                    <button class='product__button delete' data-index=${
                        index + `-` + reviewIndex
                    } data-type='delete'>Удалить</button>
                </div>`;
            reviewIndex++;
        }
        // Работаем здесь!
        if (reviewIndex === 0) {
            productHTML = productHTML.replace("</?summary>", "");
            console.log(productHTML);
        }
        productHTML += `
            </details>
            <button class='product__button add' data-index=${index} data-type='add'>Ваш комментарий</button>
        </div>`;
    });
    productDiv.innerHTML += productHTML;
}

function getProductAndReviewIndex(string) {
    return string.split("-").map((x) => Number.parseInt(x));
}

function deleteCommentary(string) {
    const productIndex = getProductAndReviewIndex(string)[0];
    const commentaryIndex = getProductAndReviewIndex(string)[1];
    initialData[productIndex].reviews.splice(commentaryIndex, 1);
}

let myString = "12-33";
console.log(getProductAndReviewIndex(myString));

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
