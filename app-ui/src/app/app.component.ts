import { Component, OnInit } from '@angular/core';
declare const ipcRenderer: any;

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>Sistema de Análise Comparativa de Movimentos de Dança</h1>
      <div class="controls">
        <button (click)="initializeCamera()">Inicializar Câmera</button>
        <button (click)="processFrame()">Processar Frame</button>
        <button (click)="releaseCamera()">Liberar Câmera</button>
      </div>
      <div class="status" *ngIf="statusMessage">
        {{ statusMessage }}
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        padding: 20px;
        text-align: center;
      }
      .controls {
        margin: 20px 0;
      }
      button {
        margin: 0 10px;
        padding: 10px 20px;
        font-size: 16px;
      }
      .status {
        margin-top: 20px;
        padding: 10px;
        background-color: #f0f0f0;
        border-radius: 4px;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  statusMessage: string = '';

  ngOnInit(): void {
    // Inicialização do componente
  }

  async initializeCamera() {
    try {
      const response = await ipcRenderer.invoke('python-request', {
        action: 'initialize',
      });
      this.statusMessage = response.message;
    } catch (error: any) {
      this.statusMessage = `Erro: ${error.message}`;
    }
  }

  async processFrame() {
    try {
      const response = await ipcRenderer.invoke('python-request', {
        action: 'process_frame',
      });
      if (response.success && response.landmarks) {
        this.statusMessage = 'Frame processado com sucesso';
      } else {
        this.statusMessage = 'Nenhum landmark detectado';
      }
    } catch (error: any) {
      this.statusMessage = `Erro: ${error.message}`;
    }
  }

  async releaseCamera() {
    try {
      const response = await ipcRenderer.invoke('python-request', {
        action: 'release',
      });
      this.statusMessage = response.message;
    } catch (error: any) {
      this.statusMessage = `Erro: ${error.message}`;
    }
  }
}
