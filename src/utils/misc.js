/**
 * Various tools.
 *
 * @module utils
 * @license Apache-2.0
 * @author drmats
 */




import {
    isFunction,
    isObject,
} from "../type/check"




/**
 * Handle exceptions in expressions.
 *
 * @function handleException
 * @param {Function} fn
 * @param {Function} [handler]
 * @returns {any}
 */
export const handleException = (fn, handler = null) => {
    try { return fn() }
    catch (ex) { return isFunction(handler)  ?  handler(ex)  :  ex }
}




/**
 * Handle rejections in expressions.
 * Async version of `handleException`.
 *
 * @async
 * @function handleRejection
 * @param {Function} fn
 * @param {Function} [handler]
 * @returns {Promise}
 */
export const handleRejection = async (fn, handler = null) => {
    try { return await fn() }
    catch (ex) { return isFunction(handler)  ?  await handler(ex)  :  ex }
}




/**
 * Run "main" function:
 *     - in browser on "load" event,
 *     - via setTimeout if there's no event API available
 *
 * @function run
 * @param {Function} main
 * @returns {undefined}
 */
export const run = main => {
    typeof window !== "undefined"  &&
    isObject(window)  &&
    isFunction(window.addEventListener) ?
        window.addEventListener("load", main) :
        setTimeout(main, 10)
}




/**
 * Time units represented in milliseconds.
 *
 * - `second` - `1000 milliseconds`
 * - `minute` - `60 seconds`
 * - `hour` - `60 minutes`
 * - `day` - `24 hours`
 * - `week` - `7 days`
 * - `month` - [**average** month]: `30.4375 days` (`365.25 days / 12`)
 * - `quarter` - [**average** quarter]: `3 months` (`365.25 days / 4`)
 * - `year` - [**average** year]: `365.25 days`
 *
 * @name timeUnit
 */
export const timeUnit = Object.freeze({
    second: 1000,
    minute: 60000,
    hour: 3600000,
    day: 86400000,
    week: 604800000,
    month: 2629800000,
    quarter: 7889400000,
    year: 31557600000,
})
