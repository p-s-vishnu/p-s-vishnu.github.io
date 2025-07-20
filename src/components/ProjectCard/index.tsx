import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  githubLink?: string;
}

function ProjectCard({ title, description, imageUrl, githubLink }: ProjectCardProps) {
  return (
    <Link to={githubLink} className={clsx('card', styles.projectCard)}>
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
  );
}

export default ProjectCard;
