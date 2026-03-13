// const TELEGRAM_BOT_TOKEN =
//   "vk1.a.CRkLLm7gNQ361edpy3o7Yc8HOzUayiZ-qwrZwoiOIq7ayicDEAUt2CIE7vMuLeNN7sqEfmT6J6GjO6LMQe5TcMCpSmtVs31Xtb1-zSMrD9oO7GP15CiR4TvcC16jyCSpPQf2_rABER5U990Wi016lxAlYDOkwTUZqDIftYN8jC0xukGaHW_cMmjkNea_l0Dyb_NNYy6rf_Y2ZVQxyRztzw";
// const TELEGRAM_CHAT_ID = "224996524";
// const API = `https://api.vk.com/method/messages.send`;

const TELEGRAM_BOT_TOKEN = "8798342879:AAFawWVHQ4lRPqVqjYQ6X5iclJd8u-B_d_o";
const TELEGRAM_CHAT_ID = "@WeddingDorogovi";
const API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

async function sendQuestionnaire(event) {
  event.preventDefault();
  const form = event.target;
  const formBth = document.querySelector(".button");
  const formSendResult = document.querySelector(".form-send");
  formSendResult.textContent = "";

  const formData = new FormData(form);

  const name = formData.get("name");
  const presence = formData.get("presence");
  const allergy = formData.get("allergy");
  const listallergy = formData.get("listallergy");
  const drinks = formData.getAll("drinks");

  const text = `Гость ${name},\nбудет присутствовать: ${presence},\nесть аллергия: ${allergy}${allergy === "да" ? `,\nна что аллергия: ${listallergy}` : ""},\nнапитки: ${drinks.join(", ")}`;

  try {
    formBth.textContent = "Отправка...";
    // const response = await fetch(API, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    //   body: new URLSearchParams({
    //     user_id: TELEGRAM_CHAT_ID,
    //     random_id: Date.now(),
    //     message: text,
    //     access_token: TELEGRAM_BOT_TOKEN,
    //     v: "5.131",
    //   }),
    // });

    const response = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
      }),
    });

    if (response.ok) {
      formSendResult.textContent = "Спасибо! Анкета отправлена.";

      form.reset();
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
    formSendResult.textContent = "Анкета не отправлена, попробуйте позже";
  } finally {
    formBth.textContent = "Подтверидить присутсвие";
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const yesRadio = document.getElementById("allergyYes");
  const noRadio = document.getElementById("allergyNo");
  const allergyBlock = document.getElementById("allergyDetails");

  function toggleAllergyField() {
    if (yesRadio.checked) {
      allergyBlock.classList.add("show");
    } else {
      allergyBlock.classList.remove("show");
    }
  }

  yesRadio.addEventListener("change", toggleAllergyField);
  noRadio.addEventListener("change", toggleAllergyField);
  toggleAllergyField();
});

const nameInput = document.getElementById("name");
const errorElement = document.getElementById("error-text");

nameInput.addEventListener("invalid", function (event) {
  event.preventDefault();
  if (this.validity.valueMissing) {
    errorElement.classList.add("show");
  }
});

nameInput.addEventListener("input", function () {
  if (this.value.trim() !== "") {
    errorElement.classList.remove("show");
  }
});

document.querySelectorAll('input[name="presence"]').forEach((radio) => {
  radio.addEventListener("invalid", function (e) {
    // Отменяем стандартное всплывающее сообщение для этого поля
    e.preventDefault();

    // Показываем кастомную ошибку
    document.getElementById("presenceError").classList.add("show");

    return false;
  });
});

// Скрываем ошибку при изменении выбора
document.querySelectorAll('input[name="presence"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    document.getElementById("presenceError").classList.remove("show");
  });
});