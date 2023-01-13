export const defaultPreSets = (section: string, name: string) => {
  return {
    folder: `caketown/${section}/large`,
    with: "700",
    use_filename: true,
    quality: "auto",
    fetch_format: "auto",
    filename_override: `${name}-${new Date().toUTCString()}`,
    unique_filename: false,
  };
};
