# Tests for react-native-automerge-generated

Comprehensive test suite for the native Automerge wrapper.

## ⚠️ Current Status

The test suite is **currently blocked** by a Jest/TypeScript/ESM compatibility issue with `uniffi-bindgen-react-native`. The package exports TypeScript source files with ES modules, which Jest cannot easily transform in a Node.js environment.

**Workaround options:**
1. Run tests in a React Native environment (e.g., using Detox or similar)
2. Create a mock implementation of the native bindings for Jest
3. Use an integration test app (like mindoodb-test-app) for validation

The test app at `/Users/klehmann/expo/mindoodb-test-app` successfully validates the native wrapper in a real React Native environment.

## Prerequisites (when Jest support is fixed)

The native module must be built before running tests:

```bash
# Build for iOS (on macOS)
npm run build:ios

# Or build for Android (requires Android NDK)
npm run build:android
```

## Installation

Install test dependencies:

```bash
npm install
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

## Test Coverage

The test suite covers:

### Document Operations
- ✅ Document creation with default and custom actor IDs
- ✅ Clone operations

### Map Operations
- ✅ Set and get properties (string, number, boolean, null)
- ✅ Delete properties
- ✅ Nested objects

### List Operations
- ✅ Create and manipulate arrays
- ✅ Insert at specific positions
- ✅ Delete items
- ✅ Lists of numbers and nested lists

### Text Operations
- ✅ Create Text objects
- ✅ Insert text
- ✅ Delete text

### Counter Operations
- ✅ Create counters
- ✅ Increment/decrement

### Persistence
- ✅ Save documents to bytes
- ✅ Load documents from bytes
- ✅ Preserve changes through save/load cycle

### Merge Operations
- ✅ Merge concurrent changes
- ✅ Handle conflicts
- ✅ Merge list insertions

### Change History
- ✅ Track change history
- ✅ Apply changes incrementally
- ✅ Get changes between documents

### decodeChange
- ✅ Decode change metadata (hash, actor, seq, startOp, time, message, deps)
- ✅ Decode multiple changes with dependencies

### Sync Protocol
- ✅ Generate sync messages
- ✅ Receive sync messages
- ✅ Complete full sync cycle

### Heads and History
- ✅ Get document heads
- ✅ Compare heads

### Complex Structures
- ✅ Deeply nested objects
- ✅ Mixed types in lists
- ✅ Arrays of objects

### Edge Cases
- ✅ Empty strings, arrays, objects
- ✅ Actor ID retrieval

## Test Structure

Tests are organized by functionality:
- `Document Creation` - Basic document lifecycle
- `Map Operations` - Key-value operations
- `List Operations` - Array operations
- `Text Operations` - Text CRDT operations
- `Counter Operations` - Counter CRDT operations
- `Save and Load` - Persistence
- `Merge Operations` - CRDT merging
- `Change History` - Change tracking
- `decodeChange` - Change decoding
- `Sync Protocol` - Network sync
- `Complex Document Structures` - Real-world use cases

## Notes

- Tests run against the **actual native implementation**, not mocks
- The native module must be built before running tests
- Tests use `@automerge/automerge/slim` with our native API injected via `UseApi()`
- Coverage reports are generated in `coverage/` directory
