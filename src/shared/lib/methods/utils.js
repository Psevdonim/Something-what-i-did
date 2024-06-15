/**
 * Creates a debounced function that delays invoking the provided callback function until after wait milliseconds have elapsed since the last time the debounced function was invoked.
 *
 * @param {function} callback - The function to debounce.
 * @param {number} wait - The number of milliseconds to delay.
 * @return {function} - The debounced function.
 */
export const debounce = (callback, wait) => {
    let timeout;

    const executedFunction = (...args) => {
        const later = () => {
            clearTimeout(timeout);
            callback(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };

    return executedFunction;
};

/**
 * Downloads a file from the given URL and saves it with the specified filename.
 *
 * @param {string} url - The URL of the file to download.
 * @param {string} filename - The name to save the downloaded file as.
 * @return {Promise<void>} - A promise that resolves when the file is successfully downloaded and saved.
 */
export const downloadFile = async (url, filename) => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Unable to download file. HTTP status: ${response.status}`);
        }

        const blob = await response.blob();
        const downloadUrl = URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");
        downloadLink.href = downloadUrl;
        downloadLink.download = filename;
        document.body.appendChild(downloadLink);
        downloadLink.click();

        setTimeout(() => {
            URL.revokeObjectURL(downloadUrl);
            document.body.removeChild(downloadLink);
        }, 10000);
    } catch (error) {
        console.error("Error downloading the file:", error.message);
    }
};

/**
 * Function to standardize a link by ensuring it starts with '/', removing redundant slashes, or returning a default '/' if invalid.
 *
 * @param {string} link - The link to standardize.
 * @return {string} The standardized link.
 */
export const standartizeLink = (link) => {
    if (!link || typeof link !== "string") {
        return null;
    }
    if (link?.length) {
        if (!link?.startsWith("/") && !link?.startsWith("http")) {
            return "/" + link;
        }

        if (link?.startsWith("//")) {
            return link.substring(1);
        }

        return link;
    }
    return "/";
};

/**
 * Caches the results of an asynchronous function to improve performance.
 *
 * @param {Function} fn - The asynchronous function whose results should be cached.
 * @return {Function} A function that returns cached results if available, otherwise calls the original function and caches its result.
 */
export const addCaching = (fn) => {
    const cache = new Map();
    return async (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key) && cache.get(key)) {
            return cache.get(key);
        }
        const result = await fn(...args);
        cache.set(key, result);
        return result;
    };
};
