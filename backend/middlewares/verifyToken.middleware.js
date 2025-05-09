import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    console.log("TOKEN check-->", token)

    if (!token) {
        return res.status(401).json({ message: "Not Authenticated!" })
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) {
            return res.status(403).json({ message: "Not a Valid Token!" })
        }

        req.userId = payload.id;
        next();
    });
}