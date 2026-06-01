export const MovieFormat = {
  TwoD: '2D',
  ThreeD: '3D',
  IMAX: 'IMAX',
  FourDX: '4DX',
} as const;

export type MovieFormat = (typeof MovieFormat)[keyof typeof MovieFormat];
export const MovieFormats: MovieFormat[] = Object.values(MovieFormat);
