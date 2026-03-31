import { useState } from "react";
import axios from "axios";

function App() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/generate", {
        keyword,
      });
      setResult(res.data.content);
    } catch (err) {
      alert("Error generating content");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
  <h1>SEO Automation Tool 🚀</h1>

  <input
    type="text"
    placeholder="Enter keyword"
    value={keyword}
    onChange={(e) => setKeyword(e.target.value)}
    style={{ width: "400px", padding: "10px", borderRadius: "5px" }}
  />

  <br /><br />

  <button
    onClick={generate}
    style={{
      padding: "10px 20px",
      backgroundColor: "black",
      color: "white",
      border: "none",
      borderRadius: "5px"
    }}
  >
    Generate Content
  </button>

  <br /><br />

  {loading && <p>Generating...</p>}

  <div style={{ background: "#f4f4f4", padding: "15px", borderRadius: "5px" }}>
    <div
  style={{
    background: "#f4f4f4",
    padding: "15px",
    borderRadius: "5px",
    lineHeight: "1.6"
  }}
>
  {result.split("\n").map((line, index) => {
    if (line.includes("Title"))
      return <h2 key={index}>{line.replace("**Title:**", "")}</h2>;

    if (line.includes("Meta Description"))
      return <p key={index}><b>{line}</b></p>;

    if (line.includes("Keywords"))
      return <p key={index}><i>{line}</i></p>;

    if (line.includes("**"))
      return <h3 key={index}>{line.replace(/\*\*/g, "")}</h3>;

    return <p key={index}>{line}</p>;
  })}
</div>
  </div>
</div>
  );
}

export default App;