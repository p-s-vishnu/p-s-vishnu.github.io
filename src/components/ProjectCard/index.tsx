import React, { memo } from 'react';
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
  altText?: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
}

function ProjectCard({
  title,
  description,
  imageUrl,
  githubLink,
  rotateAmplitude = 10,
  scaleOnHover = 1.05,
  altText
}: ProjectCardProps) {
  return (
    <Tilt
      className={clsx('card', styles.projectCard)}
      tiltMaxAngleX={rotateAmplitude}
      tiltMaxAngleY={rotateAmplitude}
      perspective={1000}
      transitionSpeed={1500}
      scale={scaleOnHover}
      gyroscope={typeof window !== 'undefined' && 'DeviceOrientationEvent' in window}
      role="region"
      aria-label={`${title} project card`}
    >
      <Link to={githubLink} className={styles.projectLink}>
        {imageUrl && (
          <div className="card__image">
            <img
              src={useBaseUrl(imageUrl)}
              alt={altText || title}
              title={title}
              loading="lazy"
            />
          </div>
        )}
        <div className="card__body">
          <h4>{title}</h4>
          <p className={styles.description}>{description}</p>
        </div>
      </Link>
    </Tilt>
  );
}

export default memo(ProjectCard);
