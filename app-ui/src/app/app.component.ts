import { Component, OnInit, OnDestroy } from '@angular/core';
declare const ipcRenderer: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  stream: MediaStream | null = null;
  status: string = 'Inicializando...';
  private videoElement: HTMLVideoElement | null = null;
  private canvasElement: HTMLCanvasElement | null = null;
  private animationFrameId: number | null = null;

  async ngOnInit() {
    try {
      // Inicializa a câmera
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.status = 'Câmera inicializada';

      // Configura os elementos de vídeo e canvas
      this.videoElement = document.querySelector('video');
      this.canvasElement = document.querySelector('canvas');

      if (this.videoElement && this.canvasElement) {
        // Adiciona um evento para esperar o vídeo carregar
        this.videoElement.srcObject = this.stream;
        this.videoElement.onloadedmetadata = () => {
          this.canvasElement!.width = this.videoElement!.videoWidth;
          this.canvasElement!.height = this.videoElement!.videoHeight;

          // Inicia o loop de processamento com um pequeno atraso
          setTimeout(() => {
            this.processFrame();
          }, 1000); // Aguarda 1 segundo para garantir que a câmera esteja pronta
        };
      }
    } catch (error) {
      this.status = `Erro ao inicializar câmera: ${error}`;
    }
  }

  private processFrame() {
    if (!this.videoElement || !this.canvasElement) return;

    const context = this.canvasElement.getContext('2d');
    if (!context) return;
    debugger;
    // Desenha o frame atual
    context.drawImage(this.videoElement, 0, 0);

    // Obtém os dados do frame
    const imageData = context.getImageData(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );
    debugger;

    // Envia o frame para o processo Python
    ipcRenderer.send('process-frame', {
      frame: Array.from(imageData.data),
    });

    // Agenda o próximo frame
    this.animationFrameId = requestAnimationFrame(() => this.processFrame());
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
    }
  }
}
