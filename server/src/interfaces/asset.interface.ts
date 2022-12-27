export default interface IAsset {
  name: string;
  tiny: {
    cloudinaryId: string;
    cloudinaryUrl: string;
  };
  medium: {
    cloudinaryId: string;
    cloudinaryUrl: string;
  };
  large: {
    cloudinaryId: string;
    cloudinaryUrl: string;
  };
  alt: string;
}
