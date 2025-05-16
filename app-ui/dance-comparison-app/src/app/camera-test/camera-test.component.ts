import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

declare global {
  interface Window {
    electronAPI: {
      startPython: () => void;
      sendToPython: (command: string) => void;
      stopPython: () => void;
      onMessage: (channel: string, callback: (data: any) => void) => void;
    };
  }
}

@Component({
  selector: 'app-camera-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="camera-test">
      <h2>Teste de Câmera</h2>
      <div class="controls">
        <button (click)="startCamera()" [disabled]="isRunning">
          Iniciar Câmera
        </button>
        <button (click)="stopCamera()" [disabled]="!isRunning">
          Parar Câmera
        </button>
      </div>
      <div class="status">
        <p>Status: {{ status }}</p>
      </div>
      <div class="landmarks" *ngIf="landmarks.length > 0">
        <h3>Landmarks Detectados:</h3>
        <pre>{{ landmarks | json }}</pre>
      </div>
    </div>
  `,
  styles: [
    `
      .camera-test {
        padding: 20px;
      }
      .controls {
        margin: 20px 0;
      }
      button {
        margin-right: 10px;
        padding: 8px 16px;
      }
      .status {
        margin: 20px 0;
      }
      .landmarks {
        margin-top: 20px;
      }
      pre {
        background: #f5f5f5;
        padding: 10px;
        border-radius: 4px;
      }
    `,
  ],
})
export class CameraTestComponent implements OnInit, OnDestroy {
  isRunning = false;
  status = 'Desconectado';
  landmarks: any[] = [];
  private frameInterval: any;

  ngOnInit() {
    // Configura o listener para respostas do Python
    window.electronAPI.onMessage('python-response', (data) => {
      if (data.status === 'success') {
        if (data.landmarks) {
          this.landmarks = data.landmarks;
        }
        this.status = data.message || 'Conectado';
      } else {
        this.status = `Erro: ${data.message}`;
      }
    });
  }

  ngOnDestroy() {
    this.stopCamera();
  }

  startCamera() {
    window.electronAPI.startPython();
    window.electronAPI.sendToPython('start_camera');
    this.isRunning = true;
    this.status = 'Iniciando...';

    // Configura o intervalo para processar frames
    this.frameInterval = setInterval(() => {
      if (this.isRunning) {
        window.electronAPI.sendToPython('process_frame');
      }
    }, 100); // 10 FPS
  }

  stopCamera() {
    if (this.frameInterval) {
      clearInterval(this.frameInterval);
    }
    window.electronAPI.sendToPython('stop_camera');
    window.electronAPI.stopPython();
    this.isRunning = false;
    this.status = 'Desconectado';
    this.landmarks = [];
  }
}
