/**
 * Returns the relative coordinates (0 to 1) of a pointer event within a given HTML element.
 * Supports MouseEvent, PointerEvent, and TouchEvent.
 * @param event - The pointer event (MouseEvent, PointerEvent, or TouchEvent).
 * @param element - The target HTML element.
 * @returns An object containing the normalized x and y coordinates (0 to 1) within the element.
 */
export function getPointerPosition(event: MouseEvent | PointerEvent | TouchEvent, element: HTMLElement): { x: number; y: number } {
  const rect = element.getBoundingClientRect();
  let clientX: number, clientY: number;

  if ('touches' in event && event.touches.length > 0) {
    const touch = event.touches[0];
    if (!touch) {
      return { x: 0, y: 0 };
    }
    clientX = touch.clientX;
    clientY = touch.clientY;
  } else {
    // MouseEvent or PointerEvent
    clientX = (event as MouseEvent | PointerEvent).clientX;
    clientY = (event as MouseEvent | PointerEvent).clientY;
  }

  const x = (clientX - rect.left) / rect.width;
  const y = (clientY - rect.top) / rect.height;

  return {
    x: Math.max(0, Math.min(1, x)),
    y: Math.max(0, Math.min(1, y)),
  };
}

/**
 * Clamps a number to the range 0 to 100.
 * @param value - The value to clamp.
 * @returns The clamped value (0 to 100).
 */
export function clampPercent(value: number): number {
  return Math.max(0, Math.min(100, value));
}
