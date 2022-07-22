import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';

function ChemotypeTag(props) {
  let translation;
  switch (props.family) {
    case 'lantipeptide-t1pks':
      translation = {
        families: ['LANTIPEPTIDE', 'TYPE I POLYKETIDE'],
        chemotype: 'type1pk',
      };
      break;
    case 'MELANIN':
      translation = { families: ['MELANIN'], chemotype: 'other' };
      break;
    case 'butyrolactone':
      translation = { families: ['BUTYROLACTONE'], chemotype: 'type1pk' };
      break;
    case 'RESORCINOL':
      translation = { families: ['RESORCINOL'], chemotype: 'other' };
      break;
    case 'NUCLEOSIDE':
      translation = { families: ['NUCLEOSIDE'], chemotype: 'other' };
      break;
    case 'BACTERIOCIN':
      translation = { families: ['BACTERIOCIN'], chemotype: 'peptide' };
      break;
    case 'linaridin':
      translation = { families: ['LINARIDIN'], chemotype: 'peptide' };
      break;
    case 'NONRIBOSOMAL_PEPTIDE':
      translation = {
        families: ['NONRIBOSOMAL PEPTIDE'],
        chemotype: 'peptide',
      };
      break;
    case 'resorcinol':
      translation = { families: ['RESORCINOL'], chemotype: 'other' };
      break;
    case 'LADDERANE':
      translation = { families: ['LADDERANE'], chemotype: 'type1pk' };
      break;
    case 'nrps':
      translation = {
        families: ['NONRIBOSOMAL PEPTIDE'],
        chemotype: 'peptide',
      };
      break;
    case 'terpene-nrps':
      translation = {
        families: ['TERPENE', 'NONRIBOSOMAL PEPTIDE'],
        chemotype: 'other',
      };
      break;
    case 't2pks-ladderane':
      translation = {
        families: ['TYPE II POLYKETIDE', 'LADDERANE'],
        chemotype: 'other',
      };
      break;
    case 'arylpolyene-resorcinol':
      translation = {
        families: ['ARYL POLYENE', 'RESORCINOL'],
        chemotype: 'other',
      };
      break;
    case 'nrps-transatpks-otherks':
      translation = {
        families: ['NONRIBOSOMAL PEPTIDE', 'TRANS-AT POLYKETIDE', 'OTHER'],
        chemotype: 'other',
      };
      break;
    case 'transatpks':
      translation = { families: ['TRANS-AT POLYKETIDE'], chemotype: 'type1pk' };
      break;
    case 'TERPENE':
      translation = { families: ['TERPENE'], chemotype: 'other' };
      break;
    case 'ectoine':
      translation = { families: ['ECTOINE'], chemotype: 'other' };
      break;
    case 'thiopeptide':
      translation = { families: ['THIOPEPTIDE'], chemotype: 'peptide' };
      break;
    case 'ANTIMETABOLITE':
      translation = { families: ['ANTIMETABOLITE'], chemotype: 'other' };
      break;
    case 'indole':
      translation = { families: ['INDOLE'], chemotype: 'other' };
      break;
    case 'ladderane':
      translation = { families: ['LADDERANE'], chemotype: 'type1pk' };
      break;
    case 'CYCLODIPEPTIDE':
      translation = { families: ['CYCLODIPEPTIDE'], chemotype: 'peptide' };
      break;
    case 'bacteriocin-nrps':
      translation = {
        families: ['BACTERIOCIN', 'NONRIBOSOMAL PEPTIDE'],
        chemotype: 'peptide',
      };
      break;
    case 'lantipeptide':
      translation = { families: ['LANTIPEPTIDE'], chemotype: 'peptide' };
      break;
    case 'BISINDOLE':
      translation = { families: ['BISINDOLE'], chemotype: 'other' };
      break;
    case 'indole-t1pks':
      translation = {
        families: ['INDOLE', 'TYPE I POLYKETIDE'],
        chemotype: 'type1pk',
      };
      break;
    case 'ISOPROPYLSTILBENE':
      translation = { families: ['ISOPROPYLSTILBENE'], chemotype: 'other' };
      break;
    case 'PHENAZINE':
      translation = { families: ['PHENAZINE'], chemotype: 'other' };
      break;
    case 'AMINOCOUMARIN':
      translation = { families: ['AMINOCOUMARIN'], chemotype: 'other' };
      break;
    case 'NULL':
      translation = { families: ['NULL'], chemotype: 'other' };
      break;
    case 'phenazine':
      translation = { families: ['PHENAZINE'], chemotype: 'other' };
      break;
    case 't2pks':
      translation = { families: ['TYPE II POLYKETIDE'], chemotype: 'type2pk' };
      break;
    case 'BUTYROLACTONE':
      translation = { families: ['BUTYROLACTONE'], chemotype: 'type1pk' };
      break;
    case 'hserlactone':
      translation = { families: ['HOMOSERINE LACTONE'], chemotype: 'type1pk' };
      break;
    case 'NIS_SYNTHASE':
      translation = {
        families: ['NON-RIBOSOMAL INDEPENDENT SIDEROPHORE'],
        chemotype: 'other',
      };
      break;
    case 'HAPALINDOLE':
      translation = { families: ['HAPALINDOLE'], chemotype: 'other' };
      break;
    case 'LINCOSAMIDE':
      translation = { families: ['LINCOSAMIDE'], chemotype: 'other' };
      break;
    case 'terpene':
      translation = { families: ['TERPENE'], chemotype: 'other' };
      break;
    case 'phosphonate':
      translation = { families: ['PHOSPHONATE'], chemotype: 'other' };
      break;
    case 'indole-t1pks-nrps':
      translation = {
        families: ['INDOLE', 'TYPE I POLYKETIDE', 'NONRIBOSOMAL PEPTIDE'],
        chemotype: 'other',
      };
      break;
    case 'HOMOSERINE_LACTONE':
      translation = {
        families: ['HOMOSERINE LACTONE'],
        chemotype: 'type1pk',
      };
      break;
    case 'siderophore':
      translation = { families: ['SIDEROPHORE'], chemotype: 'other' };
      break;
    case 'TYPE_I_POLYKETIDE':
      translation = {
        families: ['TYPE I POLYKETIDE'],
        chemotype: 'type1pk',
      };
      break;
    case 'hserlactone-lantipeptide-lassopeptide':
      translation = {
        families: ['HOMOSERINE LACTONE', 'LANTIPEPTIDE', 'LASSOPEPTIDE'],
        chemotype: 'other',
      };
      break;
    case 'amglyccycl':
      translation = { families: ['AMINOGLYCOSIDE'], chemotype: 'other' };
      break;
    case 'ARYL_POLYENE':
      translation = { families: ['ARYL POLYENE'], chemotype: 'type1pk' };
      break;
    case 'melanin':
      translation = { families: ['MELANIN'], chemotype: 'other' };
      break;
    case 'sactipeptide-head_to_tail':
      translation = {
        families: ['SACTIPEPTIDE'],
        chemotype: 'peptide',
      };
      break;
    case 'otherks':
      translation = { families: ['NULL'], chemotype: 'other' };
      break;
    case 'RIBOSOMAL':
      translation = { families: ['RIBOSOMAL'], chemotype: 'peptide' };
      break;
    case 'transatpks-nrps':
      translation = {
        families: ['TRANS-AT POLYKETIDE', 'NONRIBOSOMAL PEPTIDE'],
        chemotype: 'other',
      };
      break;
    case 'lassopeptide':
      translation = { families: ['LASSOPEPTIDE'], chemotype: 'peptide' };
      break;
    case 't1pks-terpene-nrps':
      translation = {
        families: ['TYPE I POLYKETIDE', 'TERPENE', 'NONRIBOSOMAL PEPTIDE'],
        chemotype: 'other',
      };
      break;
    case 'lantipeptide-t1pks-otherks':
      translation = {
        families: ['LANTIPEPTIDE', 'TYPE I POLYKETIDE', 'NULL'],
        chemotype: 'other',
      };
      break;
    case 'FURAN':
      translation = { families: ['FURAN'], chemotype: 'other' };
      break;
    case 'bacteriocin-terpene':
      translation = {
        families: ['BACTERIOCIN', 'TERPENE'],
        chemotype: 'other',
      };
      break;
    case 'BETA_LACTAM':
      translation = { families: ['BETA-LACTAM'], chemotype: 'peptide' };
      break;
    case 'AMINOGLYCOSIDE':
      translation = { families: ['AMINOGLYCOSIDE'], chemotype: 'other' };
      break;
    case 'TYPE_II_POLYKETIDE':
      translation = {
        families: ['TYPE II POLYKETIDE'],
        chemotype: 'type2pk',
      };
      break;
    case 'transatpks-otherks-nrps':
      translation = {
        families: ['TRANS-AT POLYKETIDE', 'NULL', 'NONRIBOSOMAL PEPTIDE'],
        chemotype: 'other',
      };
      break;
    case 'terpene-siderophore':
      translation = {
        families: ['TERPENE', 'SIDEROPHORE'],
        chemotype: 'other',
      };
      break;
    case 'nrps-arylpolyene-ladderane':
      translation = {
        families: ['NONRIBOSOMAL PEPTIDE', 'ARYL POLYENE', 'LADDERANE'],
        chemotype: 'other',
      };
      break;
    case 'indole-t1pks-terpene':
      translation = {
        families: ['INDOLE', 'TYPE I POLYKETIDE', 'TERPENE'],
        chemotype: 'other',
      };
      break;
    case 'other':
      translation = { families: ['NULL'], chemotype: 'other' };
      break;
    case 't1pks-nrps':
      translation = {
        families: ['TYPE I POLYKETIDE', 'NONRIBOSOMAL PEPTIDE'],
        chemotype: 'other',
      };
      break;
    case 'bacteriocin':
      translation = { families: ['BACTERIOCIN'], chemotype: 'peptide' };
      break;
    case 'arylpolyene':
      translation = { families: ['ARYL POLYENE'], chemotype: 'type1pk' };
      break;
    case 't1pks-otherks':
      translation = {
        families: ['TYPE I POLYKETIDE', 'NULL'],
        chemotype: 'type1pk',
      };
      break;
    case 'PHOSPHONATE':
      translation = { families: ['PHOSPHONATE'], chemotype: 'other' };
      break;
    case 't3pks-arylpolyene-nrps':
      translation = {
        families: [
          'TYPE III POLYKETIDE',
          'ARYL POLYENE',
          'NONRIBOSOMAL PEPTIDE',
        ],
        chemotype: 'other',
      };
      break;
    case 'thiopeptide-t1pks-nrps':
      translation = {
        families: ['THIOPEPTIDE', 'TYPE I POLYKETIDE', 'NONRIBOSOMAL PEPTIDE'],
        chemotype: 'other',
      };
      break;
    case 'acyl_amino_acids':
      translation = { families: ['ACYL AMINO ACIDS'], chemotype: 'peptide' };
      break;
    case 'ladderane-nrps':
      translation = {
        families: ['LADDERANE', 'NONRIBOSOMAL PEPTIDE'],
        chemotype: 'other',
      };
      break;
    case 'PHOSPHOGLYCOLIPID':
      translation = { families: ['PHOSPHOGLYCOLIPID'], chemotype: 'other' };
      break;
    case 't3pks':
      translation = { families: ['TYPE III POLYKETIDE'], chemotype: 'type1pk' };
      break;
    case 'ECTOINE':
      translation = { families: ['ECTOINE'], chemotype: 'other' };
      break;
    case 'indole-nrps':
      translation = {
        families: ['INDOLE', 'NONRIBOSOMAL PEPTIDE'],
        chemotype: 'other',
      };
      break;
    case 't1pks':
      translation = { families: ['TYPE I POLYKETIDE'], chemotype: 'type1pk' };
      break;
    default:
      translation = {
        families: [props.family.toUpperCase()],
        chemotype: 'other',
      };
      break;
  }
  const chemotypeColors = {
    type1pk: '#f2bbad',
    type2pk: '#cdbbda',
    peptide: '#a0e2cd',
    other: '#afdfdb',
  };

  ChemotypeTag.propTypes = {
    chemotype: PropTypes.string,
    highlight: PropTypes.bool,
  };

  return translation.families.map((fam, idx) => (
    <Tag
      key={idx}
      color={props.highlight ? 'gold' : chemotypeColors[translation.chemotype]}
    >
      {fam}
    </Tag>
  ));
}

export default memo(ChemotypeTag);
