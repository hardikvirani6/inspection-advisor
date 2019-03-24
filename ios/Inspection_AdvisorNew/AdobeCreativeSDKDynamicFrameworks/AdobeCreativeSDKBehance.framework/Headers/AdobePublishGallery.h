/******************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2016 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains the property of
 * Adobe Systems Incorporated and its suppliers, if any. The intellectual and
 * technical concepts contained herein are proprietary to Adobe Systems
 * Incorporated and its suppliers and are protected by trade secret or
 * copyright law. Dissemination of this information or reproduction of this
 * material is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 * THIS FILE IS PART OF THE CREATIVE SDK PUBLIC API
 *
 ******************************************************************************/

#ifndef AdobePublishGalleryHeader
#define AdobePublishGalleryHeader

NS_ASSUME_NONNULL_BEGIN

/**
 `AdobePublishGalleryType` identifies the type of gallery on the Behance network
 */
typedef NS_ENUM(NSInteger, AdobePublishGalleryType) {
    /**
     `AdobePublishGalleryTypeUnknown` means the type of the gallery is unknown
     */
    AdobePublishGalleryTypeUnknown = -1,
    /**
     `AdobePublishGalleryTypeCategory` means the gallery is a curated gallery
     */
    AdobePublishGalleryTypeCategory,
    /**
     `AdobePublishGalleryTypeOrganization` means the gallery is a served site
     */
    AdobePublishGalleryTypeOrganization,
    /**
     `AdobePublishGalleryTypeAdobe` means the gallery is handled by Adobe
     */
    AdobePublishGalleryTypeAdobe,
};

@class AdobePublishProject;

/**
 `AdobePublishGallery` represents a gallery on the Behance network.
 */
@interface AdobePublishGallery : AdobePublishBaseModel

/**
 The id of the gallery
 */
@property (nonatomic, strong) NSNumber * galleryId;

/**
 The site id of the gallery
 */
@property (nonatomic, strong) NSNumber * siteId;

/**
 The title of the gallery
 */
@property (nonatomic, strong) NSString * title;

/**
 The key of the gallery
 */
@property (nonatomic, strong) NSString * key;

/**
 The URL of the gallery on the web
 */
@property (nonatomic, strong) NSString * URL;

/**
 The type of gallery
 */
@property (nonatomic) AdobePublishGalleryType type;

/**
 The latest projects to be added to this gallery
 */
@property (nonatomic, strong) NSArray<AdobePublishProject *> * latestProjects;

/**
 Flag as to whether the current user follows this gallery
 */
@property (nonatomic, getter = isFollowing) BOOL following;

/**
 The URL of the gallery icon based on the scale of the screen
 */
@property (nullable, nonatomic, strong) NSURL * iconURL;

/**
 The URL of the ribbon image associated with this gallery based on the scale of the screen
 */
@property (nullable, nonatomic, strong) NSURL * ribbonImageURL;

/**
 The URL of the ribbon image associated with this gallery (high-resolution)
 */
@property (nullable, nonatomic, strong) NSURL * ribbonImage2xURL __deprecated_msg("ribbonImageURL gives the image based on the scale of the screen.");

/**
 Returns a AdobePublishGalleryType given a string
 
 @param key the `key` identifying the `AdobePublishGallery`
 @return the AdobePublishGalleryType for the given key
 */
+ (AdobePublishGalleryType)galleryTypeFromString:(NSString *)key;

/**
 Returns a string given a AdobePublishGalleryType
 
 @param key the `key` identifying the `AdobePublishGallery`
 @return a string identifying the `key` associated with the supplied `AdobePublishGalleryType`
 */
+ (NSString *)stringFromGalleryType:(AdobePublishGalleryType)type;

@end

NS_ASSUME_NONNULL_END

#endif
