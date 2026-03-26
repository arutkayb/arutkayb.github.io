export interface Project {
  name: string;
  description: string;
  techStack: string;
  url: string;
}

export const projects: Project[] = [
  {
    name: 'Intimassy',
    description: 'A relationship app that helps couples stay connected through shared rituals and meaningful moments.',
    techStack: 'Native Android and Flutter for iOS, with Firebase on the backend.',
    url: 'https://centertable.club/',
  },
  {
    name: 'Your Significant Otter',
    description: 'A couples app for preserving shared memories and celebrating your relationship journey.',
    techStack: 'Flutter for Android and iOS, with Supabase on the backend.',
    url: 'https://yoursignificantotter.com/',
  },
];
