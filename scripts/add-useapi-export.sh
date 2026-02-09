#!/bin/bash
# Add UseApi export to index.ts after ubrn generation

INDEX_FILE="src/index.ts"
EXPORT_LINE="export { nativeApi, NativeAutomerge, NativeSyncState, Automerge } from './useapi-adapter';"

# Check if export already exists
if grep -q "export { nativeApi" "$INDEX_FILE"; then
    echo "UseApi export already present in index.ts"

    # Verify Automerge is included in the export
    if ! grep -q "Automerge } from './useapi-adapter'" "$INDEX_FILE"; then
        echo "⚠️  WARNING: Automerge export is missing! This will cause fallback to WASM mode."
        echo "   Run: git checkout src/index.ts"
        echo "   Then re-run this script."
    fi
else
    # Insert before "Export the crates as individually namespaced objects"
    sed -i '' '/\/\/ Export the crates as individually namespaced objects/i\
// Export the UseApi adapter for native Automerge integration\
// IMPORTANT: Automerge export provides WASM-compatible API - do not remove!\
'"$EXPORT_LINE"'\
\
' "$INDEX_FILE"
    echo "✓ Added UseApi export to index.ts (including Automerge)"
fi
