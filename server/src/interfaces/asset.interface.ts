export default interface IAsset {
  name: string;
  image: {
    cloudinaryId: string;
    cloudinaryUrl: string;
  };
  alt: string;
}
