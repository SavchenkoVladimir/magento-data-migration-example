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
        'uiComponent',
        'Magento_Checkout/js/model/quote',
        'Magento_Checkout/js/model/step-navigator'
    ],
    function (
        ko,
        Component,
        quote,
        stepNavigator
    ) {
        'use strict';

        return Component.extend({
            defaults: {
                template: 'Savchenko_CheckoutStep/summary/shipping'
            },

            shippingData: ko.observable({}),

            /**
             * @inheritDoc
             * @return {exports}
             */
            initialize: function () {
                this._super();
                let self = this;

                quote.shippingAddress.subscribe(function (address) {
                    self.updateShippingData(address);
                }, this);

                return this;
            },

            /**
             * @param {array} address
             */
            updateShippingData: function(address) {
                let shippingData = {};
                shippingData.firstname = address.firstname;
                shippingData.lastname = address.lastname;
                shippingData.city = address.city;
                shippingData.street = '';

                if (Array.isArray(address.street)) {
                    shippingData.street = address.street.join(' ');
                }

                shippingData.postcode = address.postcode;
                shippingData.countryId = address.countryId;

                this.shippingData(shippingData);
            },

            /**
             * Navigate to shipping edit step
             */
            edit: function() {
                stepNavigator.navigateTo('shipping');
            }
        });
    }
);