import { useState } from "react";
import axios from "axios";

const EvaluateRule = () => {
  const [evaluateRuleName, setEvaluateRuleName] = useState("");
  const [evaluateData, setEvaluateData] = useState("");
  const [evaluationResult, setEvaluationResult] = useState("");

  const handleEvaluate = async () => {
    if (!evaluateRuleName || !evaluateData) {
      alert("Both rule name and input data are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/evaluate", {
        rule: evaluateRuleName,
        data: JSON.parse(evaluateData),
      });

      setEvaluationResult("Evaluation Result: " + response.data.result);
      setEvaluateRuleName("");
      setEvaluateData("");
    } catch (error) {
      setEvaluationResult(
        "Error: " + error.response?.data?.error || error.message
      );
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Evaluate Rule</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter rule name"
          value={evaluateRuleName}
          onChange={(e) => setEvaluateRuleName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder='Enter your data as JSON (e.g., {"age": 32, "city": "NYC"})'
          value={evaluateData}
          onChange={(e) => setEvaluateData(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        ></textarea>
      </div>
      <button
        onClick={handleEvaluate}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Evaluate
      </button>
      {evaluationResult && (
        <p className="mt-4 text-blue-600">{evaluationResult}</p>
      )}
    </div>
  );
};

export default EvaluateRule;
