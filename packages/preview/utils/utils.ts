import type {FileRenderType, PreviewType} from '../preview.interface'
import {
    arrayBufferPreviewTypeList,
    getPreviewTypeByFileType,
    imagePreviewTypeList,
    pdfPreviewTypeList,
    textFilePreviewTypeList,
    videoPreviewTypeList,
} from '../preview.const'

const videoMimeTypes: Record<string, string> = {
    mp4: 'video/mp4',
    webm: 'video/webm',
    ogg: 'video/ogg',
    mkv: 'video/x-matroska',
    avi: 'video/x-msvideo',
    mpeg: 'video/mpeg',
    flv: 'video/x-flv',
    mov: 'video/quicktime',
    wmv: 'video/x-ms-wmv',
}

// MIME Type to File Extension Mapping for Blob Type Inference
const mimeToExtMap: Record<string, string> = {
    'image/svg+xml': 'svg',
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/bmp': 'bmp',
    'image/x-icon': 'ico',
    'image/vnd.microsoft.icon': 'ico',
    'application/pdf': 'pdf',
    'text/plain': 'txt',
    'text/markdown': 'md',
    'text/html': 'html',
    'text/css': 'css',
    'text/javascript': 'js',
    'application/javascript': 'js',
    'application/json': 'json',
    'application/xml': 'xml',
    'text/xml': 'xml',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
    'application/msword': 'doc',
    'application/vnd.ms-excel': 'xls',
    'application/vnd.ms-powerpoint': 'ppt',
    'application/epub+zip': 'epub',
    'video/mp4': 'mp4',
    'video/webm': 'webm',
    'video/ogg': 'ogg',
    'video/quicktime': 'mov',
    'audio/mpeg': 'mp3',
    'audio/wav': 'wav',
    'audio/ogg': 'ogg',
    'audio/flac': 'flac',
    'application/vnd.ms-outlook': 'msg',
}

/**
 * Inferring File Extensions from MIME Types
 * @param mimeType
 */
export function getExtFromMimeType(mimeType: string): string {
    if (!mimeType) return ''
    // Exact Match
    if (mimeToExtMap[mimeType]) return mimeToExtMap[mimeType]
    // Attempting to extract from the MIME subtype, e.g., image/png -> png
    const parts = mimeType.split('/')
    if (parts.length === 2) {
        const subtype = parts[1].replace(/^x-/, '')
        return subtype
    }
    return ''
}

/**
 * Get File Type
 * Supports File and Blob objects. For Blobs, the name is extracted first; failing that, it is inferred from the MIME type.
 * @param file File or Blob object
 * @param name Optional filename, used to infer the type from the Blob.
 */
export function getFileType(file: File | Blob, name?: string): string {
    // First extraction from File.name.
    if ('name' in file && file.name) {
        const idx = file.name.lastIndexOf('.')
        if (idx !== -1) return file.name.substring(idx + 1)
    }
    // Secondly, extraction of the name from an external source.
    if (name) {
        const idx = name.lastIndexOf('.')
        if (idx !== -1) return name.substring(idx + 1)
    }
    // Finally, infer from the MIME type.
    return getExtFromMimeType(file.type)
}

/**
 * Get Filename
 * Supports File and Blob
 * @param file File or Blob object
 * @param name Optional filename
 */
export function getFileName(file: File | Blob, name?: string): string {
    // First extraction from File.name.
    if ('name' in file && file.name) {
        const idx = file.name.lastIndexOf('.')
        return idx === -1 ? file.name : file.name.substring(0, idx)
    }
    // Secondly, extraction of the 'name' from an external source.
    if (name) {
        const idx = name.lastIndexOf('.')
        return idx === -1 ? name : name.substring(0, idx)
    }
    return ''
}

/**
 * Safely decodes a URI component; returns the original string if decoding fails.
 * @param str
 */
function safeDecodeURIComponent(str: string): string {
    try {
        return decodeURIComponent(str)
    } catch {
        return str
    }
}

/**
 * Get File Extension from URL.
 * Supports inference based on a three-tier hierarchy: URL path, name parameter, and Content-Type header.
 * @param url
 * @param name Optional filename, used for fallback inference.
 */
export function getFileTypeFromUrl(url: string, name?: string): string {
    // First extraction from the URL path.
    try {
        const urlObj = new URL(url, window.location.origin)
        const pathname = safeDecodeURIComponent(urlObj.pathname)
        const idx = pathname.lastIndexOf('.')
        if (idx !== -1) {
            const ext = pathname.substring(idx + 1).toLowerCase()
            // Remove potential residual query parameters.
            const cleaned = ext.split('?')[0].split('#')[0]
            if (cleaned) return cleaned
        }
    } catch {
        const decoded = safeDecodeURIComponent(url)
        const idx = decoded.lastIndexOf('.')
        if (idx !== -1) {
            const ext = decoded.substring(idx + 1).toLowerCase()
            const cleaned = ext.split('?')[0].split('#')[0]
            if (cleaned) return cleaned
        }
    }
    // Secondly, extract from the name parameter.
    if (name) {
        const idx = name.lastIndexOf('.')
        if (idx !== -1) return name.substring(idx + 1).toLowerCase()
    }
    return ''
}

/**
 * Extract filename (without extension) from URL
 * @param url
 * @param name Optional filename for fallback
 */
export function getFileNameFromUrl(url: string, name?: string): string {
    try {
        const urlObj = new URL(url, window.location.origin)
        const pathname = safeDecodeURIComponent(urlObj.pathname)
        const lastSlash = pathname.lastIndexOf('/')
        const filename = pathname.substring(lastSlash + 1)
        const dotIdx = filename.lastIndexOf('.')
        const result = dotIdx === -1 ? filename : filename.substring(0, dotIdx)
        if (result) return result
    } catch {
        const lastSlash = url.lastIndexOf('/')
        const filename = safeDecodeURIComponent(url.substring(lastSlash + 1).split('?')[0].split('#')[0])
        const dotIdx = filename.lastIndexOf('.')
        const result = dotIdx === -1 ? filename : filename.substring(0, dotIdx)
        if (result) return result
    }
    // Fall back to the name parameter.
    if (name) {
        const idx = name.lastIndexOf('.')
        return idx === -1 ? name : name.substring(0, idx)
    }
    return ''
}

/**
 * Retrieve fileRender via URL
 * @param url File Location
 * @param fileType Optional file type; if not provided, it will be parsed from the URL.
 */
export async function getFileRenderByUrl(url: string, fileType?: string): Promise<ArrayBuffer | string> {
    const ext = fileType || getFileTypeFromUrl(url)

    const previewType = getPreviewTypeByFileType(ext)
    const renderType = getFileRenderType(previewType)

    // For images, videos, and PDFs, return the URL directly (which can be loaded directly by the browser).
    if (renderType === 'image' || renderType === 'video' || renderType === 'pdf') {
        return url
    }

    // Other types require fetching content.
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`)
    }

    if (renderType === 'text') {
        return await response.text()
    }

    if (renderType === 'arrayBuffer') {
        return await response.arrayBuffer()
    }

    // Default Return URL
    return url
}

/**
 * Retrieve fileRender based on file type.
 * Supports File and Blob objects.
 * @param file File or Blob object
 * @param name Optional filename, used for Blob type inference.
 */
export function getFileRenderByFile(file: File | Blob, name?: string): Promise<ArrayBuffer | string> {
    const previewType = getPreviewTypeByFileType(getFileType(file, name))
    const renderType = getFileRenderType(previewType)
    return new Promise((resolve) => {
        const raw = file
        const fileReader = new FileReader()
        switch (renderType) {
            case 'text':
                fileReader.readAsText(raw)
                fileReader.onload = () => {
                    resolve(fileReader.result)
                }
                break
            case 'arrayBuffer':
                fileReader.readAsArrayBuffer(raw)
                fileReader.onload = () => {
                    resolve(fileReader.result)
                }
                break
            case 'image':
                resolve(window.URL.createObjectURL(raw))
                break
            case 'pdf': {
                const pdfBloBlob = new Blob([raw], {type: 'application/pdf'})
                const pdfBlobUrl = URL.createObjectURL(pdfBloBlob)
                resolve(pdfBlobUrl)
                break
            }
            case 'video': {
                const ext = getFileType(file, name)
                const mimeType = videoMimeTypes[ext] || file.type || 'video/mp4'
                const videoBlobUrl = URL.createObjectURL(new Blob([raw], {type: mimeType}))
                resolve(videoBlobUrl)
                break
            }
            default:
                resolve(window.URL.createObjectURL(raw))
                break
        }
    })
}

/**
 * Get File Rendering Data Type
 * @param previewType
 */
export function getFileRenderType(previewType: PreviewType): FileRenderType {
    const types: Record<FileRenderType, boolean> = {
        text: textFilePreviewTypeList.includes(previewType),
        arrayBuffer: arrayBufferPreviewTypeList.includes(previewType),
        image: imagePreviewTypeList.includes(previewType),
        pdf: pdfPreviewTypeList.includes(previewType),
        video: videoPreviewTypeList.includes(previewType),
    }
    return Object.keys(types)!.find(key => types[key]) as FileRenderType
}
