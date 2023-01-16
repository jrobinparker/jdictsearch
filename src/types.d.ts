import 'vite/client';

export type Photo = {
  id: number;
  width: number;
  height: number;
  urls: { large: string; regular: string; raw: string; small: string };
  color: string | null;
  user: {
    username: string;
    name: string;
  };
};

export type Results = {
    weblio: string[];
    eiNavi: string[];
    eijiro: string[];
}