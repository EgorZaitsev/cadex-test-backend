"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.post("/api/triangulate", (req, res) => {
    const { length, width, height } = req.body;
    if (!length || !width || !height) {
        return res.status(400).json({ error: "Missing required dimensions" });
    }
    if (typeof length !== "number" || typeof width !== "number" || typeof height !== "number") {
        return res.status(400).json({ error: "Dimensions must be numbers" });
    }
    if (length <= 0 || width <= 0 || height <= 0) {
        return res.status(400).json({ error: "Dimensions must be positive numbers" });
    }
    try {
        const triangulation = calculateTriangulation(length, width, height);
        res.json({ triangulation });
    }
    catch (error) {
        console.error("Error calculating triangulation:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
function calculateTriangulation(length, width, height) {
    const l = length * 2;
    const w = width * 2;
    const h = height * 2;
    const vertices = [
        0, 0, 0, // 0
        l, 0, 0, // 1
        l, h, 0, // 2
        0, h, 0, // 3
        l, 0, w, // 4
        l, h, w, // 5
        0, h, w, // 6
    ];
    const indices = [
        0, 1, 2, 0, 2, 3,
        1, 4, 5, 1, 5, 2,
        3, 2, 5, 3, 5, 6,
    ];
    const triangulation = [];
    for (let i = 0; i < indices.length; i += 3) {
        const a = indices[i] * 3;
        const b = indices[i + 1] * 3;
        const c = indices[i + 2] * 3;
        triangulation.push(vertices[a], vertices[a + 1], vertices[a + 2], vertices[b], vertices[b + 1], vertices[b + 2], vertices[c], vertices[c + 1], vertices[c + 2]);
    }
    return triangulation;
}
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
