export const tinyPreSets = (section: string, name: string) => {
  return {
    folder: `caketown/${section}/tiny`,
    use_filename: true,
    filename_override: `${name}-${new Date().toUTCString()}`,
    unique_filename: false,
    transformation: [
      { width: 150, quality: 60, fetch_format: "auto", crop: "scale" },
    ],
  };
};

export const mediumPreSets = (section: string, name: string) => {
  return {
    folder: `caketown/${section}/medium`,
    use_filename: true,
    filename_override: `${name}-${new Date().toUTCString()}`,
    unique_filename: false,
    transformation: [
      { width: 350, quality: 60, fetch_format: "auto", crop: "scale" },
    ],
  };
};

export const largePreSets = (section: string, name: string) => {
  return {
    folder: `caketown/${section}/large`,
    use_filename: true,
    filename_override: `${name}-${new Date().toUTCString()}`,
    unique_filename: false,
    transformation: [
      { width: 800, quality: 60, fetch_format: "auto", crop: "scale" },
    ],
  };
};