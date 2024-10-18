const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Node = require("./Node"); // Import the Node class from the file where it's defined
const Rule = require("./models/Rule"); // Import the Rule model
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection using Mongoose
const mongoUri = process.env.MONGODB_URL; // Replace with your MongoDB URI
mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Failed to connect to MongoDB:", error));

// Function to create an Abstract Syntax Tree (AST) from a rule string
function createRuleAST(ruleString) {
  ruleString = ruleString.trim();

  if (!ruleString.includes("(")) {
    return new Node("operand", null, null, ruleString);
  }

  let balance = 0;
  for (let i = 0; i < ruleString.length; i++) {
    if (ruleString[i] === "(") balance++;
    if (ruleString[i] === ")") balance--;

    if (
      balance === 0 &&
      (ruleString.substring(i, i + 3) === "AND" ||
        ruleString.substring(i, i + 2) === "OR")
    ) {
      const leftPart = ruleString.substring(0, i).trim();
      const operator = ruleString.substring(i, i + 3).trim();
      const rightPart = ruleString.substring(i + 3).trim();

      const leftNode = createRuleAST(leftPart);
      const rightNode = createRuleAST(rightPart);
      return new Node("operator", leftNode, rightNode, operator);
    }
  }

  if (ruleString.startsWith("(") && ruleString.endsWith(")")) {
    return createRuleAST(ruleString.substring(1, ruleString.length - 1));
  }

  throw new Error(`Invalid rule string format: ${ruleString}`);
}

// POST endpoint to evaluate a rule
app.post("/evaluate", async (req, res) => {
  const { rule, data } = req.body;

  if (!rule || !data) {
    return res.status(400).json({ error: "Rule name and data are required" });
  }

  try {
    const ruleEntry = await Rule.findOne({ name: rule });
    if (!ruleEntry) {
      return res.status(404).json({ error: `Rule not found: ${rule}` });
    }

    const rootNode = createRuleAST(ruleEntry.rule);
    const result = rootNode.evaluate(data);
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST endpoint to add a rule to the database
app.post("/add-rule", async (req, res) => {
  const { name, rule } = req.body;

  if (!name || !rule) {
    return res
      .status(400)
      .json({ error: "Rule name and rule string are required" });
  }

  try {
    const newRule = new Rule({ name, rule });
    await newRule.save();
    res.json({ message: "Rule added successfully", rule: { name, rule } });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: "Rule name must be unique" });
    } else {
      res.status(500).json({ error: "Failed to add rule" });
    }
  }
});

// POST endpoint to combine multiple rules from the database
app.post("/combine-rules", async (req, res) => {
  const { ruleNames, data } = req.body;

  if (!ruleNames || ruleNames.length === 0) {
    return res
      .status(400)
      .json({ error: "At least one rule name must be provided" });
  }

  try {
    let combinedAST = null;

    // Retrieve and combine rules by name
    for (const ruleName of ruleNames) {
      const ruleEntry = await Rule.findOne({ name: ruleName });
      if (!ruleEntry) {
        return res.status(404).json({ error: `Rule not found: ${ruleName}` });
      }

      const ruleAST = createRuleAST(ruleEntry.rule);
      if (!combinedAST) {
        combinedAST = ruleAST;
      } else {
        // Combine the rules using AND by default
        combinedAST = new Node("operator", combinedAST, ruleAST, "AND");
      }
    }

    // Evaluate the combined rule against the provided data
    const result = combinedAST.evaluate(data);
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Server setup
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
