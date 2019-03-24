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

#ifndef AdobeUniversalSearchAssetCreativeCloudHeader
#define AdobeUniversalSearchAssetCreativeCloudHeader

#import "AdobeUniversalSearchAsset.h"

/**
 * AdobeUniversalSearchAssetCreativeCloud represents a UniversalSearch asset for Adobe Creative Cloud files and provides access to data about the asset (type, size, etc).
 */
@interface AdobeUniversalSearchAssetCreativeCloud : AdobeUniversalSearchAsset

/**
 * returns number of rendition URLs
 */
@property (nonatomic, readonly, assign) NSInteger countOfRenditionURLs;

/**
 * returns the url for the original image.
 */
@property (nonatomic, readonly, strong) NSURL *originalURL;

/**
 * Generate a renditionURL from the index, specify the size for the rendition to get.
 *
 * @param index the index number to generate a renditionURL from. If in doubt use index zero.
 * @param size the size of the rendition
 * @return a url of the renditionURL
 */
- (NSURL *)renditionURLFromIndex:(NSInteger)index size:(NSInteger)size;

@end

#endif
