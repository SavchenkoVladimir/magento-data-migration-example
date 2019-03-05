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
        'Magento_Catalog/js/price-utils',
        'mage/url'
    ],
    function (
        ko,
        Component,
        quote,
        priceUtils,
        urlBuilder
    ) {
        'use strict';

        return Component.extend({
            defaults: {
                template: 'Savchenko_CheckoutStep/summary/quote-items'
            },

            productPathPrefix: 'media/catalog/product/',

            triggerNamePrefix: 'item',

            /**
             * @return {Object}
             */
            getQuoteItems: function(){
                return quote.getItems();
            },

            /**
             * @param {string} price
             * @return {string}
             */
            getFormattedPrice: function (price) {
                return priceUtils.formatPrice(price, quote.getPriceFormat());
            },

            /**
             * @param item
             * @return {string}
             */
            getImageUrl: function (item) {
                let imagePath = this.productPathPrefix + item.product.small_image;
                return urlBuilder.build(imagePath);
            },

            /**
             * @param item
             * @return {string}
             */
            getTriggerName: function (item) {
                return  this.triggerNamePrefix + item.item_id;
            },

            /**
             * @param item
             * @return {string}
             */
            getTrigger: function (item) {
                let trigger = '[class=' + this.triggerNamePrefix + item.item_id + ']';
                return trigger;
            }
        });
    }
);