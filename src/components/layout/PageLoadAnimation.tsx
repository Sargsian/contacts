import classes from './PageLoadAnimation.module.scss';

const PageLoadAnimation = () => {
  return (
    <div className={classes.loaderContainer}>
      <div className={classes.loading}></div>
    </div>
  );
};

export default PageLoadAnimation;
