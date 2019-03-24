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

#ifndef AdobePhotoshopReaderHeader
#define AdobePhotoshopReaderHeader

#import <Foundation/Foundation.h>
#import <CoreGraphics/CoreGraphics.h>

@class AdobePhotoshopLayer;
@class AdobePhotoshopLayerComp;

/**
 * Use to explore the layers and layer comps of a Photoshop Document.
 */
@interface AdobePhotoshopReader : NSObject

/**
 * Bounds of the Photoshop document.
 */
@property (readonly, nonatomic) CGRect bounds;

/**
 * All layers in the Photoshop document in hierarchical order. The structure of the layers is 
 * identical to how they appear in the "Layers" panel in Photoshop.
 */
@property (readonly, nonatomic, nullable) NSArray<AdobePhotoshopLayer *> *layers;

/**
 * All Layer Comps in the Photoshop document.
 */
@property (readonly, nonatomic, nullable) NSArray<AdobePhotoshopLayerComp *> *layerComps;

/**
 * Layers for the "Default" Layer Comp (Last Save State) in the Photoshop document.
 */
@property (readonly, nonatomic, nullable) NSArray<AdobePhotoshopLayer *> *layersForDefaultLayerComp;

/**
 * Retrieves the layer associated with a layer ID. This method could be used to access any layer 
 * regardless of where in the layer hierarchy it resides.
 *
 * @param layerId The ID of the layer within the Photoshop document.
 *
 * @return The layer object for the specified layer ID.
 */
- (nullable AdobePhotoshopLayer *)layerForLayerId:(NSUInteger)layerId;

@end

#endif
