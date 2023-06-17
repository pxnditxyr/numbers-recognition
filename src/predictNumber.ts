import * as tf from '@tensorflow/tfjs';

import { resizeCanvas } from './resizeCanvas';

export const predictNumber = ( button: HTMLButtonElement, bigCanvas: HTMLCanvasElement, smallCanvas: HTMLCanvasElement, resultElement : HTMLDivElement ) => {
  const smallContext = smallCanvas.getContext( '2d' )!
  let model: tf.LayersModel;

  const chargeModel = async () => {
    model = await tf.loadLayersModel( '/model.json' )
  }

  chargeModel()

  const predict = () => {
    resizeCanvas( bigCanvas, smallCanvas );
    const imageData = smallContext.getImageData( 0, 0, smallCanvas.width, smallCanvas.height );
    const array = []
    let array28 = []

    for ( let i = 0; i < imageData.data.length; i += 4 ) {
      const value = imageData.data[ i + 3 ] / 255
      array28.push([ value ])
      
      if ( array28.length === 28 ) {
        array.push( array28 )
        array28 = []
      }
    }
    
    const newArray = [ array ]
    const tensor4d = tf.tensor4d( newArray )
    const result = model.predict( tensor4d ) as tf.Tensor
    const data = result.dataSync()

    const max = Math.max( ...data )
    const index = data.findIndex( value => value === max )
    resultElement.innerHTML = `El número predecido es: ${ index }`
  }


  button.addEventListener( 'click', predict );
};
