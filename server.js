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

// app.get("/mainServer", async (req, res) => {
//   try {
//     await runScript("./run1.sh"); // Replace with actual path
//     res.send("run.sh executed successfully");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error running script");
//   }
// });

app.get("/server/project1", async (req, res) => {
  console.log("PROJECT-1");
  try {
    await runScript("./run1.sh");
  } catch (error) {
    console.error(error);
  }
});

app.get("/server/project2", async (req, res) => {
  console.log("PROJECT-2");
  try {
    await runScript("./run2.sh");
  } catch (error) {
    console.error(error);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
