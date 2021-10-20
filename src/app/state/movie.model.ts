export interface Movie {
    id: string;
    volumeInfo: {
      title: string;
      authors: Array<string>;
    };
}