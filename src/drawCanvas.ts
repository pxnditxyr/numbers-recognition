export const drawCanvas = ( canvas: HTMLCanvasElement ) => {
  const context = canvas.getContext('2d')
  if ( !context )
    return
  context.fillStyle = 'red'
  let painting = false
  let lastX = 0
  let lastY = 0

  const drawLine = ( line: { x: number, y: number } ) => {
    context.beginPath()
    context.strokeStyle = 'black'
    context.lineWidth = 5
    context.moveTo( lastX, lastY )
    context.lineTo( line.x, line.y )
    context.stroke()
    lastX = line.x
    lastY = line.y
  }

  canvas.addEventListener( 'mousedown', ( event ) => {
    lastX = event.offsetX
    lastY = event.offsetY
    painting = true
  } )

  canvas.addEventListener( 'mousemove', ( event ) => {
    if ( painting ) {
      drawLine( { x: event.offsetX, y: event.offsetY } )
    }
  } )

  canvas.addEventListener( 'mouseup', () => {
    painting = false
  } )

  canvas.addEventListener( 'mouseleave', () => {
    painting = false
  } )
}
