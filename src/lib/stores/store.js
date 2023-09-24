export class Store {
  constructor(initialState = {}) {
    this.state = initialState;
    this.globalSubscribers = new Set();
    this.keySubscribers = {};
    this.stateHistory = [];
  }

  setState(action) {
    const prevState = { ...this.state };
    const newState = { ...this.state, ...action(this.state) };

    this.stateHistory.push(prevState);
    this.state = newState;
    this.notify(prevState, newState);
  }

  notify(prevState, newState) {
    this.globalSubscribers.forEach((sub) => sub(newState));

    Object.keys(newState).forEach((key) => {
      if (prevState[key] !== newState[key]) {
        const subscribers = this.keySubscribers[key] || new Set();
        subscribers.forEach((sub) => sub(newState[key]));
      }
    });
  }

  subscribe(callback, selector = null) {
    if (selector === null) {
      this.globalSubscribers.add(callback);
      return () => this.globalSubscribers.delete(callback);
    } else {
      if (!this.keySubscribers[selector]) {
        this.keySubscribers[selector] = new Set();
      }

      this.keySubscribers[selector].add(callback);
      return () => this.keySubscribers[selector].delete(callback);
    }
  }

  getState(selector = (s) => s) {
    return selector(this.state);
  }

  rollback() {
    const previousState = this.stateHistory.pop();
    if (previousState) {
      const currentState = { ...this.state };
      this.state = previousState;
      this.notify(currentState, previousState);
    }
  }
}
