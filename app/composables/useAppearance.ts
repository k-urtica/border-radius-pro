export function useAppearance() {
  const previewSize = useState('previewSize', () => ({
    width: 420,
    height: 420
  }));

  const previewBgUrl = useState<string | undefined>('previewBgUrl', () => undefined);

  return {
    previewSize,
    previewBgUrl
  };
}
