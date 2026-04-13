//! CrowdGenome WASM Bridge
//!
//! Thin wrapper around nano-zyrkel-wasm-core that re-exports the
//! ConfigReader, Stats, Cache, and DataLoader for use in the browser.
//!
//! The pre-built WASM artifacts from schlein-lab/nano-zyrkel releases
//! are used directly in docs/wasm/. This crate exists as source
//! reference and for custom builds via `wasm-pack build --target web`.

// Re-export everything from nano-zyrkel-wasm-core.
// The pre-built release artifacts already include all exports;
// this crate is only needed if you want to extend with custom functions.

pub use nano_zyrkel_wasm_core::*;
