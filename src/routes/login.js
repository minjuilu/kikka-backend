const express = require("express");
const router = express.Router();
const { auth } = require("./firebase");

router.post("/login", async (req, res) => {
    const {idToken} = req.body;

    if (!idToken) {
        return res.status(400).json({error: "請提供 idToken"});
    }

    try {
        const decodedToken = await auth.verifyIdToken(idToken);

        const { uid } = decodedToken;

        return res.status(200).json({
            message: "登入成功",
            user: { uid },
        });
    } catch (error) {
        console.error("ID Token 驗證失敗：", error);
        return res.status(401).json({ error: "無效的 ID Token" });
    }
})

router.post("/google-login", async (req, res) => {
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

module.exports = router