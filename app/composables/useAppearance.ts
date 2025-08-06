export function useAppearance() {
  const previewSize = useState('previewSize', () => ({
    width: 400,
    height: 400
  }));

  return {
    previewSize
  };
}
