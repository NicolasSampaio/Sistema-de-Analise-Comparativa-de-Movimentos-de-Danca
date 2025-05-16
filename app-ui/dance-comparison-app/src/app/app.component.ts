import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CameraTestComponent } from './camera-test/camera-test.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CameraTestComponent],
  template: `
    <div class="app-container">
      <header>
        <h1>Sistema de Análise Comparativa de Movimentos de Dança</h1>
      </header>
      <main>
        <app-camera-test></app-camera-test>
      </main>
    </div>
  `,
  styles: [
    `
      .app-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
      }
      header {
        text-align: center;
        margin-bottom: 40px;
      }
      h1 {
        color: #333;
        font-size: 2em;
      }
    `,
  ],
})
export class AppComponent {
  title = 'dance-comparison-app';
}
