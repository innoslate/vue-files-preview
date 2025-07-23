import { Component } from 'vue';
/**
 * VueFilesPreview
 */
export interface IPreviewRule {
    name: string;
    type: PreviewType;
    accept: Array<string>;
    component: Component;
}
export declare enum PreviewType {
    NONE = "none",// No type
    CODE = "code",// code type
    DOC = "doc",
    DOCX = "docx",// WORD Document
    XLSX = "xlsx",// Excel Document
    PDF = "pdf",// PDF
    PIC = "pic",// Picture
    TXT = "txt",// Text
    MD = "md",// Markdown
    EPUB = "epub",// epub
    PPT = "ppt",
    AUDIO = "audio",
    VIDEO = "video"
}
export type FileRenderType = 'text' | 'image' | 'pdf' | 'arrayBuffer' | 'video';
export interface PreviewProps {
    file?: File;
    url?: string;
    name?: string;
}
