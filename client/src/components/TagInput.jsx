/* eslint-disable react/prop-types */
export default function TagInput({ tags, setTags }) {
  const addTag = (e) => {
    if (e.key === "Enter") {
      const newTag = e.target.value.trim();
      if (newTag.length > 0 && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        e.target.value = "";
      }
    }
  };

  const removeTag = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  return (
    <div className="mt-2">
      <div className="text-sm font-medium text-left py-2 text-blue-500">
        {"Rules"}
      </div>
      <div className="flex flex-wrap rounded">
        <input
          className="w-full px-2 py-1 border rounded border-slate-200"
          placeholder="Enter the rule names and press enter to add."
          onKeyDown={addTag}
        />
        {tags?.map((tag, index) => {
          return (
            <div
              key={index}
              className="flex items-center m-2 p-1 rounded shadow bg-white"
            >
              <span className="p-1 text-blue-500">{tag}</span>
              <button
                className="p-1 text-red-500 px-2 py-1 cursor-pointer"
                onClick={() => removeTag(tag)}
                aria-label={`Remove tag: ${tag}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 transition-transform transform-gpu hover:scale-125"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
                  />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
