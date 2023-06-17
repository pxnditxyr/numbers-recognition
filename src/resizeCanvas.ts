export const resizeCanvas = ( canvasInput: HTMLCanvasElement, canvasOutput: HTMLCanvasElement ) => {
  const contextOutput = canvasOutput.getContext( '2d' )!;
  contextOutput.clearRect( 0, 0, canvasOutput.width, canvasOutput.height );
  contextOutput.drawImage( canvasInput, 0, 0, canvasInput.width, canvasInput.height, 0, 0, canvasOutput.width, canvasOutput.height );
}
