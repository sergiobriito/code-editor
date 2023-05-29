## Code Editor (IDE)
This is a React app that provides a code editor with features for executing and compiling code. It uses the Monaco Editor library for the code editor functionality and Axios for making HTTP requests.

## Features
* Code Editor: A Monaco Editor instance is rendered to provide a code editing interface. The editor supports syntax highlighting and code completion for Python and JavaScript.
* Theme Selection: The user can select a theme (Dark or Dreamweaver) for the code editor.
* Language Selection: The user can select the programming language (Python or JavaScript) for the code.
* Execution: When the "Executar" button is clicked, the code is compiled and executed using a remote API specified by REACT_APP_RAPID_API_URL, REACT_APP_RAPID_API_HOST, and REACT_APP_RAPID_API_KEY environment variables.
* Output Display: The output of the code execution is displayed in a separate output window.


## Code Structure
* CodeEditorWindow: The main component that encapsulates the code editor and handles code execution and output display.
* handleEditorChange: Event handler for updating the code value in the component state.
* handleCompile: Sends a POST request to the remote API to compile and execute the code.
* checkStatus: Sends a GET request to the remote API to check the status of code execution and retrieve the output.
* getOutput: Renders the appropriate output based on the status of code execution.

Link: https://code-editor-wc88.onrender.com

