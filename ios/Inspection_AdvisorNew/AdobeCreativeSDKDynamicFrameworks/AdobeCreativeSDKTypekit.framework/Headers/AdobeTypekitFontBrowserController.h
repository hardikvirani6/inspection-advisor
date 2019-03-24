/*************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 *  Copyright 2015 Adobe Systems Incorporated
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
 * AdobeTypekitFontBrowserController is the class through which user interacts with Font Browser component.  
 * Font Browser displays all font families available to the user.
 * Tapping on a family takes the user to the family styles browser.
 * Syncing a font from the styles browser adds it to the user's synced fonts set and downloads it to the user's device to use it locally.
 * 
 * If a user is not logged in to Creative Cloud to use Typekit service, the Font Browser will display all fonts available for the user to browse
 * Trying to sync a font from the styles browser will prompt the user to log in.
 */
@interface AdobeTypekitFontBrowserController : UINavigationController

/** @name Properties */
/**
 * Delegate that notifies the presenter of this view controller that the close button has been tapped.
 */
@property (weak, nonatomic) id<AdobeTypekitFontBrowserDelegate> browserDelegate;

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

/**
 * Defines a method for responding to user closing Font Browser
 */
@protocol AdobeTypekitFontBrowserDelegate <NSObject>

/** @name Methods */
/**
 * Called when the close button is tapped.
 * @param fontBrowser   The fontBrowserController that holds the Close button.
 */
- (void)adobeTypekitFontBrowserUserDidCancel:(AdobeTypekitFontBrowserController *)fontBrowser;

@end
