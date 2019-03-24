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
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 **************************************************************************/

#ifndef AdobePhotoshopLayerHeader
#define AdobePhotoshopLayerHeader

#import <Foundation/Foundation.h>
#import <CoreGraphics/CoreGraphics.h>

@class AdobePhotoshopRGBColor;

#pragma mark - AdobePhotoshopTextLayerRange

/**
 * Text capitalization options
 */
typedef NS_ENUM(NSUInteger, AdobePhotoshopTextLayerRangeFontCapsOption)
{
    /**
     * Normal (no) caps.
     */
    AdobePhotoshopTextLayerRangeFontCapsOptionNormalCaps,
    
    /**
     * Small caps.
     */
    AdobePhotoshopTextLayerRangeFontCapsOptionSmallCaps,
    
    /**
     * All caps.
     */
    AdobePhotoshopTextLayerRangeFontCapsOptionAllCaps
};

/**
 * Text justification options.
 */
typedef NS_ENUM(NSUInteger, AdobePhotoshopTextLayerRangeJustification)
{
    /**
     * Left justification, i.e. left-aligned.
     */
    AdobePhotoshopTextLayerRangeJustificationLeft,
    
    /**
     * Right justification, i.e. right-aligned.
     */
    AdobePhotoshopTextLayerRangeJustificationRight,
    
    /**
     * Center justification, i.e. centered.
     */
    AdobePhotoshopTextLayerRangeJustificationCenter,
    
    /**
     * Last line left-justified.
     */
    AdobePhotoshopTextLayerRangeJustificationJustifyLastLineLeft,
    
    /**
     * Last line center-justified.
     */
    AdobePhotoshopTextLayerRangeJustificationJustifyLastLineCenter,
    
    /**
     * Last line right-justified.
     */
    AdobePhotoshopTextLayerRangeJustificationJustifyLastLineRight,
    
    /**
     * Fully justified, i.e. block.
     */
    AdobePhotoshopTextLayerRangeJustificationJustifyAll
};

/**
 * Text vertical alignment.
 */
typedef NS_ENUM(NSUInteger, AdobePhotoshopTextLayerRangeVerticalAlignment)
{
    /**
     * Standard (non-rotated) alignment.
     */
    AdobePhotoshopTextLayerRangeVerticalAlignmentStandard,
    
    /**
     * Rotated alignment.
     */
    AdobePhotoshopTextLayerRangeVerticalAlignmentRotated
};

/**
 * Used to describe the style for a range of text within a text layer.
 */
@interface AdobePhotoshopTextLayerRange : NSObject

/**
 * Text capitalization.
 *
 * Default is @c AdobePhotoshopTextLayerRangeFontCapsOptionNormalCaps indicating normal (no) caps.
 */
@property (readonly, nonatomic) AdobePhotoshopTextLayerRangeFontCapsOption fontCapsOption;

/**
 * Text justification.
 *
 * Default is @c AdobePhotoshopTextLayerRangeJustificationLeft indicating left justification.
 */
@property (readonly, nonatomic) AdobePhotoshopTextLayerRangeJustification justification;

/**
 * Vertical alignment (baseline direction) of the text.
 *
 * Default is @c AdobePhotoshopTextLayerRangeVerticalAlignmentStandard indicating a standard 
 * (non-rotated) alignment.
 */
@property (readonly, nonatomic) AdobePhotoshopTextLayerRangeVerticalAlignment verticalAlignment;

/**
 * Whether the text has a strike-through style.
 *
 * Default is @c NO.
 */
@property (readonly, nonatomic) BOOL hasStrikeThrough;

/**
 * Whether the text has an underline.
 *
 * Default is @c NO.
 */
@property (readonly, nonatomic) BOOL hasUnderline;

/**
 * Line height (leading) of the text
 */
@property (readonly, nonatomic) CGFloat lineHeight;

/**
 * Letter spacing (tracking) of the text.
 */
@property (readonly, nonatomic) CGFloat textLetterSpacing;

/**
 * The starting index of the text range. Along with @c from, one can determine the text range to 
 * which the receiver's styles apply.
 *
 * @see to
 */
@property (readonly, nonatomic) NSUInteger from;

/**
 * The ending index of the text range. Along with @c to, one can determine the text range to which 
 * the receiver's styles apply.
 *
 * @see from
 */
@property (readonly, nonatomic) NSUInteger to;

/**
 * Font size in points.
 */
@property (readonly, nonatomic) NSUInteger size;

/**
 * Whether the text is bolded.
 *
 * Default is @c NO.
 */
@property (readonly, nonatomic, getter = isBold) BOOL bold;

/**
 * Whether the text is italicized.
 *
 * Default is @c NO.
 */
@property (readonly, nonatomic, getter = isItalic) BOOL italic;

/**
 * The color of the text.
 */
@property (readonly, nonatomic, nullable) AdobePhotoshopRGBColor *textColor;

/**
 * Font family name for the text.
 */
@property (readonly, nonatomic, nullable) NSString *fontFamilyName;

/**
 * The PostScript font name of the text.
 */
@property (readonly, nonatomic, nullable) NSString *fontName;

/**
 * Font style name for the text.
 */
@property (readonly, nonatomic, nullable) NSString *fontStyleName;

@end

#pragma mark - AdobePhotoshopLayerComponent

/**
 * Layer component relationship
 */
typedef NS_ENUM(NSUInteger, AdobePhotoshopLayerComponentRelationship)
{
    /**
     * Pixel layer component. Contains metadata for the pixel data for a layer.
     */
    AdobePhotoshopLayerComponentRelationshipPixelLayer,
    
    /**
     * Mask layer component. Contains metadata for the pixel mask.
     */
    AdobePhotoshopLayerComponentRelationshipMaskLayer,
    
    /**
     * Smart object component. Contains metadata for a Smart Object layer.
     */
    AdobePhotoshopLayerComponentRelationshipSmartObjectLayer
};

/**
 * Represents a layer component. A component describes the metadata necessary for an "external" 
 * blob of data. This external data could be a pixel layer's actual bitmap information, a pixel 
 * mask's bitmap data, an embedded smart object or other relevant information.
 */
@interface AdobePhotoshopLayerComponent : NSObject

/**
 * The unique identifier of the component within the Photoshop Document.
 */
@property (readonly, nonatomic, nonnull) NSString *componentId;

/**
 * Name or path of the component. This property can be interpreted as the path when retrieving, for 
 * example, an embedded Smart Object's bitmap information.
 */
@property (readonly, nonatomic, nonnull) NSString *name;

/**
 * MIME type of the component.
 */
@property (readonly, nonatomic, nonnull) NSString *mimeType;

/**
 * Relationship of the component to the main document.
 */
@property (readonly, nonatomic) AdobePhotoshopLayerComponentRelationship relationship;

/**
 * Size of the bits on disk for the component.
 */
@property (readonly, nonatomic) unsigned long long size;

/**
 * Version of the component.
 */
@property (readonly, nonatomic, nonnull) NSString *version;

/**
 * ETag of the component.
 */
@property (readonly, nonatomic, nonnull) NSString *ETag;

/**
 * MD5 sum of the component.
 */
@property (readonly, nonatomic, nonnull) NSString *MD5;

/**
 * MD5 of uncompressed pixel data.
 */
@property (readonly, nonatomic, nonnull) NSString *uncompressedMD5;

@end

#pragma mark - AdobePhotoshopLayer

/**
 * Type of the layer.
 */
typedef NS_ENUM(NSUInteger, AdobePhotoshopLayerType)
{
    /**
     * An as yet unknown layer type.
     */
    AdobePhotoshopLayerTypeUnknown = 0,
    
    /**
     * A layer that contains pixel data. A pixel layer is defined as an array of pixels (bounds 
     * specified) that is represented by an external image.
     */
    AdobePhotoshopLayerTypePixel,
    
    /**
     * Text layer.
     */
    AdobePhotoshopLayerTypeText,
    
    /**
     * Layer group. This layer type contains other child layers.
     */
    AdobePhotoshopLayerTypeLayerGroup,
    
    /**
     * Fill layer.
     */
    AdobePhotoshopLayerTypeFill,
    
    /**
     * Shape layer.
     */
    AdobePhotoshopLayerTypeShape,
    
    /**
     * Smart Object layer types. Note that only embedded (not Linked) Smart Object are supported.
     */
    AdobePhotoshopLayerTypeSmartObject,
    
    /**
     * Adjustment layer type. Only identification of this layer type is currently supported. 
     * Further support will be introduced at a later date.
     */
    AdobePhotoshopLayerAdjusment
};

/**
 * Represents a layer within a Photoshop Document.
 */
@interface AdobePhotoshopLayer : NSObject

/**
 * Unique ID that identifies each layer uniquely in the PSD documents.
 */
@property (readonly, nonatomic) NSInteger layerId;

/**
 * Name of the layer.
 */
@property (readonly, nonatomic, nullable) NSString *name;

/**
 * Type of the layer.
 */
@property (readonly, nonatomic) AdobePhotoshopLayerType type;

/**
 * Retrieves a string value for the layer type.
 */
@property (readonly, nonatomic, nonnull) NSString *typeString;

/**
 * Bounds of the layer.
 *
 * @note The bounds may have negative values and be outside of the area of the PSD document canvas.
 */
@property (readonly, nonatomic) CGRect bounds;

/**
 * Whether the layer is visible. Each layer is visible by default.
 */
@property (readonly, nonatomic, getter = isVisible) BOOL visible;

/**
 * @name Pixel Layer Properties
 */

/**
 * Bounds of the pixel layer.
 *
 * @note This value will only be valid if the type of the receiver is
 * @c AdobePhotoshopLayerTypePixel.
 */
@property (readonly, nonatomic) CGRect pixelLayerBounds;

/**
 * The component object for the pixel layer.
 *
 * @note This value will only be valid if the type of the receiver is 
 * @c AdobePhotoshopLayerTypePixel.
 */
@property (readonly, nonatomic, nullable) AdobePhotoshopLayerComponent *pixelLayerComponent;

/**
 * @name Pixel Mask
 */

/**
 * Whether the receiver has a pixel mask. If so, all Pixel Mask related property values will
 * retrieve relevant information about the pixel mask.
 */
@property (readonly, nonatomic) BOOL hasPixelMask;
/**
 * The bounds of the pixel mask.
 *
 * @note Note that this value does not necessarily have to be the same size or be at the same
 * location as the Photoshop document's bounds.
 */
@property (readonly, nonatomic) CGRect pixelMaskBounds;

/**
 * The pixel mask component of the layer.
 */
@property (readonly, nonatomic, nullable) AdobePhotoshopLayerComponent *pixelMaskComponent;

/**
 * Whether the pixel mask is linked. Default is @c YES.
 */
@property (readonly, nonatomic, getter = isPixelMaskLinked) BOOL pixelMaskLinked;

/**
 * Whether the pixel mask is enabled. Default is @c YES.
 */
@property (readonly, nonatomic, getter = isPixelMaskEnabled) BOOL pixelMaskEnabled;

/**
 * Density percentage for the pixel mask. This value ranges from 0 to 100. The default value is 100.
 */
@property (readonly, nonatomic) CGFloat pixelMaskDensity;

/**
 * Feather value for pixel mask in pixels. This value ranges from 0 to 1000. The default value is 0.
 */
@property (readonly, nonatomic) CGFloat pixelMaskFeather;

/**
 * @name Vector Mask
 */
@property (readonly, nonatomic) BOOL hasVectorMask;

/**
 * Whether the vector mask has a fill.
 */
@property (readonly, nonatomic, getter = isVectorMaskFilled) BOOL vectorMaskFilled;

/**
 * The bezier path of the vector mask if the vector mask contains a path.
 */
@property (readonly, nonatomic, nullable) UIBezierPath *vectorMaskBezierPath;

/**
 * @name Group Layer Properties
 */

/**
 * Child nodes for the receiver structured as they appear in the PSD document, i.e. all nesting 
 * levels of layers and other child layer groups are preserved.
 *
 * @note This value is only valid if the @c type of the layer is 
 * @c AdobePhotoshopLayerTypeLayerGroup.
 */
@property (readonly, nonatomic, nullable) NSArray *childNodes;

/**
 * @name Fill/Shape Layer Properties
 */

/**
 * The fill color of the layer.
 *
 * @note This value will only be valid if the type of the receiver is 
 * @c AdobePhotoshopLayerTypeFill or @c AdobePhotoshopLayerTypeShape, and if the layer has a solid
 * (non-gradient) fill color.
 *
 * @see solidFillColor
 */
@property (readonly, nonatomic, nullable) AdobePhotoshopRGBColor *fillColor;

/**
 * Whether the fill or shape layer has a solid color.
 *
 * @note This property is valid for both @c AdobePhotoshopLayerTypeFill and
 * @c AdobePhotoshopLayerTypeShape layer types.
 *
 * @see fillColor
 */
@property (readonly, nonatomic, getter = isFillColorSolid) BOOL solidFillColor;

/**
 * The bezier path for the shape layer.
 *
 * @note This property is valid for @c AdobePhotoshopLayerTypeShape layer types only.
 */
@property (readonly, nonatomic, nullable) UIBezierPath *shapeBezierPath;

/**
 * @name Text Layer Properties
 */

/**
 * Raw string value for a text layer.
 *
 * @note This value is only valid if the type of the receiver is @c AdobePhotoshopLayerTypeText.
 */
@property (readonly, nonatomic, nullable) NSString *textLayerRawText;

/**
 * Bounding box of the text layer.
 *
 * @note This value is only valid if the type of the receive is @c AdobePhotoshopLayerTypeText.
 */
@property (readonly, nonatomic) CGRect textLayerBounds;

/**
 * Contains one more more AdobePhotoshopTextLayerRange objects, each of which, describes the text 
 * styles for an arbitrary range of text.
 *
 * @note This value is only valid if the type of the receive is @c AdobePhotoshopLayerTypeText.
 */
@property (readonly, nonatomic, nullable) NSArray<AdobePhotoshopTextLayerRange *> *textLayerStyleRanges;

/**
 * @name Smart Object Properties
 */

/**
 * Whether the Smart Object is linked.
 *
 * @note This property is valid only when the @c type of the receiver is 
 * @c AdobePhotoshopLayerTypeSmartObject.
 */
@property (readonly, nonatomic, getter = isSmartObjectLinked) BOOL smartObjectLinked;

/**
 * The top-left point at which the Smart Object resides.
 */
@property (readonly, nonatomic) CGPoint smartObjectTopLeftPoint;

/**
 * The top-right point at which the Smart Object resides.
 */
@property (readonly, nonatomic) CGPoint smartObjectTopRightPoint;

/**
 * The bottom-left point at which the Smart Object resides.
 */
@property (readonly, nonatomic) CGPoint smartObjectBottomLeftPoint;

/**
 * The bottom-right point at which the Smart Object resides.
 */
@property (readonly, nonatomic) CGPoint smartObjectBottomRightPoint;

/**
 * Smart object component that has information about an embedded (non-linked) smart object.
 *
 * @note This property is valid only when the @c type of the receiver is 
 * @c AdobePhotoshopLayerTypeSmartObject.
 */
@property (readonly, nonatomic, nullable) AdobePhotoshopLayerComponent *smartObjectComponent;

@end

#endif
