const express = require("express");
const axios = require("axios");
const rules = require("./check_rules");

const app = express();
const PORT = 3000;

app.use(express.static("public/"));

app.get("/evaluate", async (req, res) => {
    try {
        const response = await fetch("http://qa-gb.api.dynamatix.com:3100/api/applications/getApplicationById/67339ae56d5231c1a2c63639");
        const data = await response.json();

        const results = rules.map((rule) => ({
            rule: rule.name,
            status: rule.condition(data) ? "Passed" : "Failed",
        }));

        res.json(results);
    } catch (error) {
        res.status(500).json({error: "Error fetching data"});
    }
});

app.listen(PORT,() => console.log(`Server running on http://localhost:${PORT}`));