import * as tf from '@tensorflow/tfjs';

import { resizeCanvas } from './resizeCanvas';

export const predictNumber = ( button : HTMLButtonElement, bigCanvas : HTMLCanvasElement, smallCanvas : HTMLCanvasElement, resultElement : HTMLDivElement ) => {
  let model : tf.LayersModel;
  const smallContext = smallCanvas.getContext( '2d' )!

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
      const value = imageData.data[ i + 3 ] / 255 // i + 3 porque es el canal alpha de blanco y negro
      array28.push([ value ])
      
      if ( array28.length === 28 ) {
        array.push( array28 )
        array28 = []
      }
    }
    
    const newArray = [ array ] // [1, 2, 3] -> [[1, 2, 3]]
    const tensor4d = tf.tensor4d( newArray ) // tensor de 4 dimensiones que procesa el nuevo array con los valores de los pixeles de la imagen 28x28
    const result = model.predict( tensor4d ) as tf.Tensor 
    const data = result.dataSync() // [ 0.24->24%, 0.6->60%, ... 0.01->1% ] tiene de los 10 numeros sus porcentajes de presicion 0,1,2,...,9

    const max = Math.max( ...data ) // el porcentaje mas alto -> y ese sera el numero predecido
    const index = data.findIndex( value => value === max ) // -> el indice del valor predecido en el arreglo de probabilidades
    resultElement.innerHTML = `El número predecido es: ${ index }` // insertamos el resultado en el elemento result
  }


  button.addEventListener( 'click', predict ); // se agrega el evento click
};
