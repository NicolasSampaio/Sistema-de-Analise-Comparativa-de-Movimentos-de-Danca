const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { spawn } = require("child_process");

let mainWindow;
let pythonProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Carrega a aplicação Angular
  mainWindow.loadURL("http://localhost:4200");

  // Abre o DevTools em desenvolvimento
  if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.openDevTools();
  }
}

function startPythonProcess() {
  // Inicia o processo Python
  pythonProcess = spawn("python", ["core-logic/main_core.py"], {
    stdio: ["pipe", "pipe", "pipe"],
  });

  pythonProcess.stdout.on("data", (data) => {
    console.log(`Python stdout: ${data}`);
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Python stderr: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    console.log(`Python process exited with code ${code}`);
  });
}

// Configuração do IPC para comunicação com Python
ipcMain.handle("python-request", async (event, requestData) => {
  return new Promise((resolve, reject) => {
    if (!pythonProcess) {
      reject(new Error("Python process not started"));
      return;
    }

    // Envia a requisição para o processo Python
    pythonProcess.stdin.write(JSON.stringify(requestData) + "\n", (err) => {
      if (err) {
        reject(err);
        return;
      }

      // Lê a resposta do Python
      pythonProcess.stdout.once("data", (data) => {
        try {
          const response = JSON.parse(data.toString());
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    });
  });
});

app.whenReady().then(() => {
  createWindow();
  startPythonProcess();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("before-quit", () => {
  if (pythonProcess) {
    pythonProcess.kill();
  }
});
