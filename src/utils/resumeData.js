import resumeBase from '@data/resume.json';
import personData from '@data/person.json';

// Single merged object — person identity + resume content, only local JSON
export const resumeFallback = { ...personData, ...resumeBase };
