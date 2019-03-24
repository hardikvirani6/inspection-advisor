/*************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 *  Copyright 2014 Adobe Systems Incorporated
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 **************************************************************************/

#ifndef AdobePSDRGBColorHeader
#define AdobePSDRGBColorHeader

#import <Foundation/Foundation.h>

/**
 * Represents colors within a Photoshop document. Color components are integers as opposed to 
 * CGFloats used in UIColor. The only supported color space is RGB.
 */
__deprecated_msg("Use AdobePhotoshopRGBColor instead.")
@interface AdobePSDRGBColor : NSObject

/**
 * The red component of the color.
 */
@property (readonly, nonatomic) NSUInteger red;

/**
 * The green component of the color.
 */
@property (readonly, nonatomic) NSUInteger green;

/**
 * The blue component of the color.
 */
@property (readonly, nonatomic) NSUInteger blue;

/**
 * Creates a new AdobePSDRGBColor instance with specified color values.
 *
 * @param red The red component of the color
 * @param green The Green component of the color
 * @param blue The Blue component of the color
 *
 * @return The new color instance
 */
+ (AdobePSDRGBColor *)colorWithRed:(NSUInteger)red green:(NSUInteger)green blue:(NSUInteger)blue;

/**
 * Initializes an existing AdobePSDRGBColor instance with color values.
 *
 * @param red The red component of the color
 * @param green The Green component of the color
 * @param blue The Blue component of the color
 *
 * @return The color instance
 */
- (instancetype)initWithRed:(NSUInteger)red green:(NSUInteger)green blue:(NSUInteger)blue;

@end

#endif
