const { app, BrowserWindow, session } = require('electron');
const path = require('path');

function createWindow() {
  // Cria a janela principal do sistema
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    title: "APZN PRO",
    backgroundColor: '#000000', // Fundo preto antes de carregar
    icon: path.join(__dirname, 'icon.ico'), // Caso queiras adicionar um ícone depois
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false, // DESATIVA o bloqueio de CORS para permitir conexão ao midialink.cloud
      allowRunningInsecureContent: true // Permite rodar conteúdo HTTP em ambiente de app
    },
    autoHideMenuBar: true // Esconde a barra de menu superior (Ficheiro, Editar, etc)
  });

  // Carrega o teu ficheiro HTML
  win.loadFile('index.html');

  // Opcional: Abre as ferramentas de programador automaticamente para ver erros de conexão
  // win.webContents.openDevTools();
}

app.whenReady().then(() => {
  // Configuração extra para ignorar erros de certificados SSL e permissões de rede
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    callback({ cancel: false, requestHeaders: details.requestHeaders });
  });

  createWindow();
});

// Fecha o app quando todas as janelas forem fechadas (exceto no Mac)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
