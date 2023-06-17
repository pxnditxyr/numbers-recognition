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
    context.lineWidth = 10
    context.moveTo( lastX, lastY )
    context.lineTo( line.x, line.y )
    context.stroke()
    context.closePath()
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
      drawLine( { x: event.offsetX+0.5, y: event.offsetY+0.5 } )
      drawLine( { x: event.offsetX+1, y: event.offsetY+1 } )
      drawLine( { x: event.offsetX+1.5, y: event.offsetY+1.5 } )
      drawLine( { x: event.offsetX-0.5, y: event.offsetY-0.5 } )
      drawLine( { x: event.offsetX-1, y: event.offsetY-1 } )
      drawLine( { x: event.offsetX-1.5, y: event.offsetY-1.5 } )
    }
  } )

  canvas.addEventListener( 'mouseup', () => {
    painting = false
  } )

  canvas.addEventListener( 'mouseleave', () => {
    painting = false
  } )
}
