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
                template: 'Savchenko_CheckoutStep/summary/payment'
            },
            address: ko.observable({}),
            method: ko.observable({}),

            /**
             * @inheritDoc
             * @return {exports}
             */
            initialize: function () {
                this._super();
                let self = this;

                quote.billingAddress.subscribe(
                    function (address) { self.updateAddress(address); },
                    this
                );

                quote.paymentMethod.subscribe(
                    function (method) { self.updateMethod(method); },
                    this
                );

                return this;
            },

            /**
             * Update this address property
             *
             * @param address
             */
            updateAddress: function (address) {
                let addr = {};
                addr.city = address.city;
                addr.postcode = address.postcode;
                addr.countryId = address.countryId;
                addr.street = '';

                if (Array.isArray(address.street)) {
                    addr.street = address.street.join(' ');
                }

                this.address(addr);
            },

            /**
             * WARNING: other payment methods can have different title property
             * TODO: implement appropriate title for other payment methods
             *
             * Update this method property
             *
             * @param method
             */
            updateMethod: function (method) {
                let payment = {};
                payment.title = '';

                if (method.title) {
                    payment.title = method.title;
                }

                this.method(payment)
            },

            /**
             * Go to payment edit step
             */
            edit: function () {
                stepNavigator.navigateTo('payment');
            }
        });
    }
);