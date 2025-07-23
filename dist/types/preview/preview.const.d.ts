import { IPreviewRule, PreviewType } from './preview.interface';
export declare const textFilePreviewTypeList: PreviewType[];
export declare const arrayBufferPreviewTypeList: PreviewType[];
export declare const imagePreviewTypeList: PreviewType[];
export declare const pdfPreviewTypeList: PreviewType[];
export declare const videoPreviewTypeList: PreviewType[];
export declare const PreviewRules: Record<PreviewType, IPreviewRule>;
/**
 * Get based on file type
 * @param type
 */
export declare function getRuleByFileType(type: string): IPreviewRule;
/**
 * Get based on file type
 * @param type
 */
export declare function getPreviewTypeByFileType(type: string): PreviewType;
