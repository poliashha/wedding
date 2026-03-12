const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const TOKEN = "ВАШ_VK_TOKEN";
const USER_ID = "224996524";

app.post("/send", async (req, res) => {
  const { name, presence, allergy, drinks } = req.body;

  const message = `
Анкета от ${name}
Будут ли присутствовать: ${presence}
Есть ли аллергия: ${allergy}
Напитки: ${drinks}
`;

  try {
    const response = await axios.get(
      "https://api.vk.com/method/messages.send",
      {
        params: {
          user_id: USER_ID,
          random_id: Date.now(),
          message: message,
          access_token: TOKEN,
          v: "5.131",
        },
      },
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
