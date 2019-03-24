/******************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2013 Adobe Systems Incorporated
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

#ifndef AdobePublishCollectionHeader
#define AdobePublishCollectionHeader

#if defined(ADOBEPUBLISH_EXTENSION) && !defined(ADOBEPUBLISH_TVOS)
#import <AdobeCreativeSDKBehanceExtension/AdobePublishNetworkResponse.h>
#else
#import <AdobeCreativeSDKBehance/AdobePublishNetworkResponse.h>
#endif

NS_ASSUME_NONNULL_BEGIN

@class AdobePublishNetworkTask;
@class AdobePublishProject;
@class AdobePublishUser;

/**
 `AdobePublishCollection` is a subclass of `AdobePublishBaseModel` that represents a group of projects as collected by a Behance user.
 */
@interface AdobePublishCollection : AdobePublishBaseModel

/**
 The id of the collection.
 */
@property (nonatomic, strong) NSString * collectionId;

/**
 The URL of the low-resolution collection cover image
 */
@property (nonatomic, strong) NSURL * coverImageURL;

/**
 The URL of the high-resolution collection cover image
 */
@property (nonatomic, strong) NSURL * coverImageHDURL;

/**
 The user-specified title of the collection
 */
@property (nonatomic, strong) NSString * collectionTitle;

/**
 The number of projects in the collection
 */
@property (nonatomic, strong) NSNumber * collectionProjectsCount;

/**
 The number of users following the collection
 */
@property (nonatomic, strong) NSNumber * followerCount;

/**
 The URL of the collection for viewing on the web
 */
@property (nonatomic, strong) NSURL * URL;

/**
 The array of `AdobePublishUser` owners of the collection
 */
@property (nonatomic, strong) NSArray<AdobePublishUser *> * owners;

/**
 The id of the creator of the collection, who solely has permission to delete the collection
 */
@property (nonatomic, strong) NSNumber * creatorId;

/**
 The date that the collection was created
 */
@property (nonatomic, strong) NSDate * createdDate;

/**
 The date that the collection was last created
 */
@property (nonatomic, strong) NSDate * modifiedDate;

/**
 An array of the latest projects to be added to the collection
 */
@property (nonatomic, strong) NSArray<AdobePublishProject *> * latestProjects;

/**
 The user-specified privacy level associated with the collection
 */
@property (nonatomic) AdobePublishPrivacyLevel privacyLevel;

/**
 Flag identifying whether the current user is following this collection
 */
@property (nonatomic, getter = isFollowing) BOOL following;

#pragma mark - API

/*
 Search the Behance network for collections.
 
 @param params `NSDictionary` of parameters to provide to the API (see http://behance.net/dev for up-to-date information)
     q              Free text query string.
     sort           The order the results are returned in. Possible values: comments (default), views, last_item_added_date.
     time           Limits the search by time. Possible values: all (default), today, week, month.
     page           The page number of the results, always starting with 1.
 @param completion `AdobePublishNetworkResponseCompletion` callback for the API request
*/
+ (AdobePublishNetworkTask *)collectionsSearchWithParams:(nullable NSDictionary<NSString *, id> *)params completion:(AdobePublishNetworkResponseCompletion)completion;

/*
 Fetch a single collection by id.
 
 @param collectionId id of the collection to fetch
 @param completion `AdobePublishNetworkResponseCompletion` callback for the API request
 */
+ (AdobePublishNetworkTask *)collectionWithId:(NSString *)collectionId completion:(AdobePublishNetworkResponseCompletion)completion;

/*
 Fetch projects in a collection by id with paginated results.
 
 @param collectionId id of the collection to fetch projects from
 @param page page of results to fetch
 @param params `NSDictionary` of additional parameters to provide to the API (see http://behance.net/dev for up-to-date information)
 @param completion `AdobePublishNetworkResponseCompletion` callback for the API request
 */
+ (AdobePublishNetworkTask *)collectionProjectsWithId:(NSString *)collectionId page:(NSNumber *)page params:(nullable NSDictionary<NSString *, id> *)params
                      completion:(AdobePublishNetworkResponseCompletion)completion;

/*
 Follow a collection by id.
 
 @warning Requires post_as scope.
 
 @param collectionId id of the collection to follow
 @param completion `AdobePublishNetworkResponseCompletion` callback for the API request
 */
+ (nullable AdobePublishNetworkTask *)followCollectionWithId:(NSString *)collectionId completion:(nullable AdobePublishNetworkResponseCompletion)completion;

/*
 Create a new collection.
 
 @param params `NSDictionary` of additional parameters to provide to the API (see http://behance.net/dev for up-to-date information)
    title      Text to post as the title.
    tags       Text tag name or a pipe-separated list of tag names.
    projects   Single or pipe-separated list of project IDs.
 @param completion `AdobePublishNetworkResponseCompletion` callback for the API request
 */
+ (AdobePublishNetworkTask *)collectionWithParams:(nullable NSDictionary<NSString *, id> *)params completion:(AdobePublishNetworkResponseCompletion)completion;

/*
 Add projects to an existing collection. 
 
 @warning Requires collection_write scope.
 
 @param collectionId id of the collection to add projects to
 @param params `NSDictionary` of additional parameters to provide to the API (see http://behance.net/dev for up-to-date information)
    projects   Single or pipe-separated list of project IDs.
 @param completion `AdobePublishNetworkResponseCompletion` callback for the API request
*/
+ (nullable AdobePublishNetworkTask *)addProjectToCollectionWithId:(NSString *)collectionId params:(nullable NSDictionary<NSString *, id> *)params completion:(nullable AdobePublishNetworkResponseCompletion)completion;

/*
 Update an existing collection.
 
 @warning Requires collection_write scope.
 
 @param collectionId id of the collection to update
 @param params `NSDictionary` of additional parameters to provide to the API (see http://behance.net/dev for up-to-date information)
 title   Updated title for existing collection
 @param completion `AdobePublishNetworkResponseCompletion` callback for the API request
 */
+ (nullable AdobePublishNetworkTask *)updateCollectionWithId:(NSString *)collectionId params:(nullable NSDictionary<NSString *, id> *)params completion:(nullable AdobePublishNetworkResponseCompletion)completion;

/*
 Delete a single collection by id (as the collection creator, owners do not have permission to do this).
 
 @param collectionId id of the collection to delete
 @param completion `AdobePublishNetworkResponseCompletion` callback for the API request
 */
+ (void)deleteCollectionWithId:(NSString *)collectionId completion:(nullable AdobePublishNetworkResponseCompletion)completion;

/*
 Add an owner to a collection by id (as another owner of the collection)
 
 @param collectionId id of the collection to modify
 @param ownerId id of the user to make an owner
 @param completion `AdobePublishNetworkResponseCompletion` callback for the API request
 */
+ (void)addOwnerToCollectionWithId:(NSString *)collectionId ownerId:(NSNumber *)ownerId completion:(nullable AdobePublishNetworkResponseCompletion)completion;

/*
 Remove an owner from a collection by id (as an owner of the collection)
 
 @param collectionId id of the collection to modify
 @param ownerId id of the user to remove
 @param completion `AdobePublishNetworkResponseCompletion` callback for the API request
 */
+ (void)removeOwnerFromCollectionWithId:(NSString *)collectionId ownerId:(NSNumber *)ownerId completion:(nullable AdobePublishNetworkResponseCompletion)completion;

/*
 Get pending owners (invited but not accepted) for a collection by id (as an owner of the collection)
 
 @param collectionId id of the collection to modify
 @param completion `AdobePublishNetworkResponseCompletion` callback for the API request
 */
+ (void)pendingOwnersForCollectionWithId:(NSString *)collectionId completion:(nullable AdobePublishNetworkResponseCompletion)completion;

/*
 Unfollow a collection by id.
 
 @warning Requires post_as scope.
 
 @param collectionId id of the collection to unfollow
 @param completion `AdobePublishNetworkResponseCompletion` callback for the API request
 */
+ (void)unfollowCollectionWithId:(NSString *)collectionId completion:(nullable AdobePublishNetworkResponseCompletion)completion;

/*
 Remove projects from an existing collection.
 
 @warning Requires collection_write scope.
 
 @param collectionId id of the collection to remove a project from
 @param projectId id of the project to remove
 @param completion `AdobePublishNetworkResponseCompletion` callback for the API request
 */
+ (nullable AdobePublishNetworkTask *)removeProjectFromCollectionWithId:(NSString *)collectionId projectId:(NSNumber *)projectId completion:(nullable AdobePublishNetworkResponseCompletion)completion;

@end

NS_ASSUME_NONNULL_END

#endif
