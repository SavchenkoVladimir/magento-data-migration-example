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
        'ko',
        'mage/utils/wrapper',
        'Magento_Customer/js/model/customer',
        'Magento_Checkout/js/model/step-navigator'
    ],
    function (
        ko,
        wrapper,
        customer,
        stepNavigator
    ) {
        'use strict';

        var mixin = {

            visible: ko.observable(false),

            /**
             * Override original method.
             * Skip shipping if customer logged in
             *
             * @param step
             * @return {boolean}
             */
            navigate: function (step) {
                let isCustomerLoggedIn = customer.isLoggedIn();

                // TODO: implement customer address validate
                if (step && isCustomerLoggedIn) {
                    stepNavigator.next();
                    return true;
                }

                step && step.isVisible(true);
            }
        };

        return function (wrapper) {
            return wrapper.extend(mixin);
        };
    }
);
