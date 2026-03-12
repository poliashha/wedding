const TELEGRAM_BOT_TOKEN =
  "vk1.a.CRkLLm7gNQ361edpy3o7Yc8HOzUayiZ-qwrZwoiOIq7ayicDEAUt2CIE7vMuLeNN7sqEfmT6J6GjO6LMQe5TcMCpSmtVs31Xtb1-zSMrD9oO7GP15CiR4TvcC16jyCSpPQf2_rABER5U990Wi016lxAlYDOkwTUZqDIftYN8jC0xukGaHW_cMmjkNea_l0Dyb_NNYy6rf_Y2ZVQxyRztzw";
const TELEGRAM_CHAT_ID = "224996524";
const API = `https://api.vk.com/method/messages.send`;

// const TELEGRAM_BOT_TOKEN = "8798342879:AAFawWVHQ4lRPqVqjYQ6X5iclJd8u-B_d_o";
// const TELEGRAM_CHAT_ID = "@WeddingDorogovi";
// const API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

async function sendQuestionnaire(event) {
  event.preventDefault();
  const form = event.target;
  const formBth = document.querySelector(".button");
  const formSendResult = document.querySelector(".form-send");
  formSendResult.textContent = "";

  const { name, presence, allergy, drinks } = Object.fromEntries(
    new FormData(form).entries(),
  );
  const text = `Анкета от ${name},\nбудут ли присутствовать: ${presence},\nесть ли аллергия: ${allergy},\nпредпочтения по напиткам: ${drinks}`;

  try {
    formBth.textContent = "Отправка...";
     const response = await fetch(API, {
       method: "POST",
       headers: {
         "Content-Type": "application/x-www-form-urlencoded",
       },
       body: new URLSearchParams({
         user_id: TELEGRAM_CHAT_ID,
         random_id: Date.now(),
         message: text,
         access_token: TELEGRAM_BOT_TOKEN,
         v: "5.131",
       }),
     });


    //  const response = await fetch(API, {
    //    method: "POST",
    //    headers: {
    //      "Content-Type": "application/json",
    //    },
    //    body: JSON.stringify({
    //      chat_id: TELEGRAM_CHAT_ID,
    //      text,
    //    }),
    //  });

    if (response.ok) {
      formSendResult.textContent = "Спасибо! Анкета отправлена.";

      form.reset();
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
    formSendResult.textContent = "Спасибо! Анкета отправлена.";
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

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  const allergySelected = document.querySelector(
    'input[name="allergy"]:checked',
  );

  if (!allergySelected) {
    event.preventDefault();
    alert("Пожалуйста, выберите, есть ли у вас аллергия");
  }
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