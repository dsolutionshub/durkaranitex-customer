let showLoaderFn = null;

const loader = (isVisible) => {
  if (showLoaderFn) {
    showLoaderFn(isVisible);
  } else {
    console.log("Loader component not mounted yet.");
  }
};

const registerLoader = (fn) => {
  showLoaderFn = fn;
};

export { loader, registerLoader };
