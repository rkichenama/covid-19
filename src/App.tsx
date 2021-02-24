import React from 'react';
import Plot from './components/Plot';
import './style.css';

import { useNytHistoryByState } from './hooks/diseases.sh';
// https://formidable.com/open-source/victory/guides/brush-and-zoom/
const Covid19: React.FC<any> = () => {
  const { data, loading, loaded, error } = useNytHistoryByState('new york');
  console.log({ loading, loaded, error })
  return (
    <main style={{ display: 'contents' }}>
      <Plot />
      {/* <pre>
        <code>
          {
            !loading && loaded
              ? ( JSON.stringify(data, null, 2) )
              : ( 'Loading...' )
          }
        </code>
      </pre> */}
    </main>
  );
};

export default Covid19;
