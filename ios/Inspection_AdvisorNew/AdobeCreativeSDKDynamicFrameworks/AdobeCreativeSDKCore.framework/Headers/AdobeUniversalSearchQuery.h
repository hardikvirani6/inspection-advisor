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
 ******************************************************************************/

#ifndef AdobeUniversalSearchQueryHeader
#define AdobeUniversalSearchQueryHeader

@class AdobeUniversalSearchQueryFilter;

/**
 * AdobeUniversalSearchAssetSortType is an enumerated type that allows the client to specify
 * sorting options when accessing UniversalSearch assets.
 */
typedef NS_ENUM (NSInteger, AdobeUniversalSearchAssetSortType)
{
    /** Sort by relevance descending. */
    AdobeUniversalSearchAssetSortTypeRelevanceDescending = 0,

    /** Sort by creation time in ascending order. */
    AdobeUniversalSearchAssetSortTypeCreationTimeAscending,
    /** Sort by creation time in descending order. */
    AdobeUniversalSearchAssetSortTypeCreationTimeDescending,
};

/**
 * The thumbnail size.
 */
typedef NS_ENUM (NSInteger, AdobeUniversalSearchAssetThumbnailSize)
{
    /** Small. */
    AdobeUniversalSearchAssetThumbnailSizeSmall = 0,

    /** Medium. */
    AdobeUniversalSearchAssetThumbnailSizeMedium,

    /** Large. */
    AdobeUniversalSearchAssetThumbnailSizeLarge
};

/**
 * The media sizes for UniversalSearch assets.
 */
typedef NS_ENUM (NSInteger, AdobeUniversalSearchAssetMediaSize)
{
    /** Represents a size where the longest edge is as close to 400px as possible.
     *  @note The resulting dimensions may be smaller in the event that the source asset was smaller
     *      than the specified size.
     */
    AdobeUniversalSearchAssetMediaSizeExtraSmall = 400,

    /** Represents a size where the longest edge is as close to 800px as possible.
     *  @note The resulting dimensions may be smaller in the event that the source asset was smaller
     *      than the specified size.
     */
    AdobeUniversalSearchAssetMediaSizeSmall = 800,

    /** Represents a size where the longest edge is as close to 1600px as possible.
     *  @note The resulting dimensions may be smaller in the event that the source asset was smaller
     *      than the specified size.
     */
    AdobeUniversalSearchAssetMediaSizeMedium = 1600,

    /** Represents a size where the longest edge is as close to 2400px as possible.
     *  @note The resulting dimensions may be smaller in the event that the source asset was smaller
     *      than the specified size.
     */
    AdobeUniversalSearchAssetMediaSizeLarge = 2400,

    /** Represents a size where the longest edge is as close to 3100px as possible.
     *  @note The resulting dimensions may be smaller in the event that the source asset was smaller
     *      than the specified size.
     */
    AdobeUniversalSearchAssetMediaSizeExtraLarge = 3100,

    /** Represents a size where the longest edge is as close to 5000px as possible.
     *  @note The resulting dimensions may be smaller in the event that the source asset was smaller
     *      than the specified size.
     */
    AdobeUniversalSearchAssetMediaSizeFull = 5000
};

/**
 * The type of asset.
 */
typedef NS_ENUM (NSInteger, AdobeUniversalSearchAssetMediaType)
{
    /** Unknown media type */
    AdobeUniversalSearchAssetMediaTypeUnknown = 0,

    /** Photo */
    AdobeUniversalSearchAssetMediaTypePhoto = 1,

    /** Illustration */
    AdobeUniversalSearchAssetMediaTypeIllustration = 2,

    /** Vector Art */
    AdobeUniversalSearchAssetMediaTypeVectorArt = 3,

    /** Video */
    AdobeUniversalSearchAssetMediaTypeVideo = 4
};

/**
 * Which endpoints to search.
 */
typedef NS_OPTIONS (NSUInteger, AdobeUniversalSearchSourceType)
{
    /** search in Creative Cloud source */
    AdobeUniversalSearchSourceTypeCreativeCloud = 1 << 0,

    /** search in Adobe Stock source */
    AdobeUniversalSearchSourceTypeStock         = 1 << 1
};

/**
 * AdobeUniversalSearchQuery is used to build a query object for use in the search session.
 */
@interface AdobeUniversalSearchQuery : NSObject

/**
 * Construct a query with required options for all queries.
 * Fetch the assets by its keywords.
 *
 * @param sources   Which Adobe endpoints to search
 * @param sortType  The sort order to return the results by.
 * @param filter    The filter to apply when finding assets.
 * @param locale    Locale to peform query. nil uses en.
 *
 * @return  An AdobeUniversalSearchQuery object that can be used to perform the search
 *          return nil when there is an error such as sources is empty
 * @see AdobeUniversalSearchAsset
 */
+ (nonnull AdobeUniversalSearchQuery *)queryWithSources:(AdobeUniversalSearchSourceType)sources
                                               sortType:(AdobeUniversalSearchAssetSortType)sortType
                                                 filter:(nonnull AdobeUniversalSearchQueryFilter *)filter
                                                 locale:(nullable NSString *)locale;

/**
 * Construct a query with required options for all queries.
 * Fetch the assets by its keywords.
 *
 * @param sources   Which Adobe endpoints to search
 * @param sortType  The sort order to return the results by.
 * @param filter    The filter to apply when finding assets.
 *
 * @return  An AdobeUniversalSearchQuery object that can be used to perform the search
 */
+ (nonnull AdobeUniversalSearchQuery *)queryWithSources:(AdobeUniversalSearchSourceType)sources
                                               sortType:(AdobeUniversalSearchAssetSortType)sortType
                                                 filter:(nonnull AdobeUniversalSearchQueryFilter *)filter;

/**
 *  to update the current filter set this propperty with the new filter object.
 */
@property (nonatomic, strong, nonnull) AdobeUniversalSearchQueryFilter *filter;

/**
 * Sorting
 */
@property (nonatomic) AdobeUniversalSearchAssetSortType sortType;

/**
 * locale to use, use two letter country code, defaults to "en"
 */
@property (nonatomic, nullable, readonly) NSString *locale;

@end

#endif /* ifndef AdobeUniversalSearchQueryHeader */
