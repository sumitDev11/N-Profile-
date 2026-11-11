import { Component } from 'react';

// If the 3D background can't load (old phone without WebGL, network error, …)
// the rest of the biodata keeps working — the 3D layer is simply skipped.
export default class SafeBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(err) {
    console.warn('3D background disabled:', err?.message || err);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
