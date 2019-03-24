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

#ifndef AdobeUniversalSearchAssetHeader
#define AdobeUniversalSearchAssetHeader

@class AdobeUniversalSearchQuery;
@class AdobeNetworkHTTPRequest;

/**
 * A utility to help determine if an item is an AdobeUniversalSearchAsset.
 */
#define IsAdobeUniversalSearchAsset(item) ([item isKindOfClass:[AdobeUniversalSearchAsset class]])

/**
 * AdobeUniversalSearchAsset represents a UniversalSearch asset and provides access to data about
 * the asset (type, size, etc).
 */
@interface AdobeUniversalSearchAsset : NSObject

/**
 * The source identifier where this asset is stored. It is either creative_cloud, stock, etc
 */
@property (nonatomic, readonly, nonnull) NSString *source;

/**
 * A unique resource id of this asset
 */
@property (nonatomic, readonly, strong, nonnull) NSString *universalSearchID;

/**
 * The title of the asset.
 */
@property (nonatomic, readonly, copy, nonnull) NSString *title;

/**
 * The content type of the asset, something like application/vnd.adobe.element.image+dcx
 */
@property (nonatomic, readonly, strong, nonnull) NSString *contentType;

/**
 * The creation time of the asset.
 */
@property (nonatomic, readonly, strong, nonnull) NSDate *created;

/**
 * The modification time of the asset.
 */
@property (nonatomic, readonly, strong, nonnull) NSDate *modified;

/**
 * The creator id of the asset.
 */
@property (nonatomic, readonly, strong, nonnull) NSString *creatorID;

/**
 * returns a original URL for the asset.
 */
@property (nonatomic, readonly, strong, nonnull) NSURL *originalURL;

/**
 * returns a thumbnail URL for the asset.
 */
@property (nonatomic, readonly, strong, nonnull) NSURL *thumbnailURL;

/**
 * Fetch the assets by its query.
 *
 * @param query             The query object specifying the search to perform.
 * @param offset            The offset of the returned data from within the entire search set.
 *                              Use this to page over the search set.
 * @param pageSize          The maximum number of media items to return in this search.
 *                              Allowed values: 1 - 64
 * @param requestPriority   The relative priority of the HTTP request.
 * @param completion        Called when the method has finished.
 *
 * @return  An AdobeNetworkHTTPRequest object that can control the priority and allow for
 *             cancellation of the request.
 */
+ (nonnull AdobeNetworkHTTPRequest *)assetsMatchingQuery:(nonnull AdobeUniversalSearchQuery *)query
                                                  offset:(NSInteger)offset
                                                pageSize:(NSInteger)pageSize
                                         requestPriority:(NSOperationQueuePriority)requestPriority
                                              completion:(void (^_Nullable)(NSArray<AdobeUniversalSearchAsset *> *_Nullable assets, NSInteger count, NSError *_Nullable error))completion;

@end

#endif /* ifndef AdobeUniversalSearchAssetHeader */
