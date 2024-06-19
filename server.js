const express = require("express");
const { spawn } = require("child_process");

const app = express();

const runScript = (scriptPath) => {
  return new Promise((resolve, reject) => {
    const process = spawn("sh", [scriptPath]);

    process.stdout.on("data", (data) => {
      console.log(data.toString());
    });

    process.stderr.on("data", (data) => {
      console.error(data.toString());
    });

    process.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Script exited with code ${code}`));
      }
    });
  });
};

const runScriptBAT = (scriptPath) => {
  return new Promise((resolve, reject) => {
    const process = spawn("cmd.exe", ["/c", scriptPath]);

    process.stdout.on("data", (data) => {
      console.log(data.toString());
    });

    process.stderr.on("data", (data) => {
      console.error(data.toString());
    });

    process.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Script exited with code ${code}`));
      }
    });
  });
};

app.get("/server/project1", async (req, res) => {
  console.log("PROJECT-1");
  try {
    await runScriptBAT("./run1.bat");
  } catch (error) {
    console.error(error);
  }
});

app.get("/server/project2", async (req, res) => {
  console.log("PROJECT-2");
  try {
    await runScriptBAT("./run2.bat");
  } catch (error) {
    console.error(error);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
