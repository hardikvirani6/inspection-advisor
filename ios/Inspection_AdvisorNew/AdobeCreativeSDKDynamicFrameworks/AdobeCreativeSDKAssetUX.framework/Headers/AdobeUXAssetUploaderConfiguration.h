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
 ******************************************************************************/

#ifndef AdobeUXAssetUploaderConfigurationHeader
#define AdobeUXAssetUploaderConfigurationHeader

#import <Foundation/Foundation.h>

@class AdobeAssetDataSourceFilter;

/**
 * A container class that could be used to specify a "proxy" asset that will be uploaded to the 
 * selected destination.
 */
@interface AdobeUXAssetBrowserConfigurationProxyAsset : NSObject

/**
 * A unique string used to identify the asset. Since the user has the ability to rename all assets, 
 * this ID can be used to reference the to-be-uploaded assets.
 */
@property (copy, nonatomic, nonnull) NSString *assetId;

/**
 * User-visible name for the asset. The user is able to modify this value.
 */
@property (copy, nonatomic, nonnull) NSString *name;

/**
 * An optional thumbnail image that will be displayed next to the asset name.
 * 
 * The specified UIImage is displayed directly to the user and no further actions, e.g. screen 
 * scale adjustments are preformed, therefore the UIImage instance should be appropriate for the 
 * current device and display scale. This should be a small image. The best dimensions for this 
 * thumbnail image are 31x31 points.
 */
@property (copy, nonatomic, nullable) UIImage *thumbnail;

@end

/**
 * A simple configuration class used to configure the Asset Uploader.
 */
@interface AdobeUXAssetUploaderConfiguration : NSObject <NSCopying>

/**
 * Collection of assets to upload.
 */
@property (copy, nonatomic, nonnull) NSArray<AdobeUXAssetBrowserConfigurationProxyAsset *> *assetsToUpload;

/**
 * The Adobe Cloud object to use. Useful for when attempting to connect to Enterprise/Private 
 * clouds. The default value is @c nil which means the default publicly accessible Adobe cloud will 
 * be used.
 */
@property (copy, nonatomic, nullable) AdobeCloud *cloud;

/**
 * Include or exclude any of the existing datasources.
 *
 * The only supported datasources currently are:
 * - AdobeAssetDataSourceFiles
 * - AdobeAssetDataSourceLibrary
 * - AdobeAssetDataSourcePhotos;
 */
@property (strong, nonatomic, nullable) AdobeAssetDataSourceFilter *dataSourceFilter;

/**
 * The tint color of the asset uploader, this can be customized to match the app's color
 * default RGB values are 32, 152, and 245
 */
@property (strong, nonatomic, nonnull) UIColor *tintColor;

@end

#endif
