require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

// ===== API RIASEC =====
app.post("/recommend", (req, res) => {
    const user = req.body.user;

    const py = spawn("python3", [
        "./backend/ai_model.py",
        JSON.stringify({ user })
    ]);

    let data = "";

    py.stdout.on("data", d => data += d.toString());

    py.on("close", () => {
        try {
            const result = JSON.parse(data);

            // 🔥 FAKE AI (ổn định 100%)
            const chatbot = `
🎯 Kết quả phân tích của bạn:

${result.map(j => `• ${j.job} (${j.score})`).join("\n")}

💡 Gợi ý:
- Nếu bạn thiên về logic → CNTT là lựa chọn tốt
- Nếu bạn sáng tạo → Thiết kế
- Nếu bạn thích giao tiếp → Marketing

🚀 Lời khuyên:
Hãy chọn ngành bạn vừa có năng lực vừa có đam mê để phát triển lâu dài.
`;

            res.json({
                result,
                chatbot
            });

        } catch (e) {
            res.json({
                result: [],
                chatbot: "Lỗi xử lý dữ liệu!"
            });
        }
    });
});

// ===== CHAT SIMPLE =====
app.post("/chat", (req, res) => {
    const msg = req.body.message;

    res.json({
        reply: "Bạn nên làm bài test RIASEC để mình tư vấn chính xác hơn nhé!"
    });
});

app.listen(3000, () => console.log("http://localhost:3000"));