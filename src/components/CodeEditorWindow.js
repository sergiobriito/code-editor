import React, { useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import "./CodeEditorWindow.css";

const CodeEditorWindow = () => {
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("python");
  const [theme, setTheme] = useState("vs-dark");
  const [outputDetails, setOutputDetails] = useState();

  const handleEditorChange = (value) => {
    setValue(value);
  };

  const handleCompile = () => {
    let language_id = "";

    if (language === "javascript") {
      language_id = 63;
    } else {
      language_id = 71;
    }

    const formData = {
      language_id: language_id,
      // encode source code in base64
      source_code: btoa(value),
    };
    const options = {
      method: "POST",
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        console.log(error);
        window.alert(error.message);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setOutputDetails(response.data);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // compilation error
      return (
        <pre className="outputWindow">
          {atob(outputDetails?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      return (
        <pre className="outputWindow">
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      return <pre className="outputWindow">{`Time Limit Exceeded`}</pre>;
    } else {
      return <pre className="outputWindow">{atob(outputDetails?.stderr)}</pre>;
    }
  };

  return (
    <>
      <div class="topnav" id="myTopnav">
        <a id="barTitle" style={{ float: "left" }}>
          Editor de código (IDE)
        </a>

        <select
          name=""
          id="optionTheme"
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="vs-dark">Dark</option>
          <option value="vs-dreamweaver">Dreamweaver</option>
        </select>

        <select
          name=""
          id="optionLanguage"
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
        </select>

        <button id="exe" onClick={() => handleCompile()}>
          Executar
        </button>
      </div>

      <div className="editorWindow">
        <Editor
          height="85vh"
          width={`50%`}
          language={language}
          value={value}
          theme={theme}
          defaultValue=""
          onChange={handleEditorChange}
        />
        <div>{outputDetails ? <>{getOutput()}</> : null}</div>
      </div>
      <div
        id="Linkedin"
        style={{
          marginLeft: "4px",
          display: "flex",
          alignItems: "center",
        }}
        data-locale="pt_BR"
        data-size="medium"
        data-theme="light"
        data-type="VERTICAL"
        data-vanity="sérgio--brito"
        data-version="v1"
      >
        <a href="https://br.linkedin.com/in/s%C3%A9rgio--brito?trk=profile-badge">
          <img
            src="https://brand.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg"
            alt="Linkedin"
            style={{ width: "42px", height: "42px" }}
          />
        </a>
        <a id="desenvolvidoPor" style={{ color: "white" }}>
          Desenvolvido por Sérgio Brito
        </a>
      </div>
    </>
  );
};

export default CodeEditorWindow;
