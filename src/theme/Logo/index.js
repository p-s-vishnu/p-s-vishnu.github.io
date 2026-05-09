import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';

/**
 * Custom Logo: inline SVG whose dot reads --accent from :root, so the
 * navbar mark live-updates with the accent picker. Renders the navbar
 * title alongside the SVG, matching Docusaurus default Logo layout.
 */
export default function LogoWrapper(props) {
  const { siteConfig } = useDocusaurusContext();
  const { navbar } = siteConfig.themeConfig;
  const homeUrl = useBaseUrl('/');
  const title = navbar?.title;
  const logoCfg = navbar?.logo ?? {};

  const { className, imageClassName, titleClassName, ...rest } = props;

  return (
    <Link
      to={homeUrl}
      className={clsx('navbar__brand', className)}
      aria-label={logoCfg.alt ?? title ?? 'Home'}
      {...rest}
    >
      <svg
        className={clsx('navbar__logo', imageClassName)}
        width="32"
        height="32"
        viewBox="0 0 64 64"
        role="img"
        aria-hidden="true"
      >
        <rect width="64" height="64" rx="14" fill="#08080a" />
        <text
          x="30"
          y="46"
          textAnchor="middle"
          fontFamily="Fraunces, 'Times New Roman', Georgia, serif"
          fontSize="44"
          fontWeight="600"
          letterSpacing="-1.5"
          fill="#ffffff"
        >
          V
        </text>
        <circle cx="49" cy="46" r="3.4" fill="var(--accent, #ff5a3c)" />
      </svg>
      {title != null && (
        <b className={clsx('navbar__title', titleClassName)}>{title}</b>
      )}
    </Link>
  );
}
