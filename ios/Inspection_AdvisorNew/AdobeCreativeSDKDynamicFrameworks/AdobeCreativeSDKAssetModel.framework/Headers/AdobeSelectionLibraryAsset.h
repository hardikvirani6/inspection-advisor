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

#ifndef AdobeSelectionLibraryAssetHeader
#define AdobeSelectionLibraryAssetHeader

#import <Foundation/Foundation.h>

#import "AdobeSelection.h"

@class AdobeLibraryComposite;
@class AdobeLibraryElement;

/**
 * A utility to help determine if an item is an AdobeSelectionLibraryAsset.
 */
#define IsAdobeSelectionLibraryAsset(item) ([item isKindOfClass:[AdobeSelectionLibraryAsset class]])

/**
 * Holds information about the items that are selected by a user from a library.
 */
@interface AdobeSelectionLibraryAsset : AdobeSelection


/**
 * Retrieves the selected AdobeLibraryComposite ID from the Library that is being explored
 */
@property (copy, nonatomic, readonly) NSString *selectedLibraryID;


/**
 * Retrieves the selected AdobeLibraryElement IDs from the Library that is being explored
 */
@property (copy, nonatomic, readonly) NSArray<NSString *> *selectedElementIDs;

@end

#endif
