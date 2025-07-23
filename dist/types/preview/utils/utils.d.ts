import { FileRenderType, PreviewType } from '../preview.interface';
/**
 * Get file type
 * @param file
 */
export declare function getFileType(file: File): string;
/**
 * Get file name
 * @param file
 */
export declare function getFileName(file: File): string;
/**
 * Get by file type
 */
export declare function getFileRenderByFile(file: File): Promise<ArrayBuffer | string>;
/**
 * Get the file rendering data type
 * @param previewType
 */
export declare function getFileRenderType(previewType: PreviewType): FileRenderType;
