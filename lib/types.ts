export type ApodResponse = {
  copyright?: string;
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: string;
  title: string;
  url: string;
};

export type Rover = "curiosity" | "opportunity" | "spirit" | "perseverance";

export const ROVERS: Rover[] = [
  "curiosity",
  "opportunity",
  "spirit",
  "perseverance",
];

export type MarsPhoto = {
  id: number;
  sol: number;
  earth_date: string;
  img_src: string;
  camera: {
    name: string;
    full_name: string;
  };
  rover: {
    name: string;
    launch_date: string;
    landing_date: string;
    status: string;
  };
};
