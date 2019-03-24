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

#ifndef AdobeAssetFolderHeader
#define AdobeAssetFolderHeader

#import "AdobeAsset.h"

@class AdobeAssetAsyncRequest;

/**
 * A utility to help determine if an AdobeAsset is an AdobeAssetFolder.
 */
#define IsAdobeAssetFolder(item) ([item isKindOfClass:[AdobeAssetFolder class]])

/**
 * AdobeAssetFolderOrderBy is an enumerated type that specifies the field key to
 * sort on.
 */
typedef NS_ENUM (NSInteger, AdobeAssetFolderOrderBy)
{
    /**
     * Order folder items by name.
     */
    AdobeAssetFolderOrderByName,
    
    /**
     * Order folder items by date modified.
     */
    AdobeAssetFolderOrderByModified,
};

/**
 * AdobeAssetFolderOrderDirection is an enumerated type that specifies the ordering
 * direction.
 */
typedef NS_ENUM (NSInteger, AdobeAssetFolderOrderDirection)
{
    /**
     * Order folder items in ascending order based on order type.
     */
    AdobeAssetFolderOrderAscending,

    /**
     * Order folder items in descending order based on order type.
     */
    AdobeAssetFolderOrderDescending,
};

/**
 * AdobeAssetFolderConfiguration represents a configuration object to initialize AdobeAssetFolder.
 */
@interface AdobeAssetFolderConfiguration : NSObject

/**
 * Sets the field to order the folder contents by.
 */
@property (assign, nonatomic) AdobeAssetFolderOrderBy orderBy;

/**
 * Sets the order direction ascending or descending
 */
@property (assign, nonatomic) AdobeAssetFolderOrderDirection orderDirection;

/**
 * Filters the non renderable assets, such as zip and other file formats that don't have a drawable 
 * representation.
 */
@property (assign, nonatomic) BOOL renderableOnly;

@end

/**
 * AdobeAssetFolder represents a folder in the Creative Cloud and provides access to folder 
 * contents in pages of data as well as provisions for creating and deleting folders.
 *
 * Folder items are fetched from the cloud in pages, so the field on which the items should be 
 * sorted as well as the sort direction must be specified when setting up this instance. If you 
 * need to change the sorting, you will need to create a new instance with the specified sort 
 * options.
 *
 * Once you have an AdobeAssetFolder instance set up, you can call hasNextPage and loadNextPage to
 * start loading folder items from the cloud as needed.
 */
@interface AdobeAssetFolder : AdobeAsset <NSCopying, NSCoding>

/**
 * Indicates whether a shared folder is read-only. If a folder is read-only, it may only be 
 * modified by the owner.
 */
@property (assign, nonatomic, readonly, getter = isReadOnly) BOOL readOnly;

/**
 * Whether the receiver is a shared folder.
 */
@property (assign, nonatomic, readonly, getter = isShared) BOOL shared;

/**
 * Get the root folder of the logged in user sorted by default (name, ascending).
 *
 * @return The root folder.
 */
+ (AdobeAssetFolder *)root;

/**
 * Get the root folder of the logged in user.
 *
 * @param config    Settings for how the folder contents will be displayed
 *                  @c AdobeAssetFolderConfiguration
 *
 * @return The root folder.
 */
+ (AdobeAssetFolder *)root:(AdobeAssetFolderConfiguration *)config;

/**
 * Get an AdobeAssetFolder based on the href using the default sorting (name, ascending).
 *
 * @param href  The absolute HREF of the folder. Characters other than "unreserved" (ALPHA | DIGIT
 *              | - | . | _ | ~) should be percent-escaped. See RFC 3986 specifications, sections
 *              2.2 and 2.3.
 */
+ (AdobeAssetFolder *)folderFromHref:(NSString *)href;

/**
 * Get an AdobeAssetFolder based on the href for the logged in user.
 *
 * Folder items are fetched from the cloud in pages, so the field on which the items should be 
 * sorted as well as the sort direction must be specified when setting up this instance. If you 
 * need to change the sorting, you will need to create a new instance with the specified sort 
 * options.
 *
 * Once you have an AdobeAssetFolder instance set up, you can call hasNextPage and loadNextPage to 
 * start loading folder items from the cloud as needed.
 *
 * @param href      The absolute HREF of the folder. Characters other than "unreserved" (ALPHA |
 *                  DIGIT | - | . | _ | ~) should be percent-escaped. See RFC 3986 specifications,
 *                  sections 2.2 and 2.3.
 * @param field     The field on which the items in the folder will be sorted (e.g., name, 
 *                  modification date). See AdobeAssetFolderOrderBy.
 * @param direction The direction (ascending or descending) in the the items will be sorted.
 *
 * @return the folder.
 *
 * @see AdobeAssetFolderOrderDirection
 */
+ (AdobeAssetFolder *)folderFromHref:(NSString *)href
                        orderByField:(AdobeAssetFolderOrderBy)field
                      orderDirection:(AdobeAssetFolderOrderDirection)direction;

/**
 * Get an AdobeAssetFolder based on the href for the logged in user.
 *
 * Folder items are fetched from the cloud in pages, so the field on which the items should be 
 * sorted as well as the sort direction must be specified when setting up this instance. If you 
 * need to change the sorting, you will need to create a new instance with the specified sort 
 * options.
 *
 * Once you have an AdobeAssetFolder instance set up, you can call hasNextPage and loadNextPage to 
 * start loading folder items from the cloud as needed.
 *
 * @param href      The absolute HREF of the folder. Characters other than "unreserved" (ALPHA |
 *                  DIGIT | - | . | _ | ~) should be percent-escaped. See RFC 3986 specifications,
 *                  sections 2.2 and 2.3.
 * @param config    Set folder configuration parameter as specified in 
 *                  AdobeAssetFolderConfiguration.
 *
 * @return the folder.
 */
+ (AdobeAssetFolder *)folderFromHref:(NSString *)href
                              config:(AdobeAssetFolderConfiguration *)config;


/**
 * Create a new folder on the Adobe Creative Cloud asynchronously.
 *
 * @param name          The name of the folder.
 * @param folder        The enclosing folder.
 * @param successBlock  Optionally get an updated reference to the created folder when complete.
 * @param errorBlock    Optionally be notified of an error.
 */
+ (void)create:(NSString *)name
  parentFolder:(AdobeAssetFolder *)folder
  successBlock:(void (^)(AdobeAssetFolder *folder))successBlock
    errorBlock:(void (^)(NSError *error))errorBlock;

/**
 * Refreshes the folder's metadata.
 *
 * @param successBlock      A block that notifies the caller when the refresh operation has 
 *                          succeeded.
 * @param cancellationBlock Optionally be notified of a cancellation on upload.
 * @param errorBlock        An block that informs the caller of any error that may have occurred 
 *                          while refreshing.
 *
 * @return An @c AdobeAssetAsyncRequest which can be used to control the cancellation of the 
 *         request.
 */
- (AdobeAssetAsyncRequest *)refresh:(void (^)(AdobeAssetFolder *folder))successBlock
                  cancellationBlock:(void (^)(void))cancellationBlock
                         errorBlock:(void (^)(NSError *error))errorBlock;

/**
 * Archive the specified folder asynchronously. It does not permanently delete the folder from the 
 * cloud. There is no API to expunge nor restore the folder from the archive as of this time.
 *
 * @param successBlock  Optionally be notified when complete.
 * @param errorBlock    Optionally be notified of an error.
 */
- (void)archive:(void (^)(void))successBlock
     errorBlock:(void (^)(NSError *error))errorBlock;

/**
 * Indicates whether the cloud folder has another page of items that can be loaded.
 *
 * @return true if the another page of items can be loaded; false otherwise.
 */
- (BOOL)hasNextPage;

/**
 * Asynchronously gets the next page of items from the cloud folder. This should only be called if 
 * hasNextPage returns @c YES. Behavior is undefined if hasNextPage returned @c NO;
 *
 * @param pageSize      The number of items to be fetched. This is just a hint. The actual number 
 *                      fetched may be more or less than this amount.
 * @param successBlock  An NSArray of AdobeAssets, and total number of items in the folder.
 * @param errorBlock    Optionally be notified of an error.
 */
- (void)nextPage:(NSUInteger)pageSize
    successBlock:(void (^)(AdobeAssetArray *items, NSUInteger totalItemsInFolder))successBlock
      errorBlock:(void (^)(NSError *error))errorBlock;

/**
 * Resets the page iterator so that any subsequent call to hasNextPage will return true, and 
 * getNextPage will return the first page of cloud items. Keeps the current sorting options in 
 * effect.
 */
- (void)resetPaging;

/**
 * Resets the page iterator so that any subsequent call to hasNextPage will return @c YES, and 
 * getNextPage will return the first page of cloud items. Sets new sorting options for the cloud 
 * folder.
 *
 * @param config    Set folder configuration parameter as specified in 
 *                  AdobeAssetFolderConfiguration.
 */
- (void)resetPaging:(AdobeAssetFolderConfiguration *)config;

/**
 * A utility to test the equality of two AdobeAssetFolders.
 *
 * @param folder the AdobeAssetFolder to test against.
 */
- (BOOL)isEqualToFolder:(AdobeAssetFolder *)folder;

/**
 * Copies the receiver to a new location, and potentially renames it, asynchronously. Any necessary
 * intermediate folders will automatically be created to facilitate the copy operation.
 *
 * @param folder            The destination folder where the receiver should be copied. If this
 *                          argument is `nil`, `newNew` should be specified and not be the same as
 *                          the receiver's `name`. Otherwise, the copy operation will fail. 
 *                          Furthermore, if this argument is `nil` or is the same as the 
 *                          receiver's *container name*, the copy operation will fail.
 * @param newName           Optional new name for the receiver when it is copied. If both `folder` 
 *                          and `newName` are specified, `newName` will take precedence.
 * @param priority          The priority of the underlying network operation.
 * @param successBlock      Called when the receiver has successfully been copied. The `folder` 
 *                          block argument represents the copied asset.
 * @param cancellationBlock Block to call when the underlying network operation is cancelled.
 * @param errorBlock        A block which is called in case of an error.
 *
 * @return An `AdobeAssetAsyncRequest` which can be used to control the underlying network
 *         operation or `nil` if a required argument isn't specified.
 */
- (/*nullable*/ AdobeAssetAsyncRequest *)copyToFolder:(/*nullable*/ AdobeAssetFolder *)folder
                                              newName:(/*nullable*/ NSString *)newName
                                      requestPriority:(NSOperationQueuePriority)priority
                                         successBlock:(/*nullable*/ void (^)(AdobeAssetFolder * /*_Nonnull*/ folder))successBlock
                                    cancellationBlock:(/*nullable*/ void (^)(void))cancellationBlock
                                           errorBlock:(/*nullable*/ void (^)(NSError * /*_Nonnull*/ error))errorBlock;

/**
 * Moves the receiver to a new location, and potentially renames it, asynchronously. Any necessary 
 * intermediate folder will automatically be created to facilitate the move operation.
 *
 * @note If `newName` is specified, this method effectively becomes a "rename" operation.
 *
 * @param folder            The destination folder where the receiver should be moved. If this
 *                          argument is `nil`, `newName` should be specified (i.e. not be `nil`)
 *                          and not be the same as the receiver's `name` property. In this case,
 *                          this operation is effectively a "rename" operation.
 * @param newName           Optional new name for the receiver when it is moved. If both `folder` 
 *                          and `newName` are specified, `newName` will take precedence.
 * @param priority          The priority of the underlying network operation.
 * @param successBlock      Called when the receiver has successfully been moved. The `folder` 
 *                          block argument represents the moved asset.
 * @param cancellationBlock Block to execute when the underlying network operation is cancelled.
 * @param errorBlock        Block which is executed in case of an error.
 *
 * @return An `AdobeAssetAsyncRequest` which can be used to control the underlying network
 *         operation or `nil` if a required argument isn't specified.
 */
- (/*nullable*/ AdobeAssetAsyncRequest *)moveToFolder:(/*nullable*/ AdobeAssetFolder *)folder
                                              newName:(/*nullable*/ NSString *)newName
                                      requestPriority:(NSOperationQueuePriority)priority
                                         successBlock:(/*nullable*/ void (^)(AdobeAssetFolder * /*_Nonnull*/ folder))successBlock
                                    cancellationBlock:(/*nullable*/ void (^)(void))cancellationBlock
                                           errorBlock:(/*nullable*/ void (^)(NSError * /*_Nonnull*/ error))errorBlock;

@end

#endif /* ifndef AdobeAssetFolderHeader */
