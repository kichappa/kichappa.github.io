import React, { useEffect, useState } from 'react';
import aebt from '../images/Spying Simulator/agents-enemies-bushes-topo-uc.png';
import aebt173 from '../images/Spying Simulator/agents-enemies-bushes-topo-173-uc.png';
import ebt from '../images/Spying Simulator/enemies-bushes-topo.png';
import slopes_vectorflow from '../images/Spying Simulator/slopes.png';
import topo_contour from '../images/Spying Simulator/topo-contour.png';
import bt from '../images/Spying Simulator/bushes-topo.png';
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
import CS_1 from '../images/Spatial Modelling of Urban Growth/CS-1.png';
import CS_2 from '../images/Spatial Modelling of Urban Growth/CS-2.png';
import CS_3 from '../images/Spatial Modelling of Urban Growth/CS-3.gif';
import GE_Glasses from '../images/GlassEye/GE-Glasses.png';
import GE_Braille from '../images/GlassEye/GE-Braille.png';
import Article from './Article';
import { makeAuthors, makeLink } from './Article';
import { documentOnClick } from './Artworks';
import shortid from 'shortid';
import { MathJax } from 'better-react-mathjax';
import { ReactComponent as CrossIcon } from '../images/Cross.svg';

const Projects = ({ mobile, portrait, pathName }) => {
  //   console.log([pathName, (pathName.match(/#/g) || []).length]);
  //   useEffect(() => {}, []);

  // This variable keeps track whether an image is clicked.
  const [isClicked, setIsClicked] = useState(false);
  const [filterByTags, setFilterByTags] = useState([]);

  let projects = [
    <Article
      key={shortid.generate().substring(0, 6)}
      id={'spy-sim'}
      type={'2c'}
      portrait={portrait}
      options={{ ltr: false }}
      tags={[
        'computation',
        'simulation',
        'math',
        'modeling',
        'code',
        'spatial-modeling',
        'gpu',
        'cuda',
      ]}
      img={{
        type: 'big-picture',
        images: [
          [bt, 'Generated Topographical Environment with Bushes (green)'],
          [aebt, 'Environment with Agents (black) and Enemies (white)'],
          [aebt173, 'Scenario at time = 173 steps'],
          [ebt, 'Topographical Environment with Bushes and Enemies'],
          [slopes_vectorflow, 'Vector Flow of Slopes at Each Point'],
          [topo_contour, 'Contour Plot of Topography'],
        ],
      }}
      authors={[
        ['Kishore Shenoy'],
        [
          'Atharva Bhalerao',
          'https://www.linkedin.com/in/atharva-mangesh-bhalerao-103a701a9/',
        ],
        ['Michele Orlandi', 'https://www.linkedin.com/in/michele-orlandi/'],
        ['Lukas  Ott', 'https://www.linkedin.com/in/lukas-ott-zh/'],
        [
          'Chaitra Sathe',
          'https://www.linkedin.com/in/chaitra-sathe-a3b355280/',
        ],
      ]}
      heading={'Spying Simulator'}
      tagline={'Combat Stealth Search'}
      text={
        <>
          <p>
            Delve into the intricate strategies of spies and enemies navigating
            the virtual landscape of the "Spying Simulator." The core of this
            project lies in developing a small combat-spying simulator driven by
            an agent-based probabilistic model. Tasked with uncovering hidden
            enemies in a topographical environment, a series of agents embark on
            a meticulously crafted recognizance military mission. The simulation
            is implemented using Python and Julia, seamlessly integrating
            mathematical intricacies and fulfilling visualization requirements.
          </p>
          <p>
            The code initiates with a point-based landscape generated using the
            function described in Draggy and randomly placed bushes on top to
            simulate a natural terrain. Precision in slope determination is
            achieved through a finite-difference approach with a radius-2
            neighborhood approach. What's the math behind this, you ask?
            Combine:
            <MathJax className="math">
              {
                "$$C(h)=\\frac{f(x+h)-f(x-h)}{2 h} = f'(x)+\\frac{1}{6} h^2 f^{(3)}(x)+O\\left(h^4\\right)$$"
              }
            </MathJax>
            with:
            <MathJax className="math">
              {
                "$$D(h)=\\frac{f(x+2h)-f(x-2 h)}{4 h}=f'(x)+\\frac{2}{3} h^2 f^{(3)}(x)+O\\left(h^4\\right)$$"
              }
            </MathJax>
            like so:
            <MathJax className="math">
              {
                "$$\\frac{1}{3} \\displaystyle\\left[4\\cdot C(h)-D(h)\\right]=f'(x)-\\frac{1}{30} h^4 f^{(5)}(x)+O\\left(h^5\\right),$$"
              }
            </MathJax>
            and you get a slope that is accurate to the fourth order. The usage
            of GPU for the creation of the environment is a key feature of this
            project. CUDA is used to create a 3D environment with a high level
            of detail, and to render the environment in real time. This allows
            for a more immersive experience, and helps to create a more
            realistic and engaging simulation.
          </p>
          <p>
            Let's begin with enemies: Enemies navigate with a blend of simulated
            annealing and randomized algorithms. Their objective: ascend
            strategically to gain altitude since it is a gain in tactical
            advantage. A team-centric algorithm ensures that two enemy allies do
            not approach each other since this increases the risk of being found
            by agents. Essentially, the enemies perform a global maximization in
            the topography "domain."
          </p>
          <p>
            Meanwhile, a dual strategy unfolds based on enemy visibility on the
            agent's front. Without enemies in view, agents engage in a random
            walk, meandering through the landscape devoid of immediate threats.
            However, a tactical ballet takes center stage when enemies appear
            within the view distance. Agents position themselves within bushes
            to avoid being seen and execute a hopping strategy. They hop to
            gauge the enemy's size and proximity in sight.
          </p>
          <p>
            Crucially, the project employs a nuanced probabilistic approach to
            discovery, injecting a dose of realism into the simulations. The
            incorporation of detailed topological features elevates the
            complexity of the virtual battlefield. Experimental results
            illuminate not just the speed but also the efficiency of the search
            models, particularly in navigating complex environments. Beyond its
            military application, the project holds promise for
            search-and-rescue missions, where the swift and effective discovery
            of unknown targets takes precedence.
          </p>
          <p>
            My contribution to this project was the development of the
            environment, the slope determination algorithm, enemy navigation
            algorithm, and the implementation of the GPU. I also helped with
            integration of python-based agent code with the Julia-based
            environment.
          </p>
          <p>
            {makeLink(
              "Where's the code?",
              'https://github.com/kichappa/spy-sim',
              [],
              'Open in GitHub'
            )}
          </p>
        </>
      }
    ></Article>,
    <Article
      key={shortid.generate().substring(0, 6)}
      id={'computation-origami-IASS'}
      type={'2c'}
      portrait={portrait}
      options={{ ltr: true }}
      tags={['computation', 'math', 'origami', 'art', 'architecture', 'code']}
      img={{
        type: 'big-picture',
        images: [
          [
            summary_m3,
            'Results of Origami algorithm that are compliant mechanisms.',
          ],
          [
            summary_m5,
            'Results of Origami algorithm that are rigidly foldable.',
          ],
          [
            summary_m6,
            'Results of Origami algorithm that allow minor deviations from design forms at yellow vertices.',
          ],
        ],
      }}
      heading={'Computational Origami Design'}
      tagline={
        'Quad-Origami "Miura-like" Tesselations that Rigidly Fold into Arbitrary Design Forms'
      }
      authors={[
        ['Kishore Shenoy'],
        ['Sree Chandana Madabhushi', 'https://www.linkedin.com/in/themadchan/'],
        ['Dr. Phanisri Pradeep Pratapa', 'https://www.pppratapa.com/'],
      ]}
      text={
        <>
          <p>
            This project involves the development of a computational model for
            creating Miura-like origami tessellations that can be folded into
            arbitrary design surfaces. We use a modified version of the
            Levenberg-Marquardt algorithm to iteratively solve for the
            developability, flat-foldability, and planarity of the origami
            surfaces, which allows me to generate designs that are both
            aesthetically pleasing and functional.
          </p>
          <p>
            One of the key advantages of using Miura patterns is that they have
            a single degree of freedom, and any tessellations of them can be
            controlled with just one actuator. This allows for structures to be
            continuously and smoothly changed between different configurations,
            making them incredibly versatile and having a wide range of
            potential applications. For example, they could be used to create
            deployable structures for architectural and engineering
            applications, or to design reconfigurable structures for use in
            space exploration. They could even be used as modifiable army
            training landscapes with controllable slopes and valleys.
          </p>
          <p>
            One of the key challenges faced during the development of the model
            was dealing with the over-determined nature of the system of
            equations that govern the design of these surfaces. In order to make
            the system more tractable, "soft constraints" were introduced on the
            coordinates of the vertices, which ensured the solution remained
            Miura-like in both design and function while still allowing for a
            wide range of different designs to be produced.
          </p>
          <p>
            Overall, the project has been a success, with the proposed model
            being able to generate a variety of different Gaussian curvatures
            that are rigidly foldable. The work represents a novel approach to
            the design of these structures, and has potential applications in a
            variety of fields including architecture and engineering.
          </p>
          {/* MathJax Example:
            <p>
              <MathJax className='math'>
                {'$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$'}
              </MathJax>
            </p> */}
          <p>
            This work was presented at the IASS Spatial Structures International
            Conference.{' '}
            {makeLink(
              'Watch it',
              'https://www.youtube.com/watch?v=StFY0VKCdhs',
              [],
              'Open video link'
            )}
            .
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
    ></Article>,
    <Article
      key={shortid.generate().substring(0, 6)}
      id={'amp-relax'}
      type={'2c'}
      portrait={portrait}
      options={{ ltr: false }}
      tags={['art', 'architecture', 'design']}
      img={{
        type: 'big-picture',
        images: [
          [amp_plan1, 'Plan of ground floor of AMP.'],
          [amp_section, 'Sectional view of AMP.'],
          [amp_birdseye, "A Bird's Eye view of AMP (blue)."],
          [amp_outside_r, 'View of AMP from its main entrance.'],
          [amp_ff_oat_r, 'Rendering of Amphitheatre at the core.'],
          [amp_gf_r1, 'Rendering of ground floor.'],
        ],
      }}
      heading={'AMP Relax!'}
      tagline={'Architectural Design of a Student Activity Centre'}
      text={
        <>
          <p>
            The AMP, or Amphitheatre, is a building I designed for a studio
            course in architectural design. The building is characterized by its
            blob-like exterior, which is covered in glass and aluminium cladding
            in a parametric form and its box-in-a-box grammar. This creates a
            unique and striking visual appearance, and reveals certain parts of
            the interior to the exterior.
          </p>
          <p>
            One of the key motivations behind the design of the AMP was to
            create a building that stood out from the orthogonal buildings that
            are typically found on academic campuses. By using a non-orthogonal
            form and incorporating elements like the parametric cladding, the
            building is able to break free from the constraints of traditional
            architectural design and create a more dynamic and engaging visual
            experience.
          </p>
          <p>
            Another important design motivation for the AMP was the inclusion of
            an open-air amphitheatre at its core. This provides a central
            gathering space for students, and allows for social and cultural
            events to take place within the building. The amphitheatre is open
            to the exterior at the top, and is visible from all floors thanks to
            the use of glass curtain walls. This creates a strong visual and
            functional connection between the different levels of the building,
            and reinforces the idea of the amphitheatre as a unifying element.
          </p>
          <p>
            In terms of the organization of the programs within the AMP, the
            building is designed to be more socially interactive at the lower
            levels, and less so at the higher levels. This is intended to create
            a natural flow and hierarchy within the building, and to encourage
            students to use the building as a place to gather and socialize. The
            ground floor features a bowling alley and skate park, as well as
            outdoor seating, while the first floor is home to a high-end
            restaurant with seating that opens to the amphitheatre. The second
            floor is a supermarket with a large open area for display racks.
          </p>
          <p>
            The inclusion of outdoor seating on the ground floor is a way to
            make the building more accessible and inviting to students. It
            provides an inviting space for students to relax and socialize
            outside, while still being close to the other programs and amenities
            within the building. The book shelves along the giant stairs that
            lead to the first floor and the stairs themselves are designed to be
            used as seating, and help to create an open and spacious working
            area within the building.
          </p>
          <p>
            The AMP also incorporates a range of other design elements that
            enhance its functionality and construction. For example, the
            placement of the toilets is designed to ensure that the MEP elements
            are in the same vertical, which simplifies construction and reduces
            the potential for failure. The back of the building features a
            backstage area, and the seating of the amphitheatre is supported by
            a foundation that is located below the seating. The service elevator
            opens to the back of the building and serves the restaurant kitchen
            and the supermarket.
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
    ></Article>,
    <Article
      key={shortid.generate().substring(0, 6)}
      id={'draggy'}
      type={'2c'}
      portrait={portrait}
      options={{ ltr: true }}
      tags={['computation', 'math', 'graphics', 'art', 'design', 'web', 'code']}
      img={{
        type: 'big-picture',
        images: [
          [draggy_point1, 'Point Peak Halo'],
          [draggy_point2, 'A Green Crescent'],
        ],
      }}
      heading={'Draggy!'}
      tagline={'Freeform Gradients'}
      text={
        <>
          <p>
            Draggy is a dazzling web-based tool that uses magical math to create
            stunning spatial gradients from color points. With Draggy, you can
            easily adjust the position, color, and radius of each point to
            create a limitless variety of gradient effects. And thanks to
            Draggy's secret ingredient - shaders - you can create these
            gradients at lightning-fast speeds, with no lag or delay.
          </p>
          <p>
            But what makes Draggy truly unique is its ability to create spatial
            gradients with fewer than four points. Unlike other design tools
            that rely on interpolation or triangulation, Draggy uses the
            following Laurent polynomial to calculate the weight of each color
            point (CP) in the final gradient. This allows for smooth, efficient
            gradients that are free of the color banding and unsaturated hues
            that plague other tools.
          </p>
          <p>
            <MathJax className="math">
              {
                '\\[j _{\\in \\left[rgb,hsv\\right]} = \\dfrac{\\displaystyle\\sum_{i\\in \\textbf{CP}} j_i\\times\\left(\\frac{1+i_R/10}{d_i}\\right)^3}{\\displaystyle\\sum_{i\\in \\textbf{CP}}\\left(\\frac{1+i_R/10}{d_i}\\right)^3}\\]'
              }
            </MathJax>

            <MathJax className="math">
              Here, {'\\(i_R\\)'} is the radius of influence of color point{' '}
              {'\\(i\\)'} and {'\\(d_i\\)'} is the distance of current pixel to
              the same color point.
            </MathJax>
          </p>

          <p>
            To achieve the best possible color quality in the final gradient,
            Draggy uses a clever mix of RGB and HSV color values. Pure HSV can
            create color banding, while pure RGB can result in unsaturated
            colors when the hues of the color points are far apart. By using a
            mix of these color spaces, Draggy is able to avoid these problems
            and create gradients with rich, vibrant colors.
          </p>
          <p>
            And thanks to Draggy's use of shaders, the whole process is
            super-speedy and smooth. Shaders are programs that run on the
            graphics processing unit (GPU) and are specifically designed to
            handle the complex mathematical operations required for rendering
            graphics. By using shaders to calculate the colors in Draggy, you
            can take advantage of the GPU's specialized capabilities and achieve
            a level of performance that simply isn't possible with other tools.
          </p>
          <p>
            In the future, Draggy will get even more awesome with the addition
            of new features and functionality. You'll be able to change the
            algorithm used for color generation, create a framework for saving
            gradients, and even add a curve-color controller in addition to
            points. Whether you're a designer, artist, or just someone who loves
            playing with color, Draggy is the perfect tool for creating
            mesmerizing spatial gradients. So why not give it a spin and see
            what magic you can create?
          </p>
          <p>
            {makeLink(
              'Let me make some!',
              'https://draggy.ramdon.team/?points=W3sicmFkaXVzIjowLCJjb2xvdXIiOnsiaHNsIjp7ImgiOjE5OS4xMzA0MzQ3ODI2MDg3LCJzIjowLjY4MDY3MjI2ODkwNzU2MzIsImwiOjAuMTI2OTEzNDk5OTk5OTk5OTgsImEiOjF9LCJoZXgiOiIjMGEyODM2IiwicmdiIjp7InIiOjEwLCJnIjo0MCwiYiI6NTQsImEiOjF9LCJoc3YiOnsiaCI6MTk5LjEzMDQzNDc4MjYwODcsInMiOjAuODEsInYiOjAuMjEzMywiYSI6MX0sIm9sZEh1ZSI6MTk5LjEzMDQzNDc4MjYwODcsInNvdXJjZSI6ImhzdiJ9LCJzaG93UGlja2VyIjpmYWxzZSwiY3VycmVudFhZIjp7IngiOjgxNCwieSI6NzI5fSwic2l6ZSI6WzI2LDI2XSwiY29udGFpbmVyU2l6ZSI6WzM2LDM2XX0seyJyZWYiOm51bGwsInJhZGl1cyI6MCwiY29sb3VyIjp7ImhzbCI6eyJoIjo2MCwicyI6MCwibCI6MSwiYSI6MX0sImhleCI6IiNmZmZmZmYiLCJyZ2IiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYSI6MX0sImhzdiI6eyJoIjo2MCwicyI6MCwidiI6MSwiYSI6MX0sIm9sZEh1ZSI6NjAsInNvdXJjZSI6ImhzdiJ9LCJzaG93UGlja2VyIjpmYWxzZSwicG9pbnRlck9mZnNldCI6eyJ4IjowLCJ5IjowfSwiY3VycmVudFhZIjp7IngiOjIxODgsInkiOjk5Mn0sInNpemUiOlsyNiwyNl0sImNvbnRhaW5lclNpemUiOlszNiwzNl19LHsicmVmIjpudWxsLCJyYWRpdXMiOjQuMDY4ODgzNzA3NDk3MjY3NSwiY29sb3VyIjp7InJnYiI6eyJyIjoxMjEuMDU4NjM1MzM2MTE1NDMsImciOjgwLjk1MjYzNzMwNTkzNjE2LCJiIjoxOTUuNDE4NjE3MjQzODgwMSwiYSI6MX0sImhzdiI6eyJoIjoyNjEuMDIyNDg5Njc4NzI2NjMsInMiOjAuNTg1NzQ3NTY4NzQ0MTM3NSwidiI6MC43NjYzNDc1MTg2MDM0NTE0LCJhIjoxfSwiaHNsIjp7ImgiOjI2MS4wMjI0ODk2Nzg3MjY2MywicyI6MC40ODk5NDgxODU2MDI2NjMxLCJsIjowLjU0MTkwNDQyMDY4NTkxNDMsImEiOjF9LCJoZXgiOiIjNzk1MGMzIn0sInNob3dQaWNrZXIiOmZhbHNlLCJwb2ludGVyT2Zmc2V0Ijp7IngiOjAsInkiOjB9LCJjdXJyZW50WFkiOnsieCI6NzI1LCJ5Ijo3MTJ9LCJzaXplIjpbMjYsMjZdLCJjb250YWluZXJTaXplIjpbMzYsMzZdfSx7InJlZiI6bnVsbCwicmFkaXVzIjozLjY1MzA5NzU2Mzc4ODgwNSwiY29sb3VyIjp7InJnYiI6eyJyIjozMy4wNDUxMjk5ODUxOTA2NSwiZyI6MjI0LjU0NzAzNDkzOTEwMjY3LCJiIjoyNTIuNDAwNzMzOTM1Mjc4MjUsImEiOjF9LCJoc3YiOnsiaCI6MTg3LjYxODc3OTMyMzA1MjA4LCJzIjowLjg2OTA3NjcyNzgyODkxMjcsInYiOjAuOTg5ODA2Nzk5NzQ2MTg5MiwiYSI6MX0sImhzbCI6eyJoIjoxODcuNjE4Nzc5MzIzMDUyMDgsInMiOjAuOTc2ODQ5NTM3Mzk3OTU2LCJsIjowLjU1OTY5Nzc3MjM5MzA3NjMsImEiOjF9LCJoZXgiOiIjMjFlMGZjIn0sInNob3dQaWNrZXIiOmZhbHNlLCJwb2ludGVyT2Zmc2V0Ijp7IngiOjAsInkiOjB9LCJjdXJyZW50WFkiOnsieCI6MTI2MSwieSI6Mzk4fSwic2l6ZSI6WzI2LDI2XSwiY29udGFpbmVyU2l6ZSI6WzM2LDM2XX1d',
              [],
              'Open in Draggy'
            )}
            ,{' '}
            {makeLink(
              'Where is the second picture?',
              'https://draggy.ramdon.team/?points=W3sicmFkaXVzIjowLCJjb2xvdXIiOnsiaHNsIjp7ImgiOjEyNy4xMjQ5OTk5OTk5OTk5OSwicyI6MC44Njk1NjUyMTczOTEzMDQyLCJsIjowLjYzOTIxNTY4NjI3NDUwOTgsImEiOjF9LCJoZXgiOiIjNTNmMzY2IiwicmdiIjp7InIiOjgzLCJnIjoyNDMsImIiOjEwMiwiYSI6MX0sImhzdiI6eyJoIjoxMjcuMTI0OTk5OTk5OTk5OTksInMiOjAuNjU4NDM2MjEzOTkxNzY5NSwidiI6MC45NTI5NDExNzY0NzA1ODgyLCJhIjoxfSwib2xkSHVlIjozNTguMDQzNDc4MjYwODY5NTYsInNvdXJjZSI6ImhleCJ9LCJzaG93UGlja2VyIjpmYWxzZSwiY3VycmVudFhZIjp7IngiOjkyOSwieSI6Mjk3fSwic2l6ZSI6WzI2LDI2XSwiY29udGFpbmVyU2l6ZSI6WzM2LDM2XX0seyJyZWYiOm51bGwsInJhZGl1cyI6MCwiY29sb3VyIjp7ImhzbCI6eyJoIjoyMzcuMTQyODU3MTQyODU3MTQsInMiOjAuNjM2MzYzNjM2MzYzNjM2NSwibCI6MC4wNjQ3MDU4ODIzNTI5NDExNywiYSI6MX0sImhleCI6IiMwNjA3MWIiLCJyZ2IiOnsiciI6NiwiZyI6NywiYiI6MjcsImEiOjF9LCJoc3YiOnsiaCI6MjM3LjE0Mjg1NzE0Mjg1NzE0LCJzIjowLjc3Nzc3Nzc3Nzc3Nzc3NzgsInYiOjAuMTA1ODgyMzUyOTQxMTc2NDcsImEiOjF9LCJvbGRIdWUiOjEzNy4wNTI2MzE1Nzg5NDczNywic291cmNlIjoiaGV4In0sInNob3dQaWNrZXIiOmZhbHNlLCJwb2ludGVyT2Zmc2V0Ijp7IngiOjAsInkiOjB9LCJjdXJyZW50WFkiOnsieCI6MTE4MiwieSI6NDI1fSwic2l6ZSI6WzI2LDI2XSwiY29udGFpbmVyU2l6ZSI6WzM2LDM2XX0seyJyZWYiOm51bGwsInJhZGl1cyI6MjAuMzEwMDQzMDM2ODM2NzY3LCJjb2xvdXIiOnsiaHNsIjp7ImgiOjE1MCwicyI6MC4wNDc2MTkwNDc2MTkwNDc2MTYsImwiOjAuMDgyMzUyOTQxMTc2NDcwNTksImEiOjF9LCJoZXgiOiIjMTQxNjE1IiwicmdiIjp7InIiOjIwLCJnIjoyMiwiYiI6MjEsImEiOjF9LCJoc3YiOnsiaCI6MTUwLCJzIjowLjA5MDkwOTA5MDkwOTA5MDkxLCJ2IjowLjA4NjI3NDUwOTgwMzkyMTU3LCJhIjoxfSwib2xkSHVlIjoxODUuMDQyMDE2ODA2NzIyNjcsInNvdXJjZSI6ImhleCJ9LCJzaG93UGlja2VyIjpmYWxzZSwicG9pbnRlck9mZnNldCI6eyJ4IjowLCJ5IjowfSwiY3VycmVudFhZIjp7IngiOjMwMSwieSI6ODI1fSwic2l6ZSI6WzI2LDI2XSwiY29udGFpbmVyU2l6ZSI6WzM2LDM2XX1d',
              [],
              'Open in Draggy'
            )}
          </p>
        </>
      }
    ></Article>,
    <Article
      key={shortid.generate().substring(0, 6)}
      id={'triangles'}
      type={'2c'}
      portrait={portrait}
      options={{ ltr: false }}
      tags={['computation', 'math', 'graphics', 'art', 'design', 'web', 'code']}
      img={{
        type: 'big-picture',
        images: [
          [tri_10, 'Maroon, Blue and Yellow'],
          [tri_6, 'Earth and sky'],
          [tri_4, 'Crystal cave'],
          [tri_8, 'Avada Kedavra'],
        ],
      }}
      heading={'Triangles!'}
      tagline={'Delanauy Colours'}
      text={
        <>
          <p>
            Triangles is a unique coding project that creates stunning gradient
            effects by applying Delaunay triangulation to a rectangle. The
            system starts by randomly selecting a few key points in the
            rectangle and assigning them vibrant colors. Then, using the
            Delaunay algorithm, the rectangle is triangulated into a beautiful
            mesh of triangles. The colors of these triangles are calculated
            using bivariate spline interpolation, resulting in a mesmerizing
            gradient effect that covers the entire rectangle.
          </p>
          <p>
            To add even more visual interest to the final image, Triangles uses
            dominant and recessive color points. The dominant points have a
            larger radius of influence, causing the surrounding area to take on
            their color. This creates bold, prominent spots in the gradient that
            add depth and texture to the final image. Triangles's clever use of
            Delaunay triangulation and bivariate spline interpolation makes for
            an efficient and aesthetically pleasing way to generate gradient
            effects.
          </p>
          <p>
            In a future development of the project, called Draggy, interpolation
            is replaced with Laurent polynomials, making the computation even
            faster and more efficient. Triangles and Draggy are both innovative
            projects that showcase the creative possibilities of mathematical
            concepts in coding. Whether you're a seasoned coder or just starting
            out, these projects are sure to inspire and delight.
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
    ></Article>,
    <Article
      key={shortid.generate().substring(0, 6)}
      id={'urban-growth-models'}
      type={'2c'}
      portrait={portrait}
      options={{ ltr: true }}
      tags={['computation', 'spatial-modeling', 'code']}
      img={{
        type: 'big-picture',
        images: [
          [
            CS_3,
            'City Sandbox: Polarization of cities as tolerance decreases.',
          ],
          [
            CS_1,
            'City Sandbox: Overlaid images of 8 simulations with TolRad of 4.5units.',
          ],
          [
            CS_2,
            'City Sandbox: Simulation with TolRad of 5 units. Notice how the city clusters are segregated rather than creating cities of similar use types adjacent to different a city of another type.',
          ],
        ],
      }}
      heading={'Spatial Modelling of Urban Growth'}
      tagline={
        'Agent Based modelling and simulation of Urban Growth from green-field sites'
      }
      authors={[
        ['Kishore Shenoy'],
        ['Junting Huang'],
        ['Qonita Afnani Firdaus', 'https://www.instagram.com/qonitaafnani/'],
      ]}
      text={
        <>
          <p>
            In this project, we used agent-based modeling techniques to simulate
            city growth and analyze the effects of various design parameters on
            that growth. Netlogo was used as the modeling framework, and three
            different models were employed: Structure from Randomness 1 (SfR1),
            Structure from Randomness 2 (SfR2), and City Sandbox.
          </p>
          <p>
            In SfR1, the potential distribution of a city was grown under
            identical simulation conditions in order to remove stochasticity
            from the results. In SfR2, a threshold for growth potential and
            discretization of the growth process were added to the simulation,
            simulating the way that humans might decide whether to buy a piece
            of land. In the City Sandbox model, different land use types and
            tolerance limits were added to more accurately reflect human
            behavior in city planning.
          </p>
          <p>
            Image processing techniques were used to identify underlying
            patterns in the growth of the simulated cities, and the effects of
            various design parameters on that growth were analyzed. A number of
            interesting phenomena were observed, such as the way that cities can
            grow in unexpected ways, and the way that industrial areas often
            "win out" over residential areas in terms of growth and development
            when the tolerance of industrial buildings decreased.
          </p>
          <p>
            While the City Sandbox model provides valuable insights into the
            growth and development of cities, modern cities may differ from the
            predictions of the model. For example, improvements in
            transportation technology and urban planning have made it possible
            for residential and industrial areas to coexist farther apart, and
            for people to travel easily between them. In addition, advances in
            environmental protection and sustainability have led to a greater
            emphasis on preserving natural areas and green space within cities.
            These and other factors may affect the growth and development of
            modern cities in ways that the City Sandbox model does not account
            for.
          </p>
          <p>
            Overall, this project represents a valuable contribution to the
            field of spatial modeling, providing valuable insights into the way
            that cities grow and develop over time. The use of different
            modeling techniques and image processing techniques allowed for a
            deep understanding of the complex systems at work in urban
            environments, and the findings of the work could be valuable in
            informing future planning and development efforts.
          </p>
        </>
      }
    ></Article>,
    <Article
      key={shortid.generate().substring(0, 6)}
      id={'glasseye'}
      type={'2c'}
      portrait={portrait}
      options={{ ltr: false }}
      tags={['design', 'art', 'assistive-tech']}
      img={{
        type: 'big-picture',
        images: [
          [
            GE_Glasses,
            'Diagram of glasses, with ToF sensor at the centre and wide angle cameras at either corners.',
          ],
          [
            GE_Braille,
            'Dynamic braille pixel made using spring loaded electromagnet arrays.',
          ],
        ],
      }}
      heading={'GlassEye'}
      tagline={'Concept Design of an Assistive Technology for the blind'}
      text={
        <>
          <p>
            GlassEye is a design concept for a pair of glasses that aims to help
            people who are visually impaired or blind overcome their barriers to
            socialization and improve their quality of life. The glasses use a
            combination of advanced technologies, including facial recognition,
            time of flight sensors, and computer vision, to provide the user
            with a comprehensive view of their surroundings and detect potential
            hazards. In addition to these features, GlassEye also includes
            braille panels and an earpiece for communication, giving users
            multiple ways to receive information and interact with their
            environment.
          </p>
          <p>
            In addition to the facial recognition feature, GlassEye also uses 3D
            time-of-flight sensors and computer vision to detect obstacles and
            potential hazards in the user's environment. They are located at the
            glasses' centre and provide a 3D view of the area in front of the
            user. This allows the user to be aware of any objects or obstacles
            in their path, helping them to navigate their environment more
            safely. The computer vision system can detect potential hazards,
            such as cars approaching from the side, and alert the user through
            the earpiece or braille panels.
          </p>
          <p>
            The GlassEye gloves have a dynamic braille panel and can display
            messages in braille using piezoelectric or magnetic "pixels". These
            pixels can be activated in different combinations to represent
            braille characters, allowing the user to understand notifications
            through touch. The use of gloves enables users to receive
            information through a medium that is familiar and comfortable for
            them. The earpiece can also provide audio data to the user, allowing
            them to choose the most appropriate communication method based on
            the situation.
          </p>
          <p>
            In conclusion, GlassEye is an assistive technology design concept
            that has the potential to significantly improve the quality of life
            for people who are visually impaired or blind. Its use of
            technologies combined with the flexibility of braille panels and an
            earpiece for communication makes it a unique and powerful tool for
            overcoming the barriers to socialization and independence faced by
            this population. While GlassEye is currently only a concept, its
            development and implementation could have a significant impact on
            the lives of people who are visually impaired or blind, helping them
            to fully participate in society and achieve their full potential.
          </p>
        </>
      }
    ></Article>,
  ];

  for (let i in projects) {
    if (Number(i) % 2) projects[i].props.options.ltr = false;
    else projects[i].props.options.ltr = true;
  }

  const [showProjects, setShowProjects] = useState(projects);
  const tagFilter = (e, tag) => {
    if (!filterByTags.includes(tag)) {
      let newArr = [...filterByTags, tag];
      newArr.sort();
      setFilterByTags(newArr);
    } else {
      setFilterByTags(
        filterByTags.filter(function (value) {
          return value !== tag;
        })
      );
    }
    // console.log(e.target.checked);
    // console.log(tag);
  };
  useEffect(() => {
    // console.log(filterByTags);
    let IndexofShowProjects = [];
    pLoop: for (let i in projects) {
      // console.log('\t Does', i, projects[i].props.id);
      i = Number(i);
      for (let j in filterByTags) {
        // console.log('\t\t have', filterByTags[j]);
        if (!projects[i].props.tags.includes(filterByTags[j])) {
          // console.log('\t\t\t No');
          continue pLoop;
        } else {
          // console.log('\t\t\t Yes');
        }
      }
      // console.log('\t Before:', IndexofShowProjects);
      IndexofShowProjects.push(i);
      // console.log('\t After:', IndexofShowProjects);
    }
    // console.log(IndexofShowProjects);
    // console.log('Empty?', IndexofShowProjects.length);
    if (!IndexofShowProjects.length) {
      tLoop: for (let i in filterByTags) {
        // console.log('\tWho has', filterByTags[i]);
        for (let j in projects) {
          j = Number(j);
          // console.log(
          //   '\t\t\tDoes',
          //   j,
          //   projects[j].props.id,
          //   'have?',
          //   projects[j].props.tags.includes(filterByTags[i]),
          //   '\n\t\t\tIs it already in the index to show?',
          //   IndexofShowProjects.includes(j)
          // );
          if (
            projects[j].props.tags.includes(filterByTags[i]) &&
            !IndexofShowProjects.includes(j)
          ) {
            // console.log('\t\t', j, projects[j].props.id, 'does');
            IndexofShowProjects.push(j);
          }
        }
      }
      // IndexofShowProjects.sort();
      // console.log(IndexofShowProjects);
    }
    // let newShowProjects = projects.filter(function (value, index) {
    //   return IndexofShowProjects.includes(index);
    // });
    // for (let i in newShowProjects) {
    //   if (i % 2) newShowProjects[i].props.options.ltr = false;
    //   else newShowProjects[i].props.options.ltr = true;
    // }
    let i = 0;
    let newShowProjects = projects.map(function (value, index) {
      if (IndexofShowProjects.includes(index)) {
        value.props.options.show = true;
        if (i % 2) value.props.options.ltr = false;
        else value.props.options.ltr = true;
        i++;
      } else {
        value.props.options.show = false;
      }
      return value;
    });
    // console.log(newShowProjects);
    setShowProjects(newShowProjects);
    // console.log(
    //   projects.filter(function (value, index) {
    //     console.log(IndexofShowProjects, index);
    //     console.log(IndexofShowProjects.includes(index));
    //     return IndexofShowProjects.includes(index);
    //   })
    // );
  }, [filterByTags]);
  useEffect(() => {
    document.title = 'Projects by Me';

    let newShowProjects = projects.map(function (value, index) {
      if (index % 2) value.props.options.ltr = false;
      else value.props.options.ltr = true;
      return value;
    });
    setShowProjects(newShowProjects);
    showProjects.map(function (value, index) {
      console.log(value.props.options.ltr);
    });
    document.addEventListener('click', (e) =>
      documentOnClick(e, setIsClicked, 'big-picture')
    );
    return () => {
      document.removeEventListener('click', (e) =>
        documentOnClick(e, setIsClicked)
      );
    };
  }, []);
  // console.log(a.props);
  let tags = [];
  for (let i in projects) {
    for (let j in projects[i].props.tags) {
      if (!tags.includes(projects[i].props.tags[j])) {
        tags.push(projects[i].props.tags[j]);
      }
    }
  }
  tags.sort();
  // console.log(tags);
  let tagsElement = [];
  for (let i in tags) {
    tagsElement.push(
      <div className="tag-checkbox">
        {/* <input
          type="checkbox"
          id={tags[i]}
          title={tags[i]}
          onClick={tagFilter}
        /> */}
        <div
          className={
            filterByTags.includes(tags[i]) ? 'tag filter clicked' : 'tag filter'
          }
          onClick={(e) => tagFilter(e, tags[i])}
        >
          <label for={tags[i]}>{tags[i]}</label>
          <CrossIcon className="tag-icon" />
        </div>
      </div>
    );
  }
  return (
    <>
      <div
        id="expanded-wrapper1"
        onClick={null}
        style={
          isClicked
            ? {
                visibility: 'visible',
                opacity: 1,
                height: `${window.innerHeight}px`,
              }
            : { height: `${window.innerHeight}px` }
        }
      >
        <img
          id="expanded-img"
          src=""
          style={
            isClicked
              ? {
                  visibility: 'visible',
                  opacity: 1,
                  backgroundColor: '#00000000',
                }
              : { backgroundColor: '#00000000' }
          }
        />
      </div>
      <div className="flex v-centre tags-mob">
        <p className="tag-checkbox">
          Filter by:
          <br />
        </p>

        {mobile ? (
          <div className="tag-filters">{tagsElement}</div>
        ) : (
          tagsElement
        )}
      </div>
      {showProjects}
    </>
  );
};

export default Projects;
