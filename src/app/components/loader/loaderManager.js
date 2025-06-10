let showLoaderFn = null;

const loader = (isVisible) => {
  if (showLoaderFn) {
    showLoaderFn(isVisible);
  } else {
    console.warn("Loader component not mounted yet.");
  }
};

const registerLoader = (fn) => {
  showLoaderFn = fn;
};

export { loader, registerLoader };
