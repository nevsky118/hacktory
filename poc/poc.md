#### Описание

Лабораторная работа представляет собой онлайн-магазин, приближенный к реальному веб-приложению.
<br>
В работе реализуются **SQL Injection** и **XSS** уязвимости.
<br>
Для успешного выполнения лабораторной работы необходимо реализовать одну из атак через поле ввода промокода на странице оформления заказа.

#### Шаги прохождения лабораторной работы:

1. Перейти на сайт онлайн-магазина
2. Добавить несколько товаров в корзину и перейти на страницу оформления заказа
3. На странице оформления заказа можно воспользоваться промокодом и получить скидку на весь заказ
   - Промокод на -10% (GIFT10) можно найти на баннере на сайте
   - С помощью SQL инъекции `' UNION SELECT * FROM coupons WHERE discount = 100--` можно получить промокод на -100%
4. Нажать кнопку "Применить". Сумма корзины должна измениться на 0 и появится флаг
5. Для получения флага через уязвимость XSS нужно ввести следующий код в поле промокода: <br>`<img onerror='alert(flag)' src='invalid-image' />`
6. Нажать "Применить". Появится окно с флагом
