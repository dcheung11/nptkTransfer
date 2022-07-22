import React, { memo, useEffect } from 'react';
import SmilesDrawer from 'smiles-drawer';
import PropTypes from 'prop-types';

function SmilesImage({
  smiles,
  smilesDrawer,
  smallMoleculeId,
  onClick,
  uuid,
  repaint = true,
  ...props
}) {
  useEffect(() => {
    SmilesDrawer.parse(
      smiles,
      tree => {
        smilesDrawer.draw(
          tree,
          `${uuid}${smallMoleculeId}${smiles}`,
          'light',
          false,
        );
      },
      () => {},
    );
  }, [smiles, repaint]);
  return (
    <div {...props}>
      <canvas
        key={`${uuid}${smallMoleculeId}${smiles}`}
        id={`${uuid}${smallMoleculeId}${smiles}`}
        onClick={onClick}
      />
    </div>
  );
}

SmilesImage.propTypes = {
  repaint: PropTypes.any,
  smiles: PropTypes.string,
  onClick: PropTypes.func,
  smilesDrawer: PropTypes.object.isRequired,
  uuid: PropTypes.any,
  smallMoleculeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

SmilesImage.propTypes = {
  onClick: () => {},
};

export default memo(SmilesImage);
