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

#ifndef AdobeAssetFixFileHeader
#define AdobeAssetFixFileHeader

/**
 * A utility to help determine if an AdobeAssetPackage is an AdobeAssetFixFile.
 */
#define IsAdobeAssetFixFile(item) ([item isKindOfClass:[AdobeAssetFixFile class]])

#import "AdobeAssetPackagePages.h"

/**
 * AdobeAssetFixFile represents a Photoshop Fix package and provides access to data about that
 * package (manifest, renditions, etc).
 */
@interface AdobeAssetFixFile : AdobeAssetPackagePages

/**
 * A utility to test the equality of two AdobeAssetFixFiles.
 *
 * @param file the AdobeAssetFixFile to test against.
 */
- (BOOL)isEqualToFixFile:(AdobeAssetFixFile *)file;

@end

#endif
