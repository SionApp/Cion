const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sgMail = require("@sendgrid/mail");

const app = express();

app.use(cors());
app.use(bodyParser.json());

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// Iniciar el servidor en un puerto
const PORT = 3000;

app.post("/invitations", async (req, res) => {
  try {
    const { to, subject, from, html } = req.body;
    const smg = {
      to,
      from,
      subject,
      html,
    };
    await sgMail.send(smg);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
