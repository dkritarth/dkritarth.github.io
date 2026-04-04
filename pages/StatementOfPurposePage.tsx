import React from 'react';
import { WritingChrome } from '../components/WritingChrome';

export const StatementOfPurposePage: React.FC = () => {
  return (
    <WritingChrome title="Statement of purpose">
      <p>
        My academic journey has been driven by a fascination with the power of artificial intelligence (AI) to solve
        tangible, human-centric problems. For me, pursuing a Ph.D. is the next obvious career option and an essential
        step towards the enrichment of knowledge and its application.
      </p>
      <p>
        My undergraduate research has built a strong foundation, but I am now driven to move beyond applying known
        techniques and to begin <strong>creating original, and high-impact research</strong>. A doctoral program will
        provide the rigorous training and mentorship necessary to strengthen my technical expertise, deepen my theoretical
        knowledge, and develop the independent research skills required to contribute meaningfully to the fields of AI
        and computational science. My skill sets have been built over a period of time, through personal projects and two
        key undergraduate research experiences at the University at Buffalo.
      </p>
      <p>
        My initial interest in research was sparked by early-stage computer vision projects, such as ship detection in
        satellite imagery, where I achieved <strong>98% accuracy</strong> using MobileNetV2 (Sandler et al., 2018). This
        project gave me a foundation in Convolutional Neural Networks (CNNs) and Vision Transformers, but I was eager to
        apply these skills to more complex, and real-world problems.
      </p>
      <p>
        My first research experience was with{' '}
        <a href="https://cse.buffalo.edu/~wenyaoxu/index.html">Professor Wenyao Xu</a>&rsquo;s{' '}
        <a href="https://cse.buffalo.edu/~wenyaoxu/esc.html">ESC Lab</a>, where I joined a project to build an AI-driven
        healthcare system for dental patients. I contributed to the development of a mobile application,{' '}
        <strong>OralScan</strong>, which utilizes a <strong>YOLOv8 model</strong> (built on the principles of Redmon et
        al., 2016) for real-time disease classification and tooth numbering from intraoral images. We then conducted a
        formative usability and acceptability study to assess its potential for real-world geriatric oral healthcare,
        which led to a <strong>
          co-authored submission to the <em>Smart Health</em> journal
        </strong>{' '}
        (Soni et al., 2025, awaiting review). Currently, I am working on an orthodontics extension of this project,
        developing an algorithm to track patient braces movements from images and building a separate YOLO-based model
        for braces classification. Through this project, I learned that technical accuracy is only one part of a solution;
        however, a successful system must be built on a deep understanding of specialists&rsquo; and patients&rsquo; true
        needs.
      </p>
      <p>
        My second research experience has been with{' '}
        <a href="https://ubwp.buffalo.edu/jiayu-peng-lab/jiayu/">Professor Jiayu Peng</a>&rsquo;s lab, which centers on
        developing and refining <strong>symmetry-aware Graph Neural Networks (GNNs)</strong> for crystalline materials. I
        have been fortunate to be involved in the work detailed in the &ldquo;PerovskiteOrderingGCNNs&rdquo; preprint
        (Peng, 2024; arXiv:2409.13851). For its final revision, my role involved migrating the team&rsquo;s hyperparameter
        optimization workflows from SigOpt to <strong>Weights &amp; Biases (wandb)</strong> to enable more reproducible,
        large-scale training. I also assisted in benchmarking by training new GNN architectures, such as the Atomistic
        Line Graph Neural Network (ALIGNN) (Choubey et al., 2024), on our dataset. Under Professor Peng&apos;s mentorship,
        I successfully secured the <strong>PEARL Award</strong> in November 2025. This competitive $2,500 grant is
        awarded by the UB Experiential Learning Network (ELN) specifically to fund advanced undergraduate research
        projects. This experience culminated in a recent commentary on <strong>agentic AI for catalyst discovery</strong>{' '}
        (Peng et al., 2025, ChemRxiv), showing me the power of deep learning to uncover scientific insights in complex
        physical systems.
      </p>
      <p>
        I am confident in my ability to handle the rigor of a Ph.D. program. I have consistently sought out academic
        challenges, graduating high school a year early and on track to complete my{' '}
        <strong>undergraduate degree in just three years at the age of 19</strong>. I have managed this accelerated path
        while concurrently opting for 21-22 credit per semester which is an additional 6 to 7 credit allowed in favour of
        me by virtue of being an Honors student, maintaining a <strong>GPA of 3.8 and above</strong>, featuring in the
        Dean&apos;s List throughout the undergraduate program.
      </p>
      <p>
        <strong>Working in two different research labs simultaneously</strong>, and holding a statistics tutoring position
        at the university, has not only taught me to manage my time effectively but has also proven my endurance and
        capacity for the sustained, high-level effort required for a successful research career.
      </p>
      <p>
        I am particularly drawn to this Ph.D. program because the department&apos;s commitment to cutting-edge research
        aligns perfectly with my academic goals. I am eager to bring my experience in Artificial Intelligence and
        Statistics to the program, while deepening my understanding of foundational models and emerging technologies. I
        believe my background in both real-world application and core model development will allow me to integrate
        seamlessly into the department and contribute meaningfully to its research endeavors.
      </p>

      <h2>My research outputs and collaborators</h2>
      <ol className="list-decimal pl-5 space-y-3 text-sm">
        <li>
          Peng, J., Liu, C., Luo, Y., &amp; Dandapat, K. (2025). Accelerating Multimetallic Catalyst Discovery with
          Robotics and Agentic AI. <em>ChemRxiv, ver. 1.</em> DOI: 10.26434/chemrxiv-2025-13n3f.{' '}
          <a href="https://chemrxiv.org/engage/chemrxiv/article-details/68f6c2593e6156d3be0d74cf">ChemRxiv</a>
        </li>
        <li>
          Peng, J., (2024). PerovskiteOrderingGCNNs (arXiv Preprint).{' '}
          <a href="https://arxiv.org/abs/2409.13851">arXiv</a> &middot;{' '}
          <a href="https://github.com/jiayu-peng-lab/PerovskiteOrderingGCNNs?tab=readme-ov-file">GitHub</a>
        </li>
        <li>
          Soni, P., Dandapat, K., Gherardi, A., Bo, W., Li, R., &amp; Xu, W. (2025). OralScan, an AI-Powered Mobile Tool
          for Geriatric Oral Healthcare: A Formative Usability and Acceptability Study. <em>Smart Health.</em>{' '}
          (Submitted, not yet peer-reviewed)
        </li>
        <li>
          Wenyao Xu, Homepage. <a href="https://cse.buffalo.edu/~wenyaoxu/index.html">cse.buffalo.edu/~wenyaoxu</a>
        </li>
        <li>
          ESC Lab, Homepage. <a href="https://cse.buffalo.edu/~wenyaoxu/esc.html">ESC Lab</a>
        </li>
        <li>
          Jiayu Peng, Homepage. <a href="https://ubwp.buffalo.edu/jiayu-peng-lab/jiayu/">UB Peng lab</a>
        </li>
      </ol>

      <h2>General academic references</h2>
      <ol className="list-decimal pl-5 space-y-3 text-sm">
        <li>
          Choubey, S., Bhatt, V. S. R., &amp; Chen, W. (2024). ALIGNN: a comprehensive atomistic line graph neural network
          for material property prediction. <em>npj Computational Materials, 10</em>(1), 1-11.
        </li>
        <li>
          Redmon, J., Divvala, S., Girshick, R., &amp; Farhadi, A. (2016). You Only Look Once: Unified, RealTime Object
          Detection. <em>Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition (CVPR).</em>
        </li>
        <li>
          Sandler, M., Howard, A., Zhu, M., Zhmoginov, A., &amp; Chen, L. C. (2018). MobileNetV2: Inverted Residuals and
          Linear Bottlenecks. <em>Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition (CVPR).</em>
        </li>
      </ol>
    </WritingChrome>
  );
};
