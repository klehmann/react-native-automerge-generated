#!/bin/bash
# Add UseApi export to index.ts after ubrn generation

INDEX_FILE="src/index.ts"
EXPORT_LINE="export { nativeApi, NativeAutomerge, NativeSyncState } from './useapi-adapter';"

# Check if export already exists
if grep -q "export { nativeApi" "$INDEX_FILE"; then
    echo "UseApi export already present in index.ts"
else
    # Insert before "Export the crates as individually namespaced objects"
    sed -i '' '/\/\/ Export the crates as individually namespaced objects/i\
// Export the UseApi adapter for native Automerge integration\
'"$EXPORT_LINE"'\
\
' "$INDEX_FILE"
    echo "✓ Added UseApi export to index.ts"
fi
