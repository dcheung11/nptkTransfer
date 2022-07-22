import React, { memo } from 'react';
import PropTypes from 'prop-types';
import SmilesDrawer from 'smiles-drawer';
import SmilesImage from '../SmilesImage';

function Molecule(props) {
  const smilesDrawerLarge = new SmilesDrawer.Drawer({
    experimentalSSSR: true,
    experimental: true,
    width: props.drawingWidth,
    height: props.drawingHeight,
  });
  return (
    <SmilesImage
      smiles={props.smilesValue}
      smilesDrawer={smilesDrawerLarge}
      smallMoleculeId={btoa(props.smilesValue + props.suffix)}
      uuid={props.uuid}
    />
  );
}

Molecule.propTypes = {
  smilesValue: PropTypes.string,
  drawingWidth: PropTypes.number,
  drawingHeight: PropTypes.number,
  suffix: PropTypes.string,
  uuid: PropTypes.any,
};

Molecule.defaultProps = {
  smilesValue: 'CCCCCCC',
  drawingWidth: 620,
  drawingHeight: 310,
  suffix: 'Mol',
};

export default memo(Molecule);
