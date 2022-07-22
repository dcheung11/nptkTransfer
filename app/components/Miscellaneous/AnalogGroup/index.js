import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Typography } from 'antd';
import { Link } from 'react-router-dom';
import Molecule from '../../Chemistry/Molecule';
import TagActivity from '../../Tags/TagActivity';
import { capitalizeFirstLetter } from '../../../utils/texthelper';
import AnalogNovelModal from '../../Tables/AnalogNovelModal';
import AnalogMemberModal from '../../Tables/AnalogMemberModal';
const { Meta } = Card;

function AnalogGroup(props) {
  const [isAnalogMemberModalVisible, setIsAnalogMemberModalVisible] = useState(
    false,
  );
  const showAnalogMemberModal = () => {
    setIsAnalogMemberModalVisible(true);
  };

  const handleAnalogMemberModalOk = () => {
    setIsAnalogMemberModalVisible(false);
  };

  const handleAnalogMemberModalCancel = () => {
    setIsAnalogMemberModalVisible(false);
  };
  const [isAnalogNovelModalVisible, setIsAnalogNovelModalVisible] = useState(
    false,
  );
  const showAnalogNovelModal = () => {
    setIsAnalogNovelModalVisible(true);
  };

  const handleAnalogNovelModalOk = () => {
    setIsAnalogNovelModalVisible(false);
  };

  const handleAnalogNovelModalCancel = () => {
    setIsAnalogNovelModalVisible(false);
  };
  const novelAnalogs = [];
  props.analogGroup.novel_analogs.map(g => {
    g.maple_peaks_table.self_peaks_table.map(peak =>
      novelAnalogs.push({
        extract_id: peak.extract_id,
        novel_analog_id: g.novel_analog_id,
        ...peak.ms1_peak,
      }),
    );
    return undefined;
  });

  return (
    <Col>
      <AnalogMemberModal
        analogId={props.analogGroup.analog_id}
        analogMembers={props.analogGroup.smallmolecule_analog_members}
        extractLookup={Object.fromEntries(
          new Map(
            props.analogGroup.smallmolecule_analog_metabolomic.map(x => [
              x.smallmolecule_id,
              x,
            ]),
          ),
        )}
        isModalVisible={isAnalogMemberModalVisible}
        handleOk={handleAnalogMemberModalOk}
        handleCancel={handleAnalogMemberModalCancel}
      />
      <AnalogNovelModal
        analogId={props.analogGroup.analog_id}
        analogNovel={novelAnalogs}
        isModalVisible={isAnalogNovelModalVisible}
        handleOk={handleAnalogNovelModalOk}
        handleCancel={handleAnalogNovelModalCancel}
      />
      <Card
        cover={
          <Molecule
            smilesValue={
              props.analogGroup.smallmolecule &&
              props.analogGroup.smallmolecule.original_smiles
            }
          />
        }
        bordered={false}
      >
        <Meta
          title={`Molecular Family #${props.analogIndex + 1}`}
          description={
            <div>
              <>
                Activities:{' '}
                {(props.analogGroup.activity_profile.length > 0 &&
                  props.analogGroup.activity_profile.map((y, idx) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <TagActivity key={idx} activity={y} />
                  ))) ||
                  '-'}
              </>
              <br />
              <>
                Representative ID:{' '}
                <Link
                  to={`/apps/smallmolecule/results/${
                    props.analogGroup.smallmolecule.smallmolecule_id
                  }`}
                >
                  {props.analogGroup.smallmolecule.smallmolecule_id}
                </Link>
              </>
              <br />
              <>
                Validation:{' '}
                {capitalizeFirstLetter(props.analogGroup.analog_validation)}
              </>
              <br />
              <>
                # of Novel Derivatives:{' '}
                <Typography.Link onClick={() => showAnalogNovelModal()}>
                  {props.analogGroup.novel_analog_count}
                </Typography.Link>
              </>
              <br />
              <>
                # of Members:{' '}
                <Typography.Link onClick={() => showAnalogMemberModal()}>
                  {props.analogGroup.smallmolecule_analog_members.length}
                </Typography.Link>
              </>
            </div>
          }
        />
      </Card>
    </Col>
  );
}

AnalogGroup.propType = {
  analogGroup: PropTypes.object,
  analogIndex: PropTypes.number,
};

export default memo(AnalogGroup);
