export function extractErrorMessage(html) {
    const match = html.match(/Error:\s*([^\n<]+)/);
    return match ? match[1].trim() : "Something went wrong!";
}