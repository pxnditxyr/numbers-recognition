import { clearCanvas } from './clearCanvas'
import { drawCanvas } from './drawCanvas'
import { predictNumber } from './predictNumber'
import { saveCanvas } from './saveCanvas'

import './styles.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <main>
    <canvas
      id="draw-canvas"
      class="canvas"
      width="200"
      height="200"
    ></canvas>
    <canvas
      id="small-canvas"
      class="canvas"
      width="28"
      height="28"
      style="display: none"
    ></canvas>
    <div id="result" class="result"></div>
    <div class="controls">
      <button id="btn-clear" class="btn btn-clear"> Limpiar </button>
      <button id="btn-save" class="btn btn-save"> Guardar </button>
      <button id="btn-predict" class="btn btn-predict"> Predecir </button>
    </div>
  </main>
`

const canvas = document.querySelector<HTMLCanvasElement>( '#draw-canvas' ) as HTMLCanvasElement
const smallCanvas = document.querySelector<HTMLCanvasElement>( '#small-canvas' ) as HTMLCanvasElement
const resultElement = document.querySelector<HTMLDivElement>( '#result' ) as HTMLDivElement
const clearButton = document.querySelector<HTMLButtonElement>( '.btn-clear' ) as HTMLButtonElement
const saveButton = document.querySelector<HTMLButtonElement>( '.btn-save' ) as HTMLButtonElement
const predictButton = document.querySelector<HTMLButtonElement>( '.btn-predict' ) as HTMLButtonElement

drawCanvas( canvas )
saveCanvas( saveButton, canvas )
clearCanvas( clearButton, canvas )
predictNumber( predictButton, canvas, smallCanvas, resultElement )

