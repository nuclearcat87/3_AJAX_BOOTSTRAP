document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#registrationForm");
    const loginInput = document.querySelector("#login");
    const passwordInput = document.querySelector("#password");
    const emailInput = document.querySelector("#email");
    const messageBox = document.querySelector("#message");
    const modalConfirmButton = document.querySelector("#modalConfirm");
    
    let formData = {};

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Предотвращаем стандартную отправку формы

        // Сохранение данных формы
        formData = {
            login: loginInput.value.trim(),
            password: passwordInput.value.trim(),
            email: emailInput.value.trim()
        };

        // Проверка на пустые значения
        if (!formData.login || !formData.password || !formData.email) {
            messageBox.textContent = "Все поля обязательны для заполнения.";
            messageBox.style.color = "red";
            return;
        }

        // Открытие модального окна
        $('#exampleModal').modal('show');
    });

    modalConfirmButton.addEventListener("click", function () {
        // Закрытие модального окна
        $('#exampleModal').modal('hide');

        // Отправляем данные на сервер через AJAX POST запрос
        fetch('backend.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                messageBox.textContent = "Регистрация прошла успешно!";
                messageBox.style.color = "green";
            } else {
                messageBox.textContent = "Ошибка регистрации: " + data.message;
                messageBox.style.color = "red";
            }
        })
        .catch(error => {
            console.error("Ошибка:", error);
            messageBox.textContent = "Произошла ошибка при отправке данных. Попробуйте снова.";
            messageBox.style.color = "red";
        });
    });
});