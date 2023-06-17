
export const clearCanvas = ( button: HTMLButtonElement, canvas: HTMLCanvasElement ) => {
  const clear = () => {
    const context = canvas.getContext( '2d' )!;
    context.clearRect( 0, 0, canvas.width, canvas.height );
  }

  button.addEventListener( 'click', clear );
}
