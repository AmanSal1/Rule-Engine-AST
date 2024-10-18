import { useState } from "react";
import axios from "axios";

const AddRule = () => {
  const [ruleName, setRuleName] = useState("");
  const [ruleInput, setRuleInput] = useState("");
  const [result, setResult] = useState("");

  const handleAddRule = async () => {
    if (!ruleName || !ruleInput) {
      alert("Both rule name and rule string are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/add-rule", {
        name: ruleName,
        rule: ruleInput,
      });

      setResult("Rule added successfully: " + response.data.rule.name);
      setRuleName("");
      setRuleInput("");
    } catch (error) {
      setResult("Error: " + error.response.data.error || error.message);
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4">Add Rule</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter rule name"
          value={ruleName}
          onChange={(e) => setRuleName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="Enter your rule"
          value={ruleInput}
          onChange={(e) => setRuleInput(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        ></textarea>
      </div>
      <button
        onClick={handleAddRule}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Rule
      </button>
      {result && <p className="mt-4 text-green-600">{result}</p>}
    </div>
  );
};

export default AddRule;
