/**
 * UseApi adapter for @automerge/automerge/slim
 *
 * This module bridges the ubrn-generated TypeScript API (from UniFFI Rust bindings)
 * to the `API` interface expected by `@automerge/automerge/slim`'s `UseApi()`.
 *
 * Usage:
 *   import { UseApi } from '@automerge/automerge/slim';
 *   import { nativeApi } from 'react-native-automerge-generated';
 *   UseApi(nativeApi);
 *
 * After calling UseApi(), all automerge operations use native Rust instead of WASM.
 */

// TODO: These imports will be available after running `ubrn build ios --and-generate`
// import {
//   Doc,
//   SyncState,
//   ObjType,
//   Value,
//   ScalarValue,
//   Prop,
//   Position,
//   ExpandMark,
//   TextEncoding,
//   root,
// } from './generated/automerge';

// =============================================================================
// Type mapping notes
// =============================================================================
//
// | automerge/slim expects            | Generated API provides              | Adapter maps          |
// |------------------------------------|--------------------------------------|-----------------------|
// | ObjID (string "_root"/"2@abc123") | ObjId (custom type, Uint8Array)     | string <-> bytes      |
// | Prop (string or number)           | Prop tagged enum (Key/Index)        | wrap/unwrap           |
// | Value (JS primitive)              | Value tagged enum (Object/Scalar)   | convert               |
// | Heads (string[])                  | sequence<ChangeHash> (Uint8Array[]) | hex <-> bytes         |
// | Change (Uint8Array)               | sequence<u8> (Uint8Array)           | passthrough           |
// | Patch[]                           | sequence<Patch>                     | reshape records       |

// =============================================================================
// Placeholder: NativeAutomerge class
// =============================================================================
//
// This class wraps the ubrn-generated `Doc` class and implements the ~50 methods
// expected by @automerge/automerge/slim's internal Automerge class interface.
//
// Key method groups:
//
// Mutation:
//   put(), putObject(), insert(), insertObject(), push(), delete(),
//   increment(), splice()
//
// Query:
//   get(), getWithType(), getAll(), keys(), text(), length(), objInfo()
//
// Lifecycle:
//   clone(), fork(), free(), commit(), rollback(), pendingOps()
//
// Persistence:
//   save(), saveIncremental(), loadIncremental()
//
// Changes:
//   applyChanges(), getChanges(), getHeads(), getActorId(),
//   getLastLocalChange(), getMissingDeps(), getChangesAdded(), emptyChange()
//
// Sync:
//   generateSyncMessage(), receiveSyncMessage(), hasOurChanges()
//
// Materialization:
//   materialize(), toJS(), applyPatches(), diff(), diffIncremental()
//
// Text/Marks:
//   mark(), unmark(), marks(), marksAt(), spans(), updateText()
//
// Cursors:
//   getCursor(), getCursorPosition()
//
// Rich text:
//   splitBlock(), joinBlock(), updateBlock(), getBlock()

// =============================================================================
// Placeholder: nativeApi object
// =============================================================================
//
// The nativeApi object implements the 12 top-level API methods:
//
// 1.  create(options?) -> Automerge
// 2.  load(data, options?) -> Automerge
// 3.  encodeChange(change) -> Uint8Array
// 4.  decodeChange(data) -> DecodedChange
// 5.  initSyncState() -> SyncState
// 6.  encodeSyncMessage(msg) -> Uint8Array
// 7.  decodeSyncMessage(data) -> DecodedSyncMessage
// 8.  encodeSyncState(state) -> Uint8Array
// 9.  decodeSyncState(data) -> SyncState
// 10. exportSyncState(state) -> JsSyncState
// 11. importSyncState(obj) -> SyncState
// 12. readBundle(data) -> DecodedBundle

// TODO: Implement after ubrn generates the TypeScript bindings.
// The implementation will:
// 1. Import the generated Doc/SyncState classes from ./generated/automerge
// 2. Create a NativeAutomerge class wrapping Doc with the ~50 methods
// 3. Create the nativeApi object with the 12 top-level methods
// 4. Export nativeApi for consumers to pass to UseApi()

export {};
