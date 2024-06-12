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
