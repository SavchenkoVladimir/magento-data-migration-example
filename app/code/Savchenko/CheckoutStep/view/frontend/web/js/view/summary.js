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
        'underscore',
        'Magento_Checkout/js/model/step-navigator',
        'mage/translate'
    ],
    function (
        ko,
        Component,
        _,
        stepNavigator,
        translate
    ) {
        'use strict';
        /**
         *
         * mystep - is the name of the component's .html template,
         * <Vendor>_<Module>  - is the name of the your module directory.
         *
         */
        return Component.extend({
            defaults: {
                template: 'Savchenko_CheckoutStep/summary'
            },

            //add here your logic to display step,
            isVisible: ko.observable(true),

            /**
             *
             * @returns {*}
             */
            initialize: function () {
                this._super();
                // register your step
                stepNavigator.registerStep(
                    //step code will be used as step content id in the component template
                    'summary',
                    //step alias
                    null,
                    //step title value
                    translate('Order summary'),
                    //observable property with logic when display step or hide step
                    this.isVisible,

                    _.bind(this.navigate, this),

                    /**
                     * sort order value
                     * 'sort order value' < 10: step displays before shipping step;
                     * 10 < 'sort order value' < 20 : step displays between shipping and payment step
                     * 'sort order value' > 20 : step displays after payment step
                     */
                    30
                );

                return this;
            },

            /**
             * The navigate() method is responsible for navigation between checkout step
             * during checkout. You can add custom logic, for example some conditions
             * for switching to your custom step
             */
            navigate: function () {

            },

            /**
             * @returns void
             */
            navigateToNextStep: function () {
                stepNavigator.next();
            }
        });
    }
);