export function getSmallMoleculeData(activityCounts, onlyBacteria, rankFilter) {
  const organized = activityCounts.reduce((acc, e) => {
    const thisActivityList = acc.get(e.activity);
    if (thisActivityList) {
      thisActivityList.push(e);
      acc.set(e.activity, thisActivityList);
    } else {
      acc.set(e.activity, [e]);
    }
    return acc;
  }, new Map());

  const reorganized = new Map();
  [...organized.entries()].map(entry => {
    const [bioactivity, molecules] = entry;
    let cleanedCounts;
    if (onlyBacteria) {
      cleanedCounts = molecules
        .map(x => x.smallmolecule.taxonomy_has_smallmolecule)
        .flat()
        .map(x => x.taxonomy)
        .flat()
        .filter(x => x != null)
        .filter(x => x.kingdom === 'bacteria');
    } else {
      cleanedCounts = molecules
        .map(x => x.smallmolecule.taxonomy_has_smallmolecule)
        .flat()
        .map(x => x.taxonomy)
        .flat()
        .filter(x => x != null);
    }

    const collection =
      cleanedCounts.length > 0
        ? cleanedCounts
          .map(x => x[`${rankFilter}`])
          .filter(x => x != null)
          .reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())
        : new Map();

    const sortedCollection = new Map(
      [...collection].sort((a, b) => (a[1] > b[1] ? 0 : -1)),
    );
    reorganized.set(bioactivity, sortedCollection);
    return null;
  });

  return reorganized;
}

export function getExtractData(
  extractCounts,
  onlyBacteria,
  rankFilter,
  malariaFilter = false,
  malariaMax = 1000,
  malariaMin = 0,
  tbAssayFilter = false,
  tbMin = -100,
  tbMax = 100,
) {
  let filteredExtracts = extractCounts.map(x => x);
  if (malariaFilter) {
    filteredExtracts = extractCounts.filter(
      x =>
        !!x.malaria_assay &&
        x.malaria_assay[0] &&
        x.malaria_assay[0].dd2_inhibition != null &&
        x.malaria_assay[0].dd2_inhibition > malariaMin &&
        x.malaria_assay[0].dd2_inhibition < malariaMax,
    );
  }
  if (tbAssayFilter) {
    filteredExtracts = filteredExtracts.filter(
      x =>
        !!x.tb_assay &&
        x.tb_assay[0] &&
        x.tb_assay[0].rfu_inhibition != null &&
        x.tb_assay[0].rfu_inhibition > tbMin &&
        x.tb_assay[0].rfu_inhibition < tbMax,
    );
  }
  let cleanedCounts = filteredExtracts
    .map(x => x.culture)
    .filter(x => x != null)
    .map(x => x.taxonomy[0])
    .filter(x => x != null);
  if (onlyBacteria) {
    cleanedCounts = cleanedCounts.filter(x => x.kingdom === 'bacteria');
  }
  const collection =
    cleanedCounts.length > 0
      ? cleanedCounts
        .map(x => x[`${rankFilter}`])
        .filter(x => x != null)
        .reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())
      : new Map();

  return new Map([...collection].sort((a, b) => (a[1] > b[1] ? 0 : -1)));
}
