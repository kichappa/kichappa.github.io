import React, { useEffect } from 'react';
import summary_m3 from '../images/IASS2021/IASS M3.png';
import summary_m5 from '../images/IASS2021/IASS M5.png';
import summary_m6 from '../images/IASS2021/IASS M6.png';
import amp_birdseye from '../images/AMP Relax/AMP-birdseye.png';
import amp_designevolution from '../images/AMP Relax/AMP-DesignEvolution.png';
import amp_ff_oat_r from '../images/AMP Relax/AMP-FF_OAT_R.png';
import amp_ff_stairs_r from '../images/AMP Relax/AMP-FF_Stairs_R.png';
import amp_gf_r1 from '../images/AMP Relax/AMP-GF_R1.png';
import amp_gf_r2 from '../images/AMP Relax/AMP-GF_R2.png';
import amp_outside_r from '../images/AMP Relax/AMP-Outside_R.png';
import amp_plan1 from '../images/AMP Relax/AMP-Plan1.png';
import amp_plan2 from '../images/AMP Relax/AMP-Plan2.png';
import amp_plan3 from '../images/AMP Relax/AMP-Plan3.png';
import amp_section from '../images/AMP Relax/AMP-Section.png';
import draggy_point1 from '../images/Draggy/draggy-point1.png';
import draggy_point2 from '../images/Draggy/draggy-point2.png';
import tri_1 from '../images/Triangles/tri-1.svg';
import tri_2 from '../images/Triangles/tri-2.svg';
import tri_3 from '../images/Triangles/tri-3.svg';
import tri_4 from '../images/Triangles/tri-4.svg';
import tri_5 from '../images/Triangles/tri-5.svg';
import tri_6 from '../images/Triangles/tri-6.svg';
import tri_7 from '../images/Triangles/tri-7.svg';
import tri_8 from '../images/Triangles/tri-8.svg';
import tri_9 from '../images/Triangles/tri-9.svg';
import tri_10 from '../images/Triangles/tri-10.svg';
import Article from './Article';
import { makeAuthors, makeLink } from './Article';

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
          {
            type: 'big-picture',
            images: [
              [
                summary_m3,
                'Results of Origami algorithm that are compliant mechanisms',
              ],
              [
                summary_m5,
                'Results of Origami algorithm that are rigidly foldable',
              ],
              [
                summary_m6,
                'Results of Origami algorithm that allow minor deviations from design forms at yellow vertices.',
              ],
            ],
          }
          //   <img
          //     src={origami}
          //     className="big-picture"
          //     alt="Results of Origami algorithm that we presented in the IASS International Conference on Spatial Structures 2020/21."
          //   />
        }
        heading={'Computational Origami Design'}
        tagline={
          'Quad-Origami "Miura-like" Tesselations that Rigidly Fold into Arbitrary Design Forms'
        }
        authors={[
          ['Kishore Shenoy'],
          [
            'Sree Chandana Madabhushi',
            'https://themadchan.github.io/Portfolio/',
          ],
          ['Dr. Phanisri Pradeep Pratapa', 'https://www.pppratapa.com/'],
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
      <Article
        id={'amp-relax'}
        type={'2c'}
        portrait={portrait}
        options={{ ltr: false }}
        img={
          {
            type: 'big-picture',
            images: [
              [amp_plan1, 'Plan of ground floor'],
              [amp_section, 'Sectional view of AMP'],
              [amp_birdseye, "A Bird's Eye view of AMP (blue)"],
              [amp_outside_r, 'View of AMP from its main entrance'],
              [amp_ff_oat_r, 'Open Air Theatre in the core'],
              //   [amp_designevolution, 'Evolution of design idea'],
              //   [amp_plan2, 'Plan of first floor'],
              //   [amp_plan3, 'Plan of second floor'],
              //   [amp_ff_stairs_r, 'Stairs connecting first and second floor'],
              [amp_gf_r1, 'Groind floor, view 1'],
              //   [amp_gf_r2, 'Ground floor, view 2'],
            ],
          }
          //   <img
          //     src={origami}
          //     className="big-picture"
          //     alt="Results of Origami algorithm that we presented in the IASS International Conference on Spatial Structures 2020/21."
          //   />
        }
        heading={'AMP Relax!'}
        tagline={'Architectural Design of a Student Activity Centre'}
        text={
          <>
            <p>
              The AMP is a building that I designed for my Architectural Design
              Studio course. It is a blob exterior, box-in-a-box architectural
              design that is covered with glass and aluminium cladding in a
              parametric form, revealing certain parts of the inside to the
              exterior.
            </p>
            <p>
              The building is designed to stand out from the orthogonal
              buildings of academic usage that are situated around it. The
              building houses an amphitheatre at its centre that is open to the
              exterior on its top. As the campus has not similar open-air stage
              on its grounds, this will serve as a place for students to gather
              and socialise. The amphitheatre is visible from all floors as it
              is covered with glass curtain walls. In spirit, it unites all
              programs of the building.
            </p>
            <p>
              AMP is organised so that the program becomes less socially
              interactive as you move upward. This is so students can quickly
              come into the building for breaks and have coffee at the cafe on
              the ground floor.
            </p>
            <p>
              The ground floor features a bowling alley and an indoor skate
              park. This floor has a direct entrance into the amphitheatre. It
              also houses books on its wall shelves that students can read while
              sitting on the right side of the giant stairs that lead to the
              first floor, designed as seats.
            </p>
            <p>
              The first floor is designed for a high-end restaurant with
              seating. The restaurant opens to the amphitheatre's table-chair
              seats at the top for a more comfortable setting. The interior
              design incorporates self-service counters that are all accessible
              from the kitchen. The kitchen also has access to the building's
              service elevator that exits the building through the building on
              the ground floor.
            </p>
            <p>
              The second floor is a supermarket with a large open area for
              display racks. This floor has a closed service area for management
              that is also served by the service elevator. This floor has no
              access to the amphitheatre despite being visible from here.
            </p>
            <p>
              {makeLink(
                'More details   (PDF)',
                'https://kichappa.github.io/fileShare/Final%20Presentation%20small.pdf',
                [],
                'Open PDF'
              )}
              <br />
              <br />
              {makeLink(
                'Wanna see a live render of AMP?',
                'https://api2.enscape3d.com/v1/view/7e245c5c-875a-48e6-9e03-7bbc70ac8995',
                [],
                'Open website'
              )}
            </p>
          </>
        }
      ></Article>
      <Article
        id={'draggy'}
        type={'2c'}
        portrait={portrait}
        options={{ ltr: true }}
        img={
          {
            type: 'big-picture',
            images: [
              [draggy_point1, 'Point peak halo'],
              [draggy_point2, 'Green crescent'],
              //   [amp_gf_r2, 'Ground floor, view 2'],
            ],
          }
          //   <img
          //     src={origami}
          //     className="big-picture"
          //     alt="Results of Origami algorithm that we presented in the IASS International Conference on Spatial Structures 2020/21."
          //   />
        }
        heading={'Draggy!'}
        tagline={'Freeform Gradients'}
        text={
          <>
            <p>
              Draggy is a first-of-its-kind freeform gradient generator. It is a
              design tool that allows designers to create spatial gradients
              using colour points in a two-dimensional space.
            </p>
            <p>
              Draggy is built on the ReactJS framework and uses the GPU through
              WebGL for colour processing. Unlike other websites and tools that
              do something similar, the in-house created renderer doesn't use
              meshing or interpolations and allows the creation of gradients
              with even less than four points. Colours are calculated using a
              Laurent polynomial that uses the distances and weights of each
              colour point. These distances are then used to get a weighted
              colour value through a mix of RGB and HSL. I found that using just
              either was not beautiful as either saturation or fringing occurs.
            </p>
            <p>
              I plan on adding some more functionality to Draggy to make it
              useful as a design tool. These include changing algorithms used in
              the colour generation, forming a framework that allows the
              lossless saving of gradient and adding a curve-colour controller
              in addition to points. I have to think a lot about this to make
              the UX perfect before adding functionality.
            </p>
            <p>
              {makeLink(
                'Let me make some!',
                'https://draggy.ramdon.team/?points=W3sicmFkaXVzIjowLCJjb2xvdXIiOnsiaHNsIjp7ImgiOjE5OS4xMzA0MzQ3ODI2MDg3LCJzIjowLjY4MDY3MjI2ODkwNzU2MzIsImwiOjAuMTI2OTEzNDk5OTk5OTk5OTgsImEiOjF9LCJoZXgiOiIjMGEyODM2IiwicmdiIjp7InIiOjEwLCJnIjo0MCwiYiI6NTQsImEiOjF9LCJoc3YiOnsiaCI6MTk5LjEzMDQzNDc4MjYwODcsInMiOjAuODEsInYiOjAuMjEzMywiYSI6MX0sIm9sZEh1ZSI6MTk5LjEzMDQzNDc4MjYwODcsInNvdXJjZSI6ImhzdiJ9LCJzaG93UGlja2VyIjpmYWxzZSwiY3VycmVudFhZIjp7IngiOjgxNCwieSI6NzI5fSwic2l6ZSI6WzI2LDI2XSwiY29udGFpbmVyU2l6ZSI6WzM2LDM2XX0seyJyZWYiOm51bGwsInJhZGl1cyI6MCwiY29sb3VyIjp7ImhzbCI6eyJoIjo2MCwicyI6MCwibCI6MSwiYSI6MX0sImhleCI6IiNmZmZmZmYiLCJyZ2IiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYSI6MX0sImhzdiI6eyJoIjo2MCwicyI6MCwidiI6MSwiYSI6MX0sIm9sZEh1ZSI6NjAsInNvdXJjZSI6ImhzdiJ9LCJzaG93UGlja2VyIjpmYWxzZSwicG9pbnRlck9mZnNldCI6eyJ4IjowLCJ5IjowfSwiY3VycmVudFhZIjp7IngiOjIxODgsInkiOjk5Mn0sInNpemUiOlsyNiwyNl0sImNvbnRhaW5lclNpemUiOlszNiwzNl19LHsicmVmIjpudWxsLCJyYWRpdXMiOjQuMDY4ODgzNzA3NDk3MjY3NSwiY29sb3VyIjp7InJnYiI6eyJyIjoxMjEuMDU4NjM1MzM2MTE1NDMsImciOjgwLjk1MjYzNzMwNTkzNjE2LCJiIjoxOTUuNDE4NjE3MjQzODgwMSwiYSI6MX0sImhzdiI6eyJoIjoyNjEuMDIyNDg5Njc4NzI2NjMsInMiOjAuNTg1NzQ3NTY4NzQ0MTM3NSwidiI6MC43NjYzNDc1MTg2MDM0NTE0LCJhIjoxfSwiaHNsIjp7ImgiOjI2MS4wMjI0ODk2Nzg3MjY2MywicyI6MC40ODk5NDgxODU2MDI2NjMxLCJsIjowLjU0MTkwNDQyMDY4NTkxNDMsImEiOjF9LCJoZXgiOiIjNzk1MGMzIn0sInNob3dQaWNrZXIiOmZhbHNlLCJwb2ludGVyT2Zmc2V0Ijp7IngiOjAsInkiOjB9LCJjdXJyZW50WFkiOnsieCI6NzI1LCJ5Ijo3MTJ9LCJzaXplIjpbMjYsMjZdLCJjb250YWluZXJTaXplIjpbMzYsMzZdfSx7InJlZiI6bnVsbCwicmFkaXVzIjozLjY1MzA5NzU2Mzc4ODgwNSwiY29sb3VyIjp7InJnYiI6eyJyIjozMy4wNDUxMjk5ODUxOTA2NSwiZyI6MjI0LjU0NzAzNDkzOTEwMjY3LCJiIjoyNTIuNDAwNzMzOTM1Mjc4MjUsImEiOjF9LCJoc3YiOnsiaCI6MTg3LjYxODc3OTMyMzA1MjA4LCJzIjowLjg2OTA3NjcyNzgyODkxMjcsInYiOjAuOTg5ODA2Nzk5NzQ2MTg5MiwiYSI6MX0sImhzbCI6eyJoIjoxODcuNjE4Nzc5MzIzMDUyMDgsInMiOjAuOTc2ODQ5NTM3Mzk3OTU2LCJsIjowLjU1OTY5Nzc3MjM5MzA3NjMsImEiOjF9LCJoZXgiOiIjMjFlMGZjIn0sInNob3dQaWNrZXIiOmZhbHNlLCJwb2ludGVyT2Zmc2V0Ijp7IngiOjAsInkiOjB9LCJjdXJyZW50WFkiOnsieCI6MTI2MSwieSI6Mzk4fSwic2l6ZSI6WzI2LDI2XSwiY29udGFpbmVyU2l6ZSI6WzM2LDM2XX1d',
                [],
                'Open Draggy'
              )}
              ,{' '}
              {makeLink(
                'Where is the second picture?',
                'https://draggy.ramdon.team/?points=W3sicmFkaXVzIjowLCJjb2xvdXIiOnsiaHNsIjp7ImgiOjE5OS4xMzA0MzQ3ODI2MDg3LCJzIjowLjY4MDY3MjI2ODkwNzU2MzIsImwiOjAuMTI2OTEzNDk5OTk5OTk5OTgsImEiOjF9LCJoZXgiOiIjMGEyODM2IiwicmdiIjp7InIiOjEwLCJnIjo0MCwiYiI6NTQsImEiOjF9LCJoc3YiOnsiaCI6MTk5LjEzMDQzNDc4MjYwODcsInMiOjAuODEsInYiOjAuMjEzMywiYSI6MX0sIm9sZEh1ZSI6MTk5LjEzMDQzNDc4MjYwODcsInNvdXJjZSI6ImhzdiJ9LCJzaG93UGlja2VyIjpmYWxzZSwiY3VycmVudFhZIjp7IngiOjgxNCwieSI6NzI5fSwic2l6ZSI6WzI2LDI2XSwiY29udGFpbmVyU2l6ZSI6WzM2LDM2XX0seyJyZWYiOm51bGwsInJhZGl1cyI6MCwiY29sb3VyIjp7ImhzbCI6eyJoIjo2MCwicyI6MCwibCI6MSwiYSI6MX0sImhleCI6IiNmZmZmZmYiLCJyZ2IiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYSI6MX0sImhzdiI6eyJoIjo2MCwicyI6MCwidiI6MSwiYSI6MX0sIm9sZEh1ZSI6NjAsInNvdXJjZSI6ImhzdiJ9LCJzaG93UGlja2VyIjpmYWxzZSwicG9pbnRlck9mZnNldCI6eyJ4IjowLCJ5IjowfSwiY3VycmVudFhZIjp7IngiOjIxODgsInkiOjk5Mn0sInNpemUiOlsyNiwyNl0sImNvbnRhaW5lclNpemUiOlszNiwzNl19LHsicmVmIjpudWxsLCJyYWRpdXMiOjQuMDY4ODgzNzA3NDk3MjY3NSwiY29sb3VyIjp7InJnYiI6eyJyIjoxMjEuMDU4NjM1MzM2MTE1NDMsImciOjgwLjk1MjYzNzMwNTkzNjE2LCJiIjoxOTUuNDE4NjE3MjQzODgwMSwiYSI6MX0sImhzdiI6eyJoIjoyNjEuMDIyNDg5Njc4NzI2NjMsInMiOjAuNTg1NzQ3NTY4NzQ0MTM3NSwidiI6MC43NjYzNDc1MTg2MDM0NTE0LCJhIjoxfSwiaHNsIjp7ImgiOjI2MS4wMjI0ODk2Nzg3MjY2MywicyI6MC40ODk5NDgxODU2MDI2NjMxLCJsIjowLjU0MTkwNDQyMDY4NTkxNDMsImEiOjF9LCJoZXgiOiIjNzk1MGMzIn0sInNob3dQaWNrZXIiOmZhbHNlLCJwb2ludGVyT2Zmc2V0Ijp7IngiOjAsInkiOjB9LCJjdXJyZW50WFkiOnsieCI6NzI1LCJ5Ijo3MTJ9LCJzaXplIjpbMjYsMjZdLCJjb250YWluZXJTaXplIjpbMzYsMzZdfSx7InJlZiI6bnVsbCwicmFkaXVzIjozLjY1MzA5NzU2Mzc4ODgwNSwiY29sb3VyIjp7InJnYiI6eyJyIjozMy4wNDUxMjk5ODUxOTA2NSwiZyI6MjI0LjU0NzAzNDkzOTEwMjY3LCJiIjoyNTIuNDAwNzMzOTM1Mjc4MjUsImEiOjF9LCJoc3YiOnsiaCI6MTg3LjYxODc3OTMyMzA1MjA4LCJzIjowLjg2OTA3NjcyNzgyODkxMjcsInYiOjAuOTg5ODA2Nzk5NzQ2MTg5MiwiYSI6MX0sImhzbCI6eyJoIjoxODcuNjE4Nzc5MzIzMDUyMDgsInMiOjAuOTc2ODQ5NTM3Mzk3OTU2LCJsIjowLjU1OTY5Nzc3MjM5MzA3NjMsImEiOjF9LCJoZXgiOiIjMjFlMGZjIn0sInNob3dQaWNrZXIiOmZhbHNlLCJwb2ludGVyT2Zmc2V0Ijp7IngiOjAsInkiOjB9LCJjdXJyZW50WFkiOnsieCI6MTI2MSwieSI6Mzk4fSwic2l6ZSI6WzI2LDI2XSwiY29udGFpbmVyU2l6ZSI6WzM2LDM2XX1d',
                [],
                'Open in Draggy'
              )}
            </p>
          </>
        }
      ></Article>
      <Article
        id={'triangles'}
        type={'2c'}
        portrait={portrait}
        options={{ ltr: false }}
        img={
          {
            type: 'big-picture',
            images: [
              // [tri_1, 'Triangles and Colours'],
              // [tri_2, 'Triangles and Colours'],
              // [tri_3, 'Triangles and Colours'],
              [tri_10, 'Triangles and Colours'],
              [tri_6, 'Triangles and Colours'],
              // [tri_9, 'Triangles and Colours'],
              [tri_4, 'Triangles and Colours'],
              // [tri_5, 'Triangles and Colours'],
              [tri_8, 'Triangles and Colours'],
              // [tri_7, 'Triangles and Colours'],
            ],
          }
          //   <img
          //     src={origami}
          //     className="big-picture"
          //     alt="Results of Origami algorithm that we presented in the IASS International Conference on Spatial Structures 2020/21."
          //   />
        }
        heading={'Triangles!'}
        tagline={'Delanauy Colours'}
        text={
          <>
            <p>
              Triangles is a unique coding project that creates stunning
              gradient effects by applying Delaunay triangulation to a
              rectangle. The system starts by randomly selecting a few key
              points in the rectangle and assigning them vibrant colors. Then,
              using the Delaunay algorithm, the rectangle is triangulated into a
              beautiful mesh of triangles. The colors of these triangles are
              calculated using bivariate spline interpolation, resulting in a
              mesmerizing gradient effect that covers the entire rectangle.
            </p>
            <p>
              To add even more visual interest to the final image, Triangles
              uses dominant and recessive color points. The dominant points have
              a larger radius of influence, causing the surrounding area to take
              on their color. This creates bold, prominent spots in the gradient
              that add depth and texture to the final image. Triangles's clever
              use of Delaunay triangulation and bivariate spline interpolation
              makes for an efficient and aesthetically pleasing way to generate
              gradient effects.
            </p>
            <p>
              In a future development of the project, called Draggy,
              interpolation is replaced with Laurent polynomials, making the
              computation even faster and more efficient. Triangles and Draggy
              are both innovative projects that showcase the creative
              possibilities of mathematical concepts in coding. Whether you're a
              seasoned coder or just starting out, these projects are sure to
              inspire and delight.
            </p>
            <p>
              {makeLink(
                'Show me!',
                'https://triangles.ramdon.team/',
                [],
                'Open Triangles'
              )}
            </p>
          </>
        }
      ></Article>
      {/* <Article
        id={'computation-origami-IASS2'}
        type={'2c'}
        portrait={portrait}
        options={{ ltr: true }}
        img={
          {
            type: 'big-picture',
            images: [
              [
                summary_m3,
                'Results of Origami algorithm that are compliant mechanisms',
              ],
              [
                summary_m5,
                'Results of Origami algorithm that are rigidly foldable',
              ],
              [
                summary_m6,
                'Results of Origami algorithm that allow minor deviations from design forms at yellow vertices.',
              ],
            ],
          }
          //   <img
          //     src={origami}
          //     className="big-picture"
          //     alt="Results of Origami algorithm that we presented in the IASS International Conference on Spatial Structures 2020/21."
          //   />
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
      <Article
        id={'computation-origami-IASS3'}
        type={'2c'}
        portrait={portrait}
        options={{ ltr: true }}
        img={
          {
            type: 'big-picture',
            images: [
              [
                summary_m3,
                'Results of Origami algorithm that are compliant mechanisms',
              ],
              [
                summary_m5,
                'Results of Origami algorithm that are rigidly foldable',
              ],
              [
                summary_m6,
                'Results of Origami algorithm that allow minor deviations from design forms at yellow vertices.',
              ],
            ],
          }
          //   <img
          //     src={origami}
          //     className="big-picture"
          //     alt="Results of Origami algorithm that we presented in the IASS International Conference on Spatial Structures 2020/21."
          //   />
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
      ></Article> */}
    </>
  );
};

export default Projects;
