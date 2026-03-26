export interface TeamMember {
  name: string;
  role: string;
  tagline: string;
  imageSrc: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: 'Rutkay',
    role: 'Lead Developer',
    tagline: 'Fueled by Ayran and rage against corporate life',
    imageSrc: '/images/team/lead_developer.png',
  },
  {
    name: 'Rutkay',
    role: 'Project Manager',
    tagline: 'Likes dark humor and cartoons',
    imageSrc: '/images/team/project_manager.png',
  },
  {
    name: 'Rutkay',
    role: 'Expert Marketer',
    tagline: 'Writing a book titled "Every Market Is a Fish Market"',
    imageSrc: '/images/team/expert_marketer.png',
  },
];
