import React from 'react';
import Publication from './Publication';

const Publications = () => {
  return (
    <>
      <div className="flex h-centre v-flex">
        <Publication
          id="IASS2021"
          type="Conference"
          year={2021}
          link={
            'https://www.ingentaconnect.com/contentone/iass/piass/2020/00002020/00000023/art00008'
          }
          title={
            'Generating developable and rigidly foldable origami surfaces with arbitrary Gaussian curvatures'
          }
          authors={'Madabhushi, S. C., Shenoy, K. S., Pratapa, P. P.'}
          journal={
            'Proceedings of the International Conference on Spatial Structures 2020/21 (IASS2020/21-Surrey7), UK.'
          }
        ></Publication>
        <Publication
          id="QIP2020"
          type="Journal"
          year={2020}
          link={
            'https://www.ingentaconnect.com/contentone/iass/piass/2020/00002020/00000023/art00008'
          }
          title={
            'Demonstration of a measurement-based adaptation protocol with quantum reinforcement learning on the IBM Q experience platform'
          }
          authors={
            'Kishore S. Shenoy, Dev Y. Sheth, Bikash K. Behera, Prasanta K. Panigrahi '
          }
          journal={'Quantum Inf Process 19, 161 (2020).'}
        ></Publication>
      </div>
    </>
  );
};

export default Publications;
