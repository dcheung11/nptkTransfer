import {
  FETCH_CROP_DETAILS,
  FETCH_CROP_DISEASE,
  FETCH_CROP_METAGENOMIC_SAMPLES,
  SUCCESS_CROP_DETAILS,
  SUCCESS_CROP_DISEASE,
  SUCCESS_CROP_METAGENOMIC_SAMPLES,
  FAILED_CROP_DETAILS,
  FAILED_CROP_DISEASE,
  FAILED_CROP_METAGENOMIC_SAMPLES,
} from './constants';

export function fetchCropDetails(cropQueryData) {
  return {
    type: FETCH_CROP_DETAILS,
    cropQueryData,
  };
}

export function fetchCropDisease(cropDiseaseQueryData) {
  return {
    type: FETCH_CROP_DISEASE,
    cropDiseaseQueryData,
  };
}

export function fetchCropMetagenomic(cropMetagenomicQueryData) {
  return {
    type: FETCH_CROP_METAGENOMIC_SAMPLES,
    cropMetagenomicQueryData,
  };
}

export function failedCropDetails(err) {
  return {
    type: FAILED_CROP_DETAILS,
    err,
  };
}

export function failedCropDisease(err) {
  return {
    type: FAILED_CROP_DISEASE,
    err,
  };
}

export function failedCropMetagenomic(err) {
  return {
    type: FAILED_CROP_METAGENOMIC_SAMPLES,
    err,
  };
}

export function successCropDetails(cropData) {
  return {
    type: SUCCESS_CROP_DETAILS,
    cropData,
  };
}

export function successCropDisease(cropDiseaseData) {
  return {
    type: SUCCESS_CROP_DISEASE,
    cropDiseaseData,
  };
}

export function successCropMetagenomic(cropMetagenomicData) {
  return {
    type: SUCCESS_CROP_METAGENOMIC_SAMPLES,
    cropMetagenomicData,
  };
}
