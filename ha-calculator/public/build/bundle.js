
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function is_promise(value) {
        return value && typeof value === 'object' && typeof value.then === 'function';
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text$1(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text$1(' ');
    }
    function empty() {
        return text$1('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function to_number(value) {
        return value === '' ? null : +value;
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function select_option(select, value) {
        for (let i = 0; i < select.options.length; i += 1) {
            const option = select.options[i];
            if (option.__value === value) {
                option.selected = true;
                return;
            }
        }
        select.selectedIndex = -1; // no option should be selected
    }
    function select_value(select) {
        const selected_option = select.querySelector(':checked') || select.options[0];
        return selected_option && selected_option.__value;
    }
    // unfortunately this can't be a constant as that wouldn't be tree-shakeable
    // so we cache the result instead
    let crossorigin;
    function is_crossorigin() {
        if (crossorigin === undefined) {
            crossorigin = false;
            try {
                if (typeof window !== 'undefined' && window.parent) {
                    void window.parent.document;
                }
            }
            catch (error) {
                crossorigin = true;
            }
        }
        return crossorigin;
    }
    function add_resize_listener(node, fn) {
        const computed_style = getComputedStyle(node);
        if (computed_style.position === 'static') {
            node.style.position = 'relative';
        }
        const iframe = element('iframe');
        iframe.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; ' +
            'overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;');
        iframe.setAttribute('aria-hidden', 'true');
        iframe.tabIndex = -1;
        const crossorigin = is_crossorigin();
        let unsubscribe;
        if (crossorigin) {
            iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>";
            unsubscribe = listen(window, 'message', (event) => {
                if (event.source === iframe.contentWindow)
                    fn();
            });
        }
        else {
            iframe.src = 'about:blank';
            iframe.onload = () => {
                unsubscribe = listen(iframe.contentWindow, 'resize', fn);
            };
        }
        append(node, iframe);
        return () => {
            if (crossorigin) {
                unsubscribe();
            }
            else if (unsubscribe && iframe.contentWindow) {
                unsubscribe();
            }
            detach(iframe);
        };
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function afterUpdate(fn) {
        get_current_component().$$.after_update.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    function handle_promise(promise, info) {
        const token = info.token = {};
        function update(type, index, key, value) {
            if (info.token !== token)
                return;
            info.resolved = value;
            let child_ctx = info.ctx;
            if (key !== undefined) {
                child_ctx = child_ctx.slice();
                child_ctx[key] = value;
            }
            const block = type && (info.current = type)(child_ctx);
            let needs_flush = false;
            if (info.block) {
                if (info.blocks) {
                    info.blocks.forEach((block, i) => {
                        if (i !== index && block) {
                            group_outros();
                            transition_out(block, 1, 1, () => {
                                if (info.blocks[i] === block) {
                                    info.blocks[i] = null;
                                }
                            });
                            check_outros();
                        }
                    });
                }
                else {
                    info.block.d(1);
                }
                block.c();
                transition_in(block, 1);
                block.m(info.mount(), info.anchor);
                needs_flush = true;
            }
            info.block = block;
            if (info.blocks)
                info.blocks[index] = block;
            if (needs_flush) {
                flush();
            }
        }
        if (is_promise(promise)) {
            const current_component = get_current_component();
            promise.then(value => {
                set_current_component(current_component);
                update(info.then, 1, info.value, value);
                set_current_component(null);
            }, error => {
                set_current_component(current_component);
                update(info.catch, 2, info.error, error);
                set_current_component(null);
                if (!info.hasCatch) {
                    throw error;
                }
            });
            // if we previously had a then/catch block, destroy it
            if (info.current !== info.pending) {
                update(info.pending, 0);
                return true;
            }
        }
        else {
            if (info.current !== info.then) {
                update(info.then, 1, info.value, promise);
                return true;
            }
            info.resolved = promise;
        }
    }
    function update_await_block_branch(info, ctx, dirty) {
        const child_ctx = ctx.slice();
        const { resolved } = info;
        if (info.current === info.then) {
            child_ctx[info.value] = resolved;
        }
        if (info.current === info.catch) {
            child_ctx[info.error] = resolved;
        }
        info.block.p(child_ctx, dirty);
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.43.1' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    var EOL = {},
        EOF = {},
        QUOTE = 34,
        NEWLINE = 10,
        RETURN = 13;

    function objectConverter(columns) {
      return new Function("d", "return {" + columns.map(function(name, i) {
        return JSON.stringify(name) + ": d[" + i + "] || \"\"";
      }).join(",") + "}");
    }

    function customConverter(columns, f) {
      var object = objectConverter(columns);
      return function(row, i) {
        return f(object(row), i, columns);
      };
    }

    // Compute unique columns in order of discovery.
    function inferColumns(rows) {
      var columnSet = Object.create(null),
          columns = [];

      rows.forEach(function(row) {
        for (var column in row) {
          if (!(column in columnSet)) {
            columns.push(columnSet[column] = column);
          }
        }
      });

      return columns;
    }

    function pad(value, width) {
      var s = value + "", length = s.length;
      return length < width ? new Array(width - length + 1).join(0) + s : s;
    }

    function formatYear(year) {
      return year < 0 ? "-" + pad(-year, 6)
        : year > 9999 ? "+" + pad(year, 6)
        : pad(year, 4);
    }

    function formatDate(date) {
      var hours = date.getUTCHours(),
          minutes = date.getUTCMinutes(),
          seconds = date.getUTCSeconds(),
          milliseconds = date.getUTCMilliseconds();
      return isNaN(date) ? "Invalid Date"
          : formatYear(date.getUTCFullYear()) + "-" + pad(date.getUTCMonth() + 1, 2) + "-" + pad(date.getUTCDate(), 2)
          + (milliseconds ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "." + pad(milliseconds, 3) + "Z"
          : seconds ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "Z"
          : minutes || hours ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + "Z"
          : "");
    }

    function dsvFormat(delimiter) {
      var reFormat = new RegExp("[\"" + delimiter + "\n\r]"),
          DELIMITER = delimiter.charCodeAt(0);

      function parse(text, f) {
        var convert, columns, rows = parseRows(text, function(row, i) {
          if (convert) return convert(row, i - 1);
          columns = row, convert = f ? customConverter(row, f) : objectConverter(row);
        });
        rows.columns = columns || [];
        return rows;
      }

      function parseRows(text, f) {
        var rows = [], // output rows
            N = text.length,
            I = 0, // current character index
            n = 0, // current line number
            t, // current token
            eof = N <= 0, // current token followed by EOF?
            eol = false; // current token followed by EOL?

        // Strip the trailing newline.
        if (text.charCodeAt(N - 1) === NEWLINE) --N;
        if (text.charCodeAt(N - 1) === RETURN) --N;

        function token() {
          if (eof) return EOF;
          if (eol) return eol = false, EOL;

          // Unescape quotes.
          var i, j = I, c;
          if (text.charCodeAt(j) === QUOTE) {
            while (I++ < N && text.charCodeAt(I) !== QUOTE || text.charCodeAt(++I) === QUOTE);
            if ((i = I) >= N) eof = true;
            else if ((c = text.charCodeAt(I++)) === NEWLINE) eol = true;
            else if (c === RETURN) { eol = true; if (text.charCodeAt(I) === NEWLINE) ++I; }
            return text.slice(j + 1, i - 1).replace(/""/g, "\"");
          }

          // Find next delimiter or newline.
          while (I < N) {
            if ((c = text.charCodeAt(i = I++)) === NEWLINE) eol = true;
            else if (c === RETURN) { eol = true; if (text.charCodeAt(I) === NEWLINE) ++I; }
            else if (c !== DELIMITER) continue;
            return text.slice(j, i);
          }

          // Return last token before EOF.
          return eof = true, text.slice(j, N);
        }

        while ((t = token()) !== EOF) {
          var row = [];
          while (t !== EOL && t !== EOF) row.push(t), t = token();
          if (f && (row = f(row, n++)) == null) continue;
          rows.push(row);
        }

        return rows;
      }

      function preformatBody(rows, columns) {
        return rows.map(function(row) {
          return columns.map(function(column) {
            return formatValue(row[column]);
          }).join(delimiter);
        });
      }

      function format(rows, columns) {
        if (columns == null) columns = inferColumns(rows);
        return [columns.map(formatValue).join(delimiter)].concat(preformatBody(rows, columns)).join("\n");
      }

      function formatBody(rows, columns) {
        if (columns == null) columns = inferColumns(rows);
        return preformatBody(rows, columns).join("\n");
      }

      function formatRows(rows) {
        return rows.map(formatRow).join("\n");
      }

      function formatRow(row) {
        return row.map(formatValue).join(delimiter);
      }

      function formatValue(value) {
        return value == null ? ""
            : value instanceof Date ? formatDate(value)
            : reFormat.test(value += "") ? "\"" + value.replace(/"/g, "\"\"") + "\""
            : value;
      }

      return {
        parse: parse,
        parseRows: parseRows,
        format: format,
        formatBody: formatBody,
        formatRows: formatRows,
        formatRow: formatRow,
        formatValue: formatValue
      };
    }

    var csv$1 = dsvFormat(",");

    var csvParse = csv$1.parse;

    function responseText(response) {
      if (!response.ok) throw new Error(response.status + " " + response.statusText);
      return response.text();
    }

    function text(input, init) {
      return fetch(input, init).then(responseText);
    }

    function dsvParse(parse) {
      return function(input, init, row) {
        if (arguments.length === 2 && typeof init === "function") row = init, init = undefined;
        return text(input, init).then(function(response) {
          return parse(response, row);
        });
      };
    }

    var csv = dsvParse(csvParse);

    const stringFields = [
      'country',
    ];

    const stringify = d => {
      for (var i in d) {
        if (!stringFields.includes(i)) {
          d[i] = +d[i];
        }
      }
      return d
    };


    function parseData({ src }) {
      const calcPromise = csv(src.calc, stringify);
      
      let data = Promise.all([calcPromise]).then(res => {
        let [dataset] = res;

        console.log(dataset);
        return {
          data: dataset.filter(d => d.country !== 'ROW'),
          row: dataset.find(d => d.country === 'ROW')
        } 
      });
      
      return data
    }

    function range(start, stop, step) {
      start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;

      var i = -1,
          n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
          range = new Array(n);

      while (++i < n) {
        range[i] = start + i * step;
      }

      return range;
    }

    function filter(values, test) {
      if (typeof test !== "function") throw new TypeError("test is not a function");
      const array = [];
      let index = -1;
      for (const value of values) {
        if (test(value, ++index, values)) {
          array.push(value);
        }
      }
      return array;
    }

    var top = 'top';
    var bottom = 'bottom';
    var right = 'right';
    var left = 'left';
    var auto = 'auto';
    var basePlacements = [top, bottom, right, left];
    var start = 'start';
    var end = 'end';
    var clippingParents = 'clippingParents';
    var viewport = 'viewport';
    var popper = 'popper';
    var reference = 'reference';
    var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
      return acc.concat([placement + "-" + start, placement + "-" + end]);
    }, []);
    var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
      return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
    }, []); // modifiers that need to read the DOM

    var beforeRead = 'beforeRead';
    var read = 'read';
    var afterRead = 'afterRead'; // pure-logic modifiers

    var beforeMain = 'beforeMain';
    var main = 'main';
    var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

    var beforeWrite = 'beforeWrite';
    var write = 'write';
    var afterWrite = 'afterWrite';
    var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

    function getNodeName(element) {
      return element ? (element.nodeName || '').toLowerCase() : null;
    }

    function getWindow(node) {
      if (node == null) {
        return window;
      }

      if (node.toString() !== '[object Window]') {
        var ownerDocument = node.ownerDocument;
        return ownerDocument ? ownerDocument.defaultView || window : window;
      }

      return node;
    }

    function isElement$1(node) {
      var OwnElement = getWindow(node).Element;
      return node instanceof OwnElement || node instanceof Element;
    }

    function isHTMLElement(node) {
      var OwnElement = getWindow(node).HTMLElement;
      return node instanceof OwnElement || node instanceof HTMLElement;
    }

    function isShadowRoot(node) {
      // IE 11 has no ShadowRoot
      if (typeof ShadowRoot === 'undefined') {
        return false;
      }

      var OwnElement = getWindow(node).ShadowRoot;
      return node instanceof OwnElement || node instanceof ShadowRoot;
    }

    // and applies them to the HTMLElements such as popper and arrow

    function applyStyles(_ref) {
      var state = _ref.state;
      Object.keys(state.elements).forEach(function (name) {
        var style = state.styles[name] || {};
        var attributes = state.attributes[name] || {};
        var element = state.elements[name]; // arrow is optional + virtual elements

        if (!isHTMLElement(element) || !getNodeName(element)) {
          return;
        } // Flow doesn't support to extend this property, but it's the most
        // effective way to apply styles to an HTMLElement
        // $FlowFixMe[cannot-write]


        Object.assign(element.style, style);
        Object.keys(attributes).forEach(function (name) {
          var value = attributes[name];

          if (value === false) {
            element.removeAttribute(name);
          } else {
            element.setAttribute(name, value === true ? '' : value);
          }
        });
      });
    }

    function effect$2(_ref2) {
      var state = _ref2.state;
      var initialStyles = {
        popper: {
          position: state.options.strategy,
          left: '0',
          top: '0',
          margin: '0'
        },
        arrow: {
          position: 'absolute'
        },
        reference: {}
      };
      Object.assign(state.elements.popper.style, initialStyles.popper);
      state.styles = initialStyles;

      if (state.elements.arrow) {
        Object.assign(state.elements.arrow.style, initialStyles.arrow);
      }

      return function () {
        Object.keys(state.elements).forEach(function (name) {
          var element = state.elements[name];
          var attributes = state.attributes[name] || {};
          var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

          var style = styleProperties.reduce(function (style, property) {
            style[property] = '';
            return style;
          }, {}); // arrow is optional + virtual elements

          if (!isHTMLElement(element) || !getNodeName(element)) {
            return;
          }

          Object.assign(element.style, style);
          Object.keys(attributes).forEach(function (attribute) {
            element.removeAttribute(attribute);
          });
        });
      };
    } // eslint-disable-next-line import/no-unused-modules


    var applyStyles$1 = {
      name: 'applyStyles',
      enabled: true,
      phase: 'write',
      fn: applyStyles,
      effect: effect$2,
      requires: ['computeStyles']
    };

    function getBasePlacement$1(placement) {
      return placement.split('-')[0];
    }

    // import { isHTMLElement } from './instanceOf';
    function getBoundingClientRect(element, // eslint-disable-next-line unused-imports/no-unused-vars
    includeScale) {

      var rect = element.getBoundingClientRect();
      var scaleX = 1;
      var scaleY = 1; // FIXME:
      // `offsetWidth` returns an integer while `getBoundingClientRect`
      // returns a float. This results in `scaleX` or `scaleY` being
      // non-1 when it should be for elements that aren't a full pixel in
      // width or height.
      // if (isHTMLElement(element) && includeScale) {
      //   const offsetHeight = element.offsetHeight;
      //   const offsetWidth = element.offsetWidth;
      //   // Do not attempt to divide by 0, otherwise we get `Infinity` as scale
      //   // Fallback to 1 in case both values are `0`
      //   if (offsetWidth > 0) {
      //     scaleX = rect.width / offsetWidth || 1;
      //   }
      //   if (offsetHeight > 0) {
      //     scaleY = rect.height / offsetHeight || 1;
      //   }
      // }

      return {
        width: rect.width / scaleX,
        height: rect.height / scaleY,
        top: rect.top / scaleY,
        right: rect.right / scaleX,
        bottom: rect.bottom / scaleY,
        left: rect.left / scaleX,
        x: rect.left / scaleX,
        y: rect.top / scaleY
      };
    }

    // means it doesn't take into account transforms.

    function getLayoutRect(element) {
      var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
      // Fixes https://github.com/popperjs/popper-core/issues/1223

      var width = element.offsetWidth;
      var height = element.offsetHeight;

      if (Math.abs(clientRect.width - width) <= 1) {
        width = clientRect.width;
      }

      if (Math.abs(clientRect.height - height) <= 1) {
        height = clientRect.height;
      }

      return {
        x: element.offsetLeft,
        y: element.offsetTop,
        width: width,
        height: height
      };
    }

    function contains(parent, child) {
      var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

      if (parent.contains(child)) {
        return true;
      } // then fallback to custom implementation with Shadow DOM support
      else if (rootNode && isShadowRoot(rootNode)) {
          var next = child;

          do {
            if (next && parent.isSameNode(next)) {
              return true;
            } // $FlowFixMe[prop-missing]: need a better way to handle this...


            next = next.parentNode || next.host;
          } while (next);
        } // Give up, the result is false


      return false;
    }

    function getComputedStyle$1(element) {
      return getWindow(element).getComputedStyle(element);
    }

    function isTableElement(element) {
      return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
    }

    function getDocumentElement(element) {
      // $FlowFixMe[incompatible-return]: assume body is always available
      return ((isElement$1(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
      element.document) || window.document).documentElement;
    }

    function getParentNode(element) {
      if (getNodeName(element) === 'html') {
        return element;
      }

      return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
        // $FlowFixMe[incompatible-return]
        // $FlowFixMe[prop-missing]
        element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
        element.parentNode || ( // DOM Element detected
        isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
        // $FlowFixMe[incompatible-call]: HTMLElement is a Node
        getDocumentElement(element) // fallback

      );
    }

    function getTrueOffsetParent(element) {
      if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
      getComputedStyle$1(element).position === 'fixed') {
        return null;
      }

      return element.offsetParent;
    } // `.offsetParent` reports `null` for fixed elements, while absolute elements
    // return the containing block


    function getContainingBlock(element) {
      var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
      var isIE = navigator.userAgent.indexOf('Trident') !== -1;

      if (isIE && isHTMLElement(element)) {
        // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
        var elementCss = getComputedStyle$1(element);

        if (elementCss.position === 'fixed') {
          return null;
        }
      }

      var currentNode = getParentNode(element);

      while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
        var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
        // create a containing block.
        // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

        if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
          return currentNode;
        } else {
          currentNode = currentNode.parentNode;
        }
      }

      return null;
    } // Gets the closest ancestor positioned element. Handles some edge cases,
    // such as table ancestors and cross browser bugs.


    function getOffsetParent(element) {
      var window = getWindow(element);
      var offsetParent = getTrueOffsetParent(element);

      while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
        offsetParent = getTrueOffsetParent(offsetParent);
      }

      if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static')) {
        return window;
      }

      return offsetParent || getContainingBlock(element) || window;
    }

    function getMainAxisFromPlacement(placement) {
      return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
    }

    var max = Math.max;
    var min = Math.min;
    var round = Math.round;

    function within(min$1, value, max$1) {
      return max(min$1, min(value, max$1));
    }

    function getFreshSideObject() {
      return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      };
    }

    function mergePaddingObject(paddingObject) {
      return Object.assign({}, getFreshSideObject(), paddingObject);
    }

    function expandToHashMap(value, keys) {
      return keys.reduce(function (hashMap, key) {
        hashMap[key] = value;
        return hashMap;
      }, {});
    }

    var toPaddingObject = function toPaddingObject(padding, state) {
      padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
        placement: state.placement
      })) : padding;
      return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
    };

    function arrow(_ref) {
      var _state$modifiersData$;

      var state = _ref.state,
          name = _ref.name,
          options = _ref.options;
      var arrowElement = state.elements.arrow;
      var popperOffsets = state.modifiersData.popperOffsets;
      var basePlacement = getBasePlacement$1(state.placement);
      var axis = getMainAxisFromPlacement(basePlacement);
      var isVertical = [left, right].indexOf(basePlacement) >= 0;
      var len = isVertical ? 'height' : 'width';

      if (!arrowElement || !popperOffsets) {
        return;
      }

      var paddingObject = toPaddingObject(options.padding, state);
      var arrowRect = getLayoutRect(arrowElement);
      var minProp = axis === 'y' ? top : left;
      var maxProp = axis === 'y' ? bottom : right;
      var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
      var startDiff = popperOffsets[axis] - state.rects.reference[axis];
      var arrowOffsetParent = getOffsetParent(arrowElement);
      var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
      var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
      // outside of the popper bounds

      var min = paddingObject[minProp];
      var max = clientSize - arrowRect[len] - paddingObject[maxProp];
      var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
      var offset = within(min, center, max); // Prevents breaking syntax highlighting...

      var axisProp = axis;
      state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
    }

    function effect$1(_ref2) {
      var state = _ref2.state,
          options = _ref2.options;
      var _options$element = options.element,
          arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

      if (arrowElement == null) {
        return;
      } // CSS selector


      if (typeof arrowElement === 'string') {
        arrowElement = state.elements.popper.querySelector(arrowElement);

        if (!arrowElement) {
          return;
        }
      }

      if (!contains(state.elements.popper, arrowElement)) {

        return;
      }

      state.elements.arrow = arrowElement;
    } // eslint-disable-next-line import/no-unused-modules


    var arrow$1 = {
      name: 'arrow',
      enabled: true,
      phase: 'main',
      fn: arrow,
      effect: effect$1,
      requires: ['popperOffsets'],
      requiresIfExists: ['preventOverflow']
    };

    function getVariation(placement) {
      return placement.split('-')[1];
    }

    var unsetSides = {
      top: 'auto',
      right: 'auto',
      bottom: 'auto',
      left: 'auto'
    }; // Round the offsets to the nearest suitable subpixel based on the DPR.
    // Zooming can change the DPR, but it seems to report a value that will
    // cleanly divide the values into the appropriate subpixels.

    function roundOffsetsByDPR(_ref) {
      var x = _ref.x,
          y = _ref.y;
      var win = window;
      var dpr = win.devicePixelRatio || 1;
      return {
        x: round(round(x * dpr) / dpr) || 0,
        y: round(round(y * dpr) / dpr) || 0
      };
    }

    function mapToStyles(_ref2) {
      var _Object$assign2;

      var popper = _ref2.popper,
          popperRect = _ref2.popperRect,
          placement = _ref2.placement,
          variation = _ref2.variation,
          offsets = _ref2.offsets,
          position = _ref2.position,
          gpuAcceleration = _ref2.gpuAcceleration,
          adaptive = _ref2.adaptive,
          roundOffsets = _ref2.roundOffsets;

      var _ref3 = roundOffsets === true ? roundOffsetsByDPR(offsets) : typeof roundOffsets === 'function' ? roundOffsets(offsets) : offsets,
          _ref3$x = _ref3.x,
          x = _ref3$x === void 0 ? 0 : _ref3$x,
          _ref3$y = _ref3.y,
          y = _ref3$y === void 0 ? 0 : _ref3$y;

      var hasX = offsets.hasOwnProperty('x');
      var hasY = offsets.hasOwnProperty('y');
      var sideX = left;
      var sideY = top;
      var win = window;

      if (adaptive) {
        var offsetParent = getOffsetParent(popper);
        var heightProp = 'clientHeight';
        var widthProp = 'clientWidth';

        if (offsetParent === getWindow(popper)) {
          offsetParent = getDocumentElement(popper);

          if (getComputedStyle$1(offsetParent).position !== 'static' && position === 'absolute') {
            heightProp = 'scrollHeight';
            widthProp = 'scrollWidth';
          }
        } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


        offsetParent = offsetParent;

        if (placement === top || (placement === left || placement === right) && variation === end) {
          sideY = bottom; // $FlowFixMe[prop-missing]

          y -= offsetParent[heightProp] - popperRect.height;
          y *= gpuAcceleration ? 1 : -1;
        }

        if (placement === left || (placement === top || placement === bottom) && variation === end) {
          sideX = right; // $FlowFixMe[prop-missing]

          x -= offsetParent[widthProp] - popperRect.width;
          x *= gpuAcceleration ? 1 : -1;
        }
      }

      var commonStyles = Object.assign({
        position: position
      }, adaptive && unsetSides);

      if (gpuAcceleration) {
        var _Object$assign;

        return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
      }

      return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
    }

    function computeStyles(_ref4) {
      var state = _ref4.state,
          options = _ref4.options;
      var _options$gpuAccelerat = options.gpuAcceleration,
          gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
          _options$adaptive = options.adaptive,
          adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
          _options$roundOffsets = options.roundOffsets,
          roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

      var commonStyles = {
        placement: getBasePlacement$1(state.placement),
        variation: getVariation(state.placement),
        popper: state.elements.popper,
        popperRect: state.rects.popper,
        gpuAcceleration: gpuAcceleration
      };

      if (state.modifiersData.popperOffsets != null) {
        state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
          offsets: state.modifiersData.popperOffsets,
          position: state.options.strategy,
          adaptive: adaptive,
          roundOffsets: roundOffsets
        })));
      }

      if (state.modifiersData.arrow != null) {
        state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
          offsets: state.modifiersData.arrow,
          position: 'absolute',
          adaptive: false,
          roundOffsets: roundOffsets
        })));
      }

      state.attributes.popper = Object.assign({}, state.attributes.popper, {
        'data-popper-placement': state.placement
      });
    } // eslint-disable-next-line import/no-unused-modules


    var computeStyles$1 = {
      name: 'computeStyles',
      enabled: true,
      phase: 'beforeWrite',
      fn: computeStyles,
      data: {}
    };

    var passive = {
      passive: true
    };

    function effect(_ref) {
      var state = _ref.state,
          instance = _ref.instance,
          options = _ref.options;
      var _options$scroll = options.scroll,
          scroll = _options$scroll === void 0 ? true : _options$scroll,
          _options$resize = options.resize,
          resize = _options$resize === void 0 ? true : _options$resize;
      var window = getWindow(state.elements.popper);
      var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

      if (scroll) {
        scrollParents.forEach(function (scrollParent) {
          scrollParent.addEventListener('scroll', instance.update, passive);
        });
      }

      if (resize) {
        window.addEventListener('resize', instance.update, passive);
      }

      return function () {
        if (scroll) {
          scrollParents.forEach(function (scrollParent) {
            scrollParent.removeEventListener('scroll', instance.update, passive);
          });
        }

        if (resize) {
          window.removeEventListener('resize', instance.update, passive);
        }
      };
    } // eslint-disable-next-line import/no-unused-modules


    var eventListeners = {
      name: 'eventListeners',
      enabled: true,
      phase: 'write',
      fn: function fn() {},
      effect: effect,
      data: {}
    };

    var hash$1 = {
      left: 'right',
      right: 'left',
      bottom: 'top',
      top: 'bottom'
    };
    function getOppositePlacement(placement) {
      return placement.replace(/left|right|bottom|top/g, function (matched) {
        return hash$1[matched];
      });
    }

    var hash = {
      start: 'end',
      end: 'start'
    };
    function getOppositeVariationPlacement(placement) {
      return placement.replace(/start|end/g, function (matched) {
        return hash[matched];
      });
    }

    function getWindowScroll(node) {
      var win = getWindow(node);
      var scrollLeft = win.pageXOffset;
      var scrollTop = win.pageYOffset;
      return {
        scrollLeft: scrollLeft,
        scrollTop: scrollTop
      };
    }

    function getWindowScrollBarX(element) {
      // If <html> has a CSS width greater than the viewport, then this will be
      // incorrect for RTL.
      // Popper 1 is broken in this case and never had a bug report so let's assume
      // it's not an issue. I don't think anyone ever specifies width on <html>
      // anyway.
      // Browsers where the left scrollbar doesn't cause an issue report `0` for
      // this (e.g. Edge 2019, IE11, Safari)
      return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
    }

    function getViewportRect(element) {
      var win = getWindow(element);
      var html = getDocumentElement(element);
      var visualViewport = win.visualViewport;
      var width = html.clientWidth;
      var height = html.clientHeight;
      var x = 0;
      var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
      // can be obscured underneath it.
      // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
      // if it isn't open, so if this isn't available, the popper will be detected
      // to overflow the bottom of the screen too early.

      if (visualViewport) {
        width = visualViewport.width;
        height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
        // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
        // errors due to floating point numbers, so we need to check precision.
        // Safari returns a number <= 0, usually < -1 when pinch-zoomed
        // Feature detection fails in mobile emulation mode in Chrome.
        // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
        // 0.001
        // Fallback here: "Not Safari" userAgent

        if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
          x = visualViewport.offsetLeft;
          y = visualViewport.offsetTop;
        }
      }

      return {
        width: width,
        height: height,
        x: x + getWindowScrollBarX(element),
        y: y
      };
    }

    // of the `<html>` and `<body>` rect bounds if horizontally scrollable

    function getDocumentRect(element) {
      var _element$ownerDocumen;

      var html = getDocumentElement(element);
      var winScroll = getWindowScroll(element);
      var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
      var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
      var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
      var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
      var y = -winScroll.scrollTop;

      if (getComputedStyle$1(body || html).direction === 'rtl') {
        x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
      }

      return {
        width: width,
        height: height,
        x: x,
        y: y
      };
    }

    function isScrollParent(element) {
      // Firefox wants us to check `-x` and `-y` variations as well
      var _getComputedStyle = getComputedStyle$1(element),
          overflow = _getComputedStyle.overflow,
          overflowX = _getComputedStyle.overflowX,
          overflowY = _getComputedStyle.overflowY;

      return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
    }

    function getScrollParent(node) {
      if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
        // $FlowFixMe[incompatible-return]: assume body is always available
        return node.ownerDocument.body;
      }

      if (isHTMLElement(node) && isScrollParent(node)) {
        return node;
      }

      return getScrollParent(getParentNode(node));
    }

    /*
    given a DOM element, return the list of all scroll parents, up the list of ancesors
    until we get to the top window object. This list is what we attach scroll listeners
    to, because if any of these parent elements scroll, we'll need to re-calculate the
    reference element's position.
    */

    function listScrollParents(element, list) {
      var _element$ownerDocumen;

      if (list === void 0) {
        list = [];
      }

      var scrollParent = getScrollParent(element);
      var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
      var win = getWindow(scrollParent);
      var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
      var updatedList = list.concat(target);
      return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
      updatedList.concat(listScrollParents(getParentNode(target)));
    }

    function rectToClientRect(rect) {
      return Object.assign({}, rect, {
        left: rect.x,
        top: rect.y,
        right: rect.x + rect.width,
        bottom: rect.y + rect.height
      });
    }

    function getInnerBoundingClientRect(element) {
      var rect = getBoundingClientRect(element);
      rect.top = rect.top + element.clientTop;
      rect.left = rect.left + element.clientLeft;
      rect.bottom = rect.top + element.clientHeight;
      rect.right = rect.left + element.clientWidth;
      rect.width = element.clientWidth;
      rect.height = element.clientHeight;
      rect.x = rect.left;
      rect.y = rect.top;
      return rect;
    }

    function getClientRectFromMixedType(element, clippingParent) {
      return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isHTMLElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
    } // A "clipping parent" is an overflowable container with the characteristic of
    // clipping (or hiding) overflowing elements with a position different from
    // `initial`


    function getClippingParents(element) {
      var clippingParents = listScrollParents(getParentNode(element));
      var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
      var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

      if (!isElement$1(clipperElement)) {
        return [];
      } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


      return clippingParents.filter(function (clippingParent) {
        return isElement$1(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
      });
    } // Gets the maximum area that the element is visible in due to any number of
    // clipping parents


    function getClippingRect(element, boundary, rootBoundary) {
      var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
      var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
      var firstClippingParent = clippingParents[0];
      var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
        var rect = getClientRectFromMixedType(element, clippingParent);
        accRect.top = max(rect.top, accRect.top);
        accRect.right = min(rect.right, accRect.right);
        accRect.bottom = min(rect.bottom, accRect.bottom);
        accRect.left = max(rect.left, accRect.left);
        return accRect;
      }, getClientRectFromMixedType(element, firstClippingParent));
      clippingRect.width = clippingRect.right - clippingRect.left;
      clippingRect.height = clippingRect.bottom - clippingRect.top;
      clippingRect.x = clippingRect.left;
      clippingRect.y = clippingRect.top;
      return clippingRect;
    }

    function computeOffsets(_ref) {
      var reference = _ref.reference,
          element = _ref.element,
          placement = _ref.placement;
      var basePlacement = placement ? getBasePlacement$1(placement) : null;
      var variation = placement ? getVariation(placement) : null;
      var commonX = reference.x + reference.width / 2 - element.width / 2;
      var commonY = reference.y + reference.height / 2 - element.height / 2;
      var offsets;

      switch (basePlacement) {
        case top:
          offsets = {
            x: commonX,
            y: reference.y - element.height
          };
          break;

        case bottom:
          offsets = {
            x: commonX,
            y: reference.y + reference.height
          };
          break;

        case right:
          offsets = {
            x: reference.x + reference.width,
            y: commonY
          };
          break;

        case left:
          offsets = {
            x: reference.x - element.width,
            y: commonY
          };
          break;

        default:
          offsets = {
            x: reference.x,
            y: reference.y
          };
      }

      var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

      if (mainAxis != null) {
        var len = mainAxis === 'y' ? 'height' : 'width';

        switch (variation) {
          case start:
            offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
            break;

          case end:
            offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
            break;
        }
      }

      return offsets;
    }

    function detectOverflow(state, options) {
      if (options === void 0) {
        options = {};
      }

      var _options = options,
          _options$placement = _options.placement,
          placement = _options$placement === void 0 ? state.placement : _options$placement,
          _options$boundary = _options.boundary,
          boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
          _options$rootBoundary = _options.rootBoundary,
          rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
          _options$elementConte = _options.elementContext,
          elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
          _options$altBoundary = _options.altBoundary,
          altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
          _options$padding = _options.padding,
          padding = _options$padding === void 0 ? 0 : _options$padding;
      var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
      var altContext = elementContext === popper ? reference : popper;
      var popperRect = state.rects.popper;
      var element = state.elements[altBoundary ? altContext : elementContext];
      var clippingClientRect = getClippingRect(isElement$1(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
      var referenceClientRect = getBoundingClientRect(state.elements.reference);
      var popperOffsets = computeOffsets({
        reference: referenceClientRect,
        element: popperRect,
        strategy: 'absolute',
        placement: placement
      });
      var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
      var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
      // 0 or negative = within the clipping rect

      var overflowOffsets = {
        top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
        bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
        left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
        right: elementClientRect.right - clippingClientRect.right + paddingObject.right
      };
      var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

      if (elementContext === popper && offsetData) {
        var offset = offsetData[placement];
        Object.keys(overflowOffsets).forEach(function (key) {
          var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
          var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
          overflowOffsets[key] += offset[axis] * multiply;
        });
      }

      return overflowOffsets;
    }

    function computeAutoPlacement(state, options) {
      if (options === void 0) {
        options = {};
      }

      var _options = options,
          placement = _options.placement,
          boundary = _options.boundary,
          rootBoundary = _options.rootBoundary,
          padding = _options.padding,
          flipVariations = _options.flipVariations,
          _options$allowedAutoP = _options.allowedAutoPlacements,
          allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
      var variation = getVariation(placement);
      var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
        return getVariation(placement) === variation;
      }) : basePlacements;
      var allowedPlacements = placements$1.filter(function (placement) {
        return allowedAutoPlacements.indexOf(placement) >= 0;
      });

      if (allowedPlacements.length === 0) {
        allowedPlacements = placements$1;
      } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


      var overflows = allowedPlacements.reduce(function (acc, placement) {
        acc[placement] = detectOverflow(state, {
          placement: placement,
          boundary: boundary,
          rootBoundary: rootBoundary,
          padding: padding
        })[getBasePlacement$1(placement)];
        return acc;
      }, {});
      return Object.keys(overflows).sort(function (a, b) {
        return overflows[a] - overflows[b];
      });
    }

    function getExpandedFallbackPlacements(placement) {
      if (getBasePlacement$1(placement) === auto) {
        return [];
      }

      var oppositePlacement = getOppositePlacement(placement);
      return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
    }

    function flip(_ref) {
      var state = _ref.state,
          options = _ref.options,
          name = _ref.name;

      if (state.modifiersData[name]._skip) {
        return;
      }

      var _options$mainAxis = options.mainAxis,
          checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
          _options$altAxis = options.altAxis,
          checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
          specifiedFallbackPlacements = options.fallbackPlacements,
          padding = options.padding,
          boundary = options.boundary,
          rootBoundary = options.rootBoundary,
          altBoundary = options.altBoundary,
          _options$flipVariatio = options.flipVariations,
          flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
          allowedAutoPlacements = options.allowedAutoPlacements;
      var preferredPlacement = state.options.placement;
      var basePlacement = getBasePlacement$1(preferredPlacement);
      var isBasePlacement = basePlacement === preferredPlacement;
      var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
      var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
        return acc.concat(getBasePlacement$1(placement) === auto ? computeAutoPlacement(state, {
          placement: placement,
          boundary: boundary,
          rootBoundary: rootBoundary,
          padding: padding,
          flipVariations: flipVariations,
          allowedAutoPlacements: allowedAutoPlacements
        }) : placement);
      }, []);
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var checksMap = new Map();
      var makeFallbackChecks = true;
      var firstFittingPlacement = placements[0];

      for (var i = 0; i < placements.length; i++) {
        var placement = placements[i];

        var _basePlacement = getBasePlacement$1(placement);

        var isStartVariation = getVariation(placement) === start;
        var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
        var len = isVertical ? 'width' : 'height';
        var overflow = detectOverflow(state, {
          placement: placement,
          boundary: boundary,
          rootBoundary: rootBoundary,
          altBoundary: altBoundary,
          padding: padding
        });
        var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

        if (referenceRect[len] > popperRect[len]) {
          mainVariationSide = getOppositePlacement(mainVariationSide);
        }

        var altVariationSide = getOppositePlacement(mainVariationSide);
        var checks = [];

        if (checkMainAxis) {
          checks.push(overflow[_basePlacement] <= 0);
        }

        if (checkAltAxis) {
          checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
        }

        if (checks.every(function (check) {
          return check;
        })) {
          firstFittingPlacement = placement;
          makeFallbackChecks = false;
          break;
        }

        checksMap.set(placement, checks);
      }

      if (makeFallbackChecks) {
        // `2` may be desired in some cases – research later
        var numberOfChecks = flipVariations ? 3 : 1;

        var _loop = function _loop(_i) {
          var fittingPlacement = placements.find(function (placement) {
            var checks = checksMap.get(placement);

            if (checks) {
              return checks.slice(0, _i).every(function (check) {
                return check;
              });
            }
          });

          if (fittingPlacement) {
            firstFittingPlacement = fittingPlacement;
            return "break";
          }
        };

        for (var _i = numberOfChecks; _i > 0; _i--) {
          var _ret = _loop(_i);

          if (_ret === "break") break;
        }
      }

      if (state.placement !== firstFittingPlacement) {
        state.modifiersData[name]._skip = true;
        state.placement = firstFittingPlacement;
        state.reset = true;
      }
    } // eslint-disable-next-line import/no-unused-modules


    var flip$1 = {
      name: 'flip',
      enabled: true,
      phase: 'main',
      fn: flip,
      requiresIfExists: ['offset'],
      data: {
        _skip: false
      }
    };

    function getSideOffsets(overflow, rect, preventedOffsets) {
      if (preventedOffsets === void 0) {
        preventedOffsets = {
          x: 0,
          y: 0
        };
      }

      return {
        top: overflow.top - rect.height - preventedOffsets.y,
        right: overflow.right - rect.width + preventedOffsets.x,
        bottom: overflow.bottom - rect.height + preventedOffsets.y,
        left: overflow.left - rect.width - preventedOffsets.x
      };
    }

    function isAnySideFullyClipped(overflow) {
      return [top, right, bottom, left].some(function (side) {
        return overflow[side] >= 0;
      });
    }

    function hide(_ref) {
      var state = _ref.state,
          name = _ref.name;
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var preventedOffsets = state.modifiersData.preventOverflow;
      var referenceOverflow = detectOverflow(state, {
        elementContext: 'reference'
      });
      var popperAltOverflow = detectOverflow(state, {
        altBoundary: true
      });
      var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
      var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
      var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
      var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
      state.modifiersData[name] = {
        referenceClippingOffsets: referenceClippingOffsets,
        popperEscapeOffsets: popperEscapeOffsets,
        isReferenceHidden: isReferenceHidden,
        hasPopperEscaped: hasPopperEscaped
      };
      state.attributes.popper = Object.assign({}, state.attributes.popper, {
        'data-popper-reference-hidden': isReferenceHidden,
        'data-popper-escaped': hasPopperEscaped
      });
    } // eslint-disable-next-line import/no-unused-modules


    var hide$1 = {
      name: 'hide',
      enabled: true,
      phase: 'main',
      requiresIfExists: ['preventOverflow'],
      fn: hide
    };

    function distanceAndSkiddingToXY(placement, rects, offset) {
      var basePlacement = getBasePlacement$1(placement);
      var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

      var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
        placement: placement
      })) : offset,
          skidding = _ref[0],
          distance = _ref[1];

      skidding = skidding || 0;
      distance = (distance || 0) * invertDistance;
      return [left, right].indexOf(basePlacement) >= 0 ? {
        x: distance,
        y: skidding
      } : {
        x: skidding,
        y: distance
      };
    }

    function offset(_ref2) {
      var state = _ref2.state,
          options = _ref2.options,
          name = _ref2.name;
      var _options$offset = options.offset,
          offset = _options$offset === void 0 ? [0, 0] : _options$offset;
      var data = placements.reduce(function (acc, placement) {
        acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
        return acc;
      }, {});
      var _data$state$placement = data[state.placement],
          x = _data$state$placement.x,
          y = _data$state$placement.y;

      if (state.modifiersData.popperOffsets != null) {
        state.modifiersData.popperOffsets.x += x;
        state.modifiersData.popperOffsets.y += y;
      }

      state.modifiersData[name] = data;
    } // eslint-disable-next-line import/no-unused-modules


    var offset$1 = {
      name: 'offset',
      enabled: true,
      phase: 'main',
      requires: ['popperOffsets'],
      fn: offset
    };

    function popperOffsets(_ref) {
      var state = _ref.state,
          name = _ref.name;
      // Offsets are the actual position the popper needs to have to be
      // properly positioned near its reference element
      // This is the most basic placement, and will be adjusted by
      // the modifiers in the next step
      state.modifiersData[name] = computeOffsets({
        reference: state.rects.reference,
        element: state.rects.popper,
        strategy: 'absolute',
        placement: state.placement
      });
    } // eslint-disable-next-line import/no-unused-modules


    var popperOffsets$1 = {
      name: 'popperOffsets',
      enabled: true,
      phase: 'read',
      fn: popperOffsets,
      data: {}
    };

    function getAltAxis(axis) {
      return axis === 'x' ? 'y' : 'x';
    }

    function preventOverflow(_ref) {
      var state = _ref.state,
          options = _ref.options,
          name = _ref.name;
      var _options$mainAxis = options.mainAxis,
          checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
          _options$altAxis = options.altAxis,
          checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
          boundary = options.boundary,
          rootBoundary = options.rootBoundary,
          altBoundary = options.altBoundary,
          padding = options.padding,
          _options$tether = options.tether,
          tether = _options$tether === void 0 ? true : _options$tether,
          _options$tetherOffset = options.tetherOffset,
          tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
      var overflow = detectOverflow(state, {
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding,
        altBoundary: altBoundary
      });
      var basePlacement = getBasePlacement$1(state.placement);
      var variation = getVariation(state.placement);
      var isBasePlacement = !variation;
      var mainAxis = getMainAxisFromPlacement(basePlacement);
      var altAxis = getAltAxis(mainAxis);
      var popperOffsets = state.modifiersData.popperOffsets;
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
        placement: state.placement
      })) : tetherOffset;
      var data = {
        x: 0,
        y: 0
      };

      if (!popperOffsets) {
        return;
      }

      if (checkMainAxis || checkAltAxis) {
        var mainSide = mainAxis === 'y' ? top : left;
        var altSide = mainAxis === 'y' ? bottom : right;
        var len = mainAxis === 'y' ? 'height' : 'width';
        var offset = popperOffsets[mainAxis];
        var min$1 = popperOffsets[mainAxis] + overflow[mainSide];
        var max$1 = popperOffsets[mainAxis] - overflow[altSide];
        var additive = tether ? -popperRect[len] / 2 : 0;
        var minLen = variation === start ? referenceRect[len] : popperRect[len];
        var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
        // outside the reference bounds

        var arrowElement = state.elements.arrow;
        var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
          width: 0,
          height: 0
        };
        var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
        var arrowPaddingMin = arrowPaddingObject[mainSide];
        var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
        // to include its full size in the calculation. If the reference is small
        // and near the edge of a boundary, the popper can overflow even if the
        // reference is not overflowing as well (e.g. virtual elements with no
        // width or height)

        var arrowLen = within(0, referenceRect[len], arrowRect[len]);
        var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
        var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
        var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
        var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
        var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
        var tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
        var tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;

        if (checkMainAxis) {
          var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
          popperOffsets[mainAxis] = preventedOffset;
          data[mainAxis] = preventedOffset - offset;
        }

        if (checkAltAxis) {
          var _mainSide = mainAxis === 'x' ? top : left;

          var _altSide = mainAxis === 'x' ? bottom : right;

          var _offset = popperOffsets[altAxis];

          var _min = _offset + overflow[_mainSide];

          var _max = _offset - overflow[_altSide];

          var _preventedOffset = within(tether ? min(_min, tetherMin) : _min, _offset, tether ? max(_max, tetherMax) : _max);

          popperOffsets[altAxis] = _preventedOffset;
          data[altAxis] = _preventedOffset - _offset;
        }
      }

      state.modifiersData[name] = data;
    } // eslint-disable-next-line import/no-unused-modules


    var preventOverflow$1 = {
      name: 'preventOverflow',
      enabled: true,
      phase: 'main',
      fn: preventOverflow,
      requiresIfExists: ['offset']
    };

    function getHTMLElementScroll(element) {
      return {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop
      };
    }

    function getNodeScroll(node) {
      if (node === getWindow(node) || !isHTMLElement(node)) {
        return getWindowScroll(node);
      } else {
        return getHTMLElementScroll(node);
      }
    }

    function isElementScaled(element) {
      var rect = element.getBoundingClientRect();
      var scaleX = rect.width / element.offsetWidth || 1;
      var scaleY = rect.height / element.offsetHeight || 1;
      return scaleX !== 1 || scaleY !== 1;
    } // Returns the composite rect of an element relative to its offsetParent.
    // Composite means it takes into account transforms as well as layout.


    function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
      if (isFixed === void 0) {
        isFixed = false;
      }

      var isOffsetParentAnElement = isHTMLElement(offsetParent);
      isHTMLElement(offsetParent) && isElementScaled(offsetParent);
      var documentElement = getDocumentElement(offsetParent);
      var rect = getBoundingClientRect(elementOrVirtualElement);
      var scroll = {
        scrollLeft: 0,
        scrollTop: 0
      };
      var offsets = {
        x: 0,
        y: 0
      };

      if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
        if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
        isScrollParent(documentElement)) {
          scroll = getNodeScroll(offsetParent);
        }

        if (isHTMLElement(offsetParent)) {
          offsets = getBoundingClientRect(offsetParent);
          offsets.x += offsetParent.clientLeft;
          offsets.y += offsetParent.clientTop;
        } else if (documentElement) {
          offsets.x = getWindowScrollBarX(documentElement);
        }
      }

      return {
        x: rect.left + scroll.scrollLeft - offsets.x,
        y: rect.top + scroll.scrollTop - offsets.y,
        width: rect.width,
        height: rect.height
      };
    }

    function order(modifiers) {
      var map = new Map();
      var visited = new Set();
      var result = [];
      modifiers.forEach(function (modifier) {
        map.set(modifier.name, modifier);
      }); // On visiting object, check for its dependencies and visit them recursively

      function sort(modifier) {
        visited.add(modifier.name);
        var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
        requires.forEach(function (dep) {
          if (!visited.has(dep)) {
            var depModifier = map.get(dep);

            if (depModifier) {
              sort(depModifier);
            }
          }
        });
        result.push(modifier);
      }

      modifiers.forEach(function (modifier) {
        if (!visited.has(modifier.name)) {
          // check for visited object
          sort(modifier);
        }
      });
      return result;
    }

    function orderModifiers(modifiers) {
      // order based on dependencies
      var orderedModifiers = order(modifiers); // order based on phase

      return modifierPhases.reduce(function (acc, phase) {
        return acc.concat(orderedModifiers.filter(function (modifier) {
          return modifier.phase === phase;
        }));
      }, []);
    }

    function debounce$1(fn) {
      var pending;
      return function () {
        if (!pending) {
          pending = new Promise(function (resolve) {
            Promise.resolve().then(function () {
              pending = undefined;
              resolve(fn());
            });
          });
        }

        return pending;
      };
    }

    function mergeByName(modifiers) {
      var merged = modifiers.reduce(function (merged, current) {
        var existing = merged[current.name];
        merged[current.name] = existing ? Object.assign({}, existing, current, {
          options: Object.assign({}, existing.options, current.options),
          data: Object.assign({}, existing.data, current.data)
        }) : current;
        return merged;
      }, {}); // IE11 does not support Object.values

      return Object.keys(merged).map(function (key) {
        return merged[key];
      });
    }

    var DEFAULT_OPTIONS = {
      placement: 'bottom',
      modifiers: [],
      strategy: 'absolute'
    };

    function areValidElements() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return !args.some(function (element) {
        return !(element && typeof element.getBoundingClientRect === 'function');
      });
    }

    function popperGenerator(generatorOptions) {
      if (generatorOptions === void 0) {
        generatorOptions = {};
      }

      var _generatorOptions = generatorOptions,
          _generatorOptions$def = _generatorOptions.defaultModifiers,
          defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
          _generatorOptions$def2 = _generatorOptions.defaultOptions,
          defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
      return function createPopper(reference, popper, options) {
        if (options === void 0) {
          options = defaultOptions;
        }

        var state = {
          placement: 'bottom',
          orderedModifiers: [],
          options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
          modifiersData: {},
          elements: {
            reference: reference,
            popper: popper
          },
          attributes: {},
          styles: {}
        };
        var effectCleanupFns = [];
        var isDestroyed = false;
        var instance = {
          state: state,
          setOptions: function setOptions(setOptionsAction) {
            var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
            cleanupModifierEffects();
            state.options = Object.assign({}, defaultOptions, state.options, options);
            state.scrollParents = {
              reference: isElement$1(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
              popper: listScrollParents(popper)
            }; // Orders the modifiers based on their dependencies and `phase`
            // properties

            var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

            state.orderedModifiers = orderedModifiers.filter(function (m) {
              return m.enabled;
            }); // Validate the provided modifiers so that the consumer will get warned

            runModifierEffects();
            return instance.update();
          },
          // Sync update – it will always be executed, even if not necessary. This
          // is useful for low frequency updates where sync behavior simplifies the
          // logic.
          // For high frequency updates (e.g. `resize` and `scroll` events), always
          // prefer the async Popper#update method
          forceUpdate: function forceUpdate() {
            if (isDestroyed) {
              return;
            }

            var _state$elements = state.elements,
                reference = _state$elements.reference,
                popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
            // anymore

            if (!areValidElements(reference, popper)) {

              return;
            } // Store the reference and popper rects to be read by modifiers


            state.rects = {
              reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
              popper: getLayoutRect(popper)
            }; // Modifiers have the ability to reset the current update cycle. The
            // most common use case for this is the `flip` modifier changing the
            // placement, which then needs to re-run all the modifiers, because the
            // logic was previously ran for the previous placement and is therefore
            // stale/incorrect

            state.reset = false;
            state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
            // is filled with the initial data specified by the modifier. This means
            // it doesn't persist and is fresh on each update.
            // To ensure persistent data, use `${name}#persistent`

            state.orderedModifiers.forEach(function (modifier) {
              return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
            });

            for (var index = 0; index < state.orderedModifiers.length; index++) {

              if (state.reset === true) {
                state.reset = false;
                index = -1;
                continue;
              }

              var _state$orderedModifie = state.orderedModifiers[index],
                  fn = _state$orderedModifie.fn,
                  _state$orderedModifie2 = _state$orderedModifie.options,
                  _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
                  name = _state$orderedModifie.name;

              if (typeof fn === 'function') {
                state = fn({
                  state: state,
                  options: _options,
                  name: name,
                  instance: instance
                }) || state;
              }
            }
          },
          // Async and optimistically optimized update – it will not be executed if
          // not necessary (debounced to run at most once-per-tick)
          update: debounce$1(function () {
            return new Promise(function (resolve) {
              instance.forceUpdate();
              resolve(state);
            });
          }),
          destroy: function destroy() {
            cleanupModifierEffects();
            isDestroyed = true;
          }
        };

        if (!areValidElements(reference, popper)) {

          return instance;
        }

        instance.setOptions(options).then(function (state) {
          if (!isDestroyed && options.onFirstUpdate) {
            options.onFirstUpdate(state);
          }
        }); // Modifiers have the ability to execute arbitrary code before the first
        // update cycle runs. They will be executed in the same order as the update
        // cycle. This is useful when a modifier adds some persistent data that
        // other modifiers need to use, but the modifier is run after the dependent
        // one.

        function runModifierEffects() {
          state.orderedModifiers.forEach(function (_ref3) {
            var name = _ref3.name,
                _ref3$options = _ref3.options,
                options = _ref3$options === void 0 ? {} : _ref3$options,
                effect = _ref3.effect;

            if (typeof effect === 'function') {
              var cleanupFn = effect({
                state: state,
                name: name,
                instance: instance,
                options: options
              });

              var noopFn = function noopFn() {};

              effectCleanupFns.push(cleanupFn || noopFn);
            }
          });
        }

        function cleanupModifierEffects() {
          effectCleanupFns.forEach(function (fn) {
            return fn();
          });
          effectCleanupFns = [];
        }

        return instance;
      };
    }

    var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
    var createPopper = /*#__PURE__*/popperGenerator({
      defaultModifiers: defaultModifiers
    }); // eslint-disable-next-line import/no-unused-modules

    /**!
    * tippy.js v6.0.3
    * (c) 2017-2020 atomiks
    * MIT License
    */

    var PASSIVE = {
      passive: true
    };
    var IOS_CLASS = "tippy-iOS";
    var BOX_CLASS = "tippy-box";
    var CONTENT_CLASS = "tippy-content";
    var BACKDROP_CLASS = "tippy-backdrop";
    var ARROW_CLASS = "tippy-arrow";
    var SVG_ARROW_CLASS = "tippy-svg-arrow";
    function getValueAtIndexOrReturn(value, index, defaultValue) {
      if (Array.isArray(value)) {
        var v = value[index];
        return v == null ? Array.isArray(defaultValue) ? defaultValue[index] : defaultValue : v;
      }

      return value;
    }
    function isType(value, type) {
      var str = {}.toString.call(value);
      return str.indexOf('[object') === 0 && str.indexOf(type + "]") > -1;
    }
    function invokeWithArgsOrReturn(value, args) {
      return typeof value === 'function' ? value.apply(void 0, args) : value;
    }
    function debounce(fn, ms) {
      // Avoid wrapping in `setTimeout` if ms is 0 anyway
      if (ms === 0) {
        return fn;
      }

      var timeout;
      return function (arg) {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
          fn(arg);
        }, ms);
      };
    }
    function splitBySpaces(value) {
      return value.split(/\s+/).filter(Boolean);
    }
    function normalizeToArray(value) {
      return [].concat(value);
    }
    function pushIfUnique(arr, value) {
      if (arr.indexOf(value) === -1) {
        arr.push(value);
      }
    }
    function unique(arr) {
      return arr.filter(function (item, index) {
        return arr.indexOf(item) === index;
      });
    }
    function getBasePlacement(placement) {
      return placement.split('-')[0];
    }
    function arrayFrom(value) {
      return [].slice.call(value);
    }

    function div() {
      return document.createElement('div');
    }
    function isElement(value) {
      return isType(value, 'Element');
    }
    function isNodeList(value) {
      return isType(value, 'NodeList');
    }
    function isMouseEvent(value) {
      return isType(value, 'MouseEvent');
    }
    function isReferenceElement(value) {
      return !!(value && value._tippy && value._tippy.reference === value);
    }
    function getArrayOfElements(value) {
      if (isElement(value)) {
        return [value];
      }

      if (isNodeList(value)) {
        return arrayFrom(value);
      }

      if (Array.isArray(value)) {
        return value;
      }

      return arrayFrom(document.querySelectorAll(value));
    }
    function setTransitionDuration(els, value) {
      els.forEach(function (el) {
        if (el) {
          el.style.transitionDuration = value + "ms";
        }
      });
    }
    function setVisibilityState(els, state) {
      els.forEach(function (el) {
        if (el) {
          el.setAttribute('data-state', state);
        }
      });
    }
    function getOwnerDocument(elementOrElements) {
      var _normalizeToArray = normalizeToArray(elementOrElements),
          element = _normalizeToArray[0];

      return element ? element.ownerDocument || document : document;
    }
    function isCursorOutsideInteractiveBorder(popperTreeData, event) {
      var clientX = event.clientX,
          clientY = event.clientY;
      return popperTreeData.every(function (_ref) {
        var popperRect = _ref.popperRect,
            popperState = _ref.popperState,
            props = _ref.props;
        var interactiveBorder = props.interactiveBorder;
        var basePlacement = getBasePlacement(popperState.placement);
        var offsetData = popperState.modifiersData.offset;

        if (!offsetData) {
          return true;
        }

        var topDistance = basePlacement === 'bottom' ? offsetData.top.y : 0;
        var bottomDistance = basePlacement === 'top' ? offsetData.bottom.y : 0;
        var leftDistance = basePlacement === 'right' ? offsetData.left.x : 0;
        var rightDistance = basePlacement === 'left' ? offsetData.right.x : 0;
        var exceedsTop = popperRect.top - clientY + topDistance > interactiveBorder;
        var exceedsBottom = clientY - popperRect.bottom - bottomDistance > interactiveBorder;
        var exceedsLeft = popperRect.left - clientX + leftDistance > interactiveBorder;
        var exceedsRight = clientX - popperRect.right - rightDistance > interactiveBorder;
        return exceedsTop || exceedsBottom || exceedsLeft || exceedsRight;
      });
    }
    function updateTransitionEndListener(box, action, listener) {
      var method = action + "EventListener"; // some browsers apparently support `transition` (unprefixed) but only fire
      // `webkitTransitionEnd`...

      ['transitionend', 'webkitTransitionEnd'].forEach(function (event) {
        box[method](event, listener);
      });
    }

    var currentInput = {
      isTouch: false
    };
    var lastMouseMoveTime = 0;
    /**
     * When a `touchstart` event is fired, it's assumed the user is using touch
     * input. We'll bind a `mousemove` event listener to listen for mouse input in
     * the future. This way, the `isTouch` property is fully dynamic and will handle
     * hybrid devices that use a mix of touch + mouse input.
     */

    function onDocumentTouchStart() {
      if (currentInput.isTouch) {
        return;
      }

      currentInput.isTouch = true;

      if (window.performance) {
        document.addEventListener('mousemove', onDocumentMouseMove);
      }
    }
    /**
     * When two `mousemove` event are fired consecutively within 20ms, it's assumed
     * the user is using mouse input again. `mousemove` can fire on touch devices as
     * well, but very rarely that quickly.
     */

    function onDocumentMouseMove() {
      var now = performance.now();

      if (now - lastMouseMoveTime < 20) {
        currentInput.isTouch = false;
        document.removeEventListener('mousemove', onDocumentMouseMove);
      }

      lastMouseMoveTime = now;
    }
    /**
     * When an element is in focus and has a tippy, leaving the tab/window and
     * returning causes it to show again. For mouse users this is unexpected, but
     * for keyboard use it makes sense.
     * TODO: find a better technique to solve this problem
     */

    function onWindowBlur() {
      var activeElement = document.activeElement;

      if (isReferenceElement(activeElement)) {
        var instance = activeElement._tippy;

        if (activeElement.blur && !instance.state.isVisible) {
          activeElement.blur();
        }
      }
    }
    function bindGlobalEventListeners() {
      document.addEventListener('touchstart', onDocumentTouchStart, Object.assign({}, PASSIVE, {
        capture: true
      }));
      window.addEventListener('blur', onWindowBlur);
    }

    var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
    var ua = isBrowser ? navigator.userAgent : '';
    var isIE = /MSIE |Trident\//.test(ua);
    var isIOS = isBrowser && /iPhone|iPad|iPod/.test(navigator.platform);

    var pluginProps = {
      animateFill: false,
      followCursor: false,
      inlinePositioning: false,
      sticky: false
    };
    var renderProps = {
      allowHTML: false,
      animation: 'fade',
      arrow: true,
      content: '',
      inertia: false,
      maxWidth: 350,
      role: 'tooltip',
      theme: '',
      zIndex: 9999
    };
    var defaultProps = Object.assign({
      appendTo: function appendTo() {
        return document.body;
      },
      aria: {
        content: 'auto',
        expanded: 'auto'
      },
      content: '',
      delay: 0,
      duration: [300, 250],
      getReferenceClientRect: null,
      hideOnClick: true,
      ignoreAttributes: false,
      interactive: false,
      interactiveBorder: 2,
      interactiveDebounce: 0,
      moveTransition: '',
      offset: [0, 10],
      onAfterUpdate: function onAfterUpdate() {},
      onBeforeUpdate: function onBeforeUpdate() {},
      onCreate: function onCreate() {},
      onDestroy: function onDestroy() {},
      onHidden: function onHidden() {},
      onHide: function onHide() {},
      onMount: function onMount() {},
      onShow: function onShow() {},
      onShown: function onShown() {},
      onTrigger: function onTrigger() {},
      onUntrigger: function onUntrigger() {},
      placement: 'top',
      plugins: [],
      popperOptions: {},
      render: null,
      showOnCreate: false,
      touch: true,
      trigger: 'mouseenter focus',
      triggerTarget: null
    }, pluginProps, {}, renderProps);
    var defaultKeys = Object.keys(defaultProps);
    var setDefaultProps = function setDefaultProps(partialProps) {

      var keys = Object.keys(partialProps);
      keys.forEach(function (key) {
        defaultProps[key] = partialProps[key];
      });
    };
    function getExtendedPassedProps(passedProps) {
      var plugins = passedProps.plugins || [];
      var pluginProps = plugins.reduce(function (acc, plugin) {
        var name = plugin.name,
            defaultValue = plugin.defaultValue;

        if (name) {
          acc[name] = passedProps[name] !== undefined ? passedProps[name] : defaultValue;
        }

        return acc;
      }, {});
      return Object.assign({}, passedProps, {}, pluginProps);
    }
    function getDataAttributeProps(reference, plugins) {
      var propKeys = plugins ? Object.keys(getExtendedPassedProps(Object.assign({}, defaultProps, {
        plugins: plugins
      }))) : defaultKeys;
      var props = propKeys.reduce(function (acc, key) {
        var valueAsString = (reference.getAttribute("data-tippy-" + key) || '').trim();

        if (!valueAsString) {
          return acc;
        }

        if (key === 'content') {
          acc[key] = valueAsString;
        } else {
          try {
            acc[key] = JSON.parse(valueAsString);
          } catch (e) {
            acc[key] = valueAsString;
          }
        }

        return acc;
      }, {});
      return props;
    }
    function evaluateProps(reference, props) {
      var out = Object.assign({}, props, {
        content: invokeWithArgsOrReturn(props.content, [reference])
      }, props.ignoreAttributes ? {} : getDataAttributeProps(reference, props.plugins));
      out.aria = Object.assign({}, defaultProps.aria, {}, out.aria);
      out.aria = {
        expanded: out.aria.expanded === 'auto' ? props.interactive : out.aria.expanded,
        content: out.aria.content === 'auto' ? props.interactive ? null : 'describedby' : out.aria.content
      };
      return out;
    }

    var innerHTML = function innerHTML() {
      return 'innerHTML';
    };

    function dangerouslySetInnerHTML(element, html) {
      element[innerHTML()] = html;
    }

    function createArrowElement(value) {
      var arrow = div();

      if (value === true) {
        arrow.className = ARROW_CLASS;
      } else {
        arrow.className = SVG_ARROW_CLASS;

        if (isElement(value)) {
          arrow.appendChild(value);
        } else {
          dangerouslySetInnerHTML(arrow, value);
        }
      }

      return arrow;
    }

    function setContent(content, props) {
      if (isElement(props.content)) {
        dangerouslySetInnerHTML(content, '');
        content.appendChild(props.content);
      } else if (typeof props.content !== 'function') {
        if (props.allowHTML) {
          dangerouslySetInnerHTML(content, props.content);
        } else {
          content.textContent = props.content;
        }
      }
    }
    function getChildren(popper) {
      var box = popper.firstElementChild;
      var boxChildren = arrayFrom(box.children);
      return {
        box: box,
        content: boxChildren.find(function (node) {
          return node.classList.contains(CONTENT_CLASS);
        }),
        arrow: boxChildren.find(function (node) {
          return node.classList.contains(ARROW_CLASS) || node.classList.contains(SVG_ARROW_CLASS);
        }),
        backdrop: boxChildren.find(function (node) {
          return node.classList.contains(BACKDROP_CLASS);
        })
      };
    }
    function render(instance) {
      var popper = div();
      var box = div();
      box.className = BOX_CLASS;
      box.setAttribute('data-state', 'hidden');
      box.setAttribute('tabindex', '-1');
      var content = div();
      content.className = CONTENT_CLASS;
      content.setAttribute('data-state', 'hidden');
      setContent(content, instance.props);
      popper.appendChild(box);
      box.appendChild(content);
      onUpdate(instance.props, instance.props);

      function onUpdate(prevProps, nextProps) {
        var _getChildren = getChildren(popper),
            box = _getChildren.box,
            content = _getChildren.content,
            arrow = _getChildren.arrow;

        if (nextProps.theme) {
          box.setAttribute('data-theme', nextProps.theme);
        } else {
          box.removeAttribute('data-theme');
        }

        if (typeof nextProps.animation === 'string') {
          box.setAttribute('data-animation', nextProps.animation);
        } else {
          box.removeAttribute('data-animation');
        }

        if (nextProps.inertia) {
          box.setAttribute('data-inertia', '');
        } else {
          box.removeAttribute('data-inertia');
        }

        box.style.maxWidth = typeof nextProps.maxWidth === 'number' ? nextProps.maxWidth + "px" : nextProps.maxWidth;

        if (nextProps.role) {
          box.setAttribute('role', nextProps.role);
        } else {
          box.removeAttribute('role');
        }

        if (prevProps.content !== nextProps.content) {
          setContent(content, instance.props);
        }

        if (nextProps.arrow) {
          if (!arrow) {
            box.appendChild(createArrowElement(nextProps.arrow));
          } else if (prevProps.arrow !== nextProps.arrow) {
            box.removeChild(arrow);
            box.appendChild(createArrowElement(nextProps.arrow));
          }
        } else if (arrow) {
          box.removeChild(arrow);
        }
      }

      return {
        popper: popper,
        onUpdate: onUpdate
      };
    } // Runtime check to identify if the render function is the default one; this
    // way we can apply default CSS transitions logic and it can be tree-shaken away

    render.$$tippy = true;

    var idCounter = 1;
    var mouseMoveListeners = []; // Used by `hideAll()`

    var mountedInstances = [];
    function createTippy(reference, passedProps) {
      var props = evaluateProps(reference, Object.assign({}, defaultProps, {}, getExtendedPassedProps(passedProps))); // ===========================================================================
      // 🔒 Private members
      // ===========================================================================

      var showTimeout;
      var hideTimeout;
      var scheduleHideAnimationFrame;
      var isVisibleFromClick = false;
      var didHideDueToDocumentMouseDown = false;
      var ignoreOnFirstUpdate = false;
      var lastTriggerEvent;
      var currentTransitionEndListener;
      var onFirstUpdate;
      var listeners = [];
      var debouncedOnMouseMove = debounce(onMouseMove, props.interactiveDebounce);
      var currentTarget;
      var doc = getOwnerDocument(props.triggerTarget || reference); // ===========================================================================
      // 🔑 Public members
      // ===========================================================================

      var id = idCounter++;
      var popperInstance = null;
      var plugins = unique(props.plugins);
      var state = {
        // Is the instance currently enabled?
        isEnabled: true,
        // Is the tippy currently showing and not transitioning out?
        isVisible: false,
        // Has the instance been destroyed?
        isDestroyed: false,
        // Is the tippy currently mounted to the DOM?
        isMounted: false,
        // Has the tippy finished transitioning in?
        isShown: false
      };
      var instance = {
        // properties
        id: id,
        reference: reference,
        popper: div(),
        popperInstance: popperInstance,
        props: props,
        state: state,
        plugins: plugins,
        // methods
        clearDelayTimeouts: clearDelayTimeouts,
        setProps: setProps,
        setContent: setContent,
        show: show,
        hide: hide,
        enable: enable,
        disable: disable,
        unmount: unmount,
        destroy: destroy
      }; // TODO: Investigate why this early return causes a TDZ error in the tests —
      // it doesn't seem to happen in the browser

      /* istanbul ignore if */

      if (!props.render) {

        return instance;
      } // ===========================================================================
      // Initial mutations
      // ===========================================================================


      var _props$render = props.render(instance),
          popper = _props$render.popper,
          onUpdate = _props$render.onUpdate;

      popper.setAttribute('data-tippy-root', '');
      popper.id = "tippy-" + instance.id;
      instance.popper = popper;
      reference._tippy = instance;
      popper._tippy = instance;
      var pluginsHooks = plugins.map(function (plugin) {
        return plugin.fn(instance);
      });
      var hasAriaExpanded = reference.hasAttribute('aria-expanded');
      addListeners();
      handleAriaExpandedAttribute();
      handleStyles();
      invokeHook('onCreate', [instance]);

      if (props.showOnCreate) {
        scheduleShow();
      } // Prevent a tippy with a delay from hiding if the cursor left then returned
      // before it started hiding


      popper.addEventListener('mouseenter', function () {
        if (instance.props.interactive && instance.state.isVisible) {
          instance.clearDelayTimeouts();
        }
      });
      popper.addEventListener('mouseleave', function (event) {
        if (instance.props.interactive && instance.props.trigger.indexOf('mouseenter') >= 0) {
          doc.addEventListener('mousemove', debouncedOnMouseMove);
          debouncedOnMouseMove(event);
        }
      });
      return instance; // ===========================================================================
      // 🔒 Private methods
      // ===========================================================================

      function getNormalizedTouchSettings() {
        var touch = instance.props.touch;
        return Array.isArray(touch) ? touch : [touch, 0];
      }

      function getIsCustomTouchBehavior() {
        return getNormalizedTouchSettings()[0] === 'hold';
      }

      function getIsDefaultRenderFn() {
        var _instance$props$rende;

        // @ts-ignore
        return !!((_instance$props$rende = instance.props.render) == null ? void 0 : _instance$props$rende.$$tippy);
      }

      function getCurrentTarget() {
        return currentTarget || reference;
      }

      function getDefaultTemplateChildren() {
        return getChildren(popper);
      }

      function getDelay(isShow) {
        // For touch or keyboard input, force `0` delay for UX reasons
        // Also if the instance is mounted but not visible (transitioning out),
        // ignore delay
        if (instance.state.isMounted && !instance.state.isVisible || currentInput.isTouch || lastTriggerEvent && lastTriggerEvent.type === 'focus') {
          return 0;
        }

        return getValueAtIndexOrReturn(instance.props.delay, isShow ? 0 : 1, defaultProps.delay);
      }

      function handleStyles() {
        popper.style.pointerEvents = instance.props.interactive && instance.state.isVisible ? '' : 'none';
        popper.style.zIndex = "" + instance.props.zIndex;
      }

      function updateIOSClass(isAdd) {
        var shouldAdd = isAdd && isIOS && currentInput.isTouch;
        doc.body.classList[shouldAdd ? 'add' : 'remove'](IOS_CLASS);
      }

      function invokeHook(hook, args, shouldInvokePropsHook) {
        if (shouldInvokePropsHook === void 0) {
          shouldInvokePropsHook = true;
        }

        pluginsHooks.forEach(function (pluginHooks) {
          if (pluginHooks[hook]) {
            pluginHooks[hook].apply(void 0, args);
          }
        });

        if (shouldInvokePropsHook) {
          var _instance$props;

          (_instance$props = instance.props)[hook].apply(_instance$props, args);
        }
      }

      function handleAriaContentAttribute() {
        var aria = instance.props.aria;

        if (!aria.content) {
          return;
        }

        var attr = "aria-" + aria.content;
        var id = popper.id;
        var nodes = normalizeToArray(instance.props.triggerTarget || reference);
        nodes.forEach(function (node) {
          var currentValue = node.getAttribute(attr);

          if (instance.state.isVisible) {
            node.setAttribute(attr, currentValue ? currentValue + " " + id : id);
          } else {
            var nextValue = currentValue && currentValue.replace(id, '').trim();

            if (nextValue) {
              node.setAttribute(attr, nextValue);
            } else {
              node.removeAttribute(attr);
            }
          }
        });
      }

      function handleAriaExpandedAttribute() {
        if (hasAriaExpanded || !instance.props.aria.expanded) {
          return;
        }

        var nodes = normalizeToArray(instance.props.triggerTarget || reference);
        nodes.forEach(function (node) {
          if (instance.props.interactive) {
            node.setAttribute('aria-expanded', instance.state.isVisible && node === getCurrentTarget() ? 'true' : 'false');
          } else {
            node.removeAttribute('aria-expanded');
          }
        });
      }

      function cleanupInteractiveMouseListeners() {
        doc.body.removeEventListener('mouseleave', scheduleHide);
        doc.removeEventListener('mousemove', debouncedOnMouseMove);
        mouseMoveListeners = mouseMoveListeners.filter(function (listener) {
          return listener !== debouncedOnMouseMove;
        });
      }

      function onDocumentMouseDown(event) {
        // Clicked on interactive popper
        if (instance.props.interactive && popper.contains(event.target)) {
          return;
        } // Clicked on the event listeners target


        if (getCurrentTarget().contains(event.target)) {
          if (currentInput.isTouch) {
            return;
          }

          if (instance.state.isVisible && instance.props.trigger.indexOf('click') >= 0) {
            return;
          }
        }

        if (instance.props.hideOnClick === true) {
          isVisibleFromClick = false;
          instance.clearDelayTimeouts();
          instance.hide(); // `mousedown` event is fired right before `focus` if pressing the
          // currentTarget. This lets a tippy with `focus` trigger know that it
          // should not show

          didHideDueToDocumentMouseDown = true;
          setTimeout(function () {
            didHideDueToDocumentMouseDown = false;
          }); // The listener gets added in `scheduleShow()`, but this may be hiding it
          // before it shows, and hide()'s early bail-out behavior can prevent it
          // from being cleaned up

          if (!instance.state.isMounted) {
            removeDocumentMouseDownListener();
          }
        }
      }

      function addDocumentMouseDownListener() {
        doc.addEventListener('mousedown', onDocumentMouseDown, true);
      }

      function removeDocumentMouseDownListener() {
        doc.removeEventListener('mousedown', onDocumentMouseDown, true);
      }

      function onTransitionedOut(duration, callback) {
        onTransitionEnd(duration, function () {
          if (!instance.state.isVisible && popper.parentNode && popper.parentNode.contains(popper)) {
            callback();
          }
        });
      }

      function onTransitionedIn(duration, callback) {
        onTransitionEnd(duration, callback);
      }

      function onTransitionEnd(duration, callback) {
        var box = getDefaultTemplateChildren().box;

        function listener(event) {
          if (event.target === box) {
            updateTransitionEndListener(box, 'remove', listener);
            callback();
          }
        } // Make callback synchronous if duration is 0
        // `transitionend` won't fire otherwise


        if (duration === 0) {
          return callback();
        }

        updateTransitionEndListener(box, 'remove', currentTransitionEndListener);
        updateTransitionEndListener(box, 'add', listener);
        currentTransitionEndListener = listener;
      }

      function on(eventType, handler, options) {
        if (options === void 0) {
          options = false;
        }

        var nodes = normalizeToArray(instance.props.triggerTarget || reference);
        nodes.forEach(function (node) {
          node.addEventListener(eventType, handler, options);
          listeners.push({
            node: node,
            eventType: eventType,
            handler: handler,
            options: options
          });
        });
      }

      function addListeners() {
        if (getIsCustomTouchBehavior()) {
          on('touchstart', onTrigger, PASSIVE);
          on('touchend', onMouseLeave, PASSIVE);
        }

        splitBySpaces(instance.props.trigger).forEach(function (eventType) {
          if (eventType === 'manual') {
            return;
          }

          on(eventType, onTrigger);

          switch (eventType) {
            case 'mouseenter':
              on('mouseleave', onMouseLeave);
              break;

            case 'focus':
              on(isIE ? 'focusout' : 'blur', onBlurOrFocusOut);
              break;

            case 'focusin':
              on('focusout', onBlurOrFocusOut);
              break;
          }
        });
      }

      function removeListeners() {
        listeners.forEach(function (_ref) {
          var node = _ref.node,
              eventType = _ref.eventType,
              handler = _ref.handler,
              options = _ref.options;
          node.removeEventListener(eventType, handler, options);
        });
        listeners = [];
      }

      function onTrigger(event) {
        var shouldScheduleClickHide = false;

        if (!instance.state.isEnabled || isEventListenerStopped(event) || didHideDueToDocumentMouseDown) {
          return;
        }

        lastTriggerEvent = event;
        currentTarget = event.currentTarget;
        handleAriaExpandedAttribute();

        if (!instance.state.isVisible && isMouseEvent(event)) {
          // If scrolling, `mouseenter` events can be fired if the cursor lands
          // over a new target, but `mousemove` events don't get fired. This
          // causes interactive tooltips to get stuck open until the cursor is
          // moved
          mouseMoveListeners.forEach(function (listener) {
            return listener(event);
          });
        } // Toggle show/hide when clicking click-triggered tooltips


        if (event.type === 'click' && (instance.props.trigger.indexOf('mouseenter') < 0 || isVisibleFromClick) && instance.props.hideOnClick !== false && instance.state.isVisible) {
          shouldScheduleClickHide = true;
        } else {
          var _getNormalizedTouchSe = getNormalizedTouchSettings(),
              value = _getNormalizedTouchSe[0],
              duration = _getNormalizedTouchSe[1];

          if (currentInput.isTouch && value === 'hold' && duration) {
            // We can hijack the show timeout here, it will be cleared by
            // `scheduleHide()` when necessary
            showTimeout = setTimeout(function () {
              scheduleShow(event);
            }, duration);
          } else {
            scheduleShow(event);
          }
        }

        if (event.type === 'click') {
          isVisibleFromClick = !shouldScheduleClickHide;
        }

        if (shouldScheduleClickHide) {
          scheduleHide(event);
        }
      }

      function onMouseMove(event) {
        var target = event.target;
        var isCursorOverReferenceOrPopper = reference.contains(target) || popper.contains(target);

        if (event.type === 'mousemove' && isCursorOverReferenceOrPopper) {
          return;
        }

        var popperTreeData = getNestedPopperTree().concat(popper).map(function (popper) {
          var _instance$popperInsta;

          var instance = popper._tippy;
          var state = (_instance$popperInsta = instance.popperInstance) == null ? void 0 : _instance$popperInsta.state;

          if (state) {
            return {
              popperRect: popper.getBoundingClientRect(),
              popperState: state,
              props: props
            };
          }

          return null;
        }).filter(Boolean);

        if (isCursorOutsideInteractiveBorder(popperTreeData, event)) {
          cleanupInteractiveMouseListeners();
          scheduleHide(event);
        }
      }

      function onMouseLeave(event) {
        var shouldBail = isEventListenerStopped(event) || instance.props.trigger.indexOf('click') >= 0 && isVisibleFromClick;

        if (shouldBail) {
          return;
        }

        if (instance.props.interactive) {
          doc.body.addEventListener('mouseleave', scheduleHide);
          doc.addEventListener('mousemove', debouncedOnMouseMove);
          pushIfUnique(mouseMoveListeners, debouncedOnMouseMove);
          debouncedOnMouseMove(event);
          return;
        }

        scheduleHide(event);
      }

      function onBlurOrFocusOut(event) {
        if (instance.props.trigger.indexOf('focusin') < 0 && event.target !== getCurrentTarget()) {
          return;
        } // If focus was moved to within the popper


        if (instance.props.interactive && event.relatedTarget && popper.contains(event.relatedTarget)) {
          return;
        }

        scheduleHide(event);
      }

      function isEventListenerStopped(event) {
        return currentInput.isTouch ? getIsCustomTouchBehavior() !== event.type.indexOf('touch') >= 0 : false;
      }

      function createPopperInstance() {
        destroyPopperInstance();
        var _instance$props2 = instance.props,
            popperOptions = _instance$props2.popperOptions,
            placement = _instance$props2.placement,
            offset = _instance$props2.offset,
            getReferenceClientRect = _instance$props2.getReferenceClientRect,
            moveTransition = _instance$props2.moveTransition;
        var arrow = getIsDefaultRenderFn() ? getChildren(popper).arrow : null;
        var computedReference = getReferenceClientRect ? {
          getBoundingClientRect: getReferenceClientRect
        } : reference;
        var tippyModifier = {
          name: '$$tippy',
          enabled: true,
          phase: 'beforeWrite',
          requires: ['computeStyles'],
          fn: function fn(_ref2) {
            var state = _ref2.state;

            if (getIsDefaultRenderFn()) {
              var _getDefaultTemplateCh = getDefaultTemplateChildren(),
                  box = _getDefaultTemplateCh.box;

              ['placement', 'reference-hidden', 'escaped'].forEach(function (attr) {
                if (attr === 'placement') {
                  box.setAttribute('data-placement', state.placement);
                } else {
                  if (state.attributes.popper["data-popper-" + attr]) {
                    box.setAttribute("data-" + attr, '');
                  } else {
                    box.removeAttribute("data-" + attr);
                  }
                }
              });
              state.attributes.popper = {};
            }
          }
        };
        var arrowModifier = {
          name: 'arrow',
          enabled: !!arrow,
          options: {
            element: arrow,
            padding: 3
          }
        };
        var modifiers = [{
          name: 'offset',
          options: {
            offset: offset
          }
        }, {
          name: 'preventOverflow',
          options: {
            padding: {
              top: 2,
              bottom: 2,
              left: 5,
              right: 5
            }
          }
        }, {
          name: 'flip',
          options: {
            padding: 5
          }
        }, {
          name: 'computeStyles',
          options: {
            adaptive: !moveTransition
          }
        }].concat(getIsDefaultRenderFn() ? [arrowModifier] : [], (popperOptions == null ? void 0 : popperOptions.modifiers) || [], [tippyModifier]);
        instance.popperInstance = createPopper(computedReference, popper, Object.assign({}, popperOptions, {
          placement: placement,
          onFirstUpdate: onFirstUpdate,
          modifiers: modifiers
        }));
      }

      function destroyPopperInstance() {
        if (instance.popperInstance) {
          instance.popperInstance.destroy();
          instance.popperInstance = null;
        }
      }

      function mount() {
        var appendTo = instance.props.appendTo;
        var parentNode; // By default, we'll append the popper to the triggerTargets's parentNode so
        // it's directly after the reference element so the elements inside the
        // tippy can be tabbed to
        // If there are clipping issues, the user can specify a different appendTo
        // and ensure focus management is handled correctly manually

        var node = getCurrentTarget();

        if (instance.props.interactive && appendTo === defaultProps.appendTo || appendTo === 'parent') {
          parentNode = node.parentNode;
        } else {
          parentNode = invokeWithArgsOrReturn(appendTo, [node]);
        } // The popper element needs to exist on the DOM before its position can be
        // updated as Popper needs to read its dimensions


        if (!parentNode.contains(popper)) {
          parentNode.appendChild(popper);
        }

        createPopperInstance();
      }

      function getNestedPopperTree() {
        return arrayFrom(popper.querySelectorAll('[data-tippy-root]'));
      }

      function scheduleShow(event) {
        instance.clearDelayTimeouts();

        if (event) {
          invokeHook('onTrigger', [instance, event]);
        }

        addDocumentMouseDownListener();
        var delay = getDelay(true);

        if (delay) {
          showTimeout = setTimeout(function () {
            instance.show();
          }, delay);
        } else {
          instance.show();
        }
      }

      function scheduleHide(event) {
        instance.clearDelayTimeouts();
        invokeHook('onUntrigger', [instance, event]);

        if (!instance.state.isVisible) {
          removeDocumentMouseDownListener();
          return;
        } // For interactive tippies, scheduleHide is added to a document.body handler
        // from onMouseLeave so must intercept scheduled hides from mousemove/leave
        // events when trigger contains mouseenter and click, and the tip is
        // currently shown as a result of a click.


        if (instance.props.trigger.indexOf('mouseenter') >= 0 && instance.props.trigger.indexOf('click') >= 0 && ['mouseleave', 'mousemove'].indexOf(event.type) >= 0 && isVisibleFromClick) {
          return;
        }

        var delay = getDelay(false);

        if (delay) {
          hideTimeout = setTimeout(function () {
            if (instance.state.isVisible) {
              instance.hide();
            }
          }, delay);
        } else {
          // Fixes a `transitionend` problem when it fires 1 frame too
          // late sometimes, we don't want hide() to be called.
          scheduleHideAnimationFrame = requestAnimationFrame(function () {
            instance.hide();
          });
        }
      } // ===========================================================================
      // 🔑 Public methods
      // ===========================================================================


      function enable() {
        instance.state.isEnabled = true;
      }

      function disable() {
        // Disabling the instance should also hide it
        // https://github.com/atomiks/tippy.js-react/issues/106
        instance.hide();
        instance.state.isEnabled = false;
      }

      function clearDelayTimeouts() {
        clearTimeout(showTimeout);
        clearTimeout(hideTimeout);
        cancelAnimationFrame(scheduleHideAnimationFrame);
      }

      function setProps(partialProps) {

        if (instance.state.isDestroyed) {
          return;
        }

        invokeHook('onBeforeUpdate', [instance, partialProps]);
        removeListeners();
        var prevProps = instance.props;
        var nextProps = evaluateProps(reference, Object.assign({}, instance.props, {}, partialProps, {
          ignoreAttributes: true
        }));
        instance.props = nextProps;
        addListeners();

        if (prevProps.interactiveDebounce !== nextProps.interactiveDebounce) {
          cleanupInteractiveMouseListeners();
          debouncedOnMouseMove = debounce(onMouseMove, nextProps.interactiveDebounce);
        } // Ensure stale aria-expanded attributes are removed


        if (prevProps.triggerTarget && !nextProps.triggerTarget) {
          normalizeToArray(prevProps.triggerTarget).forEach(function (node) {
            node.removeAttribute('aria-expanded');
          });
        } else if (nextProps.triggerTarget) {
          reference.removeAttribute('aria-expanded');
        }

        handleAriaExpandedAttribute();
        handleStyles();

        if (onUpdate) {
          onUpdate(prevProps, nextProps);
        }

        if (instance.popperInstance) {
          createPopperInstance(); // Fixes an issue with nested tippies if they are all getting re-rendered,
          // and the nested ones get re-rendered first.
          // https://github.com/atomiks/tippyjs-react/issues/177
          // TODO: find a cleaner / more efficient solution(!)

          getNestedPopperTree().forEach(function (nestedPopper) {
            // React (and other UI libs likely) requires a rAF wrapper as it flushes
            // its work in one
            requestAnimationFrame(nestedPopper._tippy.popperInstance.forceUpdate);
          });
        }

        invokeHook('onAfterUpdate', [instance, partialProps]);
      }

      function setContent(content) {
        instance.setProps({
          content: content
        });
      }

      function show() {


        var isAlreadyVisible = instance.state.isVisible;
        var isDestroyed = instance.state.isDestroyed;
        var isDisabled = !instance.state.isEnabled;
        var isTouchAndTouchDisabled = currentInput.isTouch && !instance.props.touch;
        var duration = getValueAtIndexOrReturn(instance.props.duration, 0, defaultProps.duration);

        if (isAlreadyVisible || isDestroyed || isDisabled || isTouchAndTouchDisabled) {
          return;
        } // Normalize `disabled` behavior across browsers.
        // Firefox allows events on disabled elements, but Chrome doesn't.
        // Using a wrapper element (i.e. <span>) is recommended.


        if (getCurrentTarget().hasAttribute('disabled')) {
          return;
        }

        invokeHook('onShow', [instance], false);

        if (instance.props.onShow(instance) === false) {
          return;
        }

        instance.state.isVisible = true;

        if (getIsDefaultRenderFn()) {
          popper.style.visibility = 'visible';
        }

        handleStyles();
        addDocumentMouseDownListener();

        if (!instance.state.isMounted) {
          popper.style.transition = 'none';
        } // If flipping to the opposite side after hiding at least once, the
        // animation will use the wrong placement without resetting the duration


        if (getIsDefaultRenderFn()) {
          var _getDefaultTemplateCh2 = getDefaultTemplateChildren(),
              box = _getDefaultTemplateCh2.box,
              content = _getDefaultTemplateCh2.content;

          setTransitionDuration([box, content], 0);
        }

        onFirstUpdate = function onFirstUpdate() {
          if (!instance.state.isVisible || ignoreOnFirstUpdate) {
            return;
          }

          ignoreOnFirstUpdate = true; // reflow

          void popper.offsetHeight;
          popper.style.transition = instance.props.moveTransition;

          if (getIsDefaultRenderFn() && instance.props.animation) {
            var _getDefaultTemplateCh3 = getDefaultTemplateChildren(),
                _box = _getDefaultTemplateCh3.box,
                _content = _getDefaultTemplateCh3.content;

            setTransitionDuration([_box, _content], duration);
            setVisibilityState([_box, _content], 'visible');
          }

          handleAriaContentAttribute();
          handleAriaExpandedAttribute();
          pushIfUnique(mountedInstances, instance);
          updateIOSClass(true);
          instance.state.isMounted = true;
          invokeHook('onMount', [instance]);

          if (instance.props.animation && getIsDefaultRenderFn()) {
            onTransitionedIn(duration, function () {
              instance.state.isShown = true;
              invokeHook('onShown', [instance]);
            });
          }
        };

        mount();
      }

      function hide() {


        var isAlreadyHidden = !instance.state.isVisible;
        var isDestroyed = instance.state.isDestroyed;
        var isDisabled = !instance.state.isEnabled;
        var duration = getValueAtIndexOrReturn(instance.props.duration, 1, defaultProps.duration);

        if (isAlreadyHidden || isDestroyed || isDisabled) {
          return;
        }

        invokeHook('onHide', [instance], false);

        if (instance.props.onHide(instance) === false) {
          return;
        }

        instance.state.isVisible = false;
        instance.state.isShown = false;
        ignoreOnFirstUpdate = false;

        if (getIsDefaultRenderFn()) {
          popper.style.visibility = 'hidden';
        }

        cleanupInteractiveMouseListeners();
        removeDocumentMouseDownListener();
        handleStyles();

        if (getIsDefaultRenderFn()) {
          var _getDefaultTemplateCh4 = getDefaultTemplateChildren(),
              box = _getDefaultTemplateCh4.box,
              content = _getDefaultTemplateCh4.content;

          if (instance.props.animation) {
            setTransitionDuration([box, content], duration);
            setVisibilityState([box, content], 'hidden');
          }
        }

        handleAriaContentAttribute();
        handleAriaExpandedAttribute();

        if (instance.props.animation) {
          if (getIsDefaultRenderFn()) {
            onTransitionedOut(duration, instance.unmount);
          }
        } else {
          instance.unmount();
        }
      }

      function unmount() {
        if (instance.state.isVisible) {
          instance.hide();
        }

        if (!instance.state.isMounted) {
          return;
        }

        destroyPopperInstance(); // If a popper is not interactive, it will be appended outside the popper
        // tree by default. This seems mainly for interactive tippies, but we should
        // find a workaround if possible

        getNestedPopperTree().forEach(function (nestedPopper) {
          nestedPopper._tippy.unmount();
        });

        if (popper.parentNode) {
          popper.parentNode.removeChild(popper);
        }

        mountedInstances = mountedInstances.filter(function (i) {
          return i !== instance;
        });

        if (mountedInstances.length === 0) {
          updateIOSClass(false);
        }

        instance.state.isMounted = false;
        invokeHook('onHidden', [instance]);
      }

      function destroy() {

        if (instance.state.isDestroyed) {
          return;
        }

        instance.clearDelayTimeouts();
        instance.unmount();
        removeListeners();
        delete reference._tippy;
        instance.state.isDestroyed = true;
        invokeHook('onDestroy', [instance]);
      }
    }

    function tippy$1(targets, optionalProps) {
      if (optionalProps === void 0) {
        optionalProps = {};
      }

      var plugins = defaultProps.plugins.concat(optionalProps.plugins || []);

      bindGlobalEventListeners();
      var passedProps = Object.assign({}, optionalProps, {
        plugins: plugins
      });
      var elements = getArrayOfElements(targets);

      var instances = elements.reduce(function (acc, reference) {
        var instance = reference && createTippy(reference, passedProps);

        if (instance) {
          acc.push(instance);
        }

        return acc;
      }, []);
      return isElement(targets) ? instances[0] : instances;
    }

    tippy$1.defaultProps = defaultProps;
    tippy$1.setDefaultProps = setDefaultProps;
    tippy$1.currentInput = currentInput;

    tippy$1.setDefaultProps({
      render: render
    });

    function tippy(node, props) {
      tippy$1(node, props);
    }

    function formatDecimal(x) {
      return Math.abs(x = Math.round(x)) >= 1e21
          ? x.toLocaleString("en").replace(/,/g, "")
          : x.toString(10);
    }

    // Computes the decimal coefficient and exponent of the specified number x with
    // significant digits p, where x is positive and p is in [1, 21] or undefined.
    // For example, formatDecimalParts(1.23) returns ["123", 0].
    function formatDecimalParts(x, p) {
      if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
      var i, coefficient = x.slice(0, i);

      // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
      // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
      return [
        coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
        +x.slice(i + 1)
      ];
    }

    function exponent(x) {
      return x = formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
    }

    function formatGroup(grouping, thousands) {
      return function(value, width) {
        var i = value.length,
            t = [],
            j = 0,
            g = grouping[0],
            length = 0;

        while (i > 0 && g > 0) {
          if (length + g + 1 > width) g = Math.max(1, width - length);
          t.push(value.substring(i -= g, i + g));
          if ((length += g + 1) > width) break;
          g = grouping[j = (j + 1) % grouping.length];
        }

        return t.reverse().join(thousands);
      };
    }

    function formatNumerals(numerals) {
      return function(value) {
        return value.replace(/[0-9]/g, function(i) {
          return numerals[+i];
        });
      };
    }

    // [[fill]align][sign][symbol][0][width][,][.precision][~][type]
    var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

    function formatSpecifier(specifier) {
      if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
      var match;
      return new FormatSpecifier({
        fill: match[1],
        align: match[2],
        sign: match[3],
        symbol: match[4],
        zero: match[5],
        width: match[6],
        comma: match[7],
        precision: match[8] && match[8].slice(1),
        trim: match[9],
        type: match[10]
      });
    }

    formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

    function FormatSpecifier(specifier) {
      this.fill = specifier.fill === undefined ? " " : specifier.fill + "";
      this.align = specifier.align === undefined ? ">" : specifier.align + "";
      this.sign = specifier.sign === undefined ? "-" : specifier.sign + "";
      this.symbol = specifier.symbol === undefined ? "" : specifier.symbol + "";
      this.zero = !!specifier.zero;
      this.width = specifier.width === undefined ? undefined : +specifier.width;
      this.comma = !!specifier.comma;
      this.precision = specifier.precision === undefined ? undefined : +specifier.precision;
      this.trim = !!specifier.trim;
      this.type = specifier.type === undefined ? "" : specifier.type + "";
    }

    FormatSpecifier.prototype.toString = function() {
      return this.fill
          + this.align
          + this.sign
          + this.symbol
          + (this.zero ? "0" : "")
          + (this.width === undefined ? "" : Math.max(1, this.width | 0))
          + (this.comma ? "," : "")
          + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0))
          + (this.trim ? "~" : "")
          + this.type;
    };

    // Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
    function formatTrim(s) {
      out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
        switch (s[i]) {
          case ".": i0 = i1 = i; break;
          case "0": if (i0 === 0) i0 = i; i1 = i; break;
          default: if (!+s[i]) break out; if (i0 > 0) i0 = 0; break;
        }
      }
      return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
    }

    var prefixExponent;

    function formatPrefixAuto(x, p) {
      var d = formatDecimalParts(x, p);
      if (!d) return x + "";
      var coefficient = d[0],
          exponent = d[1],
          i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
          n = coefficient.length;
      return i === n ? coefficient
          : i > n ? coefficient + new Array(i - n + 1).join("0")
          : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
          : "0." + new Array(1 - i).join("0") + formatDecimalParts(x, Math.max(0, p + i - 1))[0]; // less than 1y!
    }

    function formatRounded(x, p) {
      var d = formatDecimalParts(x, p);
      if (!d) return x + "";
      var coefficient = d[0],
          exponent = d[1];
      return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
          : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
          : coefficient + new Array(exponent - coefficient.length + 2).join("0");
    }

    var formatTypes = {
      "%": (x, p) => (x * 100).toFixed(p),
      "b": (x) => Math.round(x).toString(2),
      "c": (x) => x + "",
      "d": formatDecimal,
      "e": (x, p) => x.toExponential(p),
      "f": (x, p) => x.toFixed(p),
      "g": (x, p) => x.toPrecision(p),
      "o": (x) => Math.round(x).toString(8),
      "p": (x, p) => formatRounded(x * 100, p),
      "r": formatRounded,
      "s": formatPrefixAuto,
      "X": (x) => Math.round(x).toString(16).toUpperCase(),
      "x": (x) => Math.round(x).toString(16)
    };

    function identity(x) {
      return x;
    }

    var map = Array.prototype.map,
        prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

    function formatLocale(locale) {
      var group = locale.grouping === undefined || locale.thousands === undefined ? identity : formatGroup(map.call(locale.grouping, Number), locale.thousands + ""),
          currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "",
          currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "",
          decimal = locale.decimal === undefined ? "." : locale.decimal + "",
          numerals = locale.numerals === undefined ? identity : formatNumerals(map.call(locale.numerals, String)),
          percent = locale.percent === undefined ? "%" : locale.percent + "",
          minus = locale.minus === undefined ? "−" : locale.minus + "",
          nan = locale.nan === undefined ? "NaN" : locale.nan + "";

      function newFormat(specifier) {
        specifier = formatSpecifier(specifier);

        var fill = specifier.fill,
            align = specifier.align,
            sign = specifier.sign,
            symbol = specifier.symbol,
            zero = specifier.zero,
            width = specifier.width,
            comma = specifier.comma,
            precision = specifier.precision,
            trim = specifier.trim,
            type = specifier.type;

        // The "n" type is an alias for ",g".
        if (type === "n") comma = true, type = "g";

        // The "" type, and any invalid type, is an alias for ".12~g".
        else if (!formatTypes[type]) precision === undefined && (precision = 12), trim = true, type = "g";

        // If zero fill is specified, padding goes after sign and before digits.
        if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";

        // Compute the prefix and suffix.
        // For SI-prefix, the suffix is lazily computed.
        var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
            suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";

        // What format function should we use?
        // Is this an integer type?
        // Can this type generate exponential notation?
        var formatType = formatTypes[type],
            maybeSuffix = /[defgprs%]/.test(type);

        // Set the default precision if not specified,
        // or clamp the specified precision to the supported range.
        // For significant precision, it must be in [1, 21].
        // For fixed precision, it must be in [0, 20].
        precision = precision === undefined ? 6
            : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
            : Math.max(0, Math.min(20, precision));

        function format(value) {
          var valuePrefix = prefix,
              valueSuffix = suffix,
              i, n, c;

          if (type === "c") {
            valueSuffix = formatType(value) + valueSuffix;
            value = "";
          } else {
            value = +value;

            // Determine the sign. -0 is not less than 0, but 1 / -0 is!
            var valueNegative = value < 0 || 1 / value < 0;

            // Perform the initial formatting.
            value = isNaN(value) ? nan : formatType(Math.abs(value), precision);

            // Trim insignificant zeros.
            if (trim) value = formatTrim(value);

            // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
            if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;

            // Compute the prefix and suffix.
            valuePrefix = (valueNegative ? (sign === "(" ? sign : minus) : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
            valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");

            // Break the formatted value into the integer “value” part that can be
            // grouped, and fractional or exponential “suffix” part that is not.
            if (maybeSuffix) {
              i = -1, n = value.length;
              while (++i < n) {
                if (c = value.charCodeAt(i), 48 > c || c > 57) {
                  valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
                  value = value.slice(0, i);
                  break;
                }
              }
            }
          }

          // If the fill character is not "0", grouping is applied before padding.
          if (comma && !zero) value = group(value, Infinity);

          // Compute the padding.
          var length = valuePrefix.length + value.length + valueSuffix.length,
              padding = length < width ? new Array(width - length + 1).join(fill) : "";

          // If the fill character is "0", grouping is applied after padding.
          if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

          // Reconstruct the final output based on the desired alignment.
          switch (align) {
            case "<": value = valuePrefix + value + valueSuffix + padding; break;
            case "=": value = valuePrefix + padding + value + valueSuffix; break;
            case "^": value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length); break;
            default: value = padding + valuePrefix + value + valueSuffix; break;
          }

          return numerals(value);
        }

        format.toString = function() {
          return specifier + "";
        };

        return format;
      }

      function formatPrefix(specifier, value) {
        var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
            e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
            k = Math.pow(10, -e),
            prefix = prefixes[8 + e / 3];
        return function(value) {
          return f(k * value) + prefix;
        };
      }

      return {
        format: newFormat,
        formatPrefix: formatPrefix
      };
    }

    var locale;
    var format;

    defaultLocale({
      thousands: ",",
      grouping: [3],
      currency: ["$", ""]
    });

    function defaultLocale(definition) {
      locale = formatLocale(definition);
      format = locale.format;
      return locale;
    }

    /* src/components/Legend.svelte generated by Svelte v3.43.1 */

    const file$5 = "src/components/Legend.svelte";

    function create_fragment$5(ctx) {
    	let figure;
    	let svg;
    	let rect0;
    	let text0;
    	let t0;
    	let rect1;
    	let text1;
    	let t1;

    	const block = {
    		c: function create() {
    			figure = element("figure");
    			svg = svg_element("svg");
    			rect0 = svg_element("rect");
    			text0 = svg_element("text");
    			t0 = text$1("200 M");
    			rect1 = svg_element("rect");
    			text1 = svg_element("text");
    			t1 = text$1("< 200 M");
    			attr_dev(rect0, "width", "20px");
    			attr_dev(rect0, "height", "20px");
    			attr_dev(rect0, "x", "0");
    			attr_dev(rect0, "y", "24");
    			attr_dev(rect0, "fill", "url(#gradient)");
    			add_location(rect0, file$5, 5, 4, 100);
    			attr_dev(text0, "x", "30");
    			attr_dev(text0, "y", "40");
    			add_location(text0, file$5, 6, 4, 181);
    			attr_dev(rect1, "fill", "url(#diagonalHatch)");
    			attr_dev(rect1, "stroke", "#004E80");
    			attr_dev(rect1, "x", "100");
    			attr_dev(rect1, "y", "24");
    			attr_dev(rect1, "width", "20px");
    			attr_dev(rect1, "height", "20px");
    			attr_dev(rect1, "id", "svg_2");
    			add_location(rect1, file$5, 7, 4, 218);
    			attr_dev(text1, "x", "130");
    			attr_dev(text1, "y", "40");
    			add_location(text1, file$5, 17, 4, 385);
    			attr_dev(svg, "class", "legend__squares");
    			add_location(svg, file$5, 4, 2, 66);
    			attr_dev(figure, "class", "interactive__legend legend");
    			add_location(figure, file$5, 3, 0, 20);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, figure, anchor);
    			append_dev(figure, svg);
    			append_dev(svg, rect0);
    			append_dev(svg, text0);
    			append_dev(text0, t0);
    			append_dev(svg, rect1);
    			append_dev(svg, text1);
    			append_dev(text1, t1);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(figure);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Legend', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Legend> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Legend extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Legend",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src/components/Chart.svelte generated by Svelte v3.43.1 */
    const file$4 = "src/components/Chart.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[16] = list[i];
    	child_ctx[18] = i;
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[19] = list[i];
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[22] = list[i];
    	return child_ctx;
    }

    function get_each_context_3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[19] = list[i];
    	return child_ctx;
    }

    function get_each_context_4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[22] = list[i];
    	return child_ctx;
    }

    // (113:12) {#each getActiveRemainingRow(i) as j}
    function create_each_block_4(ctx) {
    	let rect;
    	let rect_x_value;
    	let rect_y_value;

    	const block = {
    		c: function create() {
    			rect = svg_element("rect");
    			attr_dev(rect, "width", "20px");
    			attr_dev(rect, "height", "20px");
    			attr_dev(rect, "x", rect_x_value = /*i*/ ctx[19] * 24 + 40);
    			attr_dev(rect, "y", rect_y_value = /*j*/ ctx[22] * 24);
    			attr_dev(rect, "fill", "url(#gradient)");
    			add_location(rect, file$4, 113, 14, 3169);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, rect, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*activeChartRange*/ 16 && rect_x_value !== (rect_x_value = /*i*/ ctx[19] * 24 + 40)) {
    				attr_dev(rect, "x", rect_x_value);
    			}

    			if (dirty & /*activeChartRange*/ 16 && rect_y_value !== (rect_y_value = /*j*/ ctx[22] * 24)) {
    				attr_dev(rect, "y", rect_y_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(rect);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_4.name,
    		type: "each",
    		source: "(113:12) {#each getActiveRemainingRow(i) as j}",
    		ctx
    	});

    	return block;
    }

    // (112:10) {#each activeChartRange as i}
    function create_each_block_3(ctx) {
    	let each_1_anchor;
    	let each_value_4 = /*getActiveRemainingRow*/ ctx[6](/*i*/ ctx[19]);
    	validate_each_argument(each_value_4);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_4.length; i += 1) {
    		each_blocks[i] = create_each_block_4(get_each_context_4(ctx, each_value_4, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*activeChartRange, getActiveRemainingRow*/ 80) {
    				each_value_4 = /*getActiveRemainingRow*/ ctx[6](/*i*/ ctx[19]);
    				validate_each_argument(each_value_4);
    				let i;

    				for (i = 0; i < each_value_4.length; i += 1) {
    					const child_ctx = get_each_context_4(ctx, each_value_4, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_4(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_4.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_3.name,
    		type: "each",
    		source: "(112:10) {#each activeChartRange as i}",
    		ctx
    	});

    	return block;
    }

    // (160:10) {#if country.country !== activeCountry}
    function create_if_block$1(ctx) {
    	let g;
    	let g_data_attr_value;
    	let rect;
    	let rect_y_value;
    	let text_1;
    	let t_value = /*country*/ ctx[16].country + "";
    	let t;
    	let text_1_y_value;
    	let each_value_1 = /*chartRange*/ ctx[5](/*country*/ ctx[16]);
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			g = svg_element("g");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			rect = svg_element("rect");
    			text_1 = svg_element("text");
    			t = text$1(t_value);
    			attr_dev(g, "data-attr", g_data_attr_value = /*country*/ ctx[16].country);
    			add_location(g, file$4, 160, 12, 4509);
    			attr_dev(rect, "fill", "none");
    			attr_dev(rect, "stroke", "#c5c5c5");
    			attr_dev(rect, "stroke-width", "1.5");
    			attr_dev(rect, "x", "0");
    			attr_dev(rect, "y", rect_y_value = /*height*/ ctx[3] - 60);
    			attr_dev(rect, "width", "15px");
    			attr_dev(rect, "height", "1");
    			attr_dev(rect, "id", "svg_2");
    			add_location(rect, file$4, 177, 12, 5080);
    			attr_dev(text_1, "x", "0");
    			attr_dev(text_1, "y", text_1_y_value = /*height*/ ctx[3] - 40);
    			add_location(text_1, file$4, 186, 12, 5325);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, g, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(g, null);
    			}

    			insert_dev(target, rect, anchor);
    			insert_dev(target, text_1, anchor);
    			append_dev(text_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*getRemainingRow, chartRange, allData, activeCountry, formatTooltip*/ 419) {
    				each_value_1 = /*chartRange*/ ctx[5](/*country*/ ctx[16]);
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(g, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}

    			if (dirty & /*allData, activeCountry*/ 3 && g_data_attr_value !== (g_data_attr_value = /*country*/ ctx[16].country)) {
    				attr_dev(g, "data-attr", g_data_attr_value);
    			}

    			if (dirty & /*height*/ 8 && rect_y_value !== (rect_y_value = /*height*/ ctx[3] - 60)) {
    				attr_dev(rect, "y", rect_y_value);
    			}

    			if (dirty & /*allData, activeCountry*/ 3 && t_value !== (t_value = /*country*/ ctx[16].country + "")) set_data_dev(t, t_value);

    			if (dirty & /*height*/ 8 && text_1_y_value !== (text_1_y_value = /*height*/ ctx[3] - 40)) {
    				attr_dev(text_1, "y", text_1_y_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(g);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(rect);
    			if (detaching) detach_dev(text_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(160:10) {#if country.country !== activeCountry}",
    		ctx
    	});

    	return block;
    }

    // (163:16) {#each getRemainingRow(i, country) as j}
    function create_each_block_2(ctx) {
    	let rect;
    	let rect_x_value;
    	let rect_y_value;
    	let tippy_action;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			rect = svg_element("rect");
    			attr_dev(rect, "width", "12px");
    			attr_dev(rect, "height", "12px");
    			attr_dev(rect, "x", rect_x_value = /*i*/ ctx[19] * 16);
    			attr_dev(rect, "y", rect_y_value = /*j*/ ctx[22] * 16);
    			add_location(rect, file$4, 163, 18, 4665);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, rect, anchor);

    			if (!mounted) {
    				dispose = action_destroyer(tippy_action = tippy.call(null, rect, /*formatTooltip*/ ctx[8](/*country*/ ctx[16], `tooltip-node-${/*countryIndex*/ ctx[18]}`)));
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*allData, activeCountry*/ 3 && rect_x_value !== (rect_x_value = /*i*/ ctx[19] * 16)) {
    				attr_dev(rect, "x", rect_x_value);
    			}

    			if (dirty & /*allData, activeCountry*/ 3 && rect_y_value !== (rect_y_value = /*j*/ ctx[22] * 16)) {
    				attr_dev(rect, "y", rect_y_value);
    			}

    			if (tippy_action && is_function(tippy_action.update) && dirty & /*allData, activeCountry*/ 3) tippy_action.update.call(null, /*formatTooltip*/ ctx[8](/*country*/ ctx[16], `tooltip-node-${/*countryIndex*/ ctx[18]}`));
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(rect);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(163:16) {#each getRemainingRow(i, country) as j}",
    		ctx
    	});

    	return block;
    }

    // (162:14) {#each chartRange(country) as i}
    function create_each_block_1(ctx) {
    	let each_1_anchor;
    	let each_value_2 = /*getRemainingRow*/ ctx[7](/*i*/ ctx[19], /*country*/ ctx[16]);
    	validate_each_argument(each_value_2);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*chartRange, allData, activeCountry, getRemainingRow, formatTooltip*/ 419) {
    				each_value_2 = /*getRemainingRow*/ ctx[7](/*i*/ ctx[19], /*country*/ ctx[16]);
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_2.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(162:14) {#each chartRange(country) as i}",
    		ctx
    	});

    	return block;
    }

    // (140:4) {#each allData.filter((d) => d.country !== activeCountry) as country, countryIndex}
    function create_each_block$1(ctx) {
    	let figure;
    	let svg_1;
    	let defs;
    	let pattern;
    	let path;
    	let figure_data_attr_value;
    	let figure_resize_listener;
    	let if_block = /*country*/ ctx[16].country !== /*activeCountry*/ ctx[0] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			figure = element("figure");
    			svg_1 = svg_element("svg");
    			defs = svg_element("defs");
    			pattern = svg_element("pattern");
    			path = svg_element("path");
    			if (if_block) if_block.c();
    			attr_dev(path, "d", "M -1,2 l 6,0");
    			attr_dev(path, "stroke", "#000000");
    			attr_dev(path, "stroke-width", "1");
    			add_location(path, file$4, 156, 14, 4341);
    			attr_dev(pattern, "id", "diagonalHatch");
    			attr_dev(pattern, "patternUnits", "userSpaceOnUse");
    			attr_dev(pattern, "width", "4");
    			attr_dev(pattern, "height", "4");
    			attr_dev(pattern, "patternTransform", "rotate(-45 2 2)");
    			add_location(pattern, file$4, 149, 12, 4129);
    			add_location(defs, file$4, 148, 10, 4110);
    			add_location(svg_1, file$4, 147, 8, 4094);
    			attr_dev(figure, "class", "interactive__charts " + ('inactive-' + /*countryIndex*/ ctx[18]));
    			attr_dev(figure, "data-attr", figure_data_attr_value = /*country*/ ctx[16].country);
    			add_render_callback(() => /*figure_elementresize_handler_1*/ ctx[12].call(figure));
    			add_location(figure, file$4, 141, 6, 3895);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, figure, anchor);
    			append_dev(figure, svg_1);
    			append_dev(svg_1, defs);
    			append_dev(defs, pattern);
    			append_dev(pattern, path);
    			if (if_block) if_block.m(svg_1, null);
    			figure_resize_listener = add_resize_listener(figure, /*figure_elementresize_handler_1*/ ctx[12].bind(figure));
    		},
    		p: function update(ctx, dirty) {
    			if (/*country*/ ctx[16].country !== /*activeCountry*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					if_block.m(svg_1, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*allData, activeCountry*/ 3 && figure_data_attr_value !== (figure_data_attr_value = /*country*/ ctx[16].country)) {
    				attr_dev(figure, "data-attr", figure_data_attr_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(figure);
    			if (if_block) if_block.d();
    			figure_resize_listener();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(140:4) {#each allData.filter((d) => d.country !== activeCountry) as country, countryIndex}",
    		ctx
    	});

    	return block;
    }

    // (99:0) {#key activeCountry}
    function create_key_block(ctx) {
    	let div;
    	let figure;
    	let svg_1;
    	let linearGradient;
    	let stop0;
    	let stop1;
    	let g;
    	let rect;
    	let rect_y_value;
    	let rect_width_value;
    	let text_1;
    	let t0;
    	let text_1_y_value;
    	let figure_resize_listener;
    	let t1;
    	let t2;
    	let legend;
    	let current;
    	let each_value_3 = /*activeChartRange*/ ctx[4];
    	validate_each_argument(each_value_3);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_3.length; i += 1) {
    		each_blocks_1[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
    	}

    	let each_value = /*allData*/ ctx[1].filter(/*func*/ ctx[11]);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	legend = new Legend({ $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			figure = element("figure");
    			svg_1 = svg_element("svg");
    			linearGradient = svg_element("linearGradient");
    			stop0 = svg_element("stop");
    			stop1 = svg_element("stop");
    			g = svg_element("g");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			rect = svg_element("rect");
    			text_1 = svg_element("text");
    			t0 = text$1(/*activeCountry*/ ctx[0]);
    			t1 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t2 = space();
    			create_component(legend.$$.fragment);
    			attr_dev(stop0, "class", "main-stop");
    			attr_dev(stop0, "offset", "0%");
    			add_location(stop0, file$4, 107, 10, 2900);
    			attr_dev(stop1, "class", "alt-stop");
    			attr_dev(stop1, "offset", "100%");
    			add_location(stop1, file$4, 108, 10, 2954);
    			attr_dev(linearGradient, "id", "gradient");
    			add_location(linearGradient, file$4, 106, 8, 2859);
    			attr_dev(g, "data-attr", /*activeCountry*/ ctx[0]);
    			add_location(g, file$4, 110, 8, 3033);
    			attr_dev(rect, "fill", "none");
    			attr_dev(rect, "stroke", "#c5c5c5");
    			attr_dev(rect, "stroke-width", "1.5");
    			attr_dev(rect, "x", "0");
    			attr_dev(rect, "y", rect_y_value = /*height*/ ctx[3] - 1);
    			attr_dev(rect, "width", rect_width_value = /*width*/ ctx[2] * 3);
    			attr_dev(rect, "height", "1");
    			attr_dev(rect, "id", "svg_2");
    			add_location(rect, file$4, 124, 8, 3434);
    			attr_dev(text_1, "x", "0");
    			attr_dev(text_1, "y", text_1_y_value = /*height*/ ctx[3] / 2);
    			add_location(text_1, file$4, 135, 8, 3667);
    			attr_dev(svg_1, "class", "green");
    			add_location(svg_1, file$4, 105, 6, 2831);
    			attr_dev(figure, "class", "interactive__charts active");
    			add_render_callback(() => /*figure_elementresize_handler*/ ctx[10].call(figure));
    			add_location(figure, file$4, 100, 4, 2702);
    			attr_dev(div, "class", "interactive__charts-container");
    			add_location(div, file$4, 99, 2, 2654);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, figure);
    			append_dev(figure, svg_1);
    			append_dev(svg_1, linearGradient);
    			append_dev(linearGradient, stop0);
    			append_dev(linearGradient, stop1);
    			append_dev(svg_1, g);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(g, null);
    			}

    			append_dev(svg_1, rect);
    			append_dev(svg_1, text_1);
    			append_dev(text_1, t0);
    			figure_resize_listener = add_resize_listener(figure, /*figure_elementresize_handler*/ ctx[10].bind(figure));
    			append_dev(div, t1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			append_dev(div, t2);
    			mount_component(legend, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*getActiveRemainingRow, activeChartRange*/ 80) {
    				each_value_3 = /*activeChartRange*/ ctx[4];
    				validate_each_argument(each_value_3);
    				let i;

    				for (i = 0; i < each_value_3.length; i += 1) {
    					const child_ctx = get_each_context_3(ctx, each_value_3, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_3(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(g, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_3.length;
    			}

    			if (!current || dirty & /*activeCountry*/ 1) {
    				attr_dev(g, "data-attr", /*activeCountry*/ ctx[0]);
    			}

    			if (!current || dirty & /*height*/ 8 && rect_y_value !== (rect_y_value = /*height*/ ctx[3] - 1)) {
    				attr_dev(rect, "y", rect_y_value);
    			}

    			if (!current || dirty & /*width*/ 4 && rect_width_value !== (rect_width_value = /*width*/ ctx[2] * 3)) {
    				attr_dev(rect, "width", rect_width_value);
    			}

    			if (!current || dirty & /*activeCountry*/ 1) set_data_dev(t0, /*activeCountry*/ ctx[0]);

    			if (!current || dirty & /*height*/ 8 && text_1_y_value !== (text_1_y_value = /*height*/ ctx[3] / 2)) {
    				attr_dev(text_1, "y", text_1_y_value);
    			}

    			if (dirty & /*allData, activeCountry, width, height, chartRange, getRemainingRow, formatTooltip*/ 431) {
    				each_value = /*allData*/ ctx[1].filter(/*func*/ ctx[11]);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, t2);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(legend.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(legend.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks_1, detaching);
    			figure_resize_listener();
    			destroy_each(each_blocks, detaching);
    			destroy_component(legend);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_key_block.name,
    		type: "key",
    		source: "(99:0) {#key activeCountry}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let previous_key = /*activeCountry*/ ctx[0];
    	let key_block_anchor;
    	let current;
    	let key_block = create_key_block(ctx);

    	const block = {
    		c: function create() {
    			key_block.c();
    			key_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			key_block.m(target, anchor);
    			insert_dev(target, key_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*activeCountry*/ 1 && safe_not_equal(previous_key, previous_key = /*activeCountry*/ ctx[0])) {
    				group_outros();
    				transition_out(key_block, 1, 1, noop);
    				check_outros();
    				key_block = create_key_block(ctx);
    				key_block.c();
    				transition_in(key_block);
    				key_block.m(key_block_anchor.parentNode, key_block_anchor);
    			} else {
    				key_block.p(ctx, dirty);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(key_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(key_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(key_block_anchor);
    			key_block.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const b = 1000000000;

    // Helper f(n) for formatDecimalPlaces
    function formatAmount$1(value) {
    	if (window.innerWidth < 768) {
    		return value.replace(/G/, 'B').slice(-1)[0];
    	}

    	if (value.includes('T')) {
    		return 'T';
    	} else if (value.includes('G')) {
    		return 'B';
    	} else {
    		return 'M';
    	}
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let activeChartRange;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Chart', slots, []);
    	let { activeCountry } = $$props;
    	let { allData } = $$props;
    	let { contributed } = $$props;
    	let svg;
    	let width = 300;
    	let height = 300;
    	const margin = { top: 5, right: 10, bottom: 10, left: 10 };

    	/* formats values up to two decimal places while maintaining 1-3 digits left of the first comma (eg 500.00B or 1.00T) */
    	function formatDecimalPlaces(value) {
    		let amt = formatAmount$1(format('.5s')(value));
    		let numOne = format('$.5s')(value).split('.')[0];
    		let numTwo = format('.5s')(value).split('.')[1].slice(0, 1);
    		return numOne + '.' + numTwo + amt;
    	}

    	const chartRange = country => {
    		const val = allData.find(d => d.country === country.country).funding;
    		return range(0, Math.ceil(val / b), 1);
    	};

    	const getActiveRemainingRow = num => {
    		const step = 200000000;

    		if (num + 1 === Math.ceil(contributed / b)) {
    			let arr = [];

    			for (let i of range(0, b, step)) {
    				if (contributed % b > i) {
    					arr.push(4 - arr.length);
    				}
    			}

    			return arr;
    		} else {
    			return [0, 1, 2, 3, 4];
    		}
    	};

    	const getRemainingRow = (num, country) => {
    		const val = allData.find(d => d.country === country.country).funding;
    		const step = 200000000;

    		if (num + 1 === Math.ceil(val / b)) {
    			let arr = [];

    			for (let i of range(0, b, step)) {
    				if (val % b > i) {
    					arr.push(4 - arr.length);
    				}
    			}

    			return arr;
    		} else {
    			return [0, 1, 2, 3, 4];
    		}
    	};

    	const formatTooltip = (data, selector) => {
    		const template = `
      <h2 class="tooltip__heading">${data.country}</h2>
      <ul class="tooltip__values" role="list">
        <li>GDP:<span> ${formatDecimalPlaces(data.gdp)}</span> </li>
        <li>Contributed:<span> ${formatDecimalPlaces(data.funding)}</span> </li>
      </ul>
    `;

    		return {
    			content: template,
    			allowHTML: true,
    			placement: 'top',
    			maxWidth: 175,
    			triggerTarget: document.getElementById(selector),
    			touch: true
    		};
    	};

    	const writable_props = ['activeCountry', 'allData', 'contributed'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Chart> was created with unknown prop '${key}'`);
    	});

    	function figure_elementresize_handler() {
    		width = this.clientWidth;
    		height = this.clientHeight;
    		$$invalidate(2, width);
    		$$invalidate(3, height);
    	}

    	const func = d => d.country !== activeCountry;

    	function figure_elementresize_handler_1() {
    		width = this.clientWidth;
    		height = this.clientHeight;
    		$$invalidate(2, width);
    		$$invalidate(3, height);
    	}

    	$$self.$$set = $$props => {
    		if ('activeCountry' in $$props) $$invalidate(0, activeCountry = $$props.activeCountry);
    		if ('allData' in $$props) $$invalidate(1, allData = $$props.allData);
    		if ('contributed' in $$props) $$invalidate(9, contributed = $$props.contributed);
    	};

    	$$self.$capture_state = () => ({
    		filter,
    		range,
    		tippy,
    		format,
    		Legend,
    		activeCountry,
    		allData,
    		contributed,
    		svg,
    		width,
    		height,
    		margin,
    		b,
    		formatAmount: formatAmount$1,
    		formatDecimalPlaces,
    		chartRange,
    		getActiveRemainingRow,
    		getRemainingRow,
    		formatTooltip,
    		activeChartRange
    	});

    	$$self.$inject_state = $$props => {
    		if ('activeCountry' in $$props) $$invalidate(0, activeCountry = $$props.activeCountry);
    		if ('allData' in $$props) $$invalidate(1, allData = $$props.allData);
    		if ('contributed' in $$props) $$invalidate(9, contributed = $$props.contributed);
    		if ('svg' in $$props) svg = $$props.svg;
    		if ('width' in $$props) $$invalidate(2, width = $$props.width);
    		if ('height' in $$props) $$invalidate(3, height = $$props.height);
    		if ('activeChartRange' in $$props) $$invalidate(4, activeChartRange = $$props.activeChartRange);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*contributed*/ 512) {
    			$$invalidate(4, activeChartRange = range(0, Math.ceil(contributed / b), 1));
    		}
    	};

    	return [
    		activeCountry,
    		allData,
    		width,
    		height,
    		activeChartRange,
    		chartRange,
    		getActiveRemainingRow,
    		getRemainingRow,
    		formatTooltip,
    		contributed,
    		figure_elementresize_handler,
    		func,
    		figure_elementresize_handler_1
    	];
    }

    class Chart extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {
    			activeCountry: 0,
    			allData: 1,
    			contributed: 9
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Chart",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*activeCountry*/ ctx[0] === undefined && !('activeCountry' in props)) {
    			console.warn("<Chart> was created without expected prop 'activeCountry'");
    		}

    		if (/*allData*/ ctx[1] === undefined && !('allData' in props)) {
    			console.warn("<Chart> was created without expected prop 'allData'");
    		}

    		if (/*contributed*/ ctx[9] === undefined && !('contributed' in props)) {
    			console.warn("<Chart> was created without expected prop 'contributed'");
    		}
    	}

    	get activeCountry() {
    		throw new Error("<Chart>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set activeCountry(value) {
    		throw new Error("<Chart>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get allData() {
    		throw new Error("<Chart>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set allData(value) {
    		throw new Error("<Chart>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get contributed() {
    		throw new Error("<Chart>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set contributed(value) {
    		throw new Error("<Chart>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function handle(node) {
      const onDown = getOnDown(node);

      node.addEventListener("touchstart", onDown);
      node.addEventListener("mousedown", onDown);
      return {
        destroy() {
          node.removeEventListener("touchstart", onDown);
          node.removeEventListener("mousedown", onDown);
        }
      };
    }

    function getOnDown(node) {
      const onMove = getOnMove(node);

      return function (e) {
        e.preventDefault();
        node.dispatchEvent(new CustomEvent("dragstart"));

        const moveevent = "touches" in e ? "touchmove" : "mousemove";
        const upevent = "touches" in e ? "touchend" : "mouseup";

        document.addEventListener(moveevent, onMove);
        document.addEventListener(upevent, onUp);

        function onUp(e) {
          e.stopPropagation();

          document.removeEventListener(moveevent, onMove);
          document.removeEventListener(upevent, onUp);

          node.dispatchEvent(new CustomEvent("dragend"));
        }  };
    }

    function getOnMove(node) {
      const track = node.parentNode;

      return function (e) {
        const { left, width } = track.getBoundingClientRect();
        const clickOffset = "touches" in e ? e.touches[0].clientX : e.clientX;
        const clickPos = Math.min(Math.max((clickOffset - left) / width, 0), 1) || 0;
        node.dispatchEvent(new CustomEvent("drag", { detail: clickPos }));
      };
    }

    /* node_modules/@bulatdashiev/svelte-slider/src/Thumb.svelte generated by Svelte v3.43.1 */
    const file$3 = "node_modules/@bulatdashiev/svelte-slider/src/Thumb.svelte";

    function create_fragment$3(ctx) {
    	let div1;
    	let div0;
    	let div1_style_value;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div0, "class", "thumb-content svelte-1bmu3uq");
    			toggle_class(div0, "active", /*active*/ ctx[1]);
    			add_location(div0, file$3, 7, 2, 252);
    			attr_dev(div1, "class", "thumb svelte-1bmu3uq");
    			attr_dev(div1, "style", div1_style_value = `left: ${/*pos*/ ctx[0] * 100}%;`);
    			add_location(div1, file$3, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);

    			if (default_slot) {
    				default_slot.m(div0, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(handle.call(null, div1)),
    					listen_dev(div1, "dragstart", /*dragstart_handler*/ ctx[5], false, false, false),
    					listen_dev(div1, "drag", /*drag_handler*/ ctx[6], false, false, false),
    					listen_dev(div1, "dragend", /*dragend_handler*/ ctx[7], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[3],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null),
    						null
    					);
    				}
    			}

    			if (dirty & /*active*/ 2) {
    				toggle_class(div0, "active", /*active*/ ctx[1]);
    			}

    			if (!current || dirty & /*pos*/ 1 && div1_style_value !== (div1_style_value = `left: ${/*pos*/ ctx[0] * 100}%;`)) {
    				attr_dev(div1, "style", div1_style_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Thumb', slots, ['default']);
    	const dispatch = createEventDispatcher();
    	let active;
    	let { pos } = $$props;
    	const writable_props = ['pos'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Thumb> was created with unknown prop '${key}'`);
    	});

    	const dragstart_handler = () => ($$invalidate(1, active = true), dispatch('active', true));
    	const drag_handler = ({ detail: v }) => $$invalidate(0, pos = v);
    	const dragend_handler = () => ($$invalidate(1, active = false), dispatch('active', false));

    	$$self.$$set = $$props => {
    		if ('pos' in $$props) $$invalidate(0, pos = $$props.pos);
    		if ('$$scope' in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		handle,
    		dispatch,
    		pos,
    		active
    	});

    	$$self.$inject_state = $$props => {
    		if ('pos' in $$props) $$invalidate(0, pos = $$props.pos);
    		if ('active' in $$props) $$invalidate(1, active = $$props.active);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		pos,
    		active,
    		dispatch,
    		$$scope,
    		slots,
    		dragstart_handler,
    		drag_handler,
    		dragend_handler
    	];
    }

    class Thumb extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { pos: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Thumb",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*pos*/ ctx[0] === undefined && !('pos' in props)) {
    			console.warn("<Thumb> was created without expected prop 'pos'");
    		}
    	}

    	get pos() {
    		throw new Error("<Thumb>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pos(value) {
    		throw new Error("<Thumb>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/@bulatdashiev/svelte-slider/src/Slider.svelte generated by Svelte v3.43.1 */
    const file$2 = "node_modules/@bulatdashiev/svelte-slider/src/Slider.svelte";
    const get_right_slot_changes = dirty => ({});
    const get_right_slot_context = ctx => ({});
    const get_left_slot_changes = dirty => ({});
    const get_left_slot_context = ctx => ({});

    // (2:0) {#if range}
    function create_if_block_1(ctx) {
    	let input;
    	let input_value_value;
    	let input_name_value;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "type", "number");
    			input.value = input_value_value = /*value*/ ctx[0][1];
    			attr_dev(input, "name", input_name_value = /*name*/ ctx[1][1]);
    			attr_dev(input, "class", "svelte-1uq4fbt");
    			add_location(input, file$2, 2, 2, 72);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*value*/ 1 && input_value_value !== (input_value_value = /*value*/ ctx[0][1])) {
    				prop_dev(input, "value", input_value_value);
    			}

    			if (dirty & /*name*/ 2 && input_name_value !== (input_name_value = /*name*/ ctx[1][1])) {
    				attr_dev(input, "name", input_name_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(2:0) {#if range}",
    		ctx
    	});

    	return block;
    }

    // (11:12)           
    function fallback_block_3(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "thumb svelte-1uq4fbt");
    			add_location(div, file$2, 11, 8, 329);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block_3.name,
    		type: "fallback",
    		source: "(11:12)           ",
    		ctx
    	});

    	return block;
    }

    // (10:22)         
    function fallback_block_2(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[10].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[15], null);
    	const default_slot_or_fallback = default_slot || fallback_block_3(ctx);

    	const block = {
    		c: function create() {
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32768)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[15],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[15])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[15], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block_2.name,
    		type: "fallback",
    		source: "(10:22)         ",
    		ctx
    	});

    	return block;
    }

    // (9:2) <Thumb bind:pos={pos[0]} on:active={({ detail: v }) => active = v}>
    function create_default_slot_1(ctx) {
    	let current;
    	const left_slot_template = /*#slots*/ ctx[10].left;
    	const left_slot = create_slot(left_slot_template, ctx, /*$$scope*/ ctx[15], get_left_slot_context);
    	const left_slot_or_fallback = left_slot || fallback_block_2(ctx);

    	const block = {
    		c: function create() {
    			if (left_slot_or_fallback) left_slot_or_fallback.c();
    		},
    		m: function mount(target, anchor) {
    			if (left_slot_or_fallback) {
    				left_slot_or_fallback.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (left_slot) {
    				if (left_slot.p && (!current || dirty & /*$$scope*/ 32768)) {
    					update_slot_base(
    						left_slot,
    						left_slot_template,
    						ctx,
    						/*$$scope*/ ctx[15],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[15])
    						: get_slot_changes(left_slot_template, /*$$scope*/ ctx[15], dirty, get_left_slot_changes),
    						get_left_slot_context
    					);
    				}
    			} else {
    				if (left_slot_or_fallback && left_slot_or_fallback.p && (!current || dirty & /*$$scope*/ 32768)) {
    					left_slot_or_fallback.p(ctx, !current ? -1 : dirty);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(left_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(left_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (left_slot_or_fallback) left_slot_or_fallback.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(9:2) <Thumb bind:pos={pos[0]} on:active={({ detail: v }) => active = v}>",
    		ctx
    	});

    	return block;
    }

    // (16:2) {#if range}
    function create_if_block(ctx) {
    	let thumb;
    	let updating_pos;
    	let current;

    	function thumb_pos_binding_1(value) {
    		/*thumb_pos_binding_1*/ ctx[13](value);
    	}

    	let thumb_props = {
    		$$slots: { default: [create_default_slot] },
    		$$scope: { ctx }
    	};

    	if (/*pos*/ ctx[3][1] !== void 0) {
    		thumb_props.pos = /*pos*/ ctx[3][1];
    	}

    	thumb = new Thumb({ props: thumb_props, $$inline: true });
    	binding_callbacks.push(() => bind(thumb, 'pos', thumb_pos_binding_1));
    	thumb.$on("active", /*active_handler_1*/ ctx[14]);

    	const block = {
    		c: function create() {
    			create_component(thumb.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(thumb, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const thumb_changes = {};

    			if (dirty & /*$$scope*/ 32768) {
    				thumb_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_pos && dirty & /*pos*/ 8) {
    				updating_pos = true;
    				thumb_changes.pos = /*pos*/ ctx[3][1];
    				add_flush_callback(() => updating_pos = false);
    			}

    			thumb.$set(thumb_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(thumb.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(thumb.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(thumb, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(16:2) {#if range}",
    		ctx
    	});

    	return block;
    }

    // (19:14)             
    function fallback_block_1(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "thumb svelte-1uq4fbt");
    			add_location(div, file$2, 19, 10, 533);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block_1.name,
    		type: "fallback",
    		source: "(19:14)             ",
    		ctx
    	});

    	return block;
    }

    // (18:25)           
    function fallback_block(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[10].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[15], null);
    	const default_slot_or_fallback = default_slot || fallback_block_1(ctx);

    	const block = {
    		c: function create() {
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32768)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[15],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[15])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[15], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block.name,
    		type: "fallback",
    		source: "(18:25)           ",
    		ctx
    	});

    	return block;
    }

    // (17:4) <Thumb bind:pos={pos[1]} on:active={({ detail: v }) => active = v}>
    function create_default_slot(ctx) {
    	let current;
    	const right_slot_template = /*#slots*/ ctx[10].right;
    	const right_slot = create_slot(right_slot_template, ctx, /*$$scope*/ ctx[15], get_right_slot_context);
    	const right_slot_or_fallback = right_slot || fallback_block(ctx);

    	const block = {
    		c: function create() {
    			if (right_slot_or_fallback) right_slot_or_fallback.c();
    		},
    		m: function mount(target, anchor) {
    			if (right_slot_or_fallback) {
    				right_slot_or_fallback.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (right_slot) {
    				if (right_slot.p && (!current || dirty & /*$$scope*/ 32768)) {
    					update_slot_base(
    						right_slot,
    						right_slot_template,
    						ctx,
    						/*$$scope*/ ctx[15],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[15])
    						: get_slot_changes(right_slot_template, /*$$scope*/ ctx[15], dirty, get_right_slot_changes),
    						get_right_slot_context
    					);
    				}
    			} else {
    				if (right_slot_or_fallback && right_slot_or_fallback.p && (!current || dirty & /*$$scope*/ 32768)) {
    					right_slot_or_fallback.p(ctx, !current ? -1 : dirty);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(right_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(right_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (right_slot_or_fallback) right_slot_or_fallback.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(17:4) <Thumb bind:pos={pos[1]} on:active={({ detail: v }) => active = v}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let input;
    	let input_value_value;
    	let input_name_value;
    	let t0;
    	let t1;
    	let div1;
    	let div0;
    	let t2;
    	let thumb;
    	let updating_pos;
    	let t3;
    	let current;
    	let if_block0 = /*range*/ ctx[2] && create_if_block_1(ctx);

    	function thumb_pos_binding(value) {
    		/*thumb_pos_binding*/ ctx[11](value);
    	}

    	let thumb_props = {
    		$$slots: { default: [create_default_slot_1] },
    		$$scope: { ctx }
    	};

    	if (/*pos*/ ctx[3][0] !== void 0) {
    		thumb_props.pos = /*pos*/ ctx[3][0];
    	}

    	thumb = new Thumb({ props: thumb_props, $$inline: true });
    	binding_callbacks.push(() => bind(thumb, 'pos', thumb_pos_binding));
    	thumb.$on("active", /*active_handler*/ ctx[12]);
    	let if_block1 = /*range*/ ctx[2] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			input = element("input");
    			t0 = space();
    			if (if_block0) if_block0.c();
    			t1 = space();
    			div1 = element("div");
    			div0 = element("div");
    			t2 = space();
    			create_component(thumb.$$.fragment);
    			t3 = space();
    			if (if_block1) if_block1.c();
    			attr_dev(input, "type", "number");
    			input.value = input_value_value = /*value*/ ctx[0][0];
    			attr_dev(input, "name", input_name_value = /*name*/ ctx[1][0]);
    			attr_dev(input, "class", "svelte-1uq4fbt");
    			add_location(input, file$2, 0, 0, 0);
    			attr_dev(div0, "class", "progress svelte-1uq4fbt");
    			attr_dev(div0, "style", /*progress*/ ctx[5]);
    			add_location(div0, file$2, 5, 2, 159);
    			attr_dev(div1, "class", "track svelte-1uq4fbt");
    			add_location(div1, file$2, 4, 0, 136);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			insert_dev(target, t0, anchor);
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div1, t2);
    			mount_component(thumb, div1, null);
    			append_dev(div1, t3);
    			if (if_block1) if_block1.m(div1, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*value*/ 1 && input_value_value !== (input_value_value = /*value*/ ctx[0][0])) {
    				prop_dev(input, "value", input_value_value);
    			}

    			if (!current || dirty & /*name*/ 2 && input_name_value !== (input_name_value = /*name*/ ctx[1][0])) {
    				attr_dev(input, "name", input_name_value);
    			}

    			if (/*range*/ ctx[2]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_1(ctx);
    					if_block0.c();
    					if_block0.m(t1.parentNode, t1);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (!current || dirty & /*progress*/ 32) {
    				attr_dev(div0, "style", /*progress*/ ctx[5]);
    			}

    			const thumb_changes = {};

    			if (dirty & /*$$scope*/ 32768) {
    				thumb_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_pos && dirty & /*pos*/ 8) {
    				updating_pos = true;
    				thumb_changes.pos = /*pos*/ ctx[3][0];
    				add_flush_callback(() => updating_pos = false);
    			}

    			thumb.$set(thumb_changes);

    			if (/*range*/ ctx[2]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*range*/ 4) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(div1, null);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(thumb.$$.fragment, local);
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(thumb.$$.fragment, local);
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			if (detaching) detach_dev(t0);
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			destroy_component(thumb);
    			if (if_block1) if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function checkPos(pos) {
    	return [Math.min(...pos), Math.max(...pos)];
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let progress;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slider', slots, ['default','left','right']);
    	const dispatch = createEventDispatcher();
    	let { name = [] } = $$props;
    	let { range = false } = $$props;
    	let { min = 0 } = $$props;
    	let { max = 100 } = $$props;
    	let { step = 1 } = $$props;
    	let { value = [min, max] } = $$props;
    	let pos;
    	let active = false;
    	let { order = false } = $$props;

    	function setValue(pos) {
    		const offset = min % step;
    		const width = max - min;
    		$$invalidate(0, value = pos.map(v => min + v * width).map(v => Math.round((v - offset) / step) * step + offset));
    		dispatch("input", value);
    	}

    	function setPos(value) {
    		$$invalidate(3, pos = value.map(v => Math.min(Math.max(v, min), max)).map(v => (v - min) / (max - min)));
    	}

    	function clamp() {
    		setPos(value);
    		setValue(pos);
    	}

    	const writable_props = ['name', 'range', 'min', 'max', 'step', 'value', 'order'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slider> was created with unknown prop '${key}'`);
    	});

    	function thumb_pos_binding(value) {
    		if ($$self.$$.not_equal(pos[0], value)) {
    			pos[0] = value;
    			((($$invalidate(3, pos), $$invalidate(2, range)), $$invalidate(9, order)), $$invalidate(4, active));
    		}
    	}

    	const active_handler = ({ detail: v }) => $$invalidate(4, active = v);

    	function thumb_pos_binding_1(value) {
    		if ($$self.$$.not_equal(pos[1], value)) {
    			pos[1] = value;
    			((($$invalidate(3, pos), $$invalidate(2, range)), $$invalidate(9, order)), $$invalidate(4, active));
    		}
    	}

    	const active_handler_1 = ({ detail: v }) => $$invalidate(4, active = v);

    	$$self.$$set = $$props => {
    		if ('name' in $$props) $$invalidate(1, name = $$props.name);
    		if ('range' in $$props) $$invalidate(2, range = $$props.range);
    		if ('min' in $$props) $$invalidate(6, min = $$props.min);
    		if ('max' in $$props) $$invalidate(7, max = $$props.max);
    		if ('step' in $$props) $$invalidate(8, step = $$props.step);
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    		if ('order' in $$props) $$invalidate(9, order = $$props.order);
    		if ('$$scope' in $$props) $$invalidate(15, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		Thumb,
    		dispatch,
    		name,
    		range,
    		min,
    		max,
    		step,
    		value,
    		pos,
    		active,
    		order,
    		setValue,
    		setPos,
    		checkPos,
    		clamp,
    		progress
    	});

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate(1, name = $$props.name);
    		if ('range' in $$props) $$invalidate(2, range = $$props.range);
    		if ('min' in $$props) $$invalidate(6, min = $$props.min);
    		if ('max' in $$props) $$invalidate(7, max = $$props.max);
    		if ('step' in $$props) $$invalidate(8, step = $$props.step);
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    		if ('pos' in $$props) $$invalidate(3, pos = $$props.pos);
    		if ('active' in $$props) $$invalidate(4, active = $$props.active);
    		if ('order' in $$props) $$invalidate(9, order = $$props.order);
    		if ('progress' in $$props) $$invalidate(5, progress = $$props.progress);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*range, order, active, pos*/ 540) {
    			if (range && order && active) $$invalidate(3, pos = checkPos(pos));
    		}

    		if ($$self.$$.dirty & /*active, pos*/ 24) {
    			if (active) setValue(pos);
    		}

    		if ($$self.$$.dirty & /*active, value*/ 17) {
    			if (!active) setPos(value);
    		}

    		if ($$self.$$.dirty & /*min, max*/ 192) {
    			(clamp());
    		}

    		if ($$self.$$.dirty & /*range, pos*/ 12) {
    			$$invalidate(5, progress = `
    left: ${range ? Math.min(pos[0], pos[1]) * 100 : 0}%;
    right: ${100 - Math.max(pos[0], range ? pos[1] : pos[0]) * 100}%;
  `);
    		}
    	};

    	return [
    		value,
    		name,
    		range,
    		pos,
    		active,
    		progress,
    		min,
    		max,
    		step,
    		order,
    		slots,
    		thumb_pos_binding,
    		active_handler,
    		thumb_pos_binding_1,
    		active_handler_1,
    		$$scope
    	];
    }

    class Slider extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
    			name: 1,
    			range: 2,
    			min: 6,
    			max: 7,
    			step: 8,
    			value: 0,
    			order: 9
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slider",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get name() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get range() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set range(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get min() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set min(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get max() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set max(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get step() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set step(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get order() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set order(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Table.svelte generated by Svelte v3.43.1 */

    const { console: console_1$1 } = globals;
    const file$1 = "src/components/Table.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[23] = list[i];
    	return child_ctx;
    }

    // (136:12) {#each getDropdownOptions() as option}
    function create_each_block(ctx) {
    	let option;
    	let t_value = /*option*/ ctx[23] + "";
    	let t;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text$1(t_value);
    			option.__value = /*option*/ ctx[23];
    			option.value = option.__value;
    			add_location(option, file$1, 136, 14, 3601);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(136:12) {#each getDropdownOptions() as option}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let table;
    	let thead;
    	let tr0;
    	let th0;
    	let t0;
    	let th1;
    	let t2;
    	let th2;
    	let t4;
    	let th3;
    	let t6;
    	let th4;
    	let t8;
    	let tbody;
    	let tr1;
    	let th5;
    	let div0;
    	let select;
    	let t9;
    	let td0;
    	let t10_value = /*formatDecimalPlaces*/ ctx[7](/*gdp*/ ctx[3]) + "";
    	let t10;
    	let t11;
    	let td1;
    	let div1;
    	let input;
    	let t12;
    	let output;
    	let t13;
    	let td2;
    	let t14_value = /*formatDecimalPlaces*/ ctx[7](/*contributed*/ ctx[1]) + "";
    	let t14;
    	let t15;
    	let td3;
    	let t16_value = /*formatDecimalPlaces*/ ctx[7](/*remaining*/ ctx[6]) + "";
    	let t16;
    	let mounted;
    	let dispose;
    	let each_value = /*getDropdownOptions*/ ctx[8]();
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			table = element("table");
    			thead = element("thead");
    			tr0 = element("tr");
    			th0 = element("th");
    			t0 = space();
    			th1 = element("th");
    			th1.textContent = "GDP";
    			t2 = space();
    			th2 = element("th");
    			th2.textContent = "% Contributed";
    			t4 = space();
    			th3 = element("th");
    			th3.textContent = "$ Contributed";
    			t6 = space();
    			th4 = element("th");
    			th4.textContent = "Remaining";
    			t8 = space();
    			tbody = element("tbody");
    			tr1 = element("tr");
    			th5 = element("th");
    			div0 = element("div");
    			select = element("select");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t9 = space();
    			td0 = element("td");
    			t10 = text$1(t10_value);
    			t11 = space();
    			td1 = element("td");
    			div1 = element("div");
    			input = element("input");
    			t12 = space();
    			output = element("output");
    			t13 = space();
    			td2 = element("td");
    			t14 = text$1(t14_value);
    			t15 = space();
    			td3 = element("td");
    			t16 = text$1(t16_value);
    			add_location(th0, file$1, 119, 6, 3138);
    			add_location(th1, file$1, 120, 6, 3154);
    			add_location(th2, file$1, 121, 6, 3173);
    			add_location(th3, file$1, 122, 6, 3202);
    			add_location(th4, file$1, 123, 6, 3231);
    			attr_dev(tr0, "class", "interactive__subheading");
    			add_location(tr0, file$1, 118, 4, 3095);
    			add_location(thead, file$1, 117, 2, 3083);
    			attr_dev(select, "class", "input__select");
    			if (/*activeCountry*/ ctx[0] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[15].call(select));
    			add_location(select, file$1, 130, 10, 3387);
    			attr_dev(div0, "class", "interactive__dropdown");
    			add_location(div0, file$1, 129, 8, 3341);
    			attr_dev(th5, "class", "interactive__subheading");
    			add_location(th5, file$1, 128, 6, 3296);
    			add_location(td0, file$1, 141, 6, 3717);
    			attr_dev(input, "id", "slider");
    			attr_dev(input, "type", "range");
    			attr_dev(input, "name", "slider");
    			attr_dev(input, "min", "0");
    			attr_dev(input, "max", "100");
    			add_location(input, file$1, 146, 10, 3824);
    			attr_dev(output, "class", "slider__bubble");
    			add_location(output, file$1, 156, 10, 4092);
    			attr_dev(div1, "class", "slider-wrap");
    			add_location(div1, file$1, 145, 8, 3788);
    			add_location(td1, file$1, 144, 6, 3775);
    			attr_dev(td2, "class", "calc-values");
    			add_location(td2, file$1, 159, 6, 4183);
    			attr_dev(td3, "class", "calc-values");
    			add_location(td3, file$1, 162, 6, 4269);
    			add_location(tr1, file$1, 127, 4, 3285);
    			add_location(tbody, file$1, 126, 2, 3273);
    			attr_dev(table, "class", "interactive__table interactive__table--large");
    			attr_dev(table, "cellpadding", "0");
    			attr_dev(table, "cellspacing", "0");
    			add_location(table, file$1, 112, 0, 2981);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, table, anchor);
    			append_dev(table, thead);
    			append_dev(thead, tr0);
    			append_dev(tr0, th0);
    			append_dev(tr0, t0);
    			append_dev(tr0, th1);
    			append_dev(tr0, t2);
    			append_dev(tr0, th2);
    			append_dev(tr0, t4);
    			append_dev(tr0, th3);
    			append_dev(tr0, t6);
    			append_dev(tr0, th4);
    			append_dev(table, t8);
    			append_dev(table, tbody);
    			append_dev(tbody, tr1);
    			append_dev(tr1, th5);
    			append_dev(th5, div0);
    			append_dev(div0, select);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(select, null);
    			}

    			select_option(select, /*activeCountry*/ ctx[0]);
    			append_dev(tr1, t9);
    			append_dev(tr1, td0);
    			append_dev(td0, t10);
    			append_dev(tr1, t11);
    			append_dev(tr1, td1);
    			append_dev(td1, div1);
    			append_dev(div1, input);
    			set_input_value(input, /*activePercentage*/ ctx[2]);
    			/*input_binding*/ ctx[18](input);
    			append_dev(div1, t12);
    			append_dev(div1, output);
    			/*output_binding*/ ctx[20](output);
    			append_dev(tr1, t13);
    			append_dev(tr1, td2);
    			append_dev(td2, t14);
    			append_dev(tr1, t15);
    			append_dev(tr1, td3);
    			append_dev(td3, t16);

    			if (!mounted) {
    				dispose = [
    					listen_dev(select, "change", /*select_change_handler*/ ctx[15]),
    					listen_dev(select, "change", /*change_handler*/ ctx[16], false, false, false),
    					listen_dev(input, "change", /*input_change_input_handler*/ ctx[17]),
    					listen_dev(input, "input", /*input_change_input_handler*/ ctx[17]),
    					listen_dev(input, "change", /*change_handler_1*/ ctx[19], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*getDropdownOptions*/ 256) {
    				each_value = /*getDropdownOptions*/ ctx[8]();
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(select, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*activeCountry, getDropdownOptions*/ 257) {
    				select_option(select, /*activeCountry*/ ctx[0]);
    			}

    			if (dirty & /*gdp*/ 8 && t10_value !== (t10_value = /*formatDecimalPlaces*/ ctx[7](/*gdp*/ ctx[3]) + "")) set_data_dev(t10, t10_value);

    			if (dirty & /*activePercentage*/ 4) {
    				set_input_value(input, /*activePercentage*/ ctx[2]);
    			}

    			if (dirty & /*contributed*/ 2 && t14_value !== (t14_value = /*formatDecimalPlaces*/ ctx[7](/*contributed*/ ctx[1]) + "")) set_data_dev(t14, t14_value);
    			if (dirty & /*remaining*/ 64 && t16_value !== (t16_value = /*formatDecimalPlaces*/ ctx[7](/*remaining*/ ctx[6]) + "")) set_data_dev(t16, t16_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(table);
    			destroy_each(each_blocks, detaching);
    			/*input_binding*/ ctx[18](null);
    			/*output_binding*/ ctx[20](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function formatAmount(value) {
    	if (window.innerWidth < 768) {
    		return value.replace(/G/, 'B').slice(-1)[0];
    	}

    	if (value.includes('T')) {
    		return 'T';
    	} else if (value.includes('G')) {
    		return 'B';
    	} else {
    		return 'M';
    	}
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let gdp;
    	let remaining;
    	let total;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Table', slots, []);
    	let { activeCountry } = $$props;
    	let { allData } = $$props;
    	let { row } = $$props;
    	let { totalReq } = $$props;
    	let { contributed } = $$props;

    	const formatBubble = val => {
    		console.log(val);

    		if (val < 10) {
    			return '.00' + val + '%';
    		} else if (val === '100') {
    			return '.010%';
    		} else {
    			return '.0' + val + '%';
    		}
    	};

    	/* formats values up to two decimal places while maintaining 1-3 digits left of the first comma (eg 500.00B or 1.00T) */
    	function formatDecimalPlaces(value) {
    		let amt = formatAmount(format('.5s')(value));
    		let numOne = format('$.5s')(value).split('.')[0];
    		let numTwo = format('.5s')(value).split('.')[1].slice(0, 1);
    		return numOne + '.' + numTwo + amt;
    	}

    	const getDropdownOptions = () => {
    		return allData.sort((a, b) => a.country.localeCompare(b.country)).map(c => c.country);
    	};

    	let activePercentage = allData.find(d => d.country === activeCountry).adjustable_gdp * 100000;

    	const handleChange = () => {
    		const country = allData.find(d => d.country == activeCountry);
    		const convertedPercentage = activePercentage * 0.00001;
    		country.adjustable_gdp = convertedPercentage;
    		country.funding = contributed;
    	}; // console.log(allData)

    	const handleActiveCountry = () => {
    		$$invalidate(2, activePercentage = allData.find(d => d.country === activeCountry).adjustable_gdp * 100000);
    	}; // setTimeout(() => {setBubble(slider,bubble)},500) 

    	let slider;
    	let bubble;

    	onMount(() => {
    		slider.addEventListener("input", () => {
    			setBubble(slider, bubble);
    		});
    	});

    	afterUpdate(() => {
    		setBubble(slider, bubble);
    	});

    	function setBubble(range, bubble) {
    		const val = range.value;
    		const min = range.min ? range.min : 0;
    		const max = range.max ? range.max : 100;
    		const newVal = Number((val - min) * 100 / (max - min));
    		bubble.innerHTML = formatBubble(val);

    		// Sorta magic numbers based on size of the native UI thumb
    		bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.20}px))`;
    	}

    	const writable_props = ['activeCountry', 'allData', 'row', 'totalReq', 'contributed'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$1.warn(`<Table> was created with unknown prop '${key}'`);
    	});

    	function select_change_handler() {
    		activeCountry = select_value(this);
    		$$invalidate(0, activeCountry);
    		$$invalidate(8, getDropdownOptions);
    	}

    	const change_handler = () => handleActiveCountry();

    	function input_change_input_handler() {
    		activePercentage = to_number(this.value);
    		$$invalidate(2, activePercentage);
    	}

    	function input_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			slider = $$value;
    			$$invalidate(4, slider);
    		});
    	}

    	const change_handler_1 = () => handleChange();

    	function output_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			bubble = $$value;
    			$$invalidate(5, bubble);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('activeCountry' in $$props) $$invalidate(0, activeCountry = $$props.activeCountry);
    		if ('allData' in $$props) $$invalidate(11, allData = $$props.allData);
    		if ('row' in $$props) $$invalidate(12, row = $$props.row);
    		if ('totalReq' in $$props) $$invalidate(13, totalReq = $$props.totalReq);
    		if ('contributed' in $$props) $$invalidate(1, contributed = $$props.contributed);
    	};

    	$$self.$capture_state = () => ({
    		Slider,
    		range,
    		format,
    		tippy,
    		onMount,
    		afterUpdate,
    		activeCountry,
    		allData,
    		row,
    		totalReq,
    		contributed,
    		formatBubble,
    		formatAmount,
    		formatDecimalPlaces,
    		getDropdownOptions,
    		activePercentage,
    		handleChange,
    		handleActiveCountry,
    		slider,
    		bubble,
    		setBubble,
    		total,
    		remaining,
    		gdp
    	});

    	$$self.$inject_state = $$props => {
    		if ('activeCountry' in $$props) $$invalidate(0, activeCountry = $$props.activeCountry);
    		if ('allData' in $$props) $$invalidate(11, allData = $$props.allData);
    		if ('row' in $$props) $$invalidate(12, row = $$props.row);
    		if ('totalReq' in $$props) $$invalidate(13, totalReq = $$props.totalReq);
    		if ('contributed' in $$props) $$invalidate(1, contributed = $$props.contributed);
    		if ('activePercentage' in $$props) $$invalidate(2, activePercentage = $$props.activePercentage);
    		if ('slider' in $$props) $$invalidate(4, slider = $$props.slider);
    		if ('bubble' in $$props) $$invalidate(5, bubble = $$props.bubble);
    		if ('total' in $$props) $$invalidate(14, total = $$props.total);
    		if ('remaining' in $$props) $$invalidate(6, remaining = $$props.remaining);
    		if ('gdp' in $$props) $$invalidate(3, gdp = $$props.gdp);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*allData, activeCountry*/ 2049) {
    			$$invalidate(3, gdp = allData.find(d => d.country === activeCountry).gdp);
    		}

    		if ($$self.$$.dirty & /*gdp, activePercentage*/ 12) {
    			$$invalidate(1, contributed = Math.floor(gdp * (activePercentage * 0.00001)));
    		}

    		if ($$self.$$.dirty & /*allData, activeCountry, contributed, row*/ 6147) {
    			$$invalidate(14, total = Math.floor(allData.filter(d => d.country !== activeCountry).reduce(
    				(acc, i) => {
    					return acc + i.gdp * i.adjustable_gdp;
    				},
    				0
    			) + contributed + row));
    		}

    		if ($$self.$$.dirty & /*totalReq, total*/ 24576) {
    			$$invalidate(6, remaining = Math.floor(totalReq - total));
    		}
    	};

    	return [
    		activeCountry,
    		contributed,
    		activePercentage,
    		gdp,
    		slider,
    		bubble,
    		remaining,
    		formatDecimalPlaces,
    		getDropdownOptions,
    		handleChange,
    		handleActiveCountry,
    		allData,
    		row,
    		totalReq,
    		total,
    		select_change_handler,
    		change_handler,
    		input_change_input_handler,
    		input_binding,
    		change_handler_1,
    		output_binding
    	];
    }

    class Table extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {
    			activeCountry: 0,
    			allData: 11,
    			row: 12,
    			totalReq: 13,
    			contributed: 1
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Table",
    			options,
    			id: create_fragment$1.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*activeCountry*/ ctx[0] === undefined && !('activeCountry' in props)) {
    			console_1$1.warn("<Table> was created without expected prop 'activeCountry'");
    		}

    		if (/*allData*/ ctx[11] === undefined && !('allData' in props)) {
    			console_1$1.warn("<Table> was created without expected prop 'allData'");
    		}

    		if (/*row*/ ctx[12] === undefined && !('row' in props)) {
    			console_1$1.warn("<Table> was created without expected prop 'row'");
    		}

    		if (/*totalReq*/ ctx[13] === undefined && !('totalReq' in props)) {
    			console_1$1.warn("<Table> was created without expected prop 'totalReq'");
    		}

    		if (/*contributed*/ ctx[1] === undefined && !('contributed' in props)) {
    			console_1$1.warn("<Table> was created without expected prop 'contributed'");
    		}
    	}

    	get activeCountry() {
    		throw new Error("<Table>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set activeCountry(value) {
    		throw new Error("<Table>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get allData() {
    		throw new Error("<Table>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set allData(value) {
    		throw new Error("<Table>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get row() {
    		throw new Error("<Table>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set row(value) {
    		throw new Error("<Table>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get totalReq() {
    		throw new Error("<Table>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set totalReq(value) {
    		throw new Error("<Table>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get contributed() {
    		throw new Error("<Table>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set contributed(value) {
    		throw new Error("<Table>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/App.svelte generated by Svelte v3.43.1 */

    const { console: console_1 } = globals;
    const file = "src/App.svelte";

    // (127:2) {:catch error}
    function create_catch_block(ctx) {
    	let p;
    	let t_value = /*error*/ ctx[15].message + "";
    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t = text$1(t_value);
    			set_style(p, "color", "red");
    			add_location(p, file, 127, 4, 3008);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_catch_block.name,
    		type: "catch",
    		source: "(127:2) {:catch error}",
    		ctx
    	});

    	return block;
    }

    // (85:2) {:then allData}
    function create_then_block(ctx) {
    	let table;
    	let updating_activeCountry;
    	let updating_contributed;
    	let t0;
    	let chart;
    	let t1;
    	let footer;
    	let a0;
    	let img;
    	let img_src_value;
    	let t2;
    	let div;
    	let p;
    	let t3;
    	let a1;
    	let current;

    	function table_activeCountry_binding(value) {
    		/*table_activeCountry_binding*/ ctx[4](value);
    	}

    	function table_contributed_binding(value) {
    		/*table_contributed_binding*/ ctx[5](value);
    	}

    	let table_props = {
    		allData: /*allData*/ ctx[14].data,
    		row: /*allData*/ ctx[14].row.funding,
    		totalReq: /*totalReq*/ ctx[1]
    	};

    	if (/*activeCountry*/ ctx[2] !== void 0) {
    		table_props.activeCountry = /*activeCountry*/ ctx[2];
    	}

    	if (/*contributed*/ ctx[0] !== void 0) {
    		table_props.contributed = /*contributed*/ ctx[0];
    	}

    	table = new Table({ props: table_props, $$inline: true });
    	binding_callbacks.push(() => bind(table, 'activeCountry', table_activeCountry_binding));
    	binding_callbacks.push(() => bind(table, 'contributed', table_contributed_binding));

    	chart = new Chart({
    			props: {
    				allData: /*allData*/ ctx[14].data,
    				activeCountry: /*activeCountry*/ ctx[2],
    				contributed: /*contributed*/ ctx[0]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(table.$$.fragment);
    			t0 = space();
    			create_component(chart.$$.fragment);
    			t1 = space();
    			footer = element("footer");
    			a0 = element("a");
    			img = element("img");
    			t2 = space();
    			div = element("div");
    			p = element("p");
    			t3 = text$1("Source:\n          ");
    			a1 = element("a");
    			a1.textContent = "???";
    			if (!src_url_equal(img.src, img_src_value = "./images/csis-logo.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "target", "_blank");
    			attr_dev(img, "alt", "Center for Strategic & International Studies");
    			attr_dev(img, "title", "Center for Strategic & International Studies");
    			attr_dev(img, "width", "300");
    			attr_dev(img, "height", "31");
    			add_location(img, file, 105, 9, 2483);
    			attr_dev(a0, "href", "https://www.csis.org/");
    			attr_dev(a0, "class", "source-holder");
    			add_location(a0, file, 104, 6, 2420);
    			attr_dev(a1, "href", "https://www.csis.org/");
    			attr_dev(a1, "target", "_blank");
    			attr_dev(a1, "alt", "source");
    			add_location(a1, file, 117, 10, 2818);
    			add_location(p, file, 115, 8, 2786);
    			attr_dev(div, "class", "source-details");
    			add_location(div, file, 114, 6, 2749);
    			attr_dev(footer, "class", "interactive__source");
    			add_location(footer, file, 103, 4, 2377);
    		},
    		m: function mount(target, anchor) {
    			mount_component(table, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(chart, target, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, footer, anchor);
    			append_dev(footer, a0);
    			append_dev(a0, img);
    			append_dev(footer, t2);
    			append_dev(footer, div);
    			append_dev(div, p);
    			append_dev(p, t3);
    			append_dev(p, a1);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const table_changes = {};
    			if (dirty & /*totalReq*/ 2) table_changes.totalReq = /*totalReq*/ ctx[1];

    			if (!updating_activeCountry && dirty & /*activeCountry*/ 4) {
    				updating_activeCountry = true;
    				table_changes.activeCountry = /*activeCountry*/ ctx[2];
    				add_flush_callback(() => updating_activeCountry = false);
    			}

    			if (!updating_contributed && dirty & /*contributed*/ 1) {
    				updating_contributed = true;
    				table_changes.contributed = /*contributed*/ ctx[0];
    				add_flush_callback(() => updating_contributed = false);
    			}

    			table.$set(table_changes);
    			const chart_changes = {};
    			if (dirty & /*activeCountry*/ 4) chart_changes.activeCountry = /*activeCountry*/ ctx[2];
    			if (dirty & /*contributed*/ 1) chart_changes.contributed = /*contributed*/ ctx[0];
    			chart.$set(chart_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(table.$$.fragment, local);
    			transition_in(chart.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(table.$$.fragment, local);
    			transition_out(chart.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(table, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(chart, detaching);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_then_block.name,
    		type: "then",
    		source: "(85:2) {:then allData}",
    		ctx
    	});

    	return block;
    }

    // (81:15)      <div class="loading-container">       <div class="loading"></div>     </div>   {:then allData}
    function create_pending_block(ctx) {
    	let div1;
    	let div0;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			attr_dev(div0, "class", "loading");
    			add_location(div0, file, 82, 6, 2007);
    			attr_dev(div1, "class", "loading-container");
    			add_location(div1, file, 81, 4, 1969);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_pending_block.name,
    		type: "pending",
    		source: "(81:15)      <div class=\\\"loading-container\\\">       <div class=\\\"loading\\\"></div>     </div>   {:then allData}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let main;
    	let header;
    	let h1;
    	let t1;
    	let p;
    	let t3;
    	let current;

    	let info = {
    		ctx,
    		current: null,
    		token: null,
    		hasCatch: true,
    		pending: create_pending_block,
    		then: create_then_block,
    		catch: create_catch_block,
    		value: 14,
    		error: 15,
    		blocks: [,,,]
    	};

    	handle_promise(/*data*/ ctx[3], info);

    	const block = {
    		c: function create() {
    			main = element("main");
    			header = element("header");
    			h1 = element("h1");
    			h1.textContent = "HA Calculator";
    			t1 = space();
    			p = element("p");
    			p.textContent = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium\n      doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo\n      inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\n      Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut\n      fugit, sed quia consequuntur magni dolores";
    			t3 = space();
    			info.block.c();
    			add_location(h1, file, 70, 4, 1537);
    			add_location(p, file, 71, 4, 1564);
    			attr_dev(header, "class", "interactive__header");
    			add_location(header, file, 69, 2, 1496);
    			attr_dev(main, "class", "interactive");
    			add_location(main, file, 67, 0, 1431);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, header);
    			append_dev(header, h1);
    			append_dev(header, t1);
    			append_dev(header, p);
    			append_dev(main, t3);
    			info.block.m(main, info.anchor = null);
    			info.mount = () => main;
    			info.anchor = null;
    			current = true;
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;
    			update_await_block_branch(info, ctx, dirty);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(info.block);
    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < 3; i += 1) {
    				const block = info.blocks[i];
    				transition_out(block);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			info.block.d();
    			info.token = null;
    			info = null;
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let totalReq;
    	let remaining;
    	let total;
    	let activeCountry;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let contributed = 0;

    	const dataSrc = {
    		calc: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR2PkoQkmfyDDsUEpwiAoPwIHruCE8bucMMaHcYUstGyZehCS_5uDPPTh5wnDEp2Tsy8ZtDdwm4y0X0/pub?output=csv'
    	};

    	const data = loadData();

    	async function loadData() {
    		let res = await parseData({ src: dataSrc });
    		console.log(res);

    		total = res.data.reduce(
    			(acc, i) => {
    				return acc += i.funding;
    			},
    			0
    		);

    		remaining = totalReq - total;
    		console.log(total + 5815512166, '------------');
    		return res;
    	}

    	const init = () => {
    		resize(mq);
    	};

    	let isMobile = false;
    	let mq = window.matchMedia('(max-width: 48em)');

    	function resize(mediaQueryList) {
    		if (mediaQueryList.matches) {
    			isMobile = true;
    		} else {
    			isMobile = false;
    		}
    	}

    	try {
    		// Chrome & Firefox
    		mq.addEventListener('change', e => {
    			resize(e);
    		});
    	} catch(e1) {
    		try {
    			// Safari, because it doesn't support addEventListener...
    			mq.addListener(e => {
    				resize(e);
    			});
    		} catch(e2) {
    			console.error(e2);
    		}
    	}

    	window.addEventListener('DOMContentLoaded', init);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function table_activeCountry_binding(value) {
    		activeCountry = value;
    		$$invalidate(2, activeCountry);
    	}

    	function table_contributed_binding(value) {
    		contributed = value;
    		$$invalidate(0, contributed);
    	}

    	$$self.$capture_state = () => ({
    		parseData,
    		Chart,
    		Table,
    		Legend,
    		contributed,
    		dataSrc,
    		data,
    		loadData,
    		init,
    		isMobile,
    		mq,
    		resize,
    		total,
    		totalReq,
    		remaining,
    		activeCountry
    	});

    	$$self.$inject_state = $$props => {
    		if ('contributed' in $$props) $$invalidate(0, contributed = $$props.contributed);
    		if ('isMobile' in $$props) isMobile = $$props.isMobile;
    		if ('mq' in $$props) mq = $$props.mq;
    		if ('total' in $$props) total = $$props.total;
    		if ('totalReq' in $$props) $$invalidate(1, totalReq = $$props.totalReq);
    		if ('remaining' in $$props) remaining = $$props.remaining;
    		if ('activeCountry' in $$props) $$invalidate(2, activeCountry = $$props.activeCountry);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$invalidate(1, totalReq = 38536692263);
    	remaining = 0;
    	total = 0;
    	$$invalidate(2, activeCountry = 'US');

    	return [
    		contributed,
    		totalReq,
    		activeCountry,
    		data,
    		table_activeCountry_binding,
    		table_contributed_binding
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	// target: document.body,
    	target: document.getElementById('interactive'),
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
