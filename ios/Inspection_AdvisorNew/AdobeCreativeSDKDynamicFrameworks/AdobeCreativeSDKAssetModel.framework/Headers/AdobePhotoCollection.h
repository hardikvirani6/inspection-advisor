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

#ifndef AdobePhotoCollectionHeader
#define AdobePhotoCollectionHeader

#import "AdobePhoto.h"

#import "AdobePhotoPage.h"
#import "AdobePhotoTypes.h"

@class AdobePhotoCatalog;
@class AdobePhotoAsset;

/** Collection Sort Type */
typedef NS_ENUM (NSInteger, AdobePhotoCollectionSort)
{
    /** Sort by date */
    AdobePhotoCollectionSortByDate = 1,
    /** Sort by custom order */
    AdobePhotoCollectionSortByCustomOrder
};

/**
 * Enumeration for flags that can be applied to a AdobePhotoCollection.
 */
typedef NS_ENUM (NSInteger, AdobePhotoCollectionFlag)
{
    /** Rejected flag */
    AdobePhotoCollectionFlagRejected = -1,
    /** No flag */
    AdobePhotoCollectionFlagUnflagged = 0,
    /** Picked flag */
    AdobePhotoCollectionFlagPicked = 1,
    /** All flags */
    AdobePhotoCollectionFlagAll
};

/**
 * A utility to help determine if an AdobePhoto is an AdobePhotoCollection.
 */
#define IsAdobePhotoCollection(item) ([item isKindOfClass:[AdobePhotoCollection class]])

/**
 * AdobePhotoCollection is a container of collections in a user's catalog. Each collection contains zero or more AdobePhotoAssets.
 */
@interface AdobePhotoCollection : AdobePhoto <NSCopying, NSCoding>

/**
 * The catalog the collection is in.
 */
@property (readonly, nonatomic, strong) AdobePhotoCatalog *catalog;

/**
 * The asset used as the cover art for this collection.
 * Note: you will need to call update after setting the cover asset for the changes to appear on the server.
 */
@property (readwrite, nonatomic, strong) AdobePhotoAsset *coverAsset;

/**
 * The name of the collection.
 * Note: you will need to call update after setting the name for the changes to appear on the server.
 */
@property (readwrite, nonatomic, strong) NSString *name;

/**
 * Create a new collection on the Adobe Photo service asynchronously.
 *
 * @param name          The name of the collection.
 * @param catalog       The catalog to create the collection in.
 * @param successBlock  Optionally get an updated reference to the created collection if successful.
 * @param errorBlock    Optionally be notified of an error.
 */
+ (AdobePhotoCollection *)create:(NSString *)name
                         catalog:(AdobePhotoCatalog *)catalog
                    successBlock:(void (^)(AdobePhotoCollection *collection))successBlock
                      errorBlock:(void (^)(NSError *error))errorBlock;

/**
 * Update this collection on the Adobe Photo service asynchronously.
 *
 * @param successBlock  Optionally be notified if successful.
 * @param errorBlock    Optionally be notified of an error.
 */
- (void)update:(void (^)(AdobePhotoCollection *collection))successBlock
    errorBlock:(void (^)(NSError *error))errorBlock;

/**
 * Refresh this collection from the Adobe Photo service asynchronously.
 *
 * @param successBlock  Optionally be notified if successful.
 * @param errorBlock    Optionally be notified of an error.
 */
- (void)refresh:(void (^)(AdobePhotoCollection *collection))successBlock
     errorBlock:(void (^)(NSError *error))errorBlock;

/**
 * Delete this collection from the Adobe Photo service asynchronously.
 *
 * @param successBlock  Optionally be notified if successful.
 * @param errorBlock    Optionally be notified of an error.
 */
- (void)delete:(void (^)(void))successBlock
    errorBlock:(void (^)(NSError *error))errorBlock;

/**
 * Add an asset in this collection on the Adobe Photo service asynchronously.
 *
 * @param asset         The asset.
 * @param successBlock  Optionally get the asset added if successful.
 * @param errorBlock    Optionally be notified of an error.
 */
- (void)addAsset:(AdobePhotoAsset *)asset
    successBlock:(void (^)(AdobePhotoAsset *asset))successBlock
      errorBlock:(void (^)(NSError *error))errorBlock;

/**
 * Add many assets in this collection on the Adobe Photo service asynchronously.
 *
 * @param assets        The assets.
 * @param successBlock  Optionally the assets added if successful.
 * @param errorBlock    Optionally be notified of an error.
 */
- (void)addAssets:(AdobePhotoAssets *)assets
     successBlock:(void (^)(AdobePhotoAssets *assets))successBlock
       errorBlock:(void (^)(NSError *error))errorBlock;

/**
 * Update an asset in this collection on the Adobe Photo service asynchronously.
 *
 * @param asset         The asset.
 * @param successBlock  Optionally get the asset updated if successful.
 * @param errorBlock    Optionally be notified of an error.
 */
- (void)updateAsset:(AdobePhotoAsset *)asset
       successBlock:(void (^)(AdobePhotoAsset *asset))successBlock
         errorBlock:(void (^)(NSError *error))errorBlock;

/**
 * Update many assets in this collection on the Adobe Photo service asynchronously.
 *
 * @param assets        The assets.
 * @param successBlock  Optionally get the assets updated if successful.
 * @param errorBlock    Optionally be notified of an error.
 */
- (void)updateAssets:(AdobePhotoAssets *)assets
        successBlock:(void (^)(AdobePhotoAssets *assets))successBlock
          errorBlock:(void (^)(NSError *error))errorBlock;

/**
 * Remove an asset from this collection on the Adobe Photo service asynchronously.
 *
 * @param asset         The asset.
 * @param successBlock  Optionally get the asset removed if successful.
 * @param errorBlock    Optionally be notified of an error.
 */
- (void)removeAsset:(AdobePhotoAsset *)asset
       successBlock:(void (^)(AdobePhotoAsset *asset))successBlock
         errorBlock:(void (^)(NSError *error))errorBlock;

/**
 * Remove many assets from this collection on the Adobe Photo service asynchronously.
 *
 * @param assets        The assets to be removed.
 * @param successBlock  Optionally get the assets removed if successful.
 * @param errorBlock    Optionally be notified of an error.
 */
- (void)removeAssets:(AdobePhotoAssets *)assets
        successBlock:(void (^)(AdobePhotoAssets *assets))successBlock
          errorBlock:(void (^)(NSError *error))errorBlock;

/**
 * List the assets for this collection in the Adobe Photo service asynchronously.
 *
 * @param page          The page to pass in, use nil to start from the beginning.
 * @param sortType      The sorting option.
 * @param limit         The number of assets to return. Default value is 100, max is 500. Please note that the response may contain more than 'limit' number of
 *                      assets returned if the assets at the 'limit' boundary has the same capture_date.
 * @param flag          The result to return the assets using.
 * @param successBlock  Get a list of all AdobePhotoAssets for the logged in user if successful.
 * @param errorBlock    Optionally be notified of an error.
 */
- (void)listAssetsOnPage:(AdobePhotoPage *)page
                sortType:(AdobePhotoCollectionSort)sortType
                   limit:(NSUInteger)limit
                    flag:(AdobePhotoCollectionFlag)flag
            successBlock:(void (^)(AdobePhotoAssets *assets, AdobePhotoPage *previousPage, AdobePhotoPage *nextPage))successBlock
              errorBlock:(void (^)(NSError *error))errorBlock;

/**
 * Get the number of assets in this collection on the Adobe Photo service asynchronously.
 *
 * @param successBlock  Get the number of AdobePhotoAssets in this collection if successful.
 * @param errorBlock    Optionally be notified of an error.
 */
- (void)assetCount:(void (^)(NSUInteger count))successBlock
        errorBlock:(void (^)(NSError *error))errorBlock;

/**
 * A utility to test the equlity of two AdobePhotoCollections.
 *
 * @param collection Collection to be compared against.
 *
 * @returns True if the collections are the same.
 */
- (BOOL)isEqualToCollection:(AdobePhotoCollection *)collection;

@end

#endif /* ifndef AdobePhotoCollectionHeader */
