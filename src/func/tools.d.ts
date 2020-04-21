/**
 * Func - type declarations.
 *
 * @module @xcmats/js-toolbox/func
 * @license Apache-2.0
 * @author drmats
 */




/**
 * Functional replacement of a `switch` statement.
 */
export function choose (
    key: string,
    actions?: object,
    defaultAction?: Function,
    args?: any[]
): any;




/**
 * Return value passed as a first argument.
 */
export function identity<T> (x: T): T;




/**
 * Put a given argument under function abstraction.
 */
export function lazyish<T> (x: T): () => T;




/**
 * Local binding.
 *
 * Inspired by {@link https://github.com/kongware/scriptum}
 */
export function local<T> (f?: () => T): T;




/**
 * Create function that can "lock the thing".
 *
 * During the first `n` invocations returned function acts as identity.
 * During the `n+1` invocation the argument `thing` is memoized
 * and on all subsequent invocations passed arguments are ignored
 * and memoized `thing` is returned.
 *
 * ```
 * let lock = func.locker()
 *
 * lock("I like you!")
 * 'I like you!'
 *
 * lock("I hate you.")
 * 'I like you!'
 *
 * let lock2 = func.locker(2)
 *
 * lock2("Repeat after me!")
 * 'Repeat after me!'
 *
 * lock2(42)
 * 42
 *
 * lock2("All right...")
 * 42
 * ```
 */
export function locker<T> (n?: number): (val: T) => T;




/**
 * Function arguments rearrangement.
 *
 * Takes function `f` and `indices` and returns a new function,
 * which has it's arguments arranged according to `indices`.
 *
 * Returned function will expect the number of arguments to be
 * no less than the number of `indices`. If not all of the required
 * arguments will be passed, a new function will be returned
 * expecting _rest_ of the arguments.
 *
 * In other words - function returned by `rearg` is *curried*.
 *
 * Example:
 *
 * ```
 * string.padLeft("Foo", 10, ".")  ->  ".......Foo"
 *
 * let rePad = func.rearg(string.padLeft) (1, 2, 0)  // *curried* form
 * rePad(10, ".", "Bar")  ->  ".......Bar"
 *
 * console.log("a", "b", "c", "d", "e")
 * a b c d e
 *
 * let revConsole = func.rearg(console.log) (4, 3, 2, 1, 0)
 * revConsole("a", "b", "c", "d", "e")
 * e d c b a
 *
 * revConsole("f") ("g", "h") ("i") ("j")
 * j i h g f
 * ```
 */
export function rearg<T> (
    f: (...args: any[]) => T
): (...indices: number[]) => (...args: any[]) => T;