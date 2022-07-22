import React, { useRef } from 'react';
import SmilesDrawer from 'smiles-drawer';

const SmileDrawerContainer = ({ smilesStr }) => {
  const canvasRef = useRef(null);

  let drawer = new SmilesDrawer.Drawer({
    width: 400,
    height: 400,
    themes: {
      custom: {
        C: '#222', // black
        O: '#e74c3c', // red
        N: '#3498db', // cyan-blue
        F: '#27ae60', // green-cyan
        CL: '#16a085', // medium dark shade of green-cyan
        BR: '#d35400', // dark orange
        I: '#8e44ad', // magenta
        P: '#d35400', // dark orange
        S: '#f1c40f', // yellow
        B: '#e67e22', // orange
        SI: '#e67e22', // orange
        H: '#222', // black
        BACKGROUND: '#fff',
      },
    },
  });

  const theme = {
    dark: {
      C: '#fff',
      O: '#e74c3c',
      N: '#3498db',
      F: '#27ae60',
      CL: '#16a085',
      BR: '#d35400',
      I: '#8e44ad',
      P: '#d35400',
      S: '#f1c40f',
      B: '#e67e22',
      SI: '#e67e22',
      H: '#fff',
      BACKGROUND: '#141414',
    },
  };

  SmilesDrawer.parse(smilesStr, function(tree) {
    drawer.draw(tree, canvasRef.current, 'custom', false);
  });

  return (
    <canvas id="canvas" ref={canvasRef} width={'400px'} height={'400px'} />
  );
};

export default SmileDrawerContainer;
