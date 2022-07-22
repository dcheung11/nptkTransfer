import React, { memo, useState, useMemo } from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import SmilesDrawer from 'smiles-drawer';
import { v4 as uuidv4 } from 'uuid';
import SmilesImage from '../SmilesImage';
import Molecule from '../Molecule';

function MoleculeWithModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const options = {
    experimentalSSSR: true,
    experimental: true,
    width: props.drawingWidth,
    height: props.drawingHeight,
  };
  const smilesDrawerLarge = new SmilesDrawer.Drawer(options);
  const thisMolecule = useMemo(
    () => (
      <SmilesImage
        smiles={props.smilesValue}
        smilesDrawer={smilesDrawerLarge}
        smallMoleculeId={btoa(`${props.smilesValue}miniMe`)}
        uuid={uuidv4()}
        onClick={() => showModal()}
      />
    ),
    [props.smilesValue],
  );
  return (
    <div>
      {!!props.smilesValue && thisMolecule}
      <Modal
        title={props.title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={props.modalWidth}
        height={props.modalHeight}
      >
        <Molecule
          smilesValue={props.smilesValue}
          suffix="Modal"
          drawingWidth={props.modalWidth}
          drawingHeight={props.modalHeight}
          uuid={props.uuid}
        />
      </Modal>
    </div>
  );
}

MoleculeWithModal.propTypes = {
  smilesValue: PropTypes.string,
  drawingWidth: PropTypes.number,
  drawingHeight: PropTypes.number,
  modalWidth: PropTypes.number,
  modalHeight: PropTypes.number,
  title: PropTypes.string,
  uuid: PropTypes.any,
};

MoleculeWithModal.defaultProps = {
  drawingWidth: 620,
  drawingHeight: 310,
  modalWidth: 1000,
  modalHeight: 725,
  title: 'Molecule',
  uuid: uuidv4(),
};

export default memo(MoleculeWithModal);
