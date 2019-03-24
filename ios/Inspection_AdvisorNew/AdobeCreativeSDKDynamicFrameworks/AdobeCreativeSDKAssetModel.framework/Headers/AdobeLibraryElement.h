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

#ifndef AdobeLibraryElementHeader
#define AdobeLibraryElementHeader

#import <Foundation/Foundation.h>

@class AdobeLibraryRepresentation;

/**
 * Represents an element in a library composite.
 */
@interface AdobeLibraryElement : NSObject <NSMutableCopying>

#pragma mark Properties

/** The creation time of the element (time interval in seconds since 1970). */
@property (readonly, nonatomic) NSTimeInterval created;

/** 
 * The id of the user who created the element (this is of the form <guid>@AdobeID).
 * This is nil if we don't have this information - older versions of the libraries API did not store this data,
 * so if you're looking for it, you should handle the case where it isn't available.
 */
@property (readonly, nonatomic) NSString *createdBy;

/**
 * Returns an NSNumber with value of YES if the element was created on the same device as the current device, 
 * and NO if it was created on a different device.
 *
 * If we don't have the information, it returns nil - older versions of the libraries API did not store this data,
 * so if you're looking for it, you should handle the case where it isn't available.
 */
@property (readonly, nonatomic) NSNumber * wasCreatedLocally;

/**
 * The context data of where the element was created. This is a dictionary with data about the device and the
 * appication that the element was created on.
 * This is nil if we don't have this information - older versions of the libraries API did not store this data,
 * so if you're looking for it, you should handle the case where it isn't available.
 */
@property (readonly, nonatomic) NSDictionary *createdContext;

/** The unique identifier of the element. */
@property (readonly, nonatomic) NSString *elementId;

/** Last modification time of the element (time interval in seconds since 1970). */
@property (readonly, nonatomic) NSTimeInterval modified;

/** 
 * The id of the user who last modified the element (this is of the form <guid>@AdobeID).
 * This is nil if we don't have this information - older versions of the libraries API did not store this data,
 * so if you're looking for it, you should handle the case where it isn't available.
 */
@property (readonly, nonatomic) NSString *modifiedBy;

/** 
 * Returns an NSNumber with value of YES if the last modification to the element was on the same device as the
 * current device, and NO if it was modified on a different device.
 *
 * If we don't have the information, it returns nil - older versions of the libraries API did not store this data, 
 * so if you're looking for it, you should handle the case where it isn't available.
 */
@property (readonly, nonatomic) NSNumber * wasModifiedLocally;

/**
 * The context data of where the element was modified. This is a dictionary with data about the device and the
 * appication that the element was modified on.
 * This is nil if we don't have this information - older versions of the libraries API did not store this data,
 * so if you're looking for it, you should handle the case where it isn't available.
 */
@property (readonly, nonatomic) NSDictionary *modifiedContext;

/** The time the element was removed, for a non-permanently removed element. (time interval in seconds since 1970). 
 Will be 0 if this element has not been removed. */
@property (readonly, nonatomic) NSTimeInterval removed;

/**
 * The id of the user who removed the element (this is of the form <guid>@AdobeID).
 * This is nil if we don't have this information - older versions of the libraries API did not store this data,
 * so if you're looking for it, you should handle the case where it isn't available.
 */
@property (readonly, nonatomic) NSString *removedBy;

/**
 * Returns an NSNumber with value of YES if the element was removed on the same device as the current device,
 * and NO if it was removed on a different device.
 *
 * If we don't have the information, it returns nil - older versions of the libraries API did not store this data,
 * so if you're looking for it, you should handle the case where it isn't available.
 */
@property (readonly, nonatomic) NSNumber * wasRemovedLocally;

/**
 * The context data of where the element was removed. This is a dictionary with data about the device and the
 * appication that the element was removed on.
 * This is nil if we don't have this information - older versions of the libraries API did not store this data,
 * so if you're looking for it, you should handle the case where it isn't available.
 */
@property (readonly, nonatomic) NSDictionary *removedContext;

/** The name of the element. */
@property (strong, nonatomic) NSString *name;

/** The type of the asset element, e.g. 'application/vnd.adobe.element.color', 'application/vnd.adobe.element.image' */
@property (readonly, nonatomic) NSString *type;

/** The tags for this element, An array of strings. */
@property (readonly, nonatomic) NSArray *tags;

/** The representations for this element, an array of AdobeLibraryRepresentation. */
@property (readonly, nonatomic) NSArray *representations;

/** The primary representation or nil if no primary representation exists */
@property (readonly, nonatomic) AdobeLibraryRepresentation *primaryRepresentation;

#pragma mark Methods

/**
 * \brief Get the representation with the given id.
 *
 * \param repId   The id of the representation to retrieve.
 *
 * \return    The representation or nil if it doesn't exist.
 */
- (AdobeLibraryRepresentation *)representationWithId:(NSString *)repId;

/**
 * \brief Get the first representation of the given content-type for the element.
 *
 * \param contentType The content-type for the representation to retrieve.
 *
 * \return    The representation or nil if no representation for the given content-type.
 */
- (AdobeLibraryRepresentation *)firstRepresentationOfType:(NSString *)contentType;

@end

#endif