/* @ts-self-types="./nano_zyrkel_wasm_core.d.ts" */

/**
 * Builder for grouped aggregation queries.
 */
export class Aggregator {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Aggregator.prototype);
        obj.__wbg_ptr = ptr;
        AggregatorFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        AggregatorFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_aggregator_free(ptr, 0);
    }
    /**
     * Average the numeric value of `field` per group.
     * @param {string} field
     * @param {any} data
     * @returns {any}
     */
    avg(field, data) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(field, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len0 = WASM_VECTOR_LEN;
            wasm.aggregator_avg(retptr, this.__wbg_ptr, ptr0, len0, addHeapObject(data));
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            if (r2) {
                throw takeObject(r1);
            }
            return takeObject(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Count records per group. Returns an object `{ group: count }`.
     * @param {any} data
     * @returns {any}
     */
    count(data) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.aggregator_count(retptr, this.__wbg_ptr, addHeapObject(data));
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            if (r2) {
                throw takeObject(r1);
            }
            return takeObject(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Group records by the value of `field`. Records where the field is
     * missing are grouped under the empty string `""`.
     * @param {string} field
     * @returns {Aggregator}
     */
    groupBy(field) {
        const ptr = this.__destroy_into_raw();
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.aggregator_groupBy(ptr, ptr0, len0);
        return Aggregator.__wrap(ret);
    }
    /**
     * Maximum numeric value of `field` per group.
     * @param {string} field
     * @param {any} data
     * @returns {any}
     */
    max(field, data) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(field, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len0 = WASM_VECTOR_LEN;
            wasm.aggregator_max(retptr, this.__wbg_ptr, ptr0, len0, addHeapObject(data));
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            if (r2) {
                throw takeObject(r1);
            }
            return takeObject(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Minimum numeric value of `field` per group.
     * @param {string} field
     * @param {any} data
     * @returns {any}
     */
    min(field, data) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(field, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len0 = WASM_VECTOR_LEN;
            wasm.aggregator_min(retptr, this.__wbg_ptr, ptr0, len0, addHeapObject(data));
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            if (r2) {
                throw takeObject(r1);
            }
            return takeObject(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Create an empty aggregator.
     */
    constructor() {
        const ret = wasm.aggregator_new();
        this.__wbg_ptr = ret >>> 0;
        AggregatorFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Sum the numeric value of `field` per group.
     * @param {string} field
     * @param {any} data
     * @returns {any}
     */
    sum(field, data) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(field, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len0 = WASM_VECTOR_LEN;
            wasm.aggregator_sum(retptr, this.__wbg_ptr, ptr0, len0, addHeapObject(data));
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            if (r2) {
                throw takeObject(r1);
            }
            return takeObject(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
if (Symbol.dispose) Aggregator.prototype[Symbol.dispose] = Aggregator.prototype.free;

/**
 * Key/value cache scoped by `namespace`. Multiple caches can coexist on the
 * same page without colliding because every key is internally prefixed.
 */
export class Cache {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CacheFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_cache_free(ptr, 0);
    }
    /**
     * Get a cached value by key. Returns `null` if missing or expired.
     * @param {string} key
     * @returns {Promise<any>}
     */
    get(key) {
        const ptr0 = passStringToWasm0(key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.cache_get(this.__wbg_ptr, ptr0, len0);
        return takeObject(ret);
    }
    /**
     * Drop a single key.
     * @param {string} key
     * @returns {Promise<void>}
     */
    invalidate(key) {
        const ptr0 = passStringToWasm0(key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.cache_invalidate(this.__wbg_ptr, ptr0, len0);
        return takeObject(ret);
    }
    /**
     * Drop every key under this namespace.
     * @returns {Promise<void>}
     */
    invalidateAll() {
        const ret = wasm.cache_invalidateAll(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * Create a new cache scoped under `namespace`. Pick a string that is
     * unique to your nano-zyrkel (e.g. its `id` from `hats/config.json`).
     * @param {string} namespace
     */
    constructor(namespace) {
        const ptr0 = passStringToWasm0(namespace, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.cache_new(ptr0, len0);
        this.__wbg_ptr = ret >>> 0;
        CacheFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Store a value under `key`. Pass `ttl_seconds = 0` for "never expires".
     * @param {string} key
     * @param {any} value
     * @param {number} ttl_seconds
     * @returns {Promise<void>}
     */
    set(key, value, ttl_seconds) {
        const ptr0 = passStringToWasm0(key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.cache_set(this.__wbg_ptr, ptr0, len0, addHeapObject(value), ttl_seconds);
        return takeObject(ret);
    }
}
if (Symbol.dispose) Cache.prototype[Symbol.dispose] = Cache.prototype.free;

/**
 * Lazy reader over the parsed `hats/config.json`.
 *
 * Methods take an optional dot path so a consumer can pull out custom
 * fields without having to declare them on the Rust side.
 */
export class ConfigReader {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ConfigReader.prototype);
        obj.__wbg_ptr = ptr;
        ConfigReaderFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ConfigReaderFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_configreader_free(ptr, 0);
    }
    /**
     * Branding color from `branding.color` if present.
     * @returns {string | undefined}
     */
    brandingColor() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.configreader_brandingColor(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_export4(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * `description` free-text field.
     * @returns {string}
     */
    description() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.configreader_description(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export4(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Build a reader directly from a JS object — useful for tests or for
     * repos that bundle the config inline.
     * @param {any} value
     * @returns {ConfigReader}
     */
    static fromValue(value) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.configreader_fromValue(retptr, addHeapObject(value));
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            if (r2) {
                throw takeObject(r1);
            }
            return ConfigReader.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Generic dot-path getter. Returns `null` if the path is missing.
     * Example: `cfg.get('notify.telegram')`.
     * @param {string} path
     * @returns {any}
     */
    get(path) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.configreader_get(this.__wbg_ptr, ptr0, len0);
        return takeObject(ret);
    }
    /**
     * `id` field — typically the nano-zyrkel slug.
     * @returns {string}
     */
    id() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.configreader_id(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export4(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * `lang` field, used by [`I18n`](super::i18n::I18n). Defaults to `"de"`.
     * @returns {string}
     */
    lang() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.configreader_lang(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export4(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Load the config from a relative URL (typically `hats/config.json`).
     * Throws on network or parse errors.
     * @param {string} url
     * @returns {Promise<ConfigReader>}
     */
    static load(url) {
        const ptr0 = passStringToWasm0(url, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.configreader_load(ptr0, len0);
        return takeObject(ret);
    }
    /**
     * `type` field (e.g. `data-pipeline`, `interactive-app`, `showcase`).
     * @returns {string}
     */
    nanoType() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.configreader_nanoType(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export4(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Returns the entire config as a `JsValue` for cases where the consumer
     * wants to walk it themselves.
     * @returns {any}
     */
    raw() {
        const ret = wasm.configreader_raw(this.__wbg_ptr);
        return takeObject(ret);
    }
}
if (Symbol.dispose) ConfigReader.prototype[Symbol.dispose] = ConfigReader.prototype.free;

/**
 * Stateless namespace for CSV helpers.
 */
export class Csv {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CsvFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_csv_free(ptr, 0);
    }
    /**
     * Trigger a browser "Save As" dialog with the given CSV body.
     * Creates a Blob, builds an `<a download>` element, clicks it,
     * and revokes the object URL afterwards.
     * @param {string} filename
     * @param {string} body
     */
    static download(filename, body) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(filename, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passStringToWasm0(body, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len1 = WASM_VECTOR_LEN;
            wasm.csv_download(retptr, ptr0, len0, ptr1, len1);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            if (r1) {
                throw takeObject(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Convert a JSON array of objects into a CSV string.
     *
     * The header row is the union of every key seen in the array,
     * sorted alphabetically. Missing fields render as empty cells.
     * Cells containing commas, double quotes or newlines are quoted
     * according to RFC 4180.
     * @param {any} data
     * @returns {string}
     */
    static fromJsonArray(data) {
        let deferred2_0;
        let deferred2_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.csv_fromJsonArray(retptr, addHeapObject(data));
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
            var ptr1 = r0;
            var len1 = r1;
            if (r3) {
                ptr1 = 0; len1 = 0;
                throw takeObject(r2);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export4(deferred2_0, deferred2_1, 1);
        }
    }
}
if (Symbol.dispose) Csv.prototype[Symbol.dispose] = Csv.prototype.free;

/**
 * Generic JSON loader.
 *
 * All methods return the parsed JSON as a `JsValue` so the calling code can
 * either use it directly or run it through `serde-wasm-bindgen` to convert
 * into typed structs.
 */
export class DataLoader {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(DataLoader.prototype);
        obj.__wbg_ptr = ptr;
        DataLoaderFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DataLoaderFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_dataloader_free(ptr, 0);
    }
    /**
     * Fetch a JSON document and return it as a `JsValue`.
     *
     * Throws a JS error on network failure or non-2xx response.
     * @param {string} path
     * @returns {Promise<any>}
     */
    fetch(path) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.dataloader_fetch(this.__wbg_ptr, ptr0, len0);
        return takeObject(ret);
    }
    /**
     * Fetch text content (any MIME type) and return it as a string.
     * @param {string} path
     * @returns {Promise<string>}
     */
    fetchText(path) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.dataloader_fetchText(this.__wbg_ptr, ptr0, len0);
        return takeObject(ret);
    }
    /**
     * Create a new loader with no base URL prefix. Paths passed to
     * [`DataLoader::fetch`] are resolved against the document's origin.
     */
    constructor() {
        const ret = wasm.dataloader_new();
        this.__wbg_ptr = ret >>> 0;
        DataLoaderFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Create a loader that prefixes every relative path with `base`.
     * Useful when the data lives on a different host or under a CDN path.
     * @param {string} base
     * @returns {DataLoader}
     */
    static withBase(base) {
        const ptr0 = passStringToWasm0(base, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.dataloader_withBase(ptr0, len0);
        return DataLoader.__wrap(ret);
    }
}
if (Symbol.dispose) DataLoader.prototype[Symbol.dispose] = DataLoader.prototype.free;

/**
 * Stateless namespace exposed to JavaScript. Methods take and return
 * Unix milliseconds (`f64`) so they compose freely with `Date.now()`
 * on the JS side.
 */
export class DateTime {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DateTimeFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_datetime_free(ptr, 0);
    }
    /**
     * Add `days` to a timestamp. `days` may be negative.
     * @param {number} unix_ms
     * @param {number} days
     * @returns {number}
     */
    static addDays(unix_ms, days) {
        const ret = wasm.datetime_addDays(unix_ms, days);
        return ret;
    }
    /**
     * Add `hours` to a timestamp.
     * @param {number} unix_ms
     * @param {number} hours
     * @returns {number}
     */
    static addHours(unix_ms, hours) {
        const ret = wasm.datetime_addHours(unix_ms, hours);
        return ret;
    }
    /**
     * Add `minutes` to a timestamp.
     * @param {number} unix_ms
     * @param {number} minutes
     * @returns {number}
     */
    static addMinutes(unix_ms, minutes) {
        const ret = wasm.datetime_addMinutes(unix_ms, minutes);
        return ret;
    }
    /**
     * Difference in whole days between `a` and `b` (a − b).
     * @param {number} a
     * @param {number} b
     * @returns {number}
     */
    static diffDays(a, b) {
        const ret = wasm.datetime_diffDays(a, b);
        return ret;
    }
    /**
     * Difference in whole hours between `a` and `b` (a − b).
     * @param {number} a
     * @param {number} b
     * @returns {number}
     */
    static diffHours(a, b) {
        const ret = wasm.datetime_diffHours(a, b);
        return ret;
    }
    /**
     * Difference in whole minutes between `a` and `b` (a − b).
     * @param {number} a
     * @param {number} b
     * @returns {number}
     */
    static diffMinutes(a, b) {
        const ret = wasm.datetime_diffMinutes(a, b);
        return ret;
    }
    /**
     * Build a Unix-ms timestamp from an ISO 8601 string. Returns
     * `NaN` for unparseable input — pair with `JsValue::is_finite`.
     * @param {string} iso
     * @returns {number}
     */
    static fromIso(iso) {
        const ptr0 = passStringToWasm0(iso, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.datetime_fromIso(ptr0, len0);
        return ret;
    }
    /**
     * Current Unix milliseconds.
     * @returns {number}
     */
    static now() {
        const ret = wasm.datetime_now();
        return ret;
    }
    /**
     * Inclusive list of `YYYY-MM-DD` strings between `from` and `to`.
     * Returns at most 366 entries.
     * @param {number} from
     * @param {number} to
     * @returns {any[]}
     */
    static rangeDays(from, to) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.datetime_rangeDays(retptr, from, to);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_export4(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Truncate to local-midnight.
     * @param {number} unix_ms
     * @returns {number}
     */
    static startOfDay(unix_ms) {
        const ret = wasm.datetime_startOfDay(unix_ms);
        return ret;
    }
    /**
     * Truncate to the first day of the month at 00:00.
     * @param {number} unix_ms
     * @returns {number}
     */
    static startOfMonth(unix_ms) {
        const ret = wasm.datetime_startOfMonth(unix_ms);
        return ret;
    }
    /**
     * Truncate to the local Monday at 00:00.
     * @param {number} unix_ms
     * @returns {number}
     */
    static startOfWeek(unix_ms) {
        const ret = wasm.datetime_startOfWeek(unix_ms);
        return ret;
    }
    /**
     * Render `unix_ms` as `YYYY-MM-DD`.
     * @param {number} unix_ms
     * @returns {string}
     */
    static toDate(unix_ms) {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.datetime_toDate(retptr, unix_ms);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export4(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Render `unix_ms` as an ISO 8601 timestamp (`YYYY-MM-DDTHH:MM:SSZ`).
     * @param {number} unix_ms
     * @returns {string}
     */
    static toIso(unix_ms) {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.datetime_toIso(retptr, unix_ms);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export4(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Render `unix_ms` as `HH:MM`.
     * @param {number} unix_ms
     * @returns {string}
     */
    static toTime(unix_ms) {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.datetime_toTime(retptr, unix_ms);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export4(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) DateTime.prototype[Symbol.dispose] = DateTime.prototype.free;

/**
 * Stateless namespace for diff operations.
 */
export class Diff {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DiffFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_diff_free(ptr, 0);
    }
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
     * @param {string} key_field
     * @param {any} old_data
     * @param {any} new_data
     * @returns {any}
     */
    static byKey(key_field, old_data, new_data) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(key_field, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len0 = WASM_VECTOR_LEN;
            wasm.diff_byKey(retptr, ptr0, len0, addHeapObject(old_data), addHeapObject(new_data));
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            if (r2) {
                throw takeObject(r1);
            }
            return takeObject(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
if (Symbol.dispose) Diff.prototype[Symbol.dispose] = Diff.prototype.free;

/**
 * Builder for chained filter predicates.
 *
 * All `where*` methods consume `self` and return `Self` so calls can be
 * chained. Predicates combine with logical AND.
 */
export class Filter {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Filter.prototype);
        obj.__wbg_ptr = ptr;
        FilterFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FilterFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_filter_free(ptr, 0);
    }
    /**
     * Apply this filter to a JSON array. Returns a new array of matching
     * records. Non-array inputs return an empty array.
     * @param {any} data
     * @returns {any}
     */
    apply(data) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.filter_apply(retptr, this.__wbg_ptr, addHeapObject(data));
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            if (r2) {
                throw takeObject(r1);
            }
            return takeObject(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Convenience: count matching records without materializing them.
     * @param {any} data
     * @returns {number}
     */
    count(data) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.filter_count(retptr, this.__wbg_ptr, addHeapObject(data));
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            if (r2) {
                throw takeObject(r1);
            }
            return r0 >>> 0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Empty filter that matches every record.
     */
    constructor() {
        const ret = wasm.filter_new();
        this.__wbg_ptr = ret >>> 0;
        FilterFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Keep records whose stringified `field` contains `substr`
     * (case-insensitive).
     * @param {string} field
     * @param {string} substr
     * @returns {Filter}
     */
    whereContains(field, substr) {
        const ptr = this.__destroy_into_raw();
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(substr, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.filter_whereContains(ptr, ptr0, len0, ptr1, len1);
        return Filter.__wrap(ret);
    }
    /**
     * Keep records where `field == value` (string compare).
     * @param {string} field
     * @param {string} value
     * @returns {Filter}
     */
    whereEq(field, value) {
        const ptr = this.__destroy_into_raw();
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(value, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.filter_whereEq(ptr, ptr0, len0, ptr1, len1);
        return Filter.__wrap(ret);
    }
    /**
     * Keep records where `field` exists (is not null/undefined).
     * @param {string} field
     * @returns {Filter}
     */
    whereExists(field) {
        const ptr = this.__destroy_into_raw();
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.filter_whereExists(ptr, ptr0, len0);
        return Filter.__wrap(ret);
    }
    /**
     * Keep records where `field > value` (numeric compare).
     * @param {string} field
     * @param {number} value
     * @returns {Filter}
     */
    whereGt(field, value) {
        const ptr = this.__destroy_into_raw();
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.filter_whereGt(ptr, ptr0, len0, value);
        return Filter.__wrap(ret);
    }
    /**
     * Keep records where `field >= value` (numeric compare).
     * @param {string} field
     * @param {number} value
     * @returns {Filter}
     */
    whereGte(field, value) {
        const ptr = this.__destroy_into_raw();
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.filter_whereGte(ptr, ptr0, len0, value);
        return Filter.__wrap(ret);
    }
    /**
     * Keep records where `field` is one of `values` (string compare).
     * @param {string} field
     * @param {any[]} values
     * @returns {Filter}
     */
    whereIn(field, values) {
        const ptr = this.__destroy_into_raw();
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArrayJsValueToWasm0(values, wasm.__wbindgen_export);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.filter_whereIn(ptr, ptr0, len0, ptr1, len1);
        return Filter.__wrap(ret);
    }
    /**
     * Keep records where `field < value` (numeric compare).
     * @param {string} field
     * @param {number} value
     * @returns {Filter}
     */
    whereLt(field, value) {
        const ptr = this.__destroy_into_raw();
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.filter_whereLt(ptr, ptr0, len0, value);
        return Filter.__wrap(ret);
    }
    /**
     * Keep records where `field <= value` (numeric compare).
     * @param {string} field
     * @param {number} value
     * @returns {Filter}
     */
    whereLte(field, value) {
        const ptr = this.__destroy_into_raw();
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.filter_whereLte(ptr, ptr0, len0, value);
        return Filter.__wrap(ret);
    }
    /**
     * Keep records where `field != value` (string compare).
     * @param {string} field
     * @param {string} value
     * @returns {Filter}
     */
    whereNe(field, value) {
        const ptr = this.__destroy_into_raw();
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(value, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.filter_whereNe(ptr, ptr0, len0, ptr1, len1);
        return Filter.__wrap(ret);
    }
    /**
     * Keep records whose stringified `field` starts with `prefix`.
     * @param {string} field
     * @param {string} prefix
     * @returns {Filter}
     */
    whereStartsWith(field, prefix) {
        const ptr = this.__destroy_into_raw();
        const ptr0 = passStringToWasm0(field, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(prefix, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.filter_whereStartsWith(ptr, ptr0, len0, ptr1, len1);
        return Filter.__wrap(ret);
    }
}
if (Symbol.dispose) Filter.prototype[Symbol.dispose] = Filter.prototype.free;

/**
 * Tiny i18n catalog. Stores one JSON object per language and resolves
 * keys with substitution.
 */
export class I18n {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        I18nFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_i18n_free(ptr, 0);
    }
    /**
     * Currently active language tag.
     * @returns {string}
     */
    lang() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.i18n_lang(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export4(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Create a new catalog. `lang` is the desired language; the fallback
     * chain is `lang → "en" → key`.
     * @param {string} lang
     */
    constructor(lang) {
        const ptr0 = passStringToWasm0(lang, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.i18n_new(ptr0, len0);
        this.__wbg_ptr = ret >>> 0;
        I18nFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Register a translation table for one language. `messages` should be
     * a flat JS object `{ key: "translated string" }`.
     * @param {string} lang
     * @param {any} messages
     */
    register(lang, messages) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(lang, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len0 = WASM_VECTOR_LEN;
            wasm.i18n_register(retptr, this.__wbg_ptr, ptr0, len0, addHeapObject(messages));
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            if (r1) {
                throw takeObject(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Switch the active language at runtime.
     * @param {string} lang
     */
    setLang(lang) {
        const ptr0 = passStringToWasm0(lang, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        wasm.i18n_setLang(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Resolve `key` for the configured language. Returns `key` itself
     * when no translation is found in any catalog.
     * @param {string} key
     * @returns {string}
     */
    t(key) {
        let deferred2_0;
        let deferred2_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len0 = WASM_VECTOR_LEN;
            wasm.i18n_t(retptr, this.__wbg_ptr, ptr0, len0);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            deferred2_0 = r0;
            deferred2_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export4(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * Resolve `key` and substitute named placeholders from `vars`
     * (e.g. `t_with('greeting', {name: 'World'})`).
     * @param {string} key
     * @param {any} vars
     * @returns {string}
     */
    tWith(key, vars) {
        let deferred2_0;
        let deferred2_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len0 = WASM_VECTOR_LEN;
            wasm.i18n_tWith(retptr, this.__wbg_ptr, ptr0, len0, addHeapObject(vars));
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            deferred2_0 = r0;
            deferred2_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export4(deferred2_0, deferred2_1, 1);
        }
    }
}
if (Symbol.dispose) I18n.prototype[Symbol.dispose] = I18n.prototype.free;

/**
 * Stateless namespace for retry helpers.
 */
export class Retry {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RetryFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_retry_free(ptr, 0);
    }
    /**
     * Fetch a URL with exponential backoff. Doubles the delay between
     * attempts starting at 200ms and capped at 5 seconds.
     * @param {string} url
     * @param {number} max_attempts
     * @returns {Promise<any>}
     */
    static fetchJson(url, max_attempts) {
        const ptr0 = passStringToWasm0(url, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.retry_fetchJson(ptr0, len0, max_attempts);
        return takeObject(ret);
    }
}
if (Symbol.dispose) Retry.prototype[Symbol.dispose] = Retry.prototype.free;

export class Router {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RouterFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_router_free(ptr, 0);
    }
    /**
     * Return the current route fragment (without the leading `#`).
     * @returns {string}
     */
    static current() {
        let deferred2_0;
        let deferred2_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.router_current(retptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
            var ptr1 = r0;
            var len1 = r1;
            if (r3) {
                ptr1 = 0; len1 = 0;
                throw takeObject(r2);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export4(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * Programmatically navigate to a path. Updates the URL fragment;
     * the registered handler fires via `hashchange`.
     * @param {string} path
     */
    static navigate(path) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(path, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len0 = WASM_VECTOR_LEN;
            wasm.router_navigate(retptr, ptr0, len0);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            if (r1) {
                throw takeObject(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Build an empty router.
     */
    constructor() {
        const ret = wasm.router_new();
        this.__wbg_ptr = ret >>> 0;
        RouterFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Register a route. The pattern may contain a single `:param`
     * segment (e.g. `/gene/:id`); the captured value is passed to the
     * handler as `{ id: "BRCA1" }`.
     * @param {string} pattern
     * @param {Function} handler
     */
    on(pattern, handler) {
        const ptr0 = passStringToWasm0(pattern, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        wasm.router_on(this.__wbg_ptr, ptr0, len0, addHeapObject(handler));
    }
    /**
     * Register a fallback handler used when no route matches.
     * @param {Function} handler
     */
    onNotFound(handler) {
        wasm.router_onNotFound(this.__wbg_ptr, addHeapObject(handler));
    }
    /**
     * Start the router: dispatch the current route immediately and
     * listen for `hashchange` events thereafter.
     */
    start() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.router_start(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            if (r1) {
                throw takeObject(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
if (Symbol.dispose) Router.prototype[Symbol.dispose] = Router.prototype.free;

/**
 * In-memory search index over a JSON array.
 */
export class SearchIndex {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SearchIndex.prototype);
        obj.__wbg_ptr = ptr;
        SearchIndexFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SearchIndexFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_searchindex_free(ptr, 0);
    }
    /**
     * Build an index over `data`, concatenating the values found at each
     * of `fields` (dot paths supported) into a lowercase haystack per
     * record.
     * @param {any} data
     * @param {any[]} fields
     * @returns {SearchIndex}
     */
    static build(data, fields) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArrayJsValueToWasm0(fields, wasm.__wbindgen_export);
            const len0 = WASM_VECTOR_LEN;
            wasm.searchindex_build(retptr, addHeapObject(data), ptr0, len0);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            if (r2) {
                throw takeObject(r1);
            }
            return SearchIndex.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Fuzzy query: returns indices whose haystack contains a fragment within
     * `max_distance` Levenshtein edits of `q`. `max_distance` is clamped to
     * `[0, 3]` to keep this cheap.
     * @param {string} q
     * @param {number} max_distance
     * @returns {Uint32Array}
     */
    fuzzyQuery(q, max_distance) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(q, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len0 = WASM_VECTOR_LEN;
            wasm.searchindex_fuzzyQuery(retptr, this.__wbg_ptr, ptr0, len0, max_distance);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v2 = getArrayU32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export4(r0, r1 * 4, 4);
            return v2;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Number of indexed records.
     * @returns {number}
     */
    len() {
        const ret = wasm.searchindex_len(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Plain substring query. Returns the indices into the original array
     * that contain `q` (case-insensitive).
     * @param {string} q
     * @returns {Uint32Array}
     */
    query(q) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(q, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len0 = WASM_VECTOR_LEN;
            wasm.searchindex_query(retptr, this.__wbg_ptr, ptr0, len0);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v2 = getArrayU32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export4(r0, r1 * 4, 4);
            return v2;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
if (Symbol.dispose) SearchIndex.prototype[Symbol.dispose] = SearchIndex.prototype.free;

/**
 * Namespace struct for descriptive statistics. All methods are static and
 * take a JavaScript array of numbers as input.
 */
export class Stats {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        StatsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_stats_free(ptr, 0);
    }
    /**
     * Chi-square goodness-of-fit between observed and expected frequencies.
     * @param {Float64Array} observed
     * @param {Float64Array} expected
     * @returns {number}
     */
    static chiSquare(observed, expected) {
        const ptr0 = passArrayF64ToWasm0(observed, wasm.__wbindgen_export);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArrayF64ToWasm0(expected, wasm.__wbindgen_export);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.stats_chiSquare(ptr0, len0, ptr1, len1);
        return ret;
    }
    /**
     * Pearson correlation coefficient. `xs` and `ys` must have the same
     * length. Returns 0 for length-mismatched or constant input.
     * @param {Float64Array} xs
     * @param {Float64Array} ys
     * @returns {number}
     */
    static correlation(xs, ys) {
        const ptr0 = passArrayF64ToWasm0(xs, wasm.__wbindgen_export);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArrayF64ToWasm0(ys, wasm.__wbindgen_export);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.stats_correlation(ptr0, len0, ptr1, len1);
        return ret;
    }
    /**
     * Ordinary least-squares linear regression. Returns `[slope, intercept]`
     * as a two-element array. Returns `[0, 0]` for length-mismatched input.
     * @param {Float64Array} xs
     * @param {Float64Array} ys
     * @returns {Float64Array}
     */
    static linearRegression(xs, ys) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArrayF64ToWasm0(xs, wasm.__wbindgen_export);
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passArrayF64ToWasm0(ys, wasm.__wbindgen_export);
            const len1 = WASM_VECTOR_LEN;
            wasm.stats_linearRegression(retptr, ptr0, len0, ptr1, len1);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v3 = getArrayF64FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export4(r0, r1 * 8, 8);
            return v3;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Maximum value. Returns `NaN` for empty input.
     * @param {Float64Array} values
     * @returns {number}
     */
    static max(values) {
        const ptr0 = passArrayF64ToWasm0(values, wasm.__wbindgen_export);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.stats_max(ptr0, len0);
        return ret;
    }
    /**
     * Arithmetic mean. Returns 0 for empty input.
     * @param {Float64Array} values
     * @returns {number}
     */
    static mean(values) {
        const ptr0 = passArrayF64ToWasm0(values, wasm.__wbindgen_export);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.stats_mean(ptr0, len0);
        return ret;
    }
    /**
     * Median. Returns 0 for empty input. For even-length input the average
     * of the two middle elements is returned.
     * @param {Float64Array} values
     * @returns {number}
     */
    static median(values) {
        const ptr0 = passArrayF64ToWasm0(values, wasm.__wbindgen_export);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.stats_median(ptr0, len0);
        return ret;
    }
    /**
     * Minimum value. Returns `NaN` for empty input.
     * @param {Float64Array} values
     * @returns {number}
     */
    static min(values) {
        const ptr0 = passArrayF64ToWasm0(values, wasm.__wbindgen_export);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.stats_min(ptr0, len0);
        return ret;
    }
    /**
     * Quantile / percentile (linear interpolation between closest ranks).
     * `p` is in `[0, 1]`. Returns 0 for empty input.
     * @param {Float64Array} values
     * @param {number} p
     * @returns {number}
     */
    static percentile(values, p) {
        const ptr0 = passArrayF64ToWasm0(values, wasm.__wbindgen_export);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.stats_percentile(ptr0, len0, p);
        return ret;
    }
    /**
     * Population standard deviation. Returns 0 for n < 2.
     * @param {Float64Array} values
     * @returns {number}
     */
    static stdDev(values) {
        const ptr0 = passArrayF64ToWasm0(values, wasm.__wbindgen_export);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.stats_stdDev(ptr0, len0);
        return ret;
    }
    /**
     * Sum of all values.
     * @param {Float64Array} values
     * @returns {number}
     */
    static sum(values) {
        const ptr0 = passArrayF64ToWasm0(values, wasm.__wbindgen_export);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.stats_sum(ptr0, len0);
        return ret;
    }
    /**
     * Population variance. Returns 0 for n < 2.
     * @param {Float64Array} values
     * @returns {number}
     */
    static variance(values) {
        const ptr0 = passArrayF64ToWasm0(values, wasm.__wbindgen_export);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.stats_variance(ptr0, len0);
        return ret;
    }
}
if (Symbol.dispose) Stats.prototype[Symbol.dispose] = Stats.prototype.free;

/**
 * Central registry for WASM CLI tools. Create one per nano-zyrkel and
 * register the tools it needs; they are lazy-loaded on first use.
 */
export class ToolRegistry {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ToolRegistryFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_toolregistry_free(ptr, 0);
    }
    /**
     * Number of registered tools.
     * @returns {number}
     */
    get count() {
        const ret = wasm.toolregistry_count(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Ensure a tool's WASM module is loaded. Called automatically by
     * `exec`, but can be called explicitly for eager loading.
     * @param {string} name
     * @returns {Promise<void>}
     */
    ensureLoaded(name) {
        const ptr0 = passStringToWasm0(name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.toolregistry_ensureLoaded(this.__wbg_ptr, ptr0, len0);
        return takeObject(ret);
    }
    /**
     * Mount files into a tool's virtual filesystem, run a command, and
     * return the result.
     *
     * - `name`: Registered tool name.
     * - `args`: Command-line arguments as a JS array of strings.
     * - `files`: Optional object `{ filename: content_string }` to mount
     *   before execution.
     * @param {string} name
     * @param {any} args
     * @param {any} files
     * @returns {Promise<ToolResult>}
     */
    exec(name, args, files) {
        const ptr0 = passStringToWasm0(name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.toolregistry_exec(this.__wbg_ptr, ptr0, len0, addHeapObject(args), addHeapObject(files));
        return takeObject(ret);
    }
    /**
     * Check whether a specific tool is loaded.
     * @param {string} name
     * @returns {boolean}
     */
    isLoaded(name) {
        const ptr0 = passStringToWasm0(name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.toolregistry_isLoaded(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * Create an empty registry.
     */
    constructor() {
        const ret = wasm.toolregistry_new();
        this.__wbg_ptr = ret >>> 0;
        ToolRegistryFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Run a pipeline of tools. Each step's stdout is piped to the next
     * step's stdin via a temporary file.
     *
     * `steps` is a JS array of `{ tool: string, args: string[] }` objects.
     * `files` are mounted before the first step.
     * @param {any} steps
     * @param {any} files
     * @returns {Promise<ToolResult>}
     */
    pipe(steps, files) {
        const ret = wasm.toolregistry_pipe(this.__wbg_ptr, addHeapObject(steps), addHeapObject(files));
        return takeObject(ret);
    }
    /**
     * Declare a tool. It is **not** loaded yet — only on first `exec`.
     *
     * - `name`: Tool name as known by the CDN (e.g. `"minimap2"`).
     * - `version`: Exact version string (e.g. `"2.22"`).
     * - `cdn`: CDN provider. Currently only `"biowasm"` is supported.
     * @param {string} name
     * @param {string} version
     * @param {string} cdn
     */
    register(name, version, cdn) {
        const ptr0 = passStringToWasm0(name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(version, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(cdn, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len2 = WASM_VECTOR_LEN;
        wasm.toolregistry_register(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2);
    }
    /**
     * Register multiple tools from a JS array of `{name, version, cdn?}` objects.
     * Convenience for reading the tool list from `hats/config.json`.
     * @param {any} tools_array
     */
    registerAll(tools_array) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.toolregistry_registerAll(retptr, this.__wbg_ptr, addHeapObject(tools_array));
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            if (r1) {
                throw takeObject(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Return the status of all registered tools.
     * @returns {ToolStatus[]}
     */
    status() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.toolregistry_status(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_export4(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Unload a tool, freeing its WASM instance. The tool can be
     * re-loaded later via `exec` or `ensureLoaded`.
     * @param {string} name
     */
    unload(name) {
        const ptr0 = passStringToWasm0(name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        wasm.toolregistry_unload(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) ToolRegistry.prototype[Symbol.dispose] = ToolRegistry.prototype.free;

/**
 * Result of a single tool invocation.
 */
export class ToolResult {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ToolResult.prototype);
        obj.__wbg_ptr = ptr;
        ToolResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ToolResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_toolresult_free(ptr, 0);
    }
    /**
     * Wall-clock time in milliseconds.
     * @returns {number}
     */
    get elapsedMs() {
        const ret = wasm.toolresult_elapsedMs(this.__wbg_ptr);
        return ret;
    }
    /**
     * Standard error of the tool.
     * @returns {string}
     */
    get stderr() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.toolresult_stderr(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export4(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Standard output of the tool.
     * @returns {string}
     */
    get stdout() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.toolresult_stdout(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export4(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) ToolResult.prototype[Symbol.dispose] = ToolResult.prototype.free;

/**
 * Status of a single registered tool.
 */
export class ToolStatus {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ToolStatus.prototype);
        obj.__wbg_ptr = ptr;
        ToolStatusFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ToolStatusFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_toolstatus_free(ptr, 0);
    }
    /**
     * @returns {boolean}
     */
    get loaded() {
        const ret = wasm.toolstatus_loaded(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {string}
     */
    get name() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.toolstatus_name(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export4(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {string}
     */
    get version() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.toolstatus_version(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export4(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) ToolStatus.prototype[Symbol.dispose] = ToolStatus.prototype.free;

/**
 * Stateless namespace for URL ↔ state synchronization.
 */
export class UrlState {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        UrlStateFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_urlstate_free(ptr, 0);
    }
    /**
     * Register a callback fired on `popstate` (back / forward
     * navigation). The callback receives the new state object.
     * @param {Function} callback
     */
    static onChange(callback) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.urlstate_onChange(retptr, addHeapObject(callback));
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            if (r1) {
                throw takeObject(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Read the current URL query string into a plain JS object.
     * Repeated keys collapse into the last value seen.
     * @returns {any}
     */
    static read() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.urlstate_read(retptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            if (r2) {
                throw takeObject(r1);
            }
            return takeObject(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Replace the current URL query string with a serialized form of
     * `state` (a plain JS object). Skips empty values.
     * @param {any} state
     */
    static write(state) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.urlstate_write(retptr, addHeapObject(state));
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            if (r1) {
                throw takeObject(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
if (Symbol.dispose) UrlState.prototype[Symbol.dispose] = UrlState.prototype.free;

export class WebSocketClient {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        WebSocketClientFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_websocketclient_free(ptr, 0);
    }
    /**
     * Close the connection cleanly.
     */
    close() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.websocketclient_close(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            if (r1) {
                throw takeObject(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Open a new WebSocket connection. The handshake completes
     * asynchronously — register an `onOpen` handler to be notified.
     * @param {string} url
     */
    constructor(url) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(url, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len0 = WASM_VECTOR_LEN;
            wasm.websocketclient_new(retptr, ptr0, len0);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            WebSocketClientFinalization.register(this, this.__wbg_ptr, this);
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Register a handler fired when the connection closes.
     * @param {Function} callback
     */
    onClose(callback) {
        wasm.websocketclient_onClose(this.__wbg_ptr, addHeapObject(callback));
    }
    /**
     * Register a handler fired when an error occurs on the socket.
     * @param {Function} callback
     */
    onError(callback) {
        wasm.websocketclient_onError(this.__wbg_ptr, addHeapObject(callback));
    }
    /**
     * Register a handler that parses every text message as JSON and
     * forwards the parsed value. Messages that fail to parse are
     * silently ignored — register `onText` for raw access.
     * @param {Function} callback
     */
    onJson(callback) {
        wasm.websocketclient_onJson(this.__wbg_ptr, addHeapObject(callback));
    }
    /**
     * Register a handler fired when the connection opens.
     * @param {Function} callback
     */
    onOpen(callback) {
        wasm.websocketclient_onOpen(this.__wbg_ptr, addHeapObject(callback));
    }
    /**
     * Register a handler that receives every text message as a string.
     * @param {Function} callback
     */
    onText(callback) {
        wasm.websocketclient_onText(this.__wbg_ptr, addHeapObject(callback));
    }
    /**
     * Underlying ready state (`0=connecting`, `1=open`, `2=closing`,
     * `3=closed`).
     * @returns {number}
     */
    readyState() {
        const ret = wasm.websocketclient_readyState(this.__wbg_ptr);
        return ret;
    }
    /**
     * Serialize a JS value as JSON and send it as a text frame.
     * @param {any} value
     */
    sendJson(value) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.websocketclient_sendJson(retptr, this.__wbg_ptr, addHeapObject(value));
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            if (r1) {
                throw takeObject(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Send a text frame to the server.
     * @param {string} text
     */
    sendText(text) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(text, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len0 = WASM_VECTOR_LEN;
            wasm.websocketclient_sendText(retptr, this.__wbg_ptr, ptr0, len0);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            if (r1) {
                throw takeObject(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
if (Symbol.dispose) WebSocketClient.prototype[Symbol.dispose] = WebSocketClient.prototype.free;

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
export function install_panic_hook() {
    wasm.install_panic_hook();
}

/**
 * Returns the semver string this WASM bundle was built with. Useful for
 * runtime version pinning checks in user-repo glue code.
 * @returns {string}
 */
export function version() {
    let deferred1_0;
    let deferred1_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.version(retptr);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred1_0 = r0;
        deferred1_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export4(deferred1_0, deferred1_1, 1);
    }
}

/**
 * Convenience: render the WASM SDK schema as a JSON object.
 * @returns {any}
 */
export function wasmSdkSchema() {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.wasmSdkSchema(retptr);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return takeObject(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg_Error_2e59b1b37a9a34c3: function(arg0, arg1) {
            const ret = Error(getStringFromWasm0(arg0, arg1));
            return addHeapObject(ret);
        },
        __wbg_String_8564e559799eccda: function(arg0, arg1) {
            const ret = String(getObject(arg1));
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_bigint_get_as_i64_2c5082002e4826e2: function(arg0, arg1) {
            const v = getObject(arg1);
            const ret = typeof(v) === 'bigint' ? v : undefined;
            getDataViewMemory0().setBigInt64(arg0 + 8 * 1, isLikeNone(ret) ? BigInt(0) : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg___wbindgen_boolean_get_a86c216575a75c30: function(arg0) {
            const v = getObject(arg0);
            const ret = typeof(v) === 'boolean' ? v : undefined;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg___wbindgen_debug_string_dd5d2d07ce9e6c57: function(arg0, arg1) {
            const ret = debugString(getObject(arg1));
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_in_4bd7a57e54337366: function(arg0, arg1) {
            const ret = getObject(arg0) in getObject(arg1);
            return ret;
        },
        __wbg___wbindgen_is_bigint_6c98f7e945dacdde: function(arg0) {
            const ret = typeof(getObject(arg0)) === 'bigint';
            return ret;
        },
        __wbg___wbindgen_is_function_49868bde5eb1e745: function(arg0) {
            const ret = typeof(getObject(arg0)) === 'function';
            return ret;
        },
        __wbg___wbindgen_is_null_344c8750a8525473: function(arg0) {
            const ret = getObject(arg0) === null;
            return ret;
        },
        __wbg___wbindgen_is_object_40c5a80572e8f9d3: function(arg0) {
            const val = getObject(arg0);
            const ret = typeof(val) === 'object' && val !== null;
            return ret;
        },
        __wbg___wbindgen_is_string_b29b5c5a8065ba1a: function(arg0) {
            const ret = typeof(getObject(arg0)) === 'string';
            return ret;
        },
        __wbg___wbindgen_is_undefined_c0cca72b82b86f4d: function(arg0) {
            const ret = getObject(arg0) === undefined;
            return ret;
        },
        __wbg___wbindgen_jsval_eq_7d430e744a913d26: function(arg0, arg1) {
            const ret = getObject(arg0) === getObject(arg1);
            return ret;
        },
        __wbg___wbindgen_jsval_loose_eq_3a72ae764d46d944: function(arg0, arg1) {
            const ret = getObject(arg0) == getObject(arg1);
            return ret;
        },
        __wbg___wbindgen_number_get_7579aab02a8a620c: function(arg0, arg1) {
            const obj = getObject(arg1);
            const ret = typeof(obj) === 'number' ? obj : undefined;
            getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg___wbindgen_string_get_914df97fcfa788f2: function(arg0, arg1) {
            const obj = getObject(arg1);
            const ret = typeof(obj) === 'string' ? obj : undefined;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_throw_81fc77679af83bc6: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbg__wbg_cb_unref_3c3b4f651835fbcb: function(arg0) {
            getObject(arg0)._wbg_cb_unref();
        },
        __wbg_addEventListener_83ef16da0995f634: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            getObject(arg0).addEventListener(getStringFromWasm0(arg1, arg2), getObject(arg3));
        }, arguments); },
        __wbg_appendChild_8eab65de52dd0834: function() { return handleError(function (arg0, arg1) {
            const ret = getObject(arg0).appendChild(getObject(arg1));
            return addHeapObject(ret);
        }, arguments); },
        __wbg_body_401b41698e8b50fe: function(arg0) {
            const ret = getObject(arg0).body;
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        },
        __wbg_call_7f2987183bb62793: function() { return handleError(function (arg0, arg1) {
            const ret = getObject(arg0).call(getObject(arg1));
            return addHeapObject(ret);
        }, arguments); },
        __wbg_call_d578befcc3145dee: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
            return addHeapObject(ret);
        }, arguments); },
        __wbg_click_71fd1ebdfba801e9: function(arg0) {
            getObject(arg0).click();
        },
        __wbg_close_f181fdc02ee236e6: function() { return handleError(function (arg0) {
            getObject(arg0).close();
        }, arguments); },
        __wbg_code_c96efa5c1a80b2d9: function(arg0) {
            const ret = getObject(arg0).code;
            return ret;
        },
        __wbg_configreader_new: function(arg0) {
            const ret = ConfigReader.__wrap(arg0);
            return addHeapObject(ret);
        },
        __wbg_construct_adeb3d5948c3d19a: function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.construct(getObject(arg0), getObject(arg1));
            return addHeapObject(ret);
        }, arguments); },
        __wbg_createElement_8640e331213b402e: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = getObject(arg0).createElement(getStringFromWasm0(arg1, arg2));
            return addHeapObject(ret);
        }, arguments); },
        __wbg_createObjectURL_470fa06cc4a9e8f0: function() { return handleError(function (arg0, arg1) {
            const ret = URL.createObjectURL(getObject(arg1));
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_data_60b50110c5bd9349: function(arg0) {
            const ret = getObject(arg0).data;
            return addHeapObject(ret);
        },
        __wbg_document_a28a21ae315de4ea: function(arg0) {
            const ret = getObject(arg0).document;
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        },
        __wbg_done_547d467e97529006: function(arg0) {
            const ret = getObject(arg0).done;
            return ret;
        },
        __wbg_entries_616b1a459b85be0b: function(arg0) {
            const ret = Object.entries(getObject(arg0));
            return addHeapObject(ret);
        },
        __wbg_error_a6fa202b58aa1cd3: function(arg0, arg1) {
            let deferred0_0;
            let deferred0_1;
            try {
                deferred0_0 = arg0;
                deferred0_1 = arg1;
                console.error(getStringFromWasm0(arg0, arg1));
            } finally {
                wasm.__wbindgen_export4(deferred0_0, deferred0_1, 1);
            }
        },
        __wbg_fetch_0e70fe3bd20ee8c4: function(arg0, arg1) {
            const ret = getObject(arg0).fetch(getObject(arg1));
            return addHeapObject(ret);
        },
        __wbg_getDate_bafac038eaae076e: function(arg0) {
            const ret = getObject(arg0).getDate();
            return ret;
        },
        __wbg_getDay_6eebc8fe9cb183f5: function(arg0) {
            const ret = getObject(arg0).getDay();
            return ret;
        },
        __wbg_getFullYear_8f83597f7403c865: function(arg0) {
            const ret = getObject(arg0).getFullYear();
            return ret;
        },
        __wbg_getHours_81348c8e800060e7: function(arg0) {
            const ret = getObject(arg0).getHours();
            return ret;
        },
        __wbg_getItem_203869d4a1ba1433: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = getObject(arg1).getItem(getStringFromWasm0(arg2, arg3));
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_getMinutes_bd1ccf17dab913bf: function(arg0) {
            const ret = getObject(arg0).getMinutes();
            return ret;
        },
        __wbg_getMonth_288607689622719c: function(arg0) {
            const ret = getObject(arg0).getMonth();
            return ret;
        },
        __wbg_getTime_f6ac312467f7cf09: function(arg0) {
            const ret = getObject(arg0).getTime();
            return ret;
        },
        __wbg_get_4848e350b40afc16: function(arg0, arg1) {
            const ret = getObject(arg0)[arg1 >>> 0];
            return addHeapObject(ret);
        },
        __wbg_get_ed0642c4b9d31ddf: function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.get(getObject(arg0), getObject(arg1));
            return addHeapObject(ret);
        }, arguments); },
        __wbg_get_f96702c6245e4ef9: function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.get(getObject(arg0), getObject(arg1));
            return addHeapObject(ret);
        }, arguments); },
        __wbg_get_unchecked_7d7babe32e9e6a54: function(arg0, arg1) {
            const ret = getObject(arg0)[arg1 >>> 0];
            return addHeapObject(ret);
        },
        __wbg_hash_da89606b87400cf8: function() { return handleError(function (arg0, arg1) {
            const ret = getObject(arg1).hash;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_headers_f82eee91a0c91695: function(arg0) {
            const ret = getObject(arg0).headers;
            return addHeapObject(ret);
        },
        __wbg_history_e0fde1755ec7a020: function() { return handleError(function (arg0) {
            const ret = getObject(arg0).history;
            return addHeapObject(ret);
        }, arguments); },
        __wbg_instanceof_ArrayBuffer_ff7c1337a5e3b33a: function(arg0) {
            let result;
            try {
                result = getObject(arg0) instanceof ArrayBuffer;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_HtmlAnchorElement_d244ac11562c8f69: function(arg0) {
            let result;
            try {
                result = getObject(arg0) instanceof HTMLAnchorElement;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Map_a10a2795ef4bfe97: function(arg0) {
            let result;
            try {
                result = getObject(arg0) instanceof Map;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Object_72ee0c53dd8f0726: function(arg0) {
            let result;
            try {
                result = getObject(arg0) instanceof Object;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Response_06795eab66cc4036: function(arg0) {
            let result;
            try {
                result = getObject(arg0) instanceof Response;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Uint8Array_4b8da683deb25d72: function(arg0) {
            let result;
            try {
                result = getObject(arg0) instanceof Uint8Array;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Window_c0fee4c064502536: function(arg0) {
            let result;
            try {
                result = getObject(arg0) instanceof Window;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_isArray_db61795ad004c139: function(arg0) {
            const ret = Array.isArray(getObject(arg0));
            return ret;
        },
        __wbg_isSafeInteger_ea83862ba994770c: function(arg0) {
            const ret = Number.isSafeInteger(getObject(arg0));
            return ret;
        },
        __wbg_iterator_de403ef31815a3e6: function() {
            const ret = Symbol.iterator;
            return addHeapObject(ret);
        },
        __wbg_json_f488a10b6520fb79: function() { return handleError(function (arg0) {
            const ret = getObject(arg0).json();
            return addHeapObject(ret);
        }, arguments); },
        __wbg_key_16e077716098efa2: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = getObject(arg1).key(arg2 >>> 0);
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_length_0c32cb8543c8e4c8: function(arg0) {
            const ret = getObject(arg0).length;
            return ret;
        },
        __wbg_length_4faa35c260c02d3a: function() { return handleError(function (arg0) {
            const ret = getObject(arg0).length;
            return ret;
        }, arguments); },
        __wbg_length_6e821edde497a532: function(arg0) {
            const ret = getObject(arg0).length;
            return ret;
        },
        __wbg_localStorage_b1a71e6b7afdce21: function() { return handleError(function (arg0) {
            const ret = getObject(arg0).localStorage;
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        }, arguments); },
        __wbg_location_91b3fdbca3c76d9e: function(arg0) {
            const ret = getObject(arg0).location;
            return addHeapObject(ret);
        },
        __wbg_new_0f6d2ddfe083319b: function(arg0) {
            const ret = new Date(getObject(arg0));
            return addHeapObject(ret);
        },
        __wbg_new_227d7c05414eb861: function() {
            const ret = new Error();
            return addHeapObject(ret);
        },
        __wbg_new_40792555590ec35c: function(arg0, arg1) {
            try {
                var state0 = {a: arg0, b: arg1};
                var cb0 = (arg0, arg1) => {
                    const a = state0.a;
                    state0.a = 0;
                    try {
                        return __wasm_bindgen_func_elem_1850(a, state0.b, arg0, arg1);
                    } finally {
                        state0.a = a;
                    }
                };
                const ret = new Promise(cb0);
                return addHeapObject(ret);
            } finally {
                state0.a = 0;
            }
        },
        __wbg_new_4f9fafbb3909af72: function() {
            const ret = new Object();
            return addHeapObject(ret);
        },
        __wbg_new_7681c4155808e30a: function() { return handleError(function () {
            const ret = new URLSearchParams();
            return addHeapObject(ret);
        }, arguments); },
        __wbg_new_99cabae501c0a8a0: function() {
            const ret = new Map();
            return addHeapObject(ret);
        },
        __wbg_new_a2d8434834334bbf: function() { return handleError(function (arg0, arg1) {
            const ret = new WebSocket(getStringFromWasm0(arg0, arg1));
            return addHeapObject(ret);
        }, arguments); },
        __wbg_new_a560378ea1240b14: function(arg0) {
            const ret = new Uint8Array(getObject(arg0));
            return addHeapObject(ret);
        },
        __wbg_new_f3c9df4f38f3f798: function() {
            const ret = new Array();
            return addHeapObject(ret);
        },
        __wbg_new_typed_14d7cc391ce53d2c: function(arg0, arg1) {
            try {
                var state0 = {a: arg0, b: arg1};
                var cb0 = (arg0, arg1) => {
                    const a = state0.a;
                    state0.a = 0;
                    try {
                        return __wasm_bindgen_func_elem_1850(a, state0.b, arg0, arg1);
                    } finally {
                        state0.a = a;
                    }
                };
                const ret = new Promise(cb0);
                return addHeapObject(ret);
            } finally {
                state0.a = 0;
            }
        },
        __wbg_new_with_length_9cedd08484b73942: function(arg0) {
            const ret = new Uint8Array(arg0 >>> 0);
            return addHeapObject(ret);
        },
        __wbg_new_with_str_17fd923c7afa8ab8: function() { return handleError(function (arg0, arg1) {
            const ret = new URLSearchParams(getStringFromWasm0(arg0, arg1));
            return addHeapObject(ret);
        }, arguments); },
        __wbg_new_with_str_and_init_f663b6d334baa878: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = new Request(getStringFromWasm0(arg0, arg1), getObject(arg2));
            return addHeapObject(ret);
        }, arguments); },
        __wbg_new_with_u8_array_sequence_2ae9f5628c4df63c: function() { return handleError(function (arg0) {
            const ret = new Blob(getObject(arg0));
            return addHeapObject(ret);
        }, arguments); },
        __wbg_next_01132ed6134b8ef5: function(arg0) {
            const ret = getObject(arg0).next;
            return addHeapObject(ret);
        },
        __wbg_next_b3713ec761a9dbfd: function() { return handleError(function (arg0) {
            const ret = getObject(arg0).next();
            return addHeapObject(ret);
        }, arguments); },
        __wbg_now_2c44418ca0623664: function(arg0) {
            const ret = getObject(arg0).now();
            return ret;
        },
        __wbg_now_88621c9c9a4f3ffc: function() {
            const ret = Date.now();
            return ret;
        },
        __wbg_of_bd8b695394d7645d: function(arg0, arg1) {
            const ret = Array.of(getObject(arg0), getObject(arg1));
            return addHeapObject(ret);
        },
        __wbg_ok_36f7b13b74596c24: function(arg0) {
            const ret = getObject(arg0).ok;
            return ret;
        },
        __wbg_pathname_40d21f6d8f0abeb3: function() { return handleError(function (arg0, arg1) {
            const ret = getObject(arg1).pathname;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_performance_5ed3f6a3bbe36d0d: function(arg0) {
            const ret = getObject(arg0).performance;
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        },
        __wbg_prototypesetcall_3e05eb9545565046: function(arg0, arg1, arg2) {
            Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), getObject(arg2));
        },
        __wbg_push_6bdbc990be5ac37b: function(arg0, arg1) {
            const ret = getObject(arg0).push(getObject(arg1));
            return ret;
        },
        __wbg_queueMicrotask_abaf92f0bd4e80a4: function(arg0) {
            const ret = getObject(arg0).queueMicrotask;
            return addHeapObject(ret);
        },
        __wbg_queueMicrotask_df5a6dac26d818f3: function(arg0) {
            queueMicrotask(getObject(arg0));
        },
        __wbg_readyState_631d9f7c37e595d7: function(arg0) {
            const ret = getObject(arg0).readyState;
            return ret;
        },
        __wbg_removeItem_edd5e09fd7345519: function() { return handleError(function (arg0, arg1, arg2) {
            getObject(arg0).removeItem(getStringFromWasm0(arg1, arg2));
        }, arguments); },
        __wbg_remove_b0ab1a7ea21cda2e: function(arg0) {
            getObject(arg0).remove();
        },
        __wbg_replaceState_b24491ac1a491629: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            getObject(arg0).replaceState(getObject(arg1), getStringFromWasm0(arg2, arg3), arg4 === 0 ? undefined : getStringFromWasm0(arg4, arg5));
        }, arguments); },
        __wbg_resolve_0a79de24e9d2267b: function(arg0) {
            const ret = Promise.resolve(getObject(arg0));
            return addHeapObject(ret);
        },
        __wbg_revokeObjectURL_f164474640ca9d10: function() { return handleError(function (arg0, arg1) {
            URL.revokeObjectURL(getStringFromWasm0(arg0, arg1));
        }, arguments); },
        __wbg_search_4e5c22f751154ad5: function() { return handleError(function (arg0, arg1) {
            const ret = getObject(arg1).search;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_send_4f53c94146f0274d: function() { return handleError(function (arg0, arg1, arg2) {
            getObject(arg0).send(getStringFromWasm0(arg1, arg2));
        }, arguments); },
        __wbg_setDate_3e1af9625ec9f3fe: function(arg0, arg1) {
            const ret = getObject(arg0).setDate(arg1 >>> 0);
            return ret;
        },
        __wbg_setHours_8d6653e655ace9d4: function(arg0, arg1) {
            const ret = getObject(arg0).setHours(arg1 >>> 0);
            return ret;
        },
        __wbg_setItem_67573afec8996fe4: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            getObject(arg0).setItem(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        }, arguments); },
        __wbg_setMilliseconds_5857730c41f9121e: function(arg0, arg1) {
            const ret = getObject(arg0).setMilliseconds(arg1 >>> 0);
            return ret;
        },
        __wbg_setMinutes_ecdafb9322bccd2e: function(arg0, arg1) {
            const ret = getObject(arg0).setMinutes(arg1 >>> 0);
            return ret;
        },
        __wbg_setProperty_872b034b6bcc67cd: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            getObject(arg0).setProperty(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        }, arguments); },
        __wbg_setSeconds_b976f50053628cf5: function(arg0, arg1) {
            const ret = getObject(arg0).setSeconds(arg1 >>> 0);
            return ret;
        },
        __wbg_setTimeout_553bc247bec3e16e: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = getObject(arg0).setTimeout(getObject(arg1), arg2);
            return ret;
        }, arguments); },
        __wbg_set_08463b1df38a7e29: function(arg0, arg1, arg2) {
            const ret = getObject(arg0).set(getObject(arg1), getObject(arg2));
            return addHeapObject(ret);
        },
        __wbg_set_16a9c1a07b3d38ec: function(arg0, arg1, arg2) {
            getObject(arg0).set(getArrayU8FromWasm0(arg1, arg2));
        },
        __wbg_set_48cee61639a176a9: function(arg0, arg1, arg2, arg3, arg4) {
            getObject(arg0).set(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        },
        __wbg_set_6be42768c690e380: function(arg0, arg1, arg2) {
            getObject(arg0)[takeObject(arg1)] = takeObject(arg2);
        },
        __wbg_set_6c60b2e8ad0e9383: function(arg0, arg1, arg2) {
            getObject(arg0)[arg1 >>> 0] = takeObject(arg2);
        },
        __wbg_set_8ee2d34facb8466e: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
            return ret;
        }, arguments); },
        __wbg_set_aa391f3af1ff0e9c: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            getObject(arg0).set(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        }, arguments); },
        __wbg_set_download_6fb6f1e8e782dd11: function(arg0, arg1, arg2) {
            getObject(arg0).download = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_hash_3f4ad784fa5eabe2: function() { return handleError(function (arg0, arg1, arg2) {
            getObject(arg0).hash = getStringFromWasm0(arg1, arg2);
        }, arguments); },
        __wbg_set_href_72e78ccb3b2c5988: function(arg0, arg1, arg2) {
            getObject(arg0).href = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_method_1971272fe557e972: function(arg0, arg1, arg2) {
            getObject(arg0).method = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_mode_d1b643087602281a: function(arg0, arg1) {
            getObject(arg0).mode = __wbindgen_enum_RequestMode[arg1];
        },
        __wbg_set_onclose_47cce56c686db4fb: function(arg0, arg1) {
            getObject(arg0).onclose = getObject(arg1);
        },
        __wbg_set_onerror_3db8bc3e52b2b10b: function(arg0, arg1) {
            getObject(arg0).onerror = getObject(arg1);
        },
        __wbg_set_onmessage_45bd33b110c54f5b: function(arg0, arg1) {
            getObject(arg0).onmessage = getObject(arg1);
        },
        __wbg_set_onopen_7ffeb01f8a628209: function(arg0, arg1) {
            getObject(arg0).onopen = getObject(arg1);
        },
        __wbg_stack_3b0d974bbf31e44f: function(arg0, arg1) {
            const ret = getObject(arg1).stack;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_static_accessor_GLOBAL_THIS_a1248013d790bf5f: function() {
            const ret = typeof globalThis === 'undefined' ? null : globalThis;
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        },
        __wbg_static_accessor_GLOBAL_f2e0f995a21329ff: function() {
            const ret = typeof global === 'undefined' ? null : global;
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        },
        __wbg_static_accessor_SELF_24f78b6d23f286ea: function() {
            const ret = typeof self === 'undefined' ? null : self;
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        },
        __wbg_static_accessor_WINDOW_59fd959c540fe405: function() {
            const ret = typeof window === 'undefined' ? null : window;
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        },
        __wbg_status_44ecb0ac1da253f4: function(arg0) {
            const ret = getObject(arg0).status;
            return ret;
        },
        __wbg_style_fbb0b56f71e97cf5: function(arg0) {
            const ret = getObject(arg0).style;
            return addHeapObject(ret);
        },
        __wbg_text_43bdfba45e602cf9: function() { return handleError(function (arg0) {
            const ret = getObject(arg0).text();
            return addHeapObject(ret);
        }, arguments); },
        __wbg_then_00eed3ac0b8e82cb: function(arg0, arg1, arg2) {
            const ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
            return addHeapObject(ret);
        },
        __wbg_then_a0c8db0381c8994c: function(arg0, arg1) {
            const ret = getObject(arg0).then(getObject(arg1));
            return addHeapObject(ret);
        },
        __wbg_toISOString_dd2b776a2cef739c: function(arg0) {
            const ret = getObject(arg0).toISOString();
            return addHeapObject(ret);
        },
        __wbg_toString_891d991e862e1d44: function(arg0) {
            const ret = getObject(arg0).toString();
            return addHeapObject(ret);
        },
        __wbg_toolresult_new: function(arg0) {
            const ret = ToolResult.__wrap(arg0);
            return addHeapObject(ret);
        },
        __wbg_toolstatus_new: function(arg0) {
            const ret = ToolStatus.__wrap(arg0);
            return addHeapObject(ret);
        },
        __wbg_value_7f6052747ccf940f: function(arg0) {
            const ret = getObject(arg0).value;
            return addHeapObject(ret);
        },
        __wbindgen_cast_0000000000000001: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [Externref], shim_idx: 119, ret: Result(Unit), inner_ret: Some(Result(Unit)) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, __wasm_bindgen_func_elem_1844);
            return addHeapObject(ret);
        },
        __wbindgen_cast_0000000000000002: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("CloseEvent")], shim_idx: 2, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, __wasm_bindgen_func_elem_482);
            return addHeapObject(ret);
        },
        __wbindgen_cast_0000000000000003: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("Event")], shim_idx: 2, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, __wasm_bindgen_func_elem_482_2);
            return addHeapObject(ret);
        },
        __wbindgen_cast_0000000000000004: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("MessageEvent")], shim_idx: 2, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, __wasm_bindgen_func_elem_482_3);
            return addHeapObject(ret);
        },
        __wbindgen_cast_0000000000000005: function(arg0) {
            // Cast intrinsic for `F64 -> Externref`.
            const ret = arg0;
            return addHeapObject(ret);
        },
        __wbindgen_cast_0000000000000006: function(arg0) {
            // Cast intrinsic for `I64 -> Externref`.
            const ret = arg0;
            return addHeapObject(ret);
        },
        __wbindgen_cast_0000000000000007: function(arg0, arg1) {
            // Cast intrinsic for `Ref(String) -> Externref`.
            const ret = getStringFromWasm0(arg0, arg1);
            return addHeapObject(ret);
        },
        __wbindgen_cast_0000000000000008: function(arg0) {
            // Cast intrinsic for `U64 -> Externref`.
            const ret = BigInt.asUintN(64, arg0);
            return addHeapObject(ret);
        },
        __wbindgen_object_clone_ref: function(arg0) {
            const ret = getObject(arg0);
            return addHeapObject(ret);
        },
        __wbindgen_object_drop_ref: function(arg0) {
            takeObject(arg0);
        },
    };
    return {
        __proto__: null,
        "./nano_zyrkel_wasm_core_bg.js": import0,
    };
}

function __wasm_bindgen_func_elem_482(arg0, arg1, arg2) {
    wasm.__wasm_bindgen_func_elem_482(arg0, arg1, addHeapObject(arg2));
}

function __wasm_bindgen_func_elem_482_2(arg0, arg1, arg2) {
    wasm.__wasm_bindgen_func_elem_482_2(arg0, arg1, addHeapObject(arg2));
}

function __wasm_bindgen_func_elem_482_3(arg0, arg1, arg2) {
    wasm.__wasm_bindgen_func_elem_482_3(arg0, arg1, addHeapObject(arg2));
}

function __wasm_bindgen_func_elem_1844(arg0, arg1, arg2) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.__wasm_bindgen_func_elem_1844(retptr, arg0, arg1, addHeapObject(arg2));
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        if (r1) {
            throw takeObject(r0);
        }
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

function __wasm_bindgen_func_elem_1850(arg0, arg1, arg2, arg3) {
    wasm.__wasm_bindgen_func_elem_1850(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
}


const __wbindgen_enum_RequestMode = ["same-origin", "no-cors", "cors", "navigate"];
const AggregatorFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_aggregator_free(ptr >>> 0, 1));
const CacheFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_cache_free(ptr >>> 0, 1));
const ConfigReaderFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_configreader_free(ptr >>> 0, 1));
const CsvFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_csv_free(ptr >>> 0, 1));
const DataLoaderFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_dataloader_free(ptr >>> 0, 1));
const DateTimeFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_datetime_free(ptr >>> 0, 1));
const DiffFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_diff_free(ptr >>> 0, 1));
const FilterFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_filter_free(ptr >>> 0, 1));
const I18nFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_i18n_free(ptr >>> 0, 1));
const RetryFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_retry_free(ptr >>> 0, 1));
const RouterFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_router_free(ptr >>> 0, 1));
const SearchIndexFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_searchindex_free(ptr >>> 0, 1));
const StatsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_stats_free(ptr >>> 0, 1));
const ToolRegistryFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_toolregistry_free(ptr >>> 0, 1));
const ToolResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_toolresult_free(ptr >>> 0, 1));
const ToolStatusFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_toolstatus_free(ptr >>> 0, 1));
const UrlStateFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_urlstate_free(ptr >>> 0, 1));
const WebSocketClientFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_websocketclient_free(ptr >>> 0, 1));

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(state => wasm.__wbindgen_export5(state.a, state.b));

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function dropObject(idx) {
    if (idx < 1028) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function getArrayF64FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat64ArrayMemory0().subarray(ptr / 8, ptr / 8 + len);
}

function getArrayJsValueFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getDataViewMemory0();
    const result = [];
    for (let i = ptr; i < ptr + 4 * len; i += 4) {
        result.push(takeObject(mem.getUint32(i, true)));
    }
    return result;
}

function getArrayU32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

let cachedFloat64ArrayMemory0 = null;
function getFloat64ArrayMemory0() {
    if (cachedFloat64ArrayMemory0 === null || cachedFloat64ArrayMemory0.byteLength === 0) {
        cachedFloat64ArrayMemory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachedFloat64ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return decodeText(ptr, len);
}

let cachedUint32ArrayMemory0 = null;
function getUint32ArrayMemory0() {
    if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
        cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32ArrayMemory0;
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function getObject(idx) { return heap[idx]; }

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_export3(addHeapObject(e));
    }
}

let heap = new Array(1024).fill(undefined);
heap.push(undefined, null, true, false);

let heap_next = heap.length;

function isLikeNone(x) {
    return x === undefined || x === null;
}

function makeMutClosure(arg0, arg1, f) {
    const state = { a: arg0, b: arg1, cnt: 1 };
    const real = (...args) => {

        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            state.a = a;
            real._wbg_cb_unref();
        }
    };
    real._wbg_cb_unref = () => {
        if (--state.cnt === 0) {
            wasm.__wbindgen_export5(state.a, state.b);
            state.a = 0;
            CLOSURE_DTORS.unregister(state);
        }
    };
    CLOSURE_DTORS.register(real, state, state);
    return real;
}

function passArrayF64ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 8, 8) >>> 0;
    getFloat64ArrayMemory0().set(arg, ptr / 8);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4, 4) >>> 0;
    const mem = getDataViewMemory0();
    for (let i = 0; i < array.length; i++) {
        mem.setUint32(ptr + 4 * i, addHeapObject(array[i]), true);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}

function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    };
}

let WASM_VECTOR_LEN = 0;

let wasmModule, wasm;
function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    wasmModule = module;
    cachedDataViewMemory0 = null;
    cachedFloat64ArrayMemory0 = null;
    cachedUint32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = module.ok && expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        } else {
            return instance;
        }
    }

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (module !== undefined) {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL('nano_zyrkel_wasm_core_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };
