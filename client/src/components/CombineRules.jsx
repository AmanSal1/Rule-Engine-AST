import { useState } from "react";
import axios from "axios";
import TagInput from "./TagInput";

const CombineRules = () => {
  const [ruleNames, setRuleNames] = useState([]);
  const [data, setData] = useState("");
  const [combineResult, setCombineResult] = useState("");

  const handleCombineRules = async () => {
    if (ruleNames.length < 2) {
      alert("At least two rule names are required to combine.");
      return;
    }

    if (!data) {
      alert("Data is required to evaluate the rules.");
      return;
    }

    try {
      const parsedData = JSON.parse(data); // Ensure that the input data is valid JSON

      const response = await axios.post("http://localhost:3000/combine-rules", {
        ruleNames,
        data: parsedData,
      });

      setCombineResult(
        "Combined Rule Result: " + JSON.stringify(response.data.result)
      );
      setRuleNames([]); // Clear rule names after submission
    } catch (error) {
      setCombineResult(
        "Error: " + error.response?.data?.error || error.message
      );
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">
        Combine Rules and Evaluate
      </h2>
      <div className="mb-4">
        <TagInput tags={ruleNames} setTags={setRuleNames} />
      </div>
      <div className="mb-4">
        <textarea
          placeholder='Enter the data as JSON (e.g., {"age": 32, "department": "Sales"})'
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          rows={4}
        />
      </div>
      <button
        onClick={handleCombineRules}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Combine Rules and Evaluate
      </button>
      {combineResult && <p className="mt-4 text-green-600">{combineResult}</p>}
    </div>
  );
};

export default CombineRules;
