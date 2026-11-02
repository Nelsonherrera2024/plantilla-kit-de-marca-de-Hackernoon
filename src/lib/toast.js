// Tiny event-based toast bus — no context provider needed.
export const toast = (message) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('bk:toast', { detail: message }));
  }
};

export async function copyText(text, label = text) {
  try {
    await navigator.clipboard.writeText(text);
    toast(`Copied ${label}`);
    return true;
  } catch {
    toast('Copy failed — select and copy manually');
    return false;
  }
}
