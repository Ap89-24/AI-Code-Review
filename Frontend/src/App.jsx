import { useState , useEffect } from 'react'
import './App.css'
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import Editor from "react-simple-code-editor";
import axios from 'axios';
import Markdown from 'react-markdown';
import rehypehighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

function App() {

  const [code , setCode] = useState(`Enter your code here...`);

    const [review , setReview] = useState(` `);

  useEffect(() => {
    prism.highlightAll();
  }, [])

  async function ReviewCode() {
    const response = await axios.post('https://ai-code-review-ejz7.onrender.com/ai/get-review' , { code });

    setReview(response.data);

  }



  return (
    <>
    <div className="head">Code Reviewer</div>
     <main>
      <div className="left">
        <div className="code">
         <Editor
          value={code}
          onValueChange={code => setCode(code)}
          highlight={code => prism.highlight(code , prism.languages.js , 'js')}
          padding={10}
          style={{
            fontFamily: '"Fira code" , "Fira Mono" , monospace',
            fontSize: 16,
            color: "#f8f8f2",
            border: "1px solid #282a36",
            height: "100%",
            width: "100%",
            borderRadius: "5px",
          }}
         />
        </div>
        <div className="review-btn"  onClick={ReviewCode}>Review Code</div>
      </div>
      <div className="right"><Markdown rehypePlugins={[rehypehighlight]}>{review}</Markdown></div>
     </main>
    </>
  )
}

export default App
