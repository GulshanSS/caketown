export const defaultPreSets = (section: string, name: string) => {
  return {
    folder: `caketown/${section}/large`,
    use_filename: true,
    filename_override: `${name}-${new Date().toUTCString()}`,
    unique_filename: false,
    transformation: [{ width: 800, quality: 60 }],
  };
};
