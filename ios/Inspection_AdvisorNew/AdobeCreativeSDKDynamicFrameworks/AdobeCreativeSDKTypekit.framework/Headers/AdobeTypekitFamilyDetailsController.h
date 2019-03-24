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

#import <UIKit/UIKit.h>

@protocol AdobeTypekitFontBrowserDelegate;

/**
 * AdobeTypekitFamilyDetailsController is the class through which user interacts with Font Family Details
 * or family styles browser
 * This class allows the user to sync and unsync selected fonts in a font family.
 */
@interface AdobeTypekitFamilyDetailsController : UIViewController

/** @name Properties */
/**
 * Typekit family name of the font to show in the family details controller.
 */
@property (strong, nonatomic) NSString  *familyName;


/**
 * Delegate that notifies the presenter of this view controller that the close button has been tapped.
 */
@property (weak, nonatomic) id<AdobeTypekitFontBrowserDelegate> delegate;

/**
 * The tint color of Typekit UI, this can be customized to match the app's color.
 * Default RGB values are 32, 152, and 245.
 */
@property (strong, nonatomic) UIColor *tintColor;

/**
 * The tint color of the navigation bar, this can be customized to match the app's color.
 * Default RGB values are 63, 76, 86.
 */
@property (strong, nonatomic) UIColor *navigationBarTintColor;

@end
