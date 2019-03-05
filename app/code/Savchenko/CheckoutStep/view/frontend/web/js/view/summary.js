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
        'Magento_Checkout/js/model/quote',
        'Magento_Checkout/js/model/step-navigator',
        'mage/translate'
    ],
    function (
        ko,
        Component,
        _,
        quote,
        stepNavigator,
        $t
    ) {
        'use strict';

        return Component.extend({
            defaults: {
                template: 'Savchenko_CheckoutStep/summary'
            },
            isVisible: ko.observable('summary'),

            /**
             * @inheritDoc
             * @return {exports}
             */
            initialize: function () {
                this._super();

                stepNavigator.registerStep(
                    'summary',
                    null,
                    $t('Order summary'),
                    this.isVisible,
                    _.bind(this.navigate, this),
                    30
                );

                return this;
            },

            /**
             * The navigate() method is responsible for navigation between checkout step
             * during checkout. You can add custom logic, for example some conditions
             * for switching to your custom step
             */
            navigate: function () {}
        });
    }
);