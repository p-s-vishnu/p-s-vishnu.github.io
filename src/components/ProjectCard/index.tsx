import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tilt from 'react-parallax-tilt';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  githubLink?: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
}

function ProjectCard({ 
  title, 
  description, 
  imageUrl, 
  githubLink, 
  rotateAmplitude = 10, 
  scaleOnHover = 1.05 
}: ProjectCardProps) {
  return (
    <Tilt
      className={clsx('card', styles.projectCard)}
      tiltMaxAngleX={rotateAmplitude}
      tiltMaxAngleY={rotateAmplitude}
      perspective={1000}
      transitionSpeed={1500}
      scale={scaleOnHover}
      gyroscope={true}
    >
      <Link to={githubLink} className={styles.projectLink}>
        {imageUrl && (
          <div className="card__image">
            <img src={useBaseUrl(imageUrl)} alt={title} title={title} />
          </div>
        )}
        <div className="card__body">
          <h4>{title}</h4>
          <small>{description}</small>
        </div>
      </Link>
    </Tilt>
  );
}

export default ProjectCard;
