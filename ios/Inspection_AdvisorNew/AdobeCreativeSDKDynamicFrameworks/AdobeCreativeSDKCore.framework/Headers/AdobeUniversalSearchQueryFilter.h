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

#ifndef AdobeUniversalSearchQueryFilterHeader
#define AdobeUniversalSearchQueryFilterHeader

typedef NSString *AdobeQueryMediaType NS_EXTENSIBLE_STRING_ENUM;

extern AdobeQueryMediaType const _Nonnull AdobeQueryMediaTypeCore;
extern AdobeQueryMediaType const _Nonnull AdobeQueryMediaTypeVideo;
extern AdobeQueryMediaType const _Nonnull AdobeQueryMediaTypeImage;
extern AdobeQueryMediaType const _Nonnull AdobeQueryMediaTypeDocument;
extern AdobeQueryMediaType const _Nonnull AdobeQueryMediaTypeCollection;
extern AdobeQueryMediaType const _Nonnull AdobeQueryMediaTypeDCXComposite;
extern AdobeQueryMediaType const _Nonnull AdobeQueryMediaTypeDCXElement;
extern AdobeQueryMediaType const _Nonnull AdobeQueryMediaTypeUnknown;

typedef NSString *AdobeQueryApplicableType NS_EXTENSIBLE_STRING_ENUM;

extern AdobeQueryApplicableType const _Nonnull AdobeQueryApplicableTypePhotoshop;
extern AdobeQueryApplicableType const _Nonnull AdobeQueryApplicableTypeIllustrator;
extern AdobeQueryApplicableType const _Nonnull AdobeQueryApplicableTypeInDesign;
extern AdobeQueryApplicableType const _Nonnull AdobeQueryApplicableTypeLightroom;
extern AdobeQueryApplicableType const _Nonnull AdobeQueryApplicableTypePremierePro;
extern AdobeQueryApplicableType const _Nonnull AdobeQueryApplicableTypePhotoshopElement;

typedef NSString *AdobeQueryCreatorType NS_EXTENSIBLE_STRING_ENUM;

extern AdobeQueryCreatorType const _Nonnull AdobeQueryCreatorTypeAll;
extern AdobeQueryCreatorType const _Nonnull AdobeQueryCreatorTypeAdobeSupport;
extern AdobeQueryCreatorType const _Nonnull AdobeQueryUserGenerated;

/**
 * AdobeUniversalSearchQueryFilter is used to build a filter object for use in the query .
 */
@interface AdobeUniversalSearchQueryFilter : NSObject

/**
 * Construct a filter object to filter query.
 */
+ (nonnull AdobeUniversalSearchQueryFilter *)filter;

/**
 * An array of AdobeQueryMediaType
 */
@property (copy, nonatomic, nullable) NSArray<AdobeQueryMediaType> *mediaTypes;

/**
 * Whether search filter by safe search in Adobe Stock only
 * If YES, the search will exclude offensive contents, NO otherwise.
 * Default is YES
 */
@property (assign, nonatomic) BOOL safeSearch;

/**
 * The text query to search
 */
@property (copy, nonatomic, nonnull) NSString *textQuery;

/**
 * Adobe Stock only
 * Search for all images that contains the specified color, example "#AAAFFF"
 */
@property (copy, nonatomic, nullable) NSString *imagesByColor;

/**
 * Search for images that contains the number of pixels in a specified range
 * Pixel size is defined as multiplication of height and width.
 *
 * Example: If height is 1,920 pixel and width is 1,080 pixel, then pixel size is 2,073,600 ≈ 2 mega pixels.
 */
@property (assign, nonatomic) NSRange imagesByNumberOfPixelsInRange;

/**
 * Adobe Stock only
 * Search for videos that contains the duration's range (in seconds)
 */
@property (assign, nonatomic) NSRange videosContainDurationInRange;

/**
 * Search for all assets that was created by the array of AdobeQueryApplicableType
 */
@property (copy, nonatomic, nullable) NSArray<AdobeQueryApplicableType> *applicationProducts;

/**
 * Search for all assets that was created by the array of AdobeQueryCreatorType
 */
@property (copy, nonatomic, nullable) NSArray<AdobeQueryCreatorType> *creatorTypes;

/**
 * Adobe Creative Cloud only
 * Search for any asset that contains the modification date in specified range
 * @param startDateInterval the start date in range
 * @param endDateInterval the end date in range
 * @note an exception will be throw if startDate is later than endDate
 */
- (void)lastModificationDateRange:(NSTimeInterval)startDateInterval endDateInterval:(NSTimeInterval)endDateInterval;

/**
 * Search for any asset that contains the created date in Creative Cloud
 * or uploaded date in Adobe Stock in the specified range
 * @param startDateInterval the start date in range
 * @param endDateInterval the end date in range
 * @note an exception will be throw if startDate is later than endDate
 */
- (void)creationDateRange:(NSTimeInterval)startDateInterval endDateInterval:(NSTimeInterval)endDateInterval;

/**
 * Search for any image that contains the specified aspect ratio (width / height) range
 * @param min the minimum aspect ratio in range
 * @param max the maximum aspect ratio in range
 */
- (void)imagesByAspectRatioRange:(CGFloat)min max:(CGFloat)max;

@end

#endif /* ifndef AdobeUniversalSearchQueryFilterHeader */
