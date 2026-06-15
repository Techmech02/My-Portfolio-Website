import "@testing-library/jest-dom";

class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.IntersectionObserver = MockIntersectionObserver;

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query) => ({
    matches: query.includes("prefers-reduced-motion: reduce") ? false : false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }),
});
