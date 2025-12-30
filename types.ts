export interface Product {
  id: string;
  name: string;
  description: string;
  icon: string;
  url: string;
}

export interface CourseRecommendation {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  rating: number;
}

export interface Activity {
  id: string;
  title: string;
  image: string;
  date: string;
  tag: string;
}

export interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Learner {
  id: string;
  name: string;
  avatar: string;
  timeAgo: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string; // e.g., "10 min"
  content: string; // HTML/Markdown string simulation
  relatedProducts: Product[];
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  totalModules: number;
  totalDuration: string;
  modules: Module[];
  recommendations: CourseRecommendation[];
  activities: Activity[];
  reviews: Review[];
  learners: Learner[];
}