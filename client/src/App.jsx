import AddRule from "./components/AddRule";
import EvaluateRule from "./components/EvaluateRule";
import CombineRules from "./components/CombineRules";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          Rule Evaluation System
        </h1>
        <AddRule />
        <EvaluateRule />
        <CombineRules />
      </div>
    </div>
  );
}

export default App;
