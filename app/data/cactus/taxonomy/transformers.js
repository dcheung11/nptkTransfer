export function taxToTree(tax) {
  let strainTree;
  let speciesTree;
  let genusTree;
  let familyTree;
  let orderTree;
  let phylumTree;
  let kingdomTree;
  if (tax.strain) {
    strainTree = {
      title: tax.strain,
      key: tax.strain_id,
    };
  }
  if (tax.species) {
    speciesTree = {
      title: tax.species,
      key: tax.species_id,
    };
    if (tax.strain) {
      speciesTree.children = [strainTree];
    }
  }
  if (tax.genus) {
    genusTree = {
      title: tax.genus,
      key: tax.genus_id,
    };
    if (tax.species) {
      genusTree.children = [speciesTree];
    } else if (tax.strain) {
      genusTree.children = [strainTree];
    }
  }
  if (tax.family) {
    familyTree = {
      title: tax.family,
      key: tax.family_id,
    };
    if (tax.genus) {
      familyTree.children = [genusTree];
    }
  }
  if (tax.order) {
    orderTree = {
      title: tax.order,
      key: tax.order_id,
    };
    if (tax.family) {
      orderTree.children = [familyTree];
    }
  }
  if (tax.phylum) {
    phylumTree = {
      title: tax.phylum,
      key: tax.phylum_id,
    };
    if (tax.order) {
      phylumTree.children = [orderTree];
    }
  }
  if (tax.kingdom) {
    kingdomTree = {
      title: tax.kingdom,
      key: tax.kingdom_id,
    };
    if (tax.phylum) {
      kingdomTree.children = [phylumTree];
    }
    return [kingdomTree];
  }
  return [];
}
