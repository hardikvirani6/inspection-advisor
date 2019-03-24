/******************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2014 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains the property of
 * Adobe Systems Incorporated and its suppliers, if any. The intellectual and
 * technical concepts contained herein are proprietary to Adobe Systems
 * Incorporated and its suppliers and are protected by trade secret or
 * copyright law. Dissemination of this information or reproduction of this
 * material is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 ******************************************************************************/

#ifndef AdobePhotoAssetRenditionHeader
#define AdobePhotoAssetRenditionHeader

/**
 * List of rendition types.
 */
typedef NS_ENUM (NSInteger, AdobePhotoAssetRenditionType)
{
    /** Full size */
    AdobePhotoAssetRenditionTypeImageFullSize = 0,
    /** Favorite */
    /** AdobePhotoAssetRenditionTypeImageFavorite = 1  __deprecated_enum_msg("This rendition size is deprecated."), retain the value 1 here so that it won't break backward compatibility*/
    /** Panorama */
    AdobePhotoAssetRenditionTypeImagePanorama = 2,
    /** 2048x2048 */
    AdobePhotoAssetRenditionTypeImage2048 = 3,
    /** 1280x1280 */
    AdobePhotoAssetRenditionTypeImage1280 = 4,
    /** 1024x1024 */
    /** AdobePhotoAssetRenditionTypeImage1024 = 5  __deprecated_enum_msg("This rendition size is deprecated."), retain the value 5 here so that it won't break backward compatibility*/
    /** 640x640 */
    AdobePhotoAssetRenditionTypeImage640 = 6,
    /** Retina thumbnail */
    AdobePhotoAssetRenditionTypeImageThumbnail2x = 7,
    /** Thumbnail */
    /** AdobePhotoAssetRenditionTypeImageThumbnail = 8  __deprecated_enum_msg("This rendition size is deprecated."), retain the value 8 here so that it won't break backward compatibility*/
};

/**
 * An asset rendition.
 */
@interface AdobePhotoAssetRendition : NSObject <NSCopying, NSCoding>

/**
 * The path to a JPEG rendition.
 */
@property (nonatomic, readonly, strong) NSURL *dataPath;

/**
 * The asset rendition ID.
 */
@property (nonatomic, readonly, strong) NSString *GUID;

/**
 * The asset renditions's type.
 */
@property (nonatomic, readonly, assign) AdobePhotoAssetRenditionType type;

/**
 * Create a new rendition.
 * Note: this will not create a rendition on the server. This must be passed into the AdobePhotoAsset's uploadRendition method.
 *
 * @param path The path to the rendition data. The path must be locally valid and cannot be nil.
 * @param type The type of rendtion.
 * @returns a new AdobePhotoAssetRendition
 *
 */
- (instancetype)initWithPath:(NSURL *)path
                        type:(AdobePhotoAssetRenditionType)type;

@end

#endif /* ifndef AdobePhotoAssetRenditionHeader */
