import fetch, {
    Blob,
    File,
    FormData,
    Headers,
    Request,
    Response,
    blobFrom,
    blobFromSync,
    fileFrom,
    fileFromSync,
} from 'node-fetch'

if (!globalThis.fetch) {
    globalThis.fetch = fetch
    globalThis.Headers = Headers
    globalThis.Request = Request
    globalThis.Response = Response
}
