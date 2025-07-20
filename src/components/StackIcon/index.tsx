import React from 'react';
import styles from './styles.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

// Mapping for Devicon names that differ from the display name
const deviconNameMapping = {
  'c++': 'cplusplus',
  'postgresql': 'postgresql',
  'gcloud': 'googlecloud',
};

// Titles for icons
const iconTitleMapping = {
    'python': 'Python',
    'c++': 'C++',
    'postgresql': 'PostgreSQL',
    'pytorch': 'PyTorch',
    'tensorflow': 'TensorFlow',
    'huggingface': 'HuggingFace',
    'vllm': 'vLLM',
    'streamlit': 'Streamlit',
    'langchain': 'LangChain',
    'langsmith': 'LangSmith',
    'fastapi': 'FastAPI',
    'docker': 'Docker',
    'kubernetes': 'Kubernetes',
    'gcloud': 'Google Cloud',
    'aws': 'AWS',
    'grafana': 'Grafana',
    'prometheus': 'Prometheus',
};

// List of custom icons stored locally in static/img/tech-stack/
const customIcons = ['aws', 'google', 'huggingface', 'langchain', 'langsmith', 'vllm'];

type StackIconProps = {
  name: string;
  width?: number;
  height?: number;
};

const StackIcon = ({ name, width = 40, height = 40 }: StackIconProps) => {
  const lowerCaseName = name.toLowerCase();
  const iconTitle = iconTitleMapping[lowerCaseName] || name.charAt(0).toUpperCase() + name.slice(1);

  let iconUrl;

  if (customIcons.includes(lowerCaseName)) {
    // Use local custom SVG
    iconUrl = useBaseUrl(`/img/tech-stack/${lowerCaseName}-color.svg`);
  } else {
    // Use Devicon CDN
    const deviconName = deviconNameMapping[lowerCaseName] || lowerCaseName;
    iconUrl = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${deviconName}/${deviconName}-original.svg`;
  }

  return (
    <img
      className={styles.icon}
      src={iconUrl}
      alt={`${iconTitle} icon`}
      title={iconTitle}
      width={width}
      height={height}
      // Add a simple error handler to show a placeholder or hide the icon
      onError={(e) => { e.currentTarget.style.display = 'none'; }}
    />
  );
};

export default StackIcon;

