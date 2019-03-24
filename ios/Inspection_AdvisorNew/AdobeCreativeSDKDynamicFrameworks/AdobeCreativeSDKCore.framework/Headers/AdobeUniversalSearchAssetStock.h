/******************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2017 Adobe Systems Incorporated
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

#ifndef AdobeUniversalSearchAssetStockHeader
#define AdobeUniversalSearchAssetStockHeader

@class AdobeUniversalSearchAssetStockRendition;

#import "AdobeUniversalSearchAsset.h"

/**
 * AdobeUniversalSearchAssetStock represents a UniversalSearch asset for Adobe Stock and provides access to data about the asset (type, size, etc).
 */
@interface AdobeUniversalSearchAssetStock : AdobeUniversalSearchAsset

/**
 * returns the user that created the asset.
 */
@property (nonatomic, readonly, strong, nonnull) NSString *createdBy;

/**
 * returns the size of the original image.
 */
@property (nonatomic, readonly, assign) CGSize originalSize;

/**
 * returns url for original asset
 */
@property (nonatomic, readonly, strong, nonnull) NSURL *original;

/**
 * returns the various renditions for the asset.
 */
@property (nonatomic, readonly, strong, nonnull) NSArray<AdobeUniversalSearchAssetStockRendition *> *renditions;


@end

#endif
