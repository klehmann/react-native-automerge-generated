/**
 * Test setup for react-native-automerge-generated
 *
 * Configures the environment for testing the native wrapper.
 * Note: These tests run against the actual native implementation,
 * so the native module must be built before running tests.
 */

// Polyfill for BigInt serialization (used by native bindings)
// @ts-ignore
if (typeof BigInt.prototype.toJSON === 'undefined') {
  // @ts-ignore
  BigInt.prototype.toJSON = function() {
    return this.toString();
  };
}

// Ensure console methods are available
global.console = {
  ...console,
  log: jest.fn(console.log),
  error: jest.fn(console.error),
  warn: jest.fn(console.warn),
  info: jest.fn(console.info),
  debug: jest.fn(console.debug),
};
