/*************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 *  Copyright 2017 Adobe Systems Incorporated
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 **************************************************************************/

#ifndef  AdobeUniversalSearchAssetStockRenditionHeader
#define  AdobeUniversalSearchAssetStockRenditionHeader

/**
 * AdobeUniversalSearchAssetStockRendition represents an object for Adobe Stock rendition.
 */
@interface  AdobeUniversalSearchAssetStockRendition : NSObject

/**
 * returns the size for the rendition
 */
@property (nonatomic, readonly, assign) CGSize size;

/**
 * returns whether the rendition is watermarked.
 */
@property (nonatomic, readonly, assign) BOOL watermarked;

/**
 * returns the URL for the rendition.
 */
@property (nonatomic, readonly, strong) NSURL *url;

@end

#endif
