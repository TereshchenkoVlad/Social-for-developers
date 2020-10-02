export interface ProfileError {
  msg: string;
  status: string;
}

export interface Profile {
  profile: ProfileItem | null;
  profiles: Array<ProfileItem>;
  repos: Array<any>;
  loading: boolean;
  error: ProfileError | {};
}

export interface ProfileItem {
  user: string;
  company: string;
  website: string;
  location: string;
  status: string;
  skills: string[];
  bio: string;
  githubusername: string;
  experience: Experience[];
  education: Education[];
  social: Social;
  date: string;
}

export interface Experience {
  _id: string;
  company: string;
  current: boolean;
  description: string;
  from: string;
  location: string;
  title: string;
  to: null | string;
}

export interface Education {
  _id: string;
  school: string;
  degree: string;
  fieldofstudy: string;
  from: string;
  to: null | string;
  current: boolean;
  description: string;
}

export interface Social {
  youtube: string;
  facebook: string;
  linkedin: string;
  instagram: string;
  twitter: string;
}
