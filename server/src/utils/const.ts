export enum TIME {
    SECOND = 1000,
    MINUTE = TIME.SECOND * 60,
    HOUR = TIME.MINUTE * 60,
    DAY = TIME.HOUR * 24,
}

export enum MIMETYPES {
    IMAGE_JPEG = 'image/jpeg',
    IMAGE_PNG = 'image/png',
    IMAGE_WEBP = 'image/webp',
}

export enum FILE_SIZES {
    B = 1,
    KB = FILE_SIZES.B * 1000,
    MB = FILE_SIZES.KB * 1000,
    GB = FILE_SIZES.MB * 1000,
    TB = FILE_SIZES.GB * 1000,
}