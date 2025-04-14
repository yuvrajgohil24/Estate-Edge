import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // HASH the password
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("Password --> ", username, email, hashedPassword);

        // Create a new user and save it in DB
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            }
        });

        console.log(newUser)

        res.status(201).json({ message: "User created Successfully!" })
    } catch (error) {
        console.log("Error in registering User: ", error);
        res.status(500).json({ message: "Failed to create user!" })
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user already exists in our DB
        const user = await prisma.user.findUnique({
            where: { username }
        })

        console.log(user);

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials!" });
        }

        // Check if the password is incorrect
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid credentials!" });
        }

        // Generate cookie token and send it to user
        const age = 1000 * 60 * 60 * 24 * 7;

        // res.setHeader("Set-Cookie", "test=" + "myValue").json({ message: "success" })

        const token = jwt.sign({
            id: user.id,
            isAdmin: false
        },
            process.env.JWT_SECRET_KEY,
            { expiresIn: age }
        );

        const { password: userPassword, ...userInfo } = user;

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: age,
            sameSite: "None",  // Essential for cross-origin requests
        }).status(200).json(userInfo)
    } catch (error) {
        console.log("Error in login: ", error);
        res.status(500).json({ message: "Failed to login!" })

    }
};

export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({ message: "Logout Successfully!" })
}