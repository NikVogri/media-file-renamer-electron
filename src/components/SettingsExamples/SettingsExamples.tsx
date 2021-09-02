import React from 'react';

import styles from './SettingsExamples.module.scss';

const SettingsExamples: React.FC = () => {
  return (
    <div className={styles.example}>
      <div>
        <h3>Valid mappings</h3>
        <p>&#123;title&#125; -&gt; Sherlock</p>
        <p>&#123;episodeTitle&#125; -&gt; The Blind Banker</p>
        <p>&#123;year&#125; -&gt; 2010</p>
        <p>&#123;episode&#125; -&gt; 2</p>
        <p>&#123;season&#125; -&gt; 1</p>
        <p>&#123;pSeason&#125; -&gt; 01</p>
        <p>&#123;pEpisode&#125; -&gt; 02</p>
      </div>
      <div>
        <h3>Example templates</h3>
        <p>
          C:/movies/&#123;title&#125;/&#123;title&#125; (&#123;year&#125;) -&gt;
          C:/movies/GoodFellas - (1990)
        </p>
        <p>
          C:/tv shows/&#123;title&#125;/season
          &#123;season&#125;/&#123;title&#125; -
          S&#123;season&#125;E&#123;episode&#125; - &#123;episodeTitle&#125;
          -&gt; C:/tv shows/Game Of Thrones/season 1/Game Of Thrones - S1E1 -
          Winter Is...
        </p>
      </div>
    </div>
  );
};

export default SettingsExamples;
