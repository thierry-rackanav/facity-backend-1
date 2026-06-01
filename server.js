import express from "express";
import multer from "multer";
const response = await fetch("https://api.thehive.ai/api/v2/task/sync", {
import FormData from "form-data";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

app.post("/verificar-imagem", upload.single("image"), async (req, res) => {
  try {
    const form = new FormData();
    form.append("image", fs.createReadStream(req.file.path));

    const response = await fetch("https://api.thehive.ai/api/v2/task/sync", {
      method: "POST",
      headers: {
        Authorization: "Token 25iR97o2d9yrwPHZnPOnyg=="
      },
      body: form
    });

    const data = await response.json();
    res.json(data);

  } catch (erro) {
    res.status(500).json({ erro: "Erro ao analisar imagem" });
  }
});

app.get("/", (req, res) => {
  res.send("Backend rodando 🚀");
});

app.listen(3000, () => {
  console.log("Rodando na porta 3000");
});
