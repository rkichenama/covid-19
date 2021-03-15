import React, { Suspense } from 'react';

const Spinner = () => ( <div>Loading...</div> );

type PendingProps = {
  children: any,
  fallback?: any
}

class Pending extends React.Component<PendingProps, { error: any }> {
  public state = {
    error: false
  };

  static getDerivedStateFromError (error) {
    return { error };
  }

  componentDidCatch (error, errorInfo) {
    console.groupCollapsed('Caught Error');
    console.info(error);
    console.info(errorInfo);
    console.groupEnd();
  }

  render () {
    if (this.state.error) {
      return (
        <section className='bad'>An unhandled error occurred.</section>
      );
    }

    const { children, fallback = (<Spinner />) } = this.props;
    return (
      <Suspense {...{ fallback, delay: 200 }} >
        { children }
      </Suspense>
    );
  }
}

export default Pending;
