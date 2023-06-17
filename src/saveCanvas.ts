export const exportCanvas = ( canvas: HTMLCanvasElement ) => {
    const link = document.createElement( 'a' );
    link.download = 'canvas.png';
    link.href = canvas.toDataURL( 'image/png' );
    link.click();
    link.remove();
}

export const saveCanvas = ( button: HTMLButtonElement, canvas: HTMLCanvasElement ) => {
  button.addEventListener( 'click', () => exportCanvas( canvas ) );
};
