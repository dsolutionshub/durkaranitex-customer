let showLoaderFn = null;

const loader = (isVisible) => {
  if (showLoaderFn) {
    showLoaderFn(isVisible);
  }
};

const registerLoader = (fn) => {
  showLoaderFn = fn;
};

export { loader, registerLoader };
