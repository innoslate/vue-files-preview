import type {Component} from 'vue'

/**
 * VueFilesPreview
 */
// region FilesPreview
// Preview component rule configuration
export interface IPreviewRule {
    name: string
    type: PreviewType
    accept: Array<string>
    component: Component
}

// Preview component type
export enum PreviewType {
    NONE = 'none', // No type
    CODE = 'code', // code type
    DOC = 'doc',
    DOCX = 'docx', // WORD Document
    XLSX = 'xlsx', // Excel Document
    PDF = 'pdf', // PDF
    PIC = 'pic', // Picture
    TXT = 'txt', // Text
    MD = 'md', // Markdown
    EPUB = 'epub', // epub
    PPT = 'ppt',
    AUDIO = 'audio',
    VIDEO = 'video',
}

// render
export type FileRenderType = 'text' | 'image' | 'pdf' | 'arrayBuffer' | 'video'

// endregion

// region common
// Preview component basic properties Extended property usage & implementation
export interface PreviewProps {
    // accept file object
    file?: File
    // Link
    url?: string
    // File Name
    name?: string
}

// endregion
