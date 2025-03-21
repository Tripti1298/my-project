const axios = require("axios");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json());
app.use(session({ secret: "your-secret-key", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Google OAuth Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
        },
        (accessToken, refreshToken, profile, done) => {
            return done(null, profile);
        }
    )
);

// Serialize & Deserialize User
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

// Role Extraction Function
const getUserRole = (email) => {
    if (email.endsWith("@iiti.ac.in")) {
        if (/^[a-z]+\.[a-z]+@iiti.ac.in$/.test(email)) {
            return "instructor";
        } else if (/^[a-z]+[0-9]+@iiti.ac.in$/.test(email)) {
            return "student";
        }
    }
    return "visitor"; // Default role
};

// Google OAuth Routes
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        const email = req.user.emails[0].value;
        const role = getUserRole(email);

        // Generate JWT
        const token = jwt.sign({ email, role }, JWT_SECRET, { expiresIn: "1h" });

        // Send token to frontend
        res.json({ token, role });
    }
);

// Middleware for Protected Routes
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Invalid token" });
        }
        req.user = decoded;
        next();
    });
};

// Protected Chat Route (Role-Based Responses)
app.post("/api/chat", async (req, res) => {
    try {
        const { message } = req.body;
        const rasaResponse = await axios.post("http://localhost:5005/webhooks/rest/webhook", {
            sender: "user",
            message: message
        });

        const botReply = rasaResponse.data[0]?.text || "I didn't understand that.";
        res.json({ text: botReply });
    } catch (error) {
        console.error("Error connecting to Rasa:", error);
        res.status(500).json({ error: "Failed to connect to chatbot" });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});