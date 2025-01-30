const express = require("express");
const router = express.Router();
const { auth } = require("./firebase");
const { z } = require('zod');

router.post("/register", async (req, res) => {
    const schema = z.object({
        name: z.string().min(1, "名稱是必填的"), 
        email: z.string().email("無效的郵件地址"), 
        password: z.string()
            .min(8, "密碼最少需要 8 個字符")
            .max(20, "密碼最多只能有 20 個字符")
    });

    try {
        schema.parse(req.body);
        const { name, email, password } = req.body;

        try {
            const existingUser = await auth.getUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({ error: "該郵件已被註冊過，請使用其他郵件" });
            }
        } catch (error) {
            if (error.code !== "auth/user-not-found") {
                console.error("檢查用戶時出錯：", error);
                return res.status(500).send({ error: "伺服器內部錯誤，請稍後再試。" });
            }
        }

        const user = await auth.createUser({
            email,
            password,
            displayName: name,
        });

        return res.status(201).send({ message: "註冊成功", user });
    } catch (error) {
        if (error.name === "ZodError") {
            return res.status(400).json({ errors: error.errors });
        }
        console.error("註冊錯誤：", error);
        return res.status(500).send({ error: error.message });
    }
});

router.post("/login", async (req, res) => {
    const { idToken } = req.body;

    if (!idToken) {
        return res.status(400).json({ error: "請提供 idToken" });
    }

    try {
        const decodedToken = await auth.verifyIdToken(idToken);
        const { uid, email, name, picture } = decodedToken;

        return res.status(200).json({
            message: "登入成功",
            user: { uid, email, name, picture },
        });
    } catch (error) {
        console.error("ID Token 驗證失敗：", error);
        return res.status(401).json({ error: "無效的 ID Token" });
    }
});

module.exports = router;
