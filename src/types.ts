/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  slug: string;
  title: string;
  year: string;
  type: string;
  location: string;
  size: string;
  duration: string;
  leadDesigner: string;
  overview: string;
  approach: string;
  heroImage: string; // fallback to high-res Unsplash interior structure
  imageUrl: string;  // high resolution fallback url
  beforeImage?: string; // fallback for the before state
  afterImage?: string;  // fallback for the after state
  details?: {
    label: string;
    value: string;
  }[];
  paragraphs?: string[];
  specs?: {
    scope: string;
    materials: string;
    curation: string;
  };
}

export interface ProcessStep {
  step: string;
  title: string;
  duration: string;
  outcome: string;
  description: string;
  details: string[];
}

export interface PressItem {
  publication: string;
  award: string;
  year: string;
}

export type Page = 'home' | 'projects' | 'project-detail' | 'studio' | 'process' | 'contact';
