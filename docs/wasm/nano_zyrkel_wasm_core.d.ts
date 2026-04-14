/* tslint:disable */
/* eslint-disable */

/**
 * Builder for grouped aggregation queries.
 */
export class Aggregator {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Average the numeric value of `field` per group.
     */
    avg(field: string, data: any): any;
    /**
     * Count records per group. Returns an object `{ group: count }`.
     */
    count(data: any): any;
    /**
     * Group records by the value of `field`. Records where the field is
     * missing are grouped under the empty string `""`.
     */
    groupBy(field: string): Aggregator;
    /**
     * Maximum numeric value of `field` per group.
     */
    max(field: string, data: any): any;
    /**
     * Minimum numeric value of `field` per group.
     */
    min(field: string, data: any): any;
    /**
     * Create an empty aggregator.
     */
    constructor();
    /**
     * Sum the numeric value of `field` per group.
     */
    sum(field: string, data: any): any;
}

/**
 * Key/value cache scoped by `namespace`. Multiple caches can coexist on the
 * same page without colliding because every key is internally prefixed.
 */
export class Cache {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Get a cached value by key. Returns `null` if missing or expired.
     */
    get(key: string): Promise<any>;
    /**
     * Drop a single key.
     */
    invalidate(key: string): Promise<void>;
    /**
     * Drop every key under this namespace.
     */
    invalidateAll(): Promise<void>;
    /**
     * Create a new cache scoped under `namespace`. Pick a string that is
     * unique to your nano-zyrkel (e.g. its `id` from `hats/config.json`).
     */
    constructor(namespace: string);
    /**
     * Store a value under `key`. Pass `ttl_seconds = 0` for "never expires".
     */
    set(key: string, value: any, ttl_seconds: number): Promise<void>;
}

/**
 * Lazy reader over the parsed `hats/config.json`.
 *
 * Methods take an optional dot path so a consumer can pull out custom
 * fields without having to declare them on the Rust side.
 */
export class ConfigReader {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Branding color from `branding.color` if present.
     */
    brandingColor(): string | undefined;
    /**
     * `description` free-text field.
     */
    description(): string;
    /**
     * Build a reader directly from a JS object — useful for tests or for
     * repos that bundle the config inline.
     */
    static fromValue(value: any): ConfigReader;
    /**
     * Generic dot-path getter. Returns `null` if the path is missing.
     * Example: `cfg.get('notify.telegram')`.
     */
    get(path: string): any;
    /**
     * `id` field — typically the nano-zyrkel slug.
     */
    id(): string;
    /**
     * `lang` field, used by [`I18n`](super::i18n::I18n). Defaults to `"de"`.
     */
    lang(): string;
    /**
     * Load the config from a relative URL (typically `hats/config.json`).
     * Throws on network or parse errors.
     */
    static load(url: string): Promise<ConfigReader>;
    /**
     * `type` field (e.g. `data-pipeline`, `interactive-app`, `showcase`).
     */
    nanoType(): string;
    /**
     * Returns the entire config as a `JsValue` for cases where the consumer
     * wants to walk it themselves.
     */
    raw(): any;
}

/**
 * Stateless namespace for CSV helpers.
 */
export class Csv {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Trigger a browser "Save As" dialog with the given CSV body.
     * Creates a Blob, builds an `<a download>` element, clicks it,
     * and revokes the object URL afterwards.
     */
    static download(filename: string, body: string): void;
    /**
     * Convert a JSON array of objects into a CSV string.
     *
     * The header row is the union of every key seen in the array,
     * sorted alphabetically. Missing fields render as empty cells.
     * Cells containing commas, double quotes or newlines are quoted
     * according to RFC 4180.
     */
    static fromJsonArray(data: any): string;
}

/**
 * Generic JSON loader.
 *
 * All methods return the parsed JSON as a `JsValue` so the calling code can
 * either use it directly or run it through `serde-wasm-bindgen` to convert
 * into typed structs.
 */
export class DataLoader {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Fetch a JSON document and return it as a `JsValue`.
     *
     * Throws a JS error on network failure or non-2xx response.
     */
    fetch(path: string): Promise<any>;
    /**
     * Fetch text content (any MIME type) and return it as a string.
     */
    fetchText(path: string): Promise<string>;
    /**
     * Create a new loader with no base URL prefix. Paths passed to
     * [`DataLoader::fetch`] are resolved against the document's origin.
     */
    constructor();
    /**
     * Create a loader that prefixes every relative path with `base`.
     * Useful when the data lives on a different host or under a CDN path.
     */
    static withBase(base: string): DataLoader;
}

/**
 * Stateless namespace exposed to JavaScript. Methods take and return
 * Unix milliseconds (`f64`) so they compose freely with `Date.now()`
 * on the JS side.
 */
export class DateTime {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Add `days` to a timestamp. `days` may be negative.
     */
    static addDays(unix_ms: number, days: number): number;
    /**
     * Add `hours` to a timestamp.
     */
    static addHours(unix_ms: number, hours: number): number;
    /**
     * Add `minutes` to a timestamp.
     */
    static addMinutes(unix_ms: number, minutes: number): number;
    /**
     * Difference in whole days between `a` and `b` (a − b).
     */
    static diffDays(a: number, b: number): number;
    /**
     * Difference in whole hours between `a` and `b` (a − b).
     */
    static diffHours(a: number, b: number): number;
    /**
     * Difference in whole minutes between `a` and `b` (a − b).
     */
    static diffMinutes(a: number, b: number): number;
    /**
     * Build a Unix-ms timestamp from an ISO 8601 string. Returns
     * `NaN` for unparseable input — pair with `JsValue::is_finite`.
     */
    static fromIso(iso: string): number;
    /**
     * Current Unix milliseconds.
     */
    static now(): number;
    /**
     * Inclusive list of `YYYY-MM-DD` strings between `from` and `to`.
     * Returns at most 366 entries.
     */
    static rangeDays(from: number, to: number): any[];
    /**
     * Truncate to local-midnight.
     */
    static startOfDay(unix_ms: number): number;
    /**
     * Truncate to the first day of the month at 00:00.
     */
    static startOfMonth(unix_ms: number): number;
    /**
     * Truncate to the local Monday at 00:00.
     */
    static startOfWeek(unix_ms: number): number;
    /**
     * Render `unix_ms` as `YYYY-MM-DD`.
     */
    static toDate(unix_ms: number): string;
    /**
     * Render `unix_ms` as an ISO 8601 timestamp (`YYYY-MM-DDTHH:MM:SSZ`).
     */
    static toIso(unix_ms: number): string;
    /**
     * Render `unix_ms` as `HH:MM`.
     */
    static toTime(unix_ms: number): string;
}

/**
 * Stateless namespace for diff operations.
 */
export class Diff {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Diff two JSON arrays keyed by `key_field`.
     *
     * - Records present in `new_data` but not `old_data` are reported as
     *   *added*.
     * - Records present in `old_data` but not `new_data` are reported as
     *   *removed*.
     * - Records present in both whose JSON serialization differs are
     *   reported as *modified*, together with the list of changed top-level
     *   field names.
     */
    static byKey(key_field: string, old_data: any, new_data: any): any;
}

/**
 * Builder for chained filter predicates.
 *
 * All `where*` methods consume `self` and return `Self` so calls can be
 * chained. Predicates combine with logical AND.
 */
export class Filter {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Apply this filter to a JSON array. Returns a new array of matching
     * records. Non-array inputs return an empty array.
     */
    apply(data: any): any;
    /**
     * Convenience: count matching records without materializing them.
     */
    count(data: any): number;
    /**
     * Empty filter that matches every record.
     */
    constructor();
    /**
     * Keep records whose stringified `field` contains `substr`
     * (case-insensitive).
     */
    whereContains(field: string, substr: string): Filter;
    /**
     * Keep records where `field == value` (string compare).
     */
    whereEq(field: string, value: string): Filter;
    /**
     * Keep records where `field` exists (is not null/undefined).
     */
    whereExists(field: string): Filter;
    /**
     * Keep records where `field > value` (numeric compare).
     */
    whereGt(field: string, value: number): Filter;
    /**
     * Keep records where `field >= value` (numeric compare).
     */
    whereGte(field: string, value: number): Filter;
    /**
     * Keep records where `field` is one of `values` (string compare).
     */
    whereIn(field: string, values: any[]): Filter;
    /**
     * Keep records where `field < value` (numeric compare).
     */
    whereLt(field: string, value: number): Filter;
    /**
     * Keep records where `field <= value` (numeric compare).
     */
    whereLte(field: string, value: number): Filter;
    /**
     * Keep records where `field != value` (string compare).
     */
    whereNe(field: string, value: string): Filter;
    /**
     * Keep records whose stringified `field` starts with `prefix`.
     */
    whereStartsWith(field: string, prefix: string): Filter;
}

/**
 * Tiny i18n catalog. Stores one JSON object per language and resolves
 * keys with substitution.
 */
export class I18n {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Currently active language tag.
     */
    lang(): string;
    /**
     * Create a new catalog. `lang` is the desired language; the fallback
     * chain is `lang → "en" → key`.
     */
    constructor(lang: string);
    /**
     * Register a translation table for one language. `messages` should be
     * a flat JS object `{ key: "translated string" }`.
     */
    register(lang: string, messages: any): void;
    /**
     * Switch the active language at runtime.
     */
    setLang(lang: string): void;
    /**
     * Resolve `key` for the configured language. Returns `key` itself
     * when no translation is found in any catalog.
     */
    t(key: string): string;
    /**
     * Resolve `key` and substitute named placeholders from `vars`
     * (e.g. `t_with('greeting', {name: 'World'})`).
     */
    tWith(key: string, vars: any): string;
}

/**
 * Stateless namespace for retry helpers.
 */
export class Retry {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Fetch a URL with exponential backoff. Doubles the delay between
     * attempts starting at 200ms and capped at 5 seconds.
     */
    static fetchJson(url: string, max_attempts: number): Promise<any>;
}

export class Router {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Return the current route fragment (without the leading `#`).
     */
    static current(): string;
    /**
     * Programmatically navigate to a path. Updates the URL fragment;
     * the registered handler fires via `hashchange`.
     */
    static navigate(path: string): void;
    /**
     * Build an empty router.
     */
    constructor();
    /**
     * Register a route. The pattern may contain a single `:param`
     * segment (e.g. `/gene/:id`); the captured value is passed to the
     * handler as `{ id: "BRCA1" }`.
     */
    on(pattern: string, handler: Function): void;
    /**
     * Register a fallback handler used when no route matches.
     */
    onNotFound(handler: Function): void;
    /**
     * Start the router: dispatch the current route immediately and
     * listen for `hashchange` events thereafter.
     */
    start(): void;
}

/**
 * In-memory search index over a JSON array.
 */
export class SearchIndex {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Build an index over `data`, concatenating the values found at each
     * of `fields` (dot paths supported) into a lowercase haystack per
     * record.
     */
    static build(data: any, fields: any[]): SearchIndex;
    /**
     * Fuzzy query: returns indices whose haystack contains a fragment within
     * `max_distance` Levenshtein edits of `q`. `max_distance` is clamped to
     * `[0, 3]` to keep this cheap.
     */
    fuzzyQuery(q: string, max_distance: number): Uint32Array;
    /**
     * Number of indexed records.
     */
    len(): number;
    /**
     * Plain substring query. Returns the indices into the original array
     * that contain `q` (case-insensitive).
     */
    query(q: string): Uint32Array;
}

/**
 * Namespace struct for descriptive statistics. All methods are static and
 * take a JavaScript array of numbers as input.
 */
export class Stats {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Chi-square goodness-of-fit between observed and expected frequencies.
     */
    static chiSquare(observed: Float64Array, expected: Float64Array): number;
    /**
     * Pearson correlation coefficient. `xs` and `ys` must have the same
     * length. Returns 0 for length-mismatched or constant input.
     */
    static correlation(xs: Float64Array, ys: Float64Array): number;
    /**
     * Ordinary least-squares linear regression. Returns `[slope, intercept]`
     * as a two-element array. Returns `[0, 0]` for length-mismatched input.
     */
    static linearRegression(xs: Float64Array, ys: Float64Array): Float64Array;
    /**
     * Maximum value. Returns `NaN` for empty input.
     */
    static max(values: Float64Array): number;
    /**
     * Arithmetic mean. Returns 0 for empty input.
     */
    static mean(values: Float64Array): number;
    /**
     * Median. Returns 0 for empty input. For even-length input the average
     * of the two middle elements is returned.
     */
    static median(values: Float64Array): number;
    /**
     * Minimum value. Returns `NaN` for empty input.
     */
    static min(values: Float64Array): number;
    /**
     * Quantile / percentile (linear interpolation between closest ranks).
     * `p` is in `[0, 1]`. Returns 0 for empty input.
     */
    static percentile(values: Float64Array, p: number): number;
    /**
     * Population standard deviation. Returns 0 for n < 2.
     */
    static stdDev(values: Float64Array): number;
    /**
     * Sum of all values.
     */
    static sum(values: Float64Array): number;
    /**
     * Population variance. Returns 0 for n < 2.
     */
    static variance(values: Float64Array): number;
}

/**
 * Central registry for WASM CLI tools. Create one per nano-zyrkel and
 * register the tools it needs; they are lazy-loaded on first use.
 */
export class ToolRegistry {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Ensure a tool's WASM module is loaded. Called automatically by
     * `exec`, but can be called explicitly for eager loading.
     */
    ensureLoaded(name: string): Promise<void>;
    /**
     * Mount files into a tool's virtual filesystem, run a command, and
     * return the result.
     *
     * - `name`: Registered tool name.
     * - `args`: Command-line arguments as a JS array of strings.
     * - `files`: Optional object `{ filename: content_string }` to mount
     *   before execution.
     */
    exec(name: string, args: any, files: any): Promise<ToolResult>;
    /**
     * Check whether a specific tool is loaded.
     */
    isLoaded(name: string): boolean;
    /**
     * Create an empty registry.
     */
    constructor();
    /**
     * Run a pipeline of tools. Each step's stdout is piped to the next
     * step's stdin via a temporary file.
     *
     * `steps` is a JS array of `{ tool: string, args: string[] }` objects.
     * `files` are mounted before the first step.
     */
    pipe(steps: any, files: any): Promise<ToolResult>;
    /**
     * Declare a tool. It is **not** loaded yet — only on first `exec`.
     *
     * - `name`: Tool name as known by the CDN (e.g. `"minimap2"`).
     * - `version`: Exact version string (e.g. `"2.22"`).
     * - `cdn`: CDN provider. Currently only `"biowasm"` is supported.
     */
    register(name: string, version: string, cdn: string): void;
    /**
     * Register multiple tools from a JS array of `{name, version, cdn?}` objects.
     * Convenience for reading the tool list from `hats/config.json`.
     */
    registerAll(tools_array: any): void;
    /**
     * Return the status of all registered tools.
     */
    status(): ToolStatus[];
    /**
     * Unload a tool, freeing its WASM instance. The tool can be
     * re-loaded later via `exec` or `ensureLoaded`.
     */
    unload(name: string): void;
    /**
     * Number of registered tools.
     */
    readonly count: number;
}

/**
 * Result of a single tool invocation.
 */
export class ToolResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Wall-clock time in milliseconds.
     */
    readonly elapsedMs: number;
    /**
     * Standard error of the tool.
     */
    readonly stderr: string;
    /**
     * Standard output of the tool.
     */
    readonly stdout: string;
}

/**
 * Status of a single registered tool.
 */
export class ToolStatus {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    readonly loaded: boolean;
    readonly name: string;
    readonly version: string;
}

/**
 * Stateless namespace for URL ↔ state synchronization.
 */
export class UrlState {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Register a callback fired on `popstate` (back / forward
     * navigation). The callback receives the new state object.
     */
    static onChange(callback: Function): void;
    /**
     * Read the current URL query string into a plain JS object.
     * Repeated keys collapse into the last value seen.
     */
    static read(): any;
    /**
     * Replace the current URL query string with a serialized form of
     * `state` (a plain JS object). Skips empty values.
     */
    static write(state: any): void;
}

export class WebSocketClient {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Close the connection cleanly.
     */
    close(): void;
    /**
     * Open a new WebSocket connection. The handshake completes
     * asynchronously — register an `onOpen` handler to be notified.
     */
    constructor(url: string);
    /**
     * Register a handler fired when the connection closes.
     */
    onClose(callback: Function): void;
    /**
     * Register a handler fired when an error occurs on the socket.
     */
    onError(callback: Function): void;
    /**
     * Register a handler that parses every text message as JSON and
     * forwards the parsed value. Messages that fail to parse are
     * silently ignored — register `onText` for raw access.
     */
    onJson(callback: Function): void;
    /**
     * Register a handler fired when the connection opens.
     */
    onOpen(callback: Function): void;
    /**
     * Register a handler that receives every text message as a string.
     */
    onText(callback: Function): void;
    /**
     * Underlying ready state (`0=connecting`, `1=open`, `2=closing`,
     * `3=closed`).
     */
    readyState(): number;
    /**
     * Serialize a JS value as JSON and send it as a text frame.
     */
    sendJson(value: any): void;
    /**
     * Send a text frame to the server.
     */
    sendText(text: string): void;
}

/**
 * Install the panic hook so Rust panics show up in the browser console as
 * readable stack traces. Call this once at startup from JavaScript:
 *
 * ```js
 * import init, { install_panic_hook } from './core/wasm/nano_zyrkel_wasm_core.js';
 * await init();
 * install_panic_hook();
 * ```
 */
export function install_panic_hook(): void;

/**
 * Returns the semver string this WASM bundle was built with. Useful for
 * runtime version pinning checks in user-repo glue code.
 */
export function version(): string;

/**
 * Convenience: render the WASM SDK schema as a JSON object.
 */
export function wasmSdkSchema(): any;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_aggregator_free: (a: number, b: number) => void;
    readonly __wbg_cache_free: (a: number, b: number) => void;
    readonly __wbg_configreader_free: (a: number, b: number) => void;
    readonly __wbg_csv_free: (a: number, b: number) => void;
    readonly __wbg_filter_free: (a: number, b: number) => void;
    readonly __wbg_i18n_free: (a: number, b: number) => void;
    readonly __wbg_router_free: (a: number, b: number) => void;
    readonly __wbg_searchindex_free: (a: number, b: number) => void;
    readonly __wbg_toolregistry_free: (a: number, b: number) => void;
    readonly __wbg_toolresult_free: (a: number, b: number) => void;
    readonly __wbg_toolstatus_free: (a: number, b: number) => void;
    readonly __wbg_websocketclient_free: (a: number, b: number) => void;
    readonly aggregator_avg: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly aggregator_count: (a: number, b: number, c: number) => void;
    readonly aggregator_groupBy: (a: number, b: number, c: number) => number;
    readonly aggregator_max: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly aggregator_min: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly aggregator_new: () => number;
    readonly aggregator_sum: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly cache_get: (a: number, b: number, c: number) => number;
    readonly cache_invalidate: (a: number, b: number, c: number) => number;
    readonly cache_invalidateAll: (a: number) => number;
    readonly cache_new: (a: number, b: number) => number;
    readonly cache_set: (a: number, b: number, c: number, d: number, e: number) => number;
    readonly configreader_brandingColor: (a: number, b: number) => void;
    readonly configreader_description: (a: number, b: number) => void;
    readonly configreader_fromValue: (a: number, b: number) => void;
    readonly configreader_get: (a: number, b: number, c: number) => number;
    readonly configreader_id: (a: number, b: number) => void;
    readonly configreader_lang: (a: number, b: number) => void;
    readonly configreader_load: (a: number, b: number) => number;
    readonly configreader_nanoType: (a: number, b: number) => void;
    readonly configreader_raw: (a: number) => number;
    readonly csv_download: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly csv_fromJsonArray: (a: number, b: number) => void;
    readonly dataloader_fetch: (a: number, b: number, c: number) => number;
    readonly dataloader_fetchText: (a: number, b: number, c: number) => number;
    readonly dataloader_new: () => number;
    readonly dataloader_withBase: (a: number, b: number) => number;
    readonly datetime_addDays: (a: number, b: number) => number;
    readonly datetime_addHours: (a: number, b: number) => number;
    readonly datetime_addMinutes: (a: number, b: number) => number;
    readonly datetime_diffDays: (a: number, b: number) => number;
    readonly datetime_diffHours: (a: number, b: number) => number;
    readonly datetime_diffMinutes: (a: number, b: number) => number;
    readonly datetime_fromIso: (a: number, b: number) => number;
    readonly datetime_rangeDays: (a: number, b: number, c: number) => void;
    readonly datetime_startOfDay: (a: number) => number;
    readonly datetime_startOfMonth: (a: number) => number;
    readonly datetime_startOfWeek: (a: number) => number;
    readonly datetime_toDate: (a: number, b: number) => void;
    readonly datetime_toIso: (a: number, b: number) => void;
    readonly datetime_toTime: (a: number, b: number) => void;
    readonly diff_byKey: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly filter_apply: (a: number, b: number, c: number) => void;
    readonly filter_count: (a: number, b: number, c: number) => void;
    readonly filter_new: () => number;
    readonly filter_whereContains: (a: number, b: number, c: number, d: number, e: number) => number;
    readonly filter_whereEq: (a: number, b: number, c: number, d: number, e: number) => number;
    readonly filter_whereExists: (a: number, b: number, c: number) => number;
    readonly filter_whereGt: (a: number, b: number, c: number, d: number) => number;
    readonly filter_whereGte: (a: number, b: number, c: number, d: number) => number;
    readonly filter_whereIn: (a: number, b: number, c: number, d: number, e: number) => number;
    readonly filter_whereLt: (a: number, b: number, c: number, d: number) => number;
    readonly filter_whereLte: (a: number, b: number, c: number, d: number) => number;
    readonly filter_whereNe: (a: number, b: number, c: number, d: number, e: number) => number;
    readonly filter_whereStartsWith: (a: number, b: number, c: number, d: number, e: number) => number;
    readonly i18n_lang: (a: number, b: number) => void;
    readonly i18n_new: (a: number, b: number) => number;
    readonly i18n_register: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly i18n_setLang: (a: number, b: number, c: number) => void;
    readonly i18n_t: (a: number, b: number, c: number, d: number) => void;
    readonly i18n_tWith: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly install_panic_hook: () => void;
    readonly retry_fetchJson: (a: number, b: number, c: number) => number;
    readonly router_current: (a: number) => void;
    readonly router_navigate: (a: number, b: number, c: number) => void;
    readonly router_new: () => number;
    readonly router_on: (a: number, b: number, c: number, d: number) => void;
    readonly router_onNotFound: (a: number, b: number) => void;
    readonly router_start: (a: number, b: number) => void;
    readonly searchindex_build: (a: number, b: number, c: number, d: number) => void;
    readonly searchindex_fuzzyQuery: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly searchindex_len: (a: number) => number;
    readonly searchindex_query: (a: number, b: number, c: number, d: number) => void;
    readonly stats_chiSquare: (a: number, b: number, c: number, d: number) => number;
    readonly stats_correlation: (a: number, b: number, c: number, d: number) => number;
    readonly stats_linearRegression: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly stats_max: (a: number, b: number) => number;
    readonly stats_mean: (a: number, b: number) => number;
    readonly stats_median: (a: number, b: number) => number;
    readonly stats_min: (a: number, b: number) => number;
    readonly stats_percentile: (a: number, b: number, c: number) => number;
    readonly stats_stdDev: (a: number, b: number) => number;
    readonly stats_sum: (a: number, b: number) => number;
    readonly stats_variance: (a: number, b: number) => number;
    readonly toolregistry_count: (a: number) => number;
    readonly toolregistry_ensureLoaded: (a: number, b: number, c: number) => number;
    readonly toolregistry_exec: (a: number, b: number, c: number, d: number, e: number) => number;
    readonly toolregistry_isLoaded: (a: number, b: number, c: number) => number;
    readonly toolregistry_new: () => number;
    readonly toolregistry_pipe: (a: number, b: number, c: number) => number;
    readonly toolregistry_register: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
    readonly toolregistry_registerAll: (a: number, b: number, c: number) => void;
    readonly toolregistry_status: (a: number, b: number) => void;
    readonly toolregistry_unload: (a: number, b: number, c: number) => void;
    readonly toolresult_elapsedMs: (a: number) => number;
    readonly toolresult_stderr: (a: number, b: number) => void;
    readonly toolresult_stdout: (a: number, b: number) => void;
    readonly toolstatus_loaded: (a: number) => number;
    readonly toolstatus_name: (a: number, b: number) => void;
    readonly toolstatus_version: (a: number, b: number) => void;
    readonly urlstate_onChange: (a: number, b: number) => void;
    readonly urlstate_read: (a: number) => void;
    readonly urlstate_write: (a: number, b: number) => void;
    readonly version: (a: number) => void;
    readonly wasmSdkSchema: (a: number) => void;
    readonly websocketclient_close: (a: number, b: number) => void;
    readonly websocketclient_new: (a: number, b: number, c: number) => void;
    readonly websocketclient_onClose: (a: number, b: number) => void;
    readonly websocketclient_onError: (a: number, b: number) => void;
    readonly websocketclient_onJson: (a: number, b: number) => void;
    readonly websocketclient_onOpen: (a: number, b: number) => void;
    readonly websocketclient_onText: (a: number, b: number) => void;
    readonly websocketclient_readyState: (a: number) => number;
    readonly websocketclient_sendJson: (a: number, b: number, c: number) => void;
    readonly websocketclient_sendText: (a: number, b: number, c: number, d: number) => void;
    readonly datetime_now: () => number;
    readonly __wbg_datetime_free: (a: number, b: number) => void;
    readonly __wbg_diff_free: (a: number, b: number) => void;
    readonly __wbg_retry_free: (a: number, b: number) => void;
    readonly __wbg_stats_free: (a: number, b: number) => void;
    readonly __wbg_urlstate_free: (a: number, b: number) => void;
    readonly __wbg_dataloader_free: (a: number, b: number) => void;
    readonly __wasm_bindgen_func_elem_1844: (a: number, b: number, c: number, d: number) => void;
    readonly __wasm_bindgen_func_elem_1850: (a: number, b: number, c: number, d: number) => void;
    readonly __wasm_bindgen_func_elem_482: (a: number, b: number, c: number) => void;
    readonly __wasm_bindgen_func_elem_482_2: (a: number, b: number, c: number) => void;
    readonly __wasm_bindgen_func_elem_482_3: (a: number, b: number, c: number) => void;
    readonly __wbindgen_export: (a: number, b: number) => number;
    readonly __wbindgen_export2: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_export3: (a: number) => void;
    readonly __wbindgen_export4: (a: number, b: number, c: number) => void;
    readonly __wbindgen_export5: (a: number, b: number) => void;
    readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
