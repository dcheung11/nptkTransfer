import React, { memo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs } from 'antd';

import { useInjectSaga } from '../../utils/injectSaga';
import LeaderboardSaga from '../../data/cactus/taxonomy_leaderboards/sagas';
import { useInjectReducer } from '../../utils/injectReducer';
import LeaderboardReducer from '../../data/cactus/taxonomy_leaderboards/reducers';
import LeaderboardSmallMoleculePane from '../../components/Layouts/LeaderBoards/LeaderboardSmallMoleculePane';
import LeaderboardExtractPane from '../../components/Layouts/LeaderBoards/LeaderboardExtractPane';
import Leaderboard from '../../components/Layouts/LeaderBoards/Leaderboard';
import {
  fetchActivityCounts,
  fetchExtractCounts,
} from '../../data/cactus/taxonomy_leaderboards/actions';
import {
  makeSelectActivityCounts,
  makeSelectActivityCountsLoading,
  makeSelectExtractCounts,
} from '../../data/cactus/taxonomy_leaderboards/selectors';
import { getExtractData, getSmallMoleculeData } from './transformers';
import { metaMap } from '../../components/Tags/TagActivity';

const { TabPane } = Tabs;

function LeaderboardPage(props) {
  useInjectSaga({ key: 'taxonomyLeaderboards', saga: LeaderboardSaga });
  useInjectReducer({
    key: 'taxonomyLeaderboards',
    reducer: LeaderboardReducer,
  });
  const dispatch = useDispatch();

  /* State */

  // Small Molecules
  const [bioactiveRankFilter, setBioactiveRankFilter] = useState('class');
  const [activity, setActivity] = useState('antiviral');
  const [maxItems, setMaxItems] = useState(30);
  const [bioactiveOnlyBacteria, setBioactiveOnlyBacteria] = useState(true);

  // Extracts
  const [extractRankFilter, setExtractRankFilter] = useState('class');
  const [extractOnlyBacteria, setExtractOnlyBacteria] = useState(true);
  const [useMalarialFilter, setUseMalarialFilter] = useState(false);
  const [malarialDdpMax, setMalarialDdpMax] = useState(105);
  const [malarialDdpMin, setMalarialDdpMin] = useState(-100);
  const [useTbFilter, setUseTbFilter] = useState(false);
  const [tbRFUMin, setTbRFUMin] = useState(-100);
  const [tbRFUMax, setTbRFUMax] = useState(100);

  /* Fetch Data */

  // Small Molecules
  useEffect(() => {
    dispatch(
      fetchActivityCounts({
        bearerToken: localStorage.token,
        rank: bioactiveRankFilter,
        activity,
      }),
    );
  }, [bioactiveRankFilter, activity]);

  // Extracts
  useEffect(() => {
    dispatch(
      fetchExtractCounts({
        bearerToken: localStorage.token,
        rank: extractRankFilter,
      }),
    );
  }, [extractRankFilter]);

  /* Selectors */

  // Small Molecules
  const selectActivityCountsLoading = makeSelectActivityCountsLoading();
  const activityCountsLoading = useSelector(selectActivityCountsLoading);
  const selectActivityCounts = makeSelectActivityCounts();
  const activityCounts = useSelector(selectActivityCounts);

  // Extracts
  const selectExtractCounts = makeSelectExtractCounts();
  const extractCounts = useSelector(selectExtractCounts);

  /* Reformatting Data for ECharts */

  // Small Molecule
  const reorganizedSmallMoleculeData = getSmallMoleculeData(
    activityCounts,
    bioactiveOnlyBacteria,
    bioactiveRankFilter,
  );

  const taxNames = [
    ...new Set(
      [...reorganizedSmallMoleculeData.values()].map(x => [...x.keys()]).flat(),
    ),
  ].slice(-maxItems);

  const activityCountData = [...reorganizedSmallMoleculeData.entries()].map(
    x => {
      const [bioactivity, countMap] = x;
      const counts = taxNames
        .map(tax => (!!countMap.get(tax) && countMap.get(tax)) || 0)
        .slice(-maxItems);
      return {
        seriesName: bioactivity,
        seriesColor: metaMap[bioactivity].color || '#e0d40c',
        seriesData: counts,
      };
    },
  );

  // Extract Data
  const extractData = getExtractData(
    extractCounts,
    extractOnlyBacteria,
    extractRankFilter,
    useMalarialFilter,
    malarialDdpMax,
    malarialDdpMin,
    useTbFilter,
    tbRFUMin,
    tbRFUMax,
  );

  return (
    <Leaderboard
      panes={[
        <TabPane tab="Active Molecules" key="active-molecules">
          <LeaderboardSmallMoleculePane
            taxNames={taxNames}
            activityCountData={activityCountData}
            setRankFilter={setBioactiveRankFilter}
            rankFilter={bioactiveRankFilter}
            activity={activity}
            setActivity={setActivity}
            setOnlyBacteria={setBioactiveOnlyBacteria}
            onlyBacteria={bioactiveOnlyBacteria}
            setMaxItems={setMaxItems}
            maxItems={maxItems}
          />
        </TabPane>,
        <TabPane tab="In-House Extracts" key="extracts">
          <LeaderboardExtractPane
            taxNames={[...extractData.keys()]}
            extractCounts={[...extractData.values()]}
            rankFilter={extractRankFilter}
            setRankFilter={setExtractRankFilter}
            useMalarialFilter={useMalarialFilter}
            setUseMalarialFilter={setUseMalarialFilter}
            malarialDdpMax={malarialDdpMax}
            malarialDdpMin={malarialDdpMin}
            setMalarialDdpMax={setMalarialDdpMax}
            setMalarialDdpMin={setMalarialDdpMin}
            useTbFilter={useTbFilter}
            setUseTbFilter={setUseTbFilter}
            tbRFUMin={tbRFUMin}
            setTbRFUMin={setTbRFUMin}
            tbRFUMax={tbRFUMax}
            setTbRFUMax={setTbRFUMax}
          />
        </TabPane>,
      ]}
    />
  );
}

export default memo(LeaderboardPage);
