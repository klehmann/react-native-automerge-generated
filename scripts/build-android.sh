#!/bin/bash
# Build for Android and generate React Native bindings
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Ensure rustup toolchain is used (not Homebrew Rust)
export PATH="$HOME/.cargo/bin:$PATH"

echo "Using rustc: $(which rustc) ($(rustc --version))"
echo "Using cargo: $(which cargo) ($(cargo --version))"
echo ""

# Ensure Android targets are installed
rustup target add aarch64-linux-android armv7-linux-androideabi x86_64-linux-android 2>/dev/null || true

cd "$PROJECT_DIR"
npx ubrn build android --config ubrn.config.yaml --and-generate "$@"

echo ""
echo "Android build complete. Generated files:"
echo "  - src/generated/"
echo "  - cpp/generated/"
echo "  - android/"
