import {
  DEPOSIT_GENOME,
  FAILED_DEPOSIT_GENOME,
  SUCCESS_DEPOSIT_GENOME,
} from './constants';

export function depositGenome(genomeData) {
  return {
    type: DEPOSIT_GENOME,
    genomeData,
  };
}

export function successDepositGenome(genomeResponse) {
  return {
    type: SUCCESS_DEPOSIT_GENOME,
    genomeResponse,
  };
}

export function failedDepositGenome(err) {
  return {
    type: FAILED_DEPOSIT_GENOME,
    err,
  };
}
