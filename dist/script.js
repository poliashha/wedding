const TELEGRAM_BOT_TOKEN = "8798342879:AAFawWVHQ4lRPqVqjYQ6X5iclJd8u-B_d_o";
const TELEGRAM_CHAT_ID = "@WeddingDorogovi";
const API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
async function sendQuestionnaire(event) {
  event.preventDefault();
  const form = event.target;
  const formBth = document.querySelector(".button");
  const formSendResult = document.querySelector(".form-send");
  formSendResult.textContent = "";

  const { name, presence, allergy, drinks } = Object.fromEntries(
    new FormData(form).entries(),
  );
  const text = `Анкета от ${name},будут ли присутвовать: ${presence}, есть ли аллергия: ${allergy}, предпочтения по напиткам: ${drinks}`;

  try {
    formBth.textContent = "Отправка..."
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
      formSendResult.textContent = 'Спасибо!';
      formSendResult.computedStyleMap.color = 'green';
      form.reset();
    }else{
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
    formSendResult.textContent= 'Анкета не отправлена, попробуйте позже';
    formSendResult.computedStyleMap.color = 'red';
  }finally{
    formBth.textContent= "Подтверидить присутсвие";
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
