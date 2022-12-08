import React, { useEffect } from 'react';
import origami from '../images/IASS-Origami.png';
import Article from './Article';

const Projects = ({ mobile, portrait, pathName }) => {
  //   console.log([pathName, (pathName.match(/#/g) || []).length]);
  //   useEffect(() => {}, []);

  return (
    <>
      {/* <Article
        type={'2c'}
        portrait={portrait}
        img={
          <img
            src={origami}
            className="big-picture"
            alt="Results of Origami algorithm that we presented in the IASS International Conference on Spatial Structures 2020/21."
          />
        }
        text={
          <>
            <h2 className="centre">Computational Origami Design</h2>
            <p className="italics tagline">
              Quad-Origami "Miura-like" Tesselations that Rigidly Fold into
              Arbitrary Design Forms.
            </p>
            <p className="authors">
              by
              <br />
              Kishore Shenoy,{' '}
              <a
                href="https://themadchan.github.io/Portfolio/"
                className="tooltip-text"
                target="_blank"
              >
                Sree Chandana Madabhushi
                <span className="tooltip">Go to website</span>
              </a>
              ,{' '}
              <a
                href="https://www.pppratapa.com/"
                className="tooltip-text"
                target="_blank"
              >
                Phanisri Pradeep Pratapa
                <span className="tooltip">Go to website</span>
              </a>
            </p>
            <p>
              Origami-based deployable surfaces that are developable as well as
              rigidly foldable are of interest in various architectural and
              engineering applications. Such structures have been researched in
              recent years using inverse design techniques based on optimization
              by formulating an under-constrained equation system that governs
              the design solution. This work presents an alternative framework
              that involves directly solving an over-constrained system of
              equations that dictate the design of generalized Miura-ori
              surfaces that conform to target surfaces of zero, positive, and
              negative Gaussian curvatures. The constraint equations involve
              imposing the developability of vertices, planarity of origami
              panels, and local flat-foldability of vertices. This project
              discusses the accuracy of design solutions both with and without
              the imposition of flat-foldability, as it is critical for strain
              free deformation of the origami system. The results highlight the
              feasibility of obtaining practically usable target origami
              surfaces that are developable and rigidly foldable, using a
              least-squares-based solution of heavily over-constrained system of
              equations.
            </p>
            <p>
              Origami structures fold in a continuous and smooth motion between
              configurations. Since Miura cells have a single degree of freedom,
              any tessellations of it can controlled with just one actuator.
              These are, hence, structures with tunable curvatures. The use of
              this, as unconventional as it might appear, is significant. It may
              be a modifiable army training landscape with controllable slopes
              and valleys or a seabed for a wave simulation laboratory. It may
              also be used for bettering the acoustics of a concert hall.
            </p>
            <p>
              This work was presented at the IASS Spatial Structures
              International Conference.
            </p>
            <p className="citation">
              <a
                href="https://www.ingentaconnect.com/contentone/iass/piass/2020/00002020/00000023/art00008"
                target="_blank"
                className="title tooltip-text"
              >
                Generating developable and rigidly foldable origami surfaces
                with arbitrary Gaussian curvatures.
                <span className="tooltip">Go to website</span>
              </a>
              <br />
              <span className="authors">
                Madabhushi, S. C., Shenoy, K. S., Pratapa, P. P.
              </span>
              <br />
              Proceedings of the International Conference on Spatial Structures
              2020/21 (IASS2020/21-Surrey7), UK.
            </p>
          </>
        }
        options={{ ltr: false }}
      ></Article> */}
      <Article
        id={'computation-origami-IASS'}
        type={'2c'}
        portrait={portrait}
        options={{ ltr: true }}
        img={
          <img
            src={origami}
            className="big-picture"
            alt="Results of Origami algorithm that we presented in the IASS International Conference on Spatial Structures 2020/21."
          />
        }
        heading={'Computational Origami Design'}
        tagline={
          'Quad-Origami "Miura-like" Tesselations that Rigidly Fold into Arbitrary Design Forms.'
        }
        authors={[
          ['Kishore Shenoy'],
          [
            'Sree Chandana Madabhushi',
            'https://themadchan.github.io/Portfolio/',
          ],
          ['Phanisri Pradeep Pratapa', 'https://www.pppratapa.com/'],
        ]}
        text={
          <>
            <p>
              Origami-based deployable surfaces that are developable as well as
              rigidly foldable are of interest in various architectural and
              engineering applications. Such structures have been researched in
              recent years using inverse design techniques based on optimization
              by formulating an under-constrained equation system that governs
              the design solution. This work presents an alternative framework
              that involves directly solving an over-constrained system of
              equations that dictate the design of generalized Miura-ori
              surfaces that conform to target surfaces of zero, positive, and
              negative Gaussian curvatures. The constraint equations involve
              imposing the developability of vertices, planarity of origami
              panels, and local flat-foldability of vertices. This project
              discusses the accuracy of design solutions both with and without
              the imposition of flat-foldability, as it is critical for strain
              free deformation of the origami system. The results highlight the
              feasibility of obtaining practically usable target origami
              surfaces that are developable and rigidly foldable, using a
              least-squares-based solution of heavily over-constrained system of
              equations.
            </p>
            <p>
              Origami structures fold in a continuous and smooth motion between
              configurations. Since Miura cells have a single degree of freedom,
              any tessellations of it can controlled with just one actuator.
              These are, hence, structures with tunable curvatures. The use of
              this, as unconventional as it might appear, is significant. It may
              be a modifiable army training landscape with controllable slopes
              and valleys or a seabed for a wave simulation laboratory. It may
              also be used for bettering the acoustics of a concert hall.
            </p>
            <p>
              This work was presented at the IASS Spatial Structures
              International Conference.
            </p>
          </>
        }
        citation={{
          link:
            'https://www.ingentaconnect.com/contentone/iass/piass/2020/00002020/00000023/art00008',
          title:
            'Generating developable and rigidly foldable origami surfaces with arbitrary Gaussian curvatures.',
          authors: 'Madabhushi, S. C., Shenoy, K. S., Pratapa, P. P.',
          journal:
            'Proceedings of the International Conference on Spatial Structures 2020/21 (IASS2020/21-Surrey7), UK.',
        }}
      ></Article>
    </>
  );
};

export default Projects;
