import puffinIcon from '../../../../../public/images/puffin-ios.png';
import mangoIcon from '../../../../../public/images/mango-ios.png';
import quinceIcon from '../../../../../public/images/quince-ios.png';
import agoutiIcon from '../../../../../public/images/agouti-ios.png';
import treeIcon from '../../../../../public/images/tree-ios.png';
import passportIcon from '../../../../../public/images/passport-ios.png';
import cropIcon from '../../../../../public/images/crop-ios.png';
import targetIcon from '../../../../../public/images/target-ios.png';
import taskManagerIcon from '../../../../../public/images/task-manager-ios.png';
import barcodeIcon from '../../../../../public/images/16s-ios.png';
export const apps = [
  {
    id: 1,
    src: passportIcon,
    name: 'Graph Passport',
    route: '/apps/passport',
    type: 'reference',
    requiredRole: 'api_viewer',
  },
  {
    id: 2,
    src: cropIcon,
    name: 'Crop Profiles',
    route: '/apps/crops',
    type: 'reference',
    requiredRole: 'api_viewer',
  },
  {
    id: 69,
    src: targetIcon,
    name: 'Molecular Targets',
    route: '/apps/target',
    type: 'reference',
    requiredRole: 'api_viewer',
  },
  {
    id: 3,
    src: treeIcon,
    name: 'Taxonomy Tree',
    route: '/apps/taxonomy',
    type: 'administration',
    requiredRole: 'api_editor',
  },
  {
    id: 4,
    src: barcodeIcon,
    name: '16S Strain',
    route: '/apps/16S',
    type: 'genomic',
    requiredRole: undefined,
  },
  {
    id: 5,
    src: agoutiIcon,
    name: 'Fury Assembler',
    route: '/apps/assembly',
    type: 'genomic',
    requiredRole: undefined,
  },
  {
    id: 6,
    src: puffinIcon,
    name: 'Puffin',
    route: '/apps/puffin',
    type: 'genomic',
    requiredRole: undefined,
  },
  {
    id: 7,
    src: quinceIcon,
    name: 'Quince',
    route: '/apps/quince',
    type: 'genomic',
    requiredRole: undefined,
  },
  {
    id: 8,
    src: mangoIcon,
    name: 'Mango',
    route: '/apps/mango',
    type: 'genomic',
    requiredRole: undefined,
  },
  {
    id: 9,
    src: taskManagerIcon,
    name: 'Job Manager',
    route: '/apps/jobs',
    type: 'administration',
    requiredRole: 'api_editor',
  },
  {
    id: 10,
    src: puffinIcon,
    name: 'Leaderboards',
    route: '/apps/leaderboards',
    type: 'genomic',
    requiredRole: undefined,
  },
];
