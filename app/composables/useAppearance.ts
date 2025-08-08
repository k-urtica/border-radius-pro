export function useAppearance() {
  const previewSize = useState('previewSize', () => ({
    width: 420,
    height: 420
  }));

  return {
    previewSize
  };
}
