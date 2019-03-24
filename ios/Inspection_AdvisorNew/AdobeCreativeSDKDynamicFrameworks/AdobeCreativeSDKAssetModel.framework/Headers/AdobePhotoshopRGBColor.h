/*************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 *  Copyright 2016 Adobe Systems Incorporated
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by all applicable intellectual property
 * laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 *************************************************************************/

#ifndef AdobePhotoshopRGBColorHeader
#define AdobePhotoshopRGBColorHeader

#import <Foundation/Foundation.h>

/**
 * Represents colors within a Photoshop document. Color components are integers as opposed to 
 * CGFloats used in UIColor. The only supported color space is RGB for now.
 */
@interface AdobePhotoshopRGBColor : NSObject

/**
 * The red component of the color.
 */
@property (nonatomic, readonly) NSUInteger red;

/**
 * The green component of the color.
 */
@property (nonatomic, readonly) NSUInteger green;

/**
 * The blue component of the color.
 */
@property (nonatomic, readonly) NSUInteger blue;

@end

#endif
