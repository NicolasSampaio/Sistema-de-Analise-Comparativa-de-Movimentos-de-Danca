const { spawn } = require("child_process");
const path = require("path");

// Inicia o servidor Angular
const ngServe = spawn("ng", ["serve"], {
  stdio: "inherit",
  shell: true,
});

// Aguarda o servidor Angular iniciar
setTimeout(() => {
  // Inicia o Electron
  const electron = spawn("npx", ["electron", "."], {
    stdio: "inherit",
    shell: true,
    env: {
      ...process.env,
      NODE_ENV: "development",
    },
  });

  // Manipula o encerramento dos processos
  process.on("SIGINT", () => {
    ngServe.kill();
    electron.kill();
    process.exit();
  });
}, 5000); // Aguarda 5 segundos para o servidor Angular iniciar
