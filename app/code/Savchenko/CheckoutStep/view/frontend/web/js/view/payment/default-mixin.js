/**
 * Magecom
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to info@magecom.net so we can send you a copy immediately.
 *
 * @category Savchenko
 * @package Savchenko_CheckoutStep
 * @copyright Copyright (c) 2019 Magecom, Inc. (http://www.magecom.net)
 * @license  http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

define(
    [
        'mage/utils/wrapper',
        'Magento_Checkout/js/model/step-navigator',
        'Magento_Checkout/js/model/payment/additional-validators'
    ],
    function (
        wrapper,
        stepNavigator,
        additionalValidators
    ) {
        'use strict';

        // Override cache-on-delivery method
        // Disable place order and go to summary page
        var mixin = {
            placeOrder: function (data, event) {
                if (event) {
                    event.preventDefault();
                }

                if (this.validate() && additionalValidators.validate()) {
                    stepNavigator.next();
                }

                return false;
            }
        };

        return function (wrapper) {
            return wrapper.extend(mixin);
        };
    }
);
